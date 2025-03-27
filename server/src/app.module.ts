import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroesModule } from './heroes/heroes.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ItemPopularityModule } from './item-popularity/item-popularity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dotaDb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    HeroesModule,
    ItemPopularityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
