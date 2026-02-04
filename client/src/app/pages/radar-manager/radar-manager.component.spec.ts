import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarManagerComponent } from './radar-manager.component';

describe('RadarManagerComponent', () => {
  let component: RadarManagerComponent;
  let fixture: ComponentFixture<RadarManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarManagerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
