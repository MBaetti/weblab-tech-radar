import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { TechRadarComponent } from './tech-radar.component';
import { TechApiService } from '../../../../global-services/tech-api/tech-api.service';
import { TechRadarPositionService } from '../service/tech-radar-position.service';
import { TechCategory, TechRing, TechnologyEntry } from '../../../../types/technology-entry';

const publishedTech: TechnologyEntry = {
  id: 1,
  name: 'Angular',
  category: TechCategory.languageOrFramework,
  ring: TechRing.adopt,
  description: 'Web-Framework',
  classification: 'Empfehlenswert',
  entryDate: new Date('2024-01-01'),
  changeDate: new Date('2024-06-01'),
  published: true,
  publicationDate: new Date('2024-06-15'),
};

const unpublishedTech: TechnologyEntry = {
  id: 2,
  name: 'NichtVeröffentlicht',
  category: TechCategory.tool,
  ring: TechRing.hold,
  description: 'Noch nicht publiziert',
  classification: '',
  entryDate: new Date('2024-01-01'),
  changeDate: new Date('2024-06-01'),
  published: false,
  publicationDate: new Date('2024-06-15'),
};

describe('TechRadarComponent', () => {
  let component: TechRadarComponent;
  let fixture: ComponentFixture<TechRadarComponent>;
  let techApiServiceMock: Partial<TechApiService>;
  let positionServiceMock: Partial<TechRadarPositionService>;

  beforeEach(async () => {
    techApiServiceMock = {
      getTechnologies: vi.fn().mockReturnValue(of([publishedTech, unpublishedTech])),
    };

    positionServiceMock = {
      getPointInSegment: vi.fn().mockReturnValue({ x: 50, y: 50 }),
    };

    await TestBed.configureTestingModule({
      imports: [TechRadarComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TechApiService, useValue: techApiServiceMock },
        { provide: TechRadarPositionService, useValue: positionServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TechRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('sollte die Komponente erstellen', () => {
    expect(component).toBeTruthy();
  });

  it('sollte getTechnologies beim Initialisieren aufrufen', () => {
    expect(techApiServiceMock.getTechnologies).toHaveBeenCalledTimes(1);
  });

  it('sollte ein SVG-Element rendern', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('sollte nur publizierte Technologien im Radar darstellen', () => {
    // getPointInSegment darf nur für published=true Technologien aufgerufen werden
    const calls = (positionServiceMock.getPointInSegment as ReturnType<typeof vi.fn>).mock.calls;
    const calledCategories = calls.map((args: unknown[]) => args[0]);
    expect(calledCategories).toContain(publishedTech.category);
    // unpublishedTech.category kann trotzdem vorkommen (andere Techs gleicher Kategorie),
    // daher prüfen wir die Anzahl: nur 1 Technologie darf gezeichnet werden
    expect(calls.length).toBe(1);
  });

  it('sollte für jede Technologie einen Kreis im SVG rendern', () => {
    // Technologie-Kreise haben r=5; Ring-Kreise haben keine feste r-Größe von 5
    const circles = fixture.nativeElement.querySelectorAll('circle[r="5"]');
    expect(circles.length).toBe(1);
  });

  it('sollte den Namen der publizierten Technologie als Text anzeigen', () => {
    const textElements = Array.from(
      fixture.nativeElement.querySelectorAll('text') as NodeListOf<SVGTextElement>
    );
    const names = textElements.map(el => el.textContent);
    expect(names).toContain(publishedTech.name);
  });

  it('sollte den Namen der unpublizierten Technologie nicht anzeigen', () => {
    const textElements = Array.from(
      fixture.nativeElement.querySelectorAll('text') as NodeListOf<SVGTextElement>
    );
    const names = textElements.map(el => el.textContent);
    expect(names).not.toContain(unpublishedTech.name);
  });

  it('sollte Ring-Labels auf Deutsch im SVG anzeigen', () => {
    const textElements = Array.from(
      fixture.nativeElement.querySelectorAll('text') as NodeListOf<SVGTextElement>
    ).map(el => el.textContent);
    expect(textElements).toContain('Adoptieren');
    expect(textElements).toContain('Probieren');
    expect(textElements).toContain('Bewerten');
    expect(textElements).toContain('Halten');
  });

  it('sollte bei leerer Technologieliste trotzdem ein SVG rendern', async () => {
    (techApiServiceMock.getTechnologies as ReturnType<typeof vi.fn>).mockReturnValue(of([]));
    // Neue Komponenteninstanz erzeugen
    const fixture2 = TestBed.createComponent(TechRadarComponent);
    fixture2.detectChanges();
    await fixture2.whenStable();
    const svg = fixture2.nativeElement.querySelector('svg');
    expect(svg).not.toBeNull();
    fixture2.destroy();
  });

  it('sollte so viele Ringe zeichnen wie TechRing-Einträge vorhanden sind', () => {
    const nrOfRings = Object.values(TechRing).length;
    // Ring-Kreise: alle circles ohne r="5"
    const allCircles = fixture.nativeElement.querySelectorAll('circle:not([r="5"])');
    expect(allCircles.length).toBe(nrOfRings);
  });
});
