import { Controller, Get, Post } from '@nestjs/common';
import { Hero } from './entities/hero.entity';
import { HeroesService } from './heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  getHeroesFromDb(): Promise<Hero[]> {
    return this.heroesService.getHeroesFromDb();
  }

  @Post('seed')
  getHeroesFromApi(): Promise<any> {
    return this.heroesService.getHeroesFromTheApi();
  }

  @Post('clear')
  clearAllHeroes(): Promise<void> {
    return this.heroesService.clearAllHeroes();
  }

  @Get('stats')
  getHeroesStats(): Promise<any> {
    return this.heroesService.getHeroesStats();
  }
}
