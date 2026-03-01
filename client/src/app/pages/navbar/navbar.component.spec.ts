import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app title "Tech Radar"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Tech Radar');
  });

  it('should have a navigation link to /viewer', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = Array.from(compiled.querySelectorAll('a'))
      .find(a => a.getAttribute('routerlink') === '/viewer' || a.getAttribute('href') === '/viewer');
    expect(link).not.toBeUndefined();
  });

  it('should have a navigation link to /administration', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = Array.from(compiled.querySelectorAll('a'))
      .find(a => a.getAttribute('routerlink') === '/administration' || a.getAttribute('href') === '/administration');
    expect(link).not.toBeUndefined();
  });

  it('should display the radar icon', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('mat-icon');
    expect(icon?.textContent?.trim()).toBe('radar');
  });
});
