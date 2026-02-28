import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import {TechRadarPositionService} from '../service/tech-radar-position.service';
import {TechRing, TechCategory, TechnologyEntry, TechCategoryLabels, TechRingLabels} from '../../../../types/technology-entry';
import {TechApiService} from '../../../../global-services/tech-api/tech-api.service';

@Component({
  selector: 'tech-radar-component',
  standalone: true,
  template: `
    <div #radarContainer class="radar-canvas"></div>
  `,
  styles: ``
})
export class TechRadarComponent implements OnInit {
  @ViewChild('radarContainer', { static: true }) container!: ElementRef;
  private readonly techApiService;
  private readonly positionService;

  public constructor(techApiService: TechApiService, positionService: TechRadarPositionService) {
    this.techApiService = techApiService;
    this.positionService = positionService;
  }

  ngOnInit() :void {
    this.techApiService.getTechnologies().subscribe(technologies => {
      this.drawRadar(technologies.filter(tech => tech.published));
    });
  }

  private drawRadar(technologies: TechnologyEntry[]) :void {
    const quadrantLabels :TechCategory[] = Object.values(TechCategory);
    const ringLabels :TechRing[] = Object.values(TechRing);
    const nrOfRings :number = ringLabels.length;
    const width :number = this.container.nativeElement.offsetWidth;
    const center :number = width / 2;
    const radiusMax :number = (width / 2) * 0.85;
    const ringWidth :number = radiusMax / nrOfRings;

    // SVG-Container
    const svg = d3.select(this.container.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', width);

    // Ringe mit Labels
    for (let i = 0; i < nrOfRings; i++) {
      const radius = (i + 1) * ringWidth;
      svg.append('circle')
        .attr('cx', center)
        .attr('cy', center)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1)
        .attr('opacity', 0.5);

      // Ring-Labels
      let rightLabel: boolean = i % 2 === 0;
      svg.append('text')
        .attr('x', center + (rightLabel ? 1 : -1) * (i * ringWidth + (rightLabel ? 2 : ringWidth - 2)))
        .attr('y', center - 5)
        .style('font-size', '12px')
        .style('fill', '#666')
        .text(TechRingLabels[ringLabels[i]]);
    }

    // Quadranten
    for (let i = 0; i < nrOfRings; i++) {
      const angle = (i * Math.PI) / 2;
      const x = center + radiusMax * Math.cos(angle);
      const y = center - radiusMax * Math.sin(angle);

      // Quadranten-Linien
      svg.append('line')
        .attr('x1', center)
        .attr('y1', center)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1);

      // Quadranten-Labels
      const labelDistance: number = radiusMax * 1.1;
      const labelAngle: number = angle + (Math.PI / ringLabels.length);
      const labelX: number = center + labelDistance * Math.cos(labelAngle);
      const labelY: number = center - labelDistance * Math.sin(labelAngle);
      const rotateDeg: number = -(labelAngle * 180 / Math.PI - 90);

      svg.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('transform', `rotate(${rotateDeg}, ${labelX}, ${labelY})`)
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .text(TechCategoryLabels[quadrantLabels[i]]);
    }

    // Technologiepunkte
    const nodes = svg.selectAll('.technologies')
      .data(technologies)
      .enter()
      .append('g')
      .attr('class', 'technologies')
      .attr('transform', (d: TechnologyEntry) => {
        const pos = this.positionService.getPointInSegment(d.category, d.ring, radiusMax);
        return `translate(${center + pos.x}, ${center - pos.y})`;
      });

    // Technologie-Kreis
    nodes.append('circle')
      .attr('r', 5)
      .attr('fill', 'var(--primary-color)');

    // Technologie-Text
    nodes.append('text')
      .text((d: TechnologyEntry) => d.name)
      .attr('dy', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px');
  }
}
