import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { RadarViewerComponent } from './radar-viewer.component';

describe('RadarViewerComponent', () => {
  let component: RadarViewerComponent;
  let fixture: ComponentFixture<RadarViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarViewerComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarViewerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
