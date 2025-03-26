import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { API_URL } from 'src/constants/api-url';
import { Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

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

@Injectable()
export class HeroesService {
  constructor(
    private http: HttpService,
    @InjectRepository(Hero)
    private heroRepo: Repository<Hero>,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async getHeroesFromTheApi() {
    console.log('here after few secs');
    const { data } = await firstValueFrom(
      this.http.get<IApiResponseHero[]>(`${API_URL}/heroes`),
    );
    const heroes = data.map((hero) => {
      return {
        id: hero.id,
        name: hero.name,
        localizedName: hero.localized_name,
        primaryAttr: hero.primary_attr,
        attackType: hero.attack_type,
        roles: hero.roles,
        legs: hero.legs,
      };
    });
    await this.updateHeroRepo(heroes);
    return data;
  }

  async updateHeroRepo(data: IHero[]) {
    await this.heroRepo.upsert(data, ['id']);
  }

  async getHeroesFromDb(): Promise<Hero[]> {
    return await this.heroRepo.find();
  }

  async clearAllHeroes(): Promise<void> {
    await this.heroRepo.clear();
  }
}
