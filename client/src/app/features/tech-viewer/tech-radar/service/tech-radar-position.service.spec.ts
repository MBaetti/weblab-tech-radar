import { TestBed } from '@angular/core/testing';

import { TechRadarPositionService } from './tech-radar-position.service';

describe('TechRadarPositionService', () => {
  let service: TechRadarPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechRadarPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
