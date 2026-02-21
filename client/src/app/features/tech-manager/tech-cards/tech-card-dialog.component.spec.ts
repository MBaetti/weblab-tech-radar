import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCardDialogComponent } from './tech-card-dialog.component';

describe('TechCardDialogComponent', () => {
  let component: TechCardDialogComponent;
  let fixture: ComponentFixture<TechCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechCardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCardDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
