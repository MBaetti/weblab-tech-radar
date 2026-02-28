import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TechAdministrationComponent } from './tech-administration.component';

describe('RadarManagerComponent', () => {
  let component: TechAdministrationComponent;
  let fixture: ComponentFixture<TechAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechAdministrationComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechAdministrationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
