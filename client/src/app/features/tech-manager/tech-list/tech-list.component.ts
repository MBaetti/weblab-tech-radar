import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {TechnologyEntry, TechCategoryLabels, TechRingLabels} from '../../../types/technology-entry';
import {TechApiService} from '../../../global-services/tech-api/tech-api.service';

@Component({
  selector: 'tech-list-component',
  standalone: true,
  imports: [CommonModule, MatTableModule, DatePipe],
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID</th>
        <td mat-cell *matCellDef="let element"> {{ element.id }}</td>
      </ng-container>

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name</th>
        <td mat-cell *matCellDef="let element"> {{ element.name }}</td>
      </ng-container>

      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef> Kategorie</th>
        <td mat-cell *matCellDef="let element"> {{ getCategoryLabel(element.category) }}</td>
      </ng-container>

      <ng-container matColumnDef="ring">
        <th mat-header-cell *matHeaderCellDef> Ring</th>
        <td mat-cell *matCellDef="let element"> {{ getRingLabel(element.ring) }}</td>
      </ng-container>

      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> Beschreibung</th>
        <td mat-cell *matCellDef="let element"> {{ element.description }}</td>
      </ng-container>

      <ng-container matColumnDef="classification">
        <th mat-header-cell *matHeaderCellDef> Klassifizierung</th>
        <td mat-cell *matCellDef="let element"> {{ element.classification }}</td>
      </ng-container>

      <ng-container matColumnDef="entryDate">
        <th mat-header-cell *matHeaderCellDef> Erfassungsdatum</th>
        <td mat-cell *matCellDef="let element"> {{ element.entryDate | date:'short' }}</td>
      </ng-container>

      <ng-container matColumnDef="changeDate">
        <th mat-header-cell *matHeaderCellDef> Änderungsdatum</th>
        <td mat-cell *matCellDef="let element"> {{ element.changeDate | date:'short' }}</td>
      </ng-container>

      <ng-container matColumnDef="published">
        <th mat-header-cell *matHeaderCellDef> Publiziert</th>
        <td mat-cell *matCellDef="let element"> {{ element.published }}</td>
      </ng-container>

      <ng-container matColumnDef="publicationDate">
        <th mat-header-cell *matHeaderCellDef> Publikationsdatum</th>
        <td mat-cell *matCellDef="let element"> {{ element.publicationDate | date:'short' }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: ``,
})
export class TechListComponent implements OnInit {
  private readonly techApiService;
  private readonly cdr: ChangeDetectorRef;
  displayedColumns: string[] = ['id', 'name', 'category', 'ring', 'description', 'classification', 'entryDate', 'changeDate', 'published', 'publicationDate'];
  dataSource: TechnologyEntry[] = [];

  public constructor(techApiService: TechApiService, cdr: ChangeDetectorRef) {
    this.techApiService = techApiService;
    this.cdr = cdr;
  }

  ngOnInit(): void {
    this.techApiService.getTechnologies().subscribe({
      next: (technologies) => {
        this.dataSource = technologies;
        this.cdr.markForCheck();
      }
    });
  }

  getCategoryLabel(category: string): string {
    return TechCategoryLabels[category as keyof typeof TechCategoryLabels] || category;
  }

  getRingLabel(ring: string): string {
    return TechRingLabels[ring as keyof typeof TechRingLabels] || ring;
  }
}
