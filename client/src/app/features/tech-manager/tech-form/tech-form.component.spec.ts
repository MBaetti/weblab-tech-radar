import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechFromComponent } from './tech-form.component';

describe('FormComponent', () => {
  let component: TechFromComponent;
  let fixture: ComponentFixture<TechFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechFromComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
