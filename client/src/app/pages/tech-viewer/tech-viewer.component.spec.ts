import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TechViewerComponent } from './tech-viewer.component';

describe('RadarViewerComponent', () => {
  let component: TechViewerComponent;
  let fixture: ComponentFixture<TechViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechViewerComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechViewerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the heading "Technologie-Radar"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe('Technologie-Radar');
  });

  it('should render the tech-radar child component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tech-radar-component')).not.toBeNull();
  });
});
