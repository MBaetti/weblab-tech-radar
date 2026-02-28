import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { TechFromComponent } from './tech-form.component';
import { TechApiService } from '../../../global-services/tech-api/tech-api.service';
import { TechCategory, TechRing, TechnologyEntry } from '../../../types/technology-entry';

const mockCreatedTech: TechnologyEntry = {
  id: 42,
  name: 'Vitest',
  category: TechCategory.tool,
  ring: TechRing.adopt,
  description: 'Ein schnelles Test-Framework',
  classification: 'Sehr empfehlenswert',
  entryDate: new Date('2024-01-01'),
  changeDate: new Date('2024-06-01'),
  published: false,
  publicationDate: new Date('2024-06-15'),
};

describe('TechFromComponent', () => {
  let component: TechFromComponent;
  let fixture: ComponentFixture<TechFromComponent>;
  let techApiServiceMock: Partial<TechApiService>;

  beforeEach(async () => {
    techApiServiceMock = {
      createTechnology: vi.fn().mockReturnValue(of(mockCreatedTech)),
    };

    await TestBed.configureTestingModule({
      imports: [TechFromComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TechApiService, useValue: techApiServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TechFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('sollte die Komponente erstellen', () => {
    expect(component).toBeTruthy();
  });

  it('sollte das Formular initial als ungültig markieren', () => {
    expect(component.technologyFormGroup.valid).toBe(false);
  });

  it('sollte das Formular als gültig markieren, wenn alle Pflichtfelder ausgefüllt sind', () => {
    component.technologyFormGroup.patchValue({
      name: 'Angular',
      category: TechCategory.languageOrFramework,
      description: 'Ein Web-Framework',
    });
    expect(component.technologyFormGroup.valid).toBe(true);
  });

  it('sollte name als Pflichtfeld validieren', () => {
    const nameControl = component.technologyFormGroup.get('name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();
    expect(nameControl?.hasError('required')).toBe(true);
  });

  it('sollte category als Pflichtfeld validieren', () => {
    const categoryControl = component.technologyFormGroup.get('category');
    categoryControl?.setValue('');
    categoryControl?.markAsTouched();
    expect(categoryControl?.hasError('required')).toBe(true);
  });

  it('sollte description als Pflichtfeld validieren', () => {
    const descControl = component.technologyFormGroup.get('description');
    descControl?.setValue('');
    descControl?.markAsTouched();
    expect(descControl?.hasError('required')).toBe(true);
  });

  it('sollte ring und classification als optionale Felder behandeln', () => {
    component.technologyFormGroup.patchValue({
      name: 'SomeTech',
      category: TechCategory.plattform,
      description: 'Eine Plattform',
      ring: '',
      classification: '',
    });
    expect(component.technologyFormGroup.valid).toBe(true);
  });

  it('sollte createTechnology aufrufen, wenn das Formular gültig und abgeschickt wird', () => {
    component.technologyFormGroup.patchValue({
      name: 'Vitest',
      category: TechCategory.tool,
      description: 'Ein Test-Framework',
      ring: TechRing.adopt,
      classification: 'Empfehlenswert',
    });
    const formDirectiveMock = { resetForm: vi.fn() } as any;
    component.submitTechnology(component.technologyFormGroup, formDirectiveMock);

    expect(techApiServiceMock.createTechnology).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Vitest', category: TechCategory.tool })
    );
  });

  it('sollte das Formular nach erfolgreichem Submit zurücksetzen', () => {
    component.technologyFormGroup.patchValue({
      name: 'Vitest',
      category: TechCategory.tool,
      description: 'Ein Test-Framework',
    });
    const formDirectiveMock = { resetForm: vi.fn() } as any;
    component.submitTechnology(component.technologyFormGroup, formDirectiveMock);

    expect(component.technologyFormGroup.get('name')?.value).toBeNull();
    expect(formDirectiveMock.resetForm).toHaveBeenCalled();
  });

  it('sollte eine Fehlermeldung anzeigen, wenn der Server einen 500-Fehler zurückgibt', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (techApiServiceMock.createTechnology as ReturnType<typeof vi.fn>).mockReturnValue(
      throwError(() => ({ status: 500, error: {} }))
    );
    component.technologyFormGroup.patchValue({
      name: 'Vitest',
      category: TechCategory.tool,
      description: 'Ein Test-Framework',
    });
    const formDirectiveMock = { resetForm: vi.fn() } as any;
    component.submitTechnology(component.technologyFormGroup, formDirectiveMock);

    fixture.detectChanges();
    const errorDiv = fixture.nativeElement.querySelector('.submit-error');
    expect(errorDiv?.textContent).toContain('Serverfehler');
    consoleSpy.mockRestore();
  });

  it('sollte eine Fehlermeldung bei unbekanntem Fehler anzeigen', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (techApiServiceMock.createTechnology as ReturnType<typeof vi.fn>).mockReturnValue(
      throwError(() => ({ status: 400, error: { message: null } }))
    );
    component.technologyFormGroup.patchValue({
      name: 'Vitest',
      category: TechCategory.tool,
      description: 'Ein Test-Framework',
    });
    const formDirectiveMock = { resetForm: vi.fn() } as any;
    component.submitTechnology(component.technologyFormGroup, formDirectiveMock);

    fixture.detectChanges();
    const errorDiv = fixture.nativeElement.querySelector('.submit-error');
    expect(errorDiv?.textContent).toContain('Unbekannter Fehler');
    consoleSpy.mockRestore();
  });

  it('sollte createTechnology nicht aufrufen, wenn das Formular ungültig ist', () => {
    // Formular ist leer und ungültig
    const formDirectiveMock = { resetForm: vi.fn() } as any;
    component.submitTechnology(component.technologyFormGroup, formDirectiveMock);
    expect(techApiServiceMock.createTechnology).not.toHaveBeenCalled();
  });

  it('sollte alle Kategorien in den Auswahl-Optionen enthalten', () => {
    const allCategories = Object.values(TechCategory);
    const componentCategories = component['categories'];
    expect(componentCategories).toEqual(allCategories);
  });

  it('sollte alle Ringe in den Auswahl-Optionen enthalten', () => {
    const allRings = Object.values(TechRing);
    const componentRings = component['rings'];
    expect(componentRings).toEqual(allRings);
  });
});
