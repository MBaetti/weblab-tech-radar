import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechAdministrationComponent } from './tech-administration.component';

describe('RadarManagerComponent', () => {
  let component: TechAdministrationComponent;
  let fixture: ComponentFixture<TechAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechAdministrationComponent]
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
