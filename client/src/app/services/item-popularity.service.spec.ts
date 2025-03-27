import { TestBed } from '@angular/core/testing';

import { ItemPopularityService } from './item-popularity.service';

describe('ItemPopularityService', () => {
  let service: ItemPopularityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemPopularityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
