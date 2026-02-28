import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { TechRadarPositionService, Point } from './tech-radar-position.service';
import { TechCategory, TechRing } from '../../../../types/technology-entry';

describe('TechRadarPositionService', () => {
  let service: TechRadarPositionService;
  const radiusMax = 400;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechRadarPositionService);
  });

  it('sollte erstellt werden', () => {
    expect(service).toBeTruthy();
  });

  it('sollte einen Punkt mit x- und y-Koordinaten zurückgeben', () => {
    const point: Point = service.getPointInSegment(TechCategory.tool, TechRing.adopt, radiusMax);
    expect(point).toHaveProperty('x');
    expect(point).toHaveProperty('y');
  });

  it('sollte einen Punkt innerhalb von radiusMax zurückgeben', () => {
    for (const category of Object.values(TechCategory)) {
      for (const ring of Object.values(TechRing)) {
        const point = service.getPointInSegment(category, ring, radiusMax);
        const distance = Math.sqrt(point.x ** 2 + point.y ** 2);
        expect(distance).toBeLessThanOrEqual(radiusMax);
      }
    }
  });

  it('sollte den Punkt im richtigen Quadranten platzieren (technique → Quadrant 0, Winkel 0°–90°)', () => {
    for (let i = 0; i < 20; i++) {
      const point = service.getPointInSegment(TechCategory.technique, TechRing.adopt, radiusMax);
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeGreaterThanOrEqual(0);
    }
  });

  it('sollte den Punkt im richtigen Quadranten platzieren (tool → Quadrant 1, Winkel 90°–180°)', () => {
    for (let i = 0; i < 20; i++) {
      const point = service.getPointInSegment(TechCategory.tool, TechRing.adopt, radiusMax);
      expect(point.x).toBeLessThanOrEqual(0);
      expect(point.y).toBeGreaterThanOrEqual(0);
    }
  });

  it('sollte einen Punkt im richtigen Ring-Abstand platzieren', () => {
    const ringWidth = radiusMax / 4;
    const ringIndex = Object.values(TechRing).indexOf(TechRing.trial); // 1
    const minRadius = ringIndex * ringWidth + 10;
    const maxRadius = (ringIndex + 1) * ringWidth - 10;

    for (let i = 0; i < 20; i++) {
      const point = service.getPointInSegment(TechCategory.technique, TechRing.trial, radiusMax);
      const distance = Math.sqrt(point.x ** 2 + point.y ** 2);
      expect(distance).toBeGreaterThanOrEqual(minRadius);
      expect(distance).toBeLessThanOrEqual(maxRadius);
    }
  });

  it('sollte für den innersten Ring (adopt) kleinere Abstände liefern als für den äußersten (hold)', () => {
    const adoptDistances: number[] = [];
    const holdDistances: number[] = [];

    for (let i = 0; i < 30; i++) {
      const pAdopt = service.getPointInSegment(TechCategory.technique, TechRing.adopt, radiusMax);
      const pHold = service.getPointInSegment(TechCategory.technique, TechRing.hold, radiusMax);
      adoptDistances.push(Math.sqrt(pAdopt.x ** 2 + pAdopt.y ** 2));
      holdDistances.push(Math.sqrt(pHold.x ** 2 + pHold.y ** 2));
    }

    const avgAdopt = adoptDistances.reduce((a, b) => a + b, 0) / adoptDistances.length;
    const avgHold = holdDistances.reduce((a, b) => a + b, 0) / holdDistances.length;
    expect(avgAdopt).toBeLessThan(avgHold);
  });
});
