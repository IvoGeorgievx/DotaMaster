import { Test, TestingModule } from '@nestjs/testing';
import { ItemPopularityController } from './item-popularity.controller';
import { ItemPopularityService } from './item-popularity.service';

describe('ItemPopularityController', () => {
  let controller: ItemPopularityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemPopularityController],
      providers: [ItemPopularityService],
    }).compile();

    controller = module.get<ItemPopularityController>(ItemPopularityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
