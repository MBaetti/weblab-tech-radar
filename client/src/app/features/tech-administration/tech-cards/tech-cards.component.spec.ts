import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { TechCardsComponent } from './tech-cards.component';
import { TechApiService } from '../../../global-services/tech-api/tech-api.service';
import { TechCategory, TechRing, TechnologyEntry } from '../../../types/technology-entry';

const mockTechnologies: TechnologyEntry[] = [
  {
    id: 1,
    name: 'Angular',
    category: TechCategory.languageOrFramework,
    ring: TechRing.adopt,
    description: 'Ein Framework für Webanwendungen',
    classification: 'Sehr empfehlenswert',
    entryDate: new Date('2024-01-01'),
    changeDate: new Date('2024-06-01'),
    published: true,
    publicationDate: new Date('2024-06-15'),
  },
  {
    id: 2,
    name: 'ArgoCD',
    category: TechCategory.tool,
    ring: TechRing.trial,
    description: 'GitOps-Tool für Kubernetes',
    classification: 'Empfehlenswert',
    entryDate: new Date('2024-02-01'),
    changeDate: new Date('2024-07-01'),
    published: false,
    publicationDate: new Date('2024-07-10'),
  },
];

describe('TechCardsComponent', () => {
  let component: TechCardsComponent;
  let fixture: ComponentFixture<TechCardsComponent>;
  let techApiServiceMock: Partial<TechApiService>;
  let dialogMock: Partial<MatDialog>;
  let technologiesSignal: ReturnType<typeof signal<TechnologyEntry[]>>;

  beforeEach(async () => {
    technologiesSignal = signal(mockTechnologies);
    techApiServiceMock = {
      technologies: technologiesSignal.asReadonly(),
      deleteTechnology: vi.fn().mockReturnValue(of(undefined)),
    };

    dialogMock = {
      open: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TechCardsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TechApiService, useValue: techApiServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TechCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('sollte die Komponente erstellen', () => {
    expect(component).toBeTruthy();
  });

  it('sollte alle Technologie-Karten rendern', () => {
    const cards = fixture.nativeElement.querySelectorAll('mat-card');
    expect(cards.length).toBe(mockTechnologies.length);
  });

  it('sollte den Namen der Technologie anzeigen', () => {
    const cardTitles = fixture.nativeElement.querySelectorAll('mat-card-title');
    expect(cardTitles[0].textContent).toContain('Angular');
    expect(cardTitles[1].textContent).toContain('ArgoCD');
  });

  it('sollte das deutsche Kategorie-Label anzeigen', () => {
    const subtitles = fixture.nativeElement.querySelectorAll('mat-card-subtitle');
    expect(subtitles[0].textContent).toContain('Sprache oder Framework');
    expect(subtitles[1].textContent).toContain('Werkzeug');
  });

  it('sollte das deutsche Ring-Label anzeigen', () => {
    const content = fixture.nativeElement.querySelectorAll('mat-card-content')[0].textContent;
    expect(content).toContain('Adoptieren');
  });

  it('sollte das Publikationsdatum nur für publizierte Technologien anzeigen', () => {
    const footers = fixture.nativeElement.querySelectorAll('mat-card-footer');
    // Nur Angular (id=1) ist published=true
    expect(footers.length).toBe(1);
    expect(footers[0].textContent).toContain('Publikationsdatum');
  });

  it('sollte eine Meldung anzeigen, wenn keine Technologien vorhanden sind', async () => {
    technologiesSignal.set([]);
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    const emptyMessage = fixture.nativeElement.querySelector('li');
    expect(emptyMessage?.textContent).toContain('Es wurden noch keine Technologien erfasst.');
  });

  it('sollte deleteTechnology beim Klick auf "Löschen" aufrufen', () => {
    const deleteButtons = fixture.nativeElement.querySelectorAll('button');
    // Zweiter Button der ersten Karte ist "Löschen"
    const deleteButton = Array.from(deleteButtons as NodeListOf<HTMLButtonElement>).find(
      (btn) => btn.textContent?.trim() === 'Löschen'
    );
    deleteButton?.click();
    expect(techApiServiceMock.deleteTechnology).toHaveBeenCalledWith(mockTechnologies[0].id);
  });

  it('sollte den Dialog beim Klick auf "Publizieren" öffnen', () => {
    const publishButton = Array.from(
      fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
    ).find((btn) => btn.textContent?.trim() === 'Publizieren');
    publishButton?.click();
    expect(dialogMock.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ data: mockTechnologies[0] })
    );
  });

  it('getCategoryLabel() sollte das korrekte deutsche Label zurückgeben', () => {
    expect(component.getCategoryLabel(TechCategory.technique)).toBe('Technik');
    expect(component.getCategoryLabel(TechCategory.tool)).toBe('Werkzeug');
    expect(component.getCategoryLabel(TechCategory.plattform)).toBe('Plattform');
    expect(component.getCategoryLabel(TechCategory.languageOrFramework)).toBe('Sprache oder Framework');
  });

  it('getRingLabel() sollte das korrekte deutsche Label zurückgeben', () => {
    expect(component.getRingLabel(TechRing.adopt)).toBe('Adoptieren');
    expect(component.getRingLabel(TechRing.trial)).toBe('Probieren');
    expect(component.getRingLabel(TechRing.assess)).toBe('Bewerten');
    expect(component.getRingLabel(TechRing.hold)).toBe('Halten');
  });

  it('getRingLabel() sollte den Originalwert zurückgeben, wenn kein Label gefunden wird', () => {
    expect(component.getRingLabel('unbekannt')).toBe('unbekannt');
  });
});
