import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TechAdministrationComponent } from './tech-administration.component';

describe('TechAdministrationComponent', () => {
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

  it('should display the heading "Technologie-Administration"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe('Technologie-Administration');
  });

  it('should render the tech-form child component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tech-form-component')).not.toBeNull();
  });

  it('should render the tech-cards child component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tech-cards-component')).not.toBeNull();
  });
});
