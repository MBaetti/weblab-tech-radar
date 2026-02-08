import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechManagerComponent } from './tech-manager.component';

describe('RadarManagerComponent', () => {
  let component: TechManagerComponent;
  let fixture: ComponentFixture<TechManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechManagerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
