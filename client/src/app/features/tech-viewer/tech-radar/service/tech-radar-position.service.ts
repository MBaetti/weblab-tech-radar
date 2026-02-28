import { Injectable } from '@angular/core';
import { TechCategory, TechRing } from '../../../../types/technology-entry';

export interface Point { x: number; y: number; }

@Injectable({ providedIn: 'root' })
export class TechRadarPositionService {

  getPointInSegment(category: TechCategory, ring: TechRing, radiusMax: number): Point {
    // Konvertiere Enums zu Indizes
    const quadrant = Object.values(TechCategory).indexOf(category);
    const ringIndex = Object.values(TechRing).indexOf(ring);

    // 1. Definiere die Grenzen des Rings (z.B. Ring 0 ist von 0 bis 100px)
    const ringWidth = radiusMax / 4;
    const minRadius = ringIndex * ringWidth + 10;
    const maxRadius = (ringIndex + 1) * ringWidth - 10;

    // 2. Wähle einen zufälligen Radius innerhalb des Rings
    const r = Math.sqrt(Math.random() * (maxRadius ** 2 - minRadius ** 2) + minRadius ** 2);

    // 3. Wähle einen zufälligen Winkel innerhalb des Quadranten (90 Grad Segmente)
    const angleMin = quadrant * (Math.PI / 2);
    const angleMax = (quadrant + 1) * (Math.PI / 2);
    const alpha = Math.random() * (angleMax - angleMin) + angleMin;

    // 4. Konvertiere Polarkoordinaten in Kartesische Koordinaten (x, y)
    return {
      x: r * Math.cos(alpha),
      y: r * Math.sin(alpha)
    };
  }
}
