import { Test, TestingModule } from '@nestjs/testing';
import { ItemPopularityService } from './item-popularity.service';

describe('ItemPopularityService', () => {
  let service: ItemPopularityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemPopularityService],
    }).compile();

    service = module.get<ItemPopularityService>(ItemPopularityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
