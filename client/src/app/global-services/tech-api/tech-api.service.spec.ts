import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TechApiService } from './tech-api.service';

describe('TechApiService', () => {
  let service: TechApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TechApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
