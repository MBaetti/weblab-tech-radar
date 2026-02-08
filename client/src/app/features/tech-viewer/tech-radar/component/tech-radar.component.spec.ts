import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechRadarComponent } from './tech-radar.component';

describe('TechRadarComponent', () => {
  let component: TechRadarComponent;
  let fixture: ComponentFixture<TechRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechRadarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechRadarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
