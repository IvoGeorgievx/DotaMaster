import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Hero])],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
