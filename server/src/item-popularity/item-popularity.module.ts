import { Module } from '@nestjs/common';
import { ItemPopularityService } from './item-popularity.service';
import { ItemPopularityController } from './item-popularity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPopularity } from './entities/item-popularity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemPopularity])],
  controllers: [ItemPopularityController],
  providers: [ItemPopularityService],
})
export class ItemPopularityModule {}
