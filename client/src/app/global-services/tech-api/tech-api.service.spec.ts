import { TestBed } from '@angular/core/testing';

import { TechApiService } from './tech-api.service';

describe('TechApiService', () => {
  let service: TechApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
