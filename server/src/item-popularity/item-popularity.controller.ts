import { Controller, Get } from '@nestjs/common';
import { ItemPopularityService } from './item-popularity.service';
import { ItemPopularity } from './entities/item-popularity.entity';

@Controller('item-popularity')
export class ItemPopularityController {
  constructor(private readonly itemPopularityService: ItemPopularityService) {}

  @Get()
  getItemsPopularity(): Promise<ItemPopularity[]> {
    return this.itemPopularityService.getItemsPopularity();
  }
}
