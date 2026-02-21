import {Component, inject} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {TechnologyEntry, TechCategoryLabels, TechRingLabels} from '../../../types/technology-entry';
import {TechApiService} from '../../../global-services/tech-api/tech-api.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent, MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {TechCardDialogComponent} from './tech-card-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Component({
  selector: 'tech-cards-component',
  standalone: true,
  imports: [CommonModule, MatTableModule, DatePipe, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatButton, MatCardFooter],
  template: `
    <div class="tech-cards-container">
      @for (tech of (dataSource$ | async); track tech.id) {
        <mat-card class="tech-card" appearance="raised">
          <mat-card-header>
            <mat-card-title>{{ tech.name }}</mat-card-title>
            <mat-card-subtitle>{{ getCategoryLabel(tech.category) }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div>
              <strong>Ring: </strong>{{ getRingLabel(tech.ring) }}
            </div>
            <div>
              <strong>Beschreibung: </strong>
              <div>{{ tech.description }}</div>
            </div>
            <div>
              <strong>Einordnung: </strong>
              <div>{{ tech.classification }}</div>
            </div>
            <div>
              <strong>Erfassungsdatum: </strong>{{ tech.entryDate | date:'dd.MM.yyyy, HH:mm' }}
            </div>
            <div>
              <strong>Änderungsdatum: </strong>{{ tech.changeDate | date:'dd.MM.yyyy, HH:mm' }}
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button matButton="elevated" (click)="openDialog(tech)">Publizieren</button>
            <button matButton="elevated" (click)="deleteTechnology(tech)">Löschen</button>
          </mat-card-actions>
          @if (tech.published) {
            <mat-card-footer>
              <strong>Publikationsdatum: </strong>{{ tech.publicationDate | date:'dd.MM.yyyy, HH:mm' }}
            </mat-card-footer>
          }
        </mat-card>
      } @empty {
          <li>Es wurden noch keine Technologien erfasst.</li>
      }
    </div>
  `,
  styles: `
    .tech-cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }

    .tech-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex: 1;
    }

    mat-card-content > div {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    mat-card-footer {
      padding: 16px;
      background-color: rgba(0, 0, 0, 0.04);
    }

    mat-card-actions {
      display: flex;
      justify-content: space-between;
    }
  `,
})
export class TechCardsComponent {
  readonly techApiService: TechApiService;
  readonly dataSource$: Observable<TechnologyEntry[]>;
  private readonly dialog = inject(MatDialog);

  public constructor(techApiService: TechApiService) {
    this.techApiService = techApiService;
    this.dataSource$ = techApiService.technologies$
  }

  getCategoryLabel(category: string): string {
    return TechCategoryLabels[category as keyof typeof TechCategoryLabels] || category;
  }

  getRingLabel(ring: string): string {
    return TechRingLabels[ring as keyof typeof TechRingLabels] || ring;
  }

  openDialog(tech: TechnologyEntry): void {
    this.dialog.open(TechCardDialogComponent, {
      data: tech,
      width: '50%',
      height: '50%'
    });
  }

  deleteTechnology(tech: TechnologyEntry): void {
    this.techApiService.deleteTechnology(tech.id).subscribe();
  }
}
