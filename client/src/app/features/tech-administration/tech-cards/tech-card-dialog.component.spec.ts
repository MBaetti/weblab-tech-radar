import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { TechCardDialogComponent } from './tech-card-dialog.component';
import { TechApiService } from '../../../global-services/tech-api/tech-api.service';
import { TechCategory, TechRing, TechnologyEntry } from '../../../types/technology-entry';

const mockTech: TechnologyEntry = {
  id: 7,
  name: 'Kubernetes',
  category: TechCategory.plattform,
  ring: TechRing.trial,
  description: 'Container-Orchestrierung',
  classification: 'Empfehlenswert für große Systeme',
  entryDate: new Date('2024-03-01'),
  changeDate: new Date('2024-08-01'),
  published: false,
  publicationDate: new Date('2024-09-01'),
};

describe('TechCardDialogComponent', () => {
  let component: TechCardDialogComponent;
  let fixture: ComponentFixture<TechCardDialogComponent>;
  let techApiServiceMock: Partial<TechApiService>;
  let dialogRefMock: Partial<MatDialogRef<TechCardDialogComponent>>;

  beforeEach(async () => {
    techApiServiceMock = {
      updateTechnology: vi.fn().mockReturnValue(of({ ...mockTech, published: true })),
    };

    dialogRefMock = {
      close: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TechCardDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TechApiService, useValue: techApiServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: mockTech },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TechCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('sollte die Komponente erstellen', () => {
    expect(component).toBeTruthy();
  });

  it('sollte den Namen der Technologie im Titel anzeigen', () => {
    const title = fixture.nativeElement.querySelector('[mat-dialog-title]');
    expect(title?.textContent).toContain(mockTech.name);
  });

  it('sollte Ring und Einordnung aus den Dialog-Daten vorbelegen', () => {
    expect(component['ringFormControl'].value).toBe(mockTech.ring);
    expect(component['classificationFormControl'].value).toBe(mockTech.classification);
  });

  it('sollte das Formular als ungültig markieren, wenn Ring oder Einordnung leer sind', () => {
    component['technologyDialogFormGroup'].patchValue({ ring: '', classification: '' });
    expect(component['technologyDialogFormGroup'].valid).toBe(false);
  });

  it('sollte das Formular als gültig markieren, wenn Ring und Einordnung ausgefüllt sind', () => {
    component['technologyDialogFormGroup'].patchValue({
      ring: TechRing.adopt,
      classification: 'Sehr empfehlenswert',
    });
    expect(component['technologyDialogFormGroup'].valid).toBe(true);
  });

  it('sollte updateTechnology mit published=true aufrufen', () => {
    component['technologyDialogFormGroup'].patchValue({
      ring: TechRing.adopt,
      classification: 'Bewährt in der Praxis',
    });
    const formDirectiveMock = { resetForm: vi.fn() } as any;
    component.publishTechnology(component['technologyDialogFormGroup'], formDirectiveMock);

    expect(techApiServiceMock.updateTechnology).toHaveBeenCalledWith(
      mockTech.id,
      expect.objectContaining({ published: true })
    );
  });

  it('sollte das Formular nach erfolgreichem Publizieren zurücksetzen', () => {
    component['technologyDialogFormGroup'].patchValue({
      ring: TechRing.assess,
      classification: 'Zu beobachten',
    });
    const formDirectiveMock = { resetForm: vi.fn() } as any;
    component.publishTechnology(component['technologyDialogFormGroup'], formDirectiveMock);

    expect(formDirectiveMock.resetForm).toHaveBeenCalled();
  });

  it('sollte eine Fehlermeldung setzen, wenn das Publizieren fehlschlägt', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (techApiServiceMock.updateTechnology as ReturnType<typeof vi.fn>).mockReturnValue(
      throwError(() => new Error('Server nicht erreichbar'))
    );
    component['technologyDialogFormGroup'].patchValue({
      ring: TechRing.hold,
      classification: 'Nicht mehr verwenden',
    });
    const formDirectiveMock = { resetForm: vi.fn() } as any;
    component.publishTechnology(component['technologyDialogFormGroup'], formDirectiveMock);

    fixture.detectChanges();
    const errorDiv = fixture.nativeElement.querySelector('.submit-error');
    expect(errorDiv?.textContent).toContain('Publizieren fehlgeschlagen');
    consoleSpy.mockRestore();
  });

  it('sollte updateTechnology nicht aufrufen, wenn das Formular ungültig ist', () => {
    component['technologyDialogFormGroup'].patchValue({ ring: '', classification: '' });
    const formDirectiveMock = { resetForm: vi.fn() } as any;
    component.publishTechnology(component['technologyDialogFormGroup'], formDirectiveMock);
    expect(techApiServiceMock.updateTechnology).not.toHaveBeenCalled();
  });

  it('getRingLabel() sollte das korrekte deutsche Label zurückgeben', () => {
    expect(component.getRingLabel(TechRing.adopt)).toBe('Adoptieren');
    expect(component.getRingLabel(TechRing.trial)).toBe('Probieren');
    expect(component.getRingLabel(TechRing.assess)).toBe('Bewerten');
    expect(component.getRingLabel(TechRing.hold)).toBe('Halten');
  });

  it('sollte alle Ringe in der Auswahl enthalten', () => {
    const allRings = Object.values(TechRing);
    const componentRings = component['rings'];
    expect(componentRings).toEqual(allRings);
  });
});
