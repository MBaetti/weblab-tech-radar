import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TechCardsComponent } from './tech-cards.component';

describe('TechListComponent', () => {
  let component: TechCardsComponent;
  let fixture: ComponentFixture<TechCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechCardsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCardsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

