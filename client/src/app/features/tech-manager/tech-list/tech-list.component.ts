import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Tech } from '../../../types/tech';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'tech-list-component',
  imports: [MatTableModule, DatePipe],
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
      </ng-container>

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>

      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef> Kategorie </th>
        <td mat-cell *matCellDef="let element"> {{element.category}} </td>
      </ng-container>

      <ng-container matColumnDef="ring">
        <th mat-header-cell *matHeaderCellDef> Ring </th>
        <td mat-cell *matCellDef="let element"> {{element.ring}} </td>
      </ng-container>

      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> Beschreibung </th>
        <td mat-cell *matCellDef="let element"> {{element.description}} </td>
      </ng-container>

      <ng-container matColumnDef="classification">
        <th mat-header-cell *matHeaderCellDef> Klassifizierung </th>
        <td mat-cell *matCellDef="let element"> {{element.classification}} </td>
      </ng-container>

      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef> Datum </th>
        <td mat-cell *matCellDef="let element"> {{element.date | date:'short'}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: ``,
})
export class TechListComponent {
  displayedColumns: string[] = ['id', 'name', 'category', 'ring', 'description', 'classification', 'date'];
  dataSource: Tech[] = [];
}
