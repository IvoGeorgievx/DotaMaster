import { Controller, Get, Post } from '@nestjs/common';
import { Hero } from './entities/hero.entity';
import { HeroesService } from './heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  getHeroesFromDb(): Promise<Hero[]> {
    console.log('something');
    return this.heroesService.getHeroesFromDb();
  }

  @Post('clear')
  clearAllHeroes(): Promise<void> {
    return this.heroesService.clearAllHeroes();
  }
}
