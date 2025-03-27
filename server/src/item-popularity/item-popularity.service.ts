import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemPopularity } from './entities/item-popularity.entity';

@Injectable()
export class ItemPopularityService {
  constructor(
    @InjectRepository(ItemPopularity)
    private readonly itemPopularityRepo: Repository<ItemPopularity>,
  ) {}

  async getItemsPopularity(): Promise<ItemPopularity[]> {
    return await this.itemPopularityRepo.find({
      relations: { hero: true },
      order: {
        hero: {
          name: 'ASC',
        },
      },
    });
  }
}
