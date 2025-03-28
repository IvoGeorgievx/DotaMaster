import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { API_URL } from 'src/constants/api-url';
import { ItemPopularity } from 'src/item-popularity/entities/item-popularity.entity';
import { Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';
import { ceil, chunk, sum } from 'lodash';

interface IApiResponseHero {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  legs: number;
}

interface IHero {
  id: number;
  name: string;
  localizedName: string;
  primaryAttr: string;
  attackType: string;
  roles: string[];
  legs: number;
}

interface IApiResponseItemPopularity {
  start_game_items: Record<string, number>;
  early_game_items: Record<string, number>;
  mid_game_items: Record<string, number>;
  late_game_items: Record<string, number>;
}
interface IItemPopularity {
  startGameItems: Record<string, number>;
  earlyGameItems: Record<string, number>;
  midGameItems: Record<string, number>;
  lateGameItems: Record<string, number>;
}

interface HeroStatsFromApi {
  id: number;
  pub_pick_trend: number[];
  pub_win_trend: number[];
}

@Injectable()
export class HeroesService {
  constructor(
    private http: HttpService,
    @InjectRepository(Hero)
    private heroRepo: Repository<Hero>,
    @InjectRepository(ItemPopularity)
    private itemPopularityRepo: Repository<ItemPopularity>,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async getHeroesFromTheApi() {
    console.log('starting the job');
    const { data } = await firstValueFrom(
      this.http.get<IApiResponseHero[]>(`${API_URL}/heroes`),
    );
    const { data: winRate } = await firstValueFrom(
      this.http.get<HeroStatsFromApi[]>(`${API_URL}/heroStats`),
    );

    const heroes: Hero[] = data.map((hero) => {
      const winRateHero = winRate.find((h) => h.id === hero.id);
      const winPercantage = ceil(
        (sum(winRateHero?.pub_win_trend) / sum(winRateHero?.pub_pick_trend)) *
          100,
        1,
      );
      return {
        id: hero.id,
        name: hero.name,
        localizedName: hero.localized_name,
        primaryAttr: hero.primary_attr,
        attackType: hero.attack_type,
        roles: hero.roles,
        legs: hero.legs,
        winRate: winPercantage,
        updatedAt: new Date(),
      };
    });
    await this.updateHeroRepo(heroes);
    await this.getHeroesItemPopularity(heroes);
    return data;
  }

  async updateHeroRepo(data: IHero[]) {
    await this.heroRepo.upsert(data, ['id']);
  }

  async getHeroesFromDb(): Promise<Hero[]> {
    return await this.heroRepo.find();
  }

  async clearAllHeroes(): Promise<void> {
    // await this.itemPopularityRepo.clear();
    // await this.heroRepo.clear();
  }

  async getHeroesItemPopularity(heroes: IHero[]) {
    const heroChunks = chunk(heroes, 50);
    // this is done to prevent the 60 requests per minute limit from open dota api.

    for (let i = 0; i < heroChunks.length; i++) {
      await Promise.all(
        heroChunks[i].map((hero) => this.processHeroData(hero)),
      );
      if (i < heroChunks.length - 1) {
        console.log('rate limit reached here.');
        await new Promise((resolve) => setTimeout(resolve, 65000));
      }
    }
  }

  private async processHeroData(hero: IHero) {
    try {
      const { data } = await firstValueFrom(
        this.http.get<IApiResponseItemPopularity>(
          `https://api.opendota.com/api/heroes/${hero.id}/itemPopularity`,
        ),
      );
      const mappedData: IItemPopularity = {
        earlyGameItems: data.early_game_items,
        startGameItems: data.start_game_items,
        midGameItems: data.mid_game_items,
        lateGameItems: data.late_game_items,
      };

      const existingEntity = await this.itemPopularityRepo.findOne({
        where: { hero: { id: hero.id } },
        relations: { hero: true },
      });

      if (existingEntity) {
        await this.itemPopularityRepo.update(existingEntity.id, {
          ...mappedData,
        });
        return;
      }
      await this.itemPopularityRepo.save({
        ...mappedData,
        hero: { id: hero.id },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getHeroesStats(): Promise<any> {}
}
