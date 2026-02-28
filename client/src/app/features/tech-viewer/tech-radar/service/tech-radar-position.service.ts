import { Injectable } from '@angular/core';
import { TechCategory, TechRing } from '../../../../types/technology-entry';

export interface Point { x: number; y: number; }

@Injectable({ providedIn: 'root' })
export class TechRadarPositionService {

  getPointInSegment(category: TechCategory, ring: TechRing, radiusMax: number): Point {
    // Konvertiere Enums zu Indizes
    const quadrant = Object.values(TechCategory).indexOf(category);
    const ringIndex = Object.values(TechRing).indexOf(ring);

    // 1. Grenzen des Rings definieren
    const ringWidth = radiusMax / 4;
    const minRadius = ringIndex * ringWidth + 10;
    const maxRadius = (ringIndex + 1) * ringWidth - 10;

    // 2. Zufälligen Radius innerhalb des Rings wählen
    const r = Math.sqrt(Math.random() * (maxRadius ** 2 - minRadius ** 2) + minRadius ** 2);

    // 3. Zufälligen Winkel innerhalb des Quadranten wählen
    const angleMin = quadrant * (Math.PI / 2);
    const angleMax = (quadrant + 1) * (Math.PI / 2);
    const alpha = Math.random() * (angleMax - angleMin) + angleMin;

    // 4. Polarkoordinaten zu Kartesischen Koordinaten
    return {
      x: r * Math.cos(alpha),
      y: r * Math.sin(alpha)
    };
  }
}
