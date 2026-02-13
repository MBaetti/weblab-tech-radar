import {Component, signal, WritableSignal} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule, FormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {TechApiService} from '../../../global-services/tech-api/tech-api.service';
import {TechRing, TechCategory, TechCategoryLabels, TechRingLabels} from '../../../types/technology-entry';

@Component({
  selector: 'tech-form-component',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  template: `
    <form class="form" [formGroup]="technologyFormGroup" (ngSubmit)="submitTechnology(technologyFormGroup)">
      <mat-form-field class="form-field">
        <mat-label>Name</mat-label>
        <input type="text" matInput [formControl]="nameFormControl" [errorStateMatcher]="matcher">
        <mat-hint>Z.B. ArgoCD</mat-hint>
        @if (nameFormControl.hasError('required')) {
          <mat-error>Bitte gib einen Technologienamen an.</mat-error>
        }
      </mat-form-field>

      <p></p>

      <mat-form-field class="form-field">
        <mat-label>Kategorie</mat-label>
        <mat-select type="text" [formControl]="categoryFormControl" [errorStateMatcher]="matcher">
          @for (category of categories; track category) {
            <mat-option [value]="category">{{ getCategoryLabel(category) }}</mat-option>
          }
        </mat-select>
        @if (categoryFormControl.hasError('required')) {
          <mat-error>Bitte wähle eine Kategorie aus.</mat-error>
        }
      </mat-form-field>

      <p></p>

      <mat-form-field class="form-field">
        <mat-label>Ring</mat-label>
        <mat-select type="text" [formControl]="ringFormControl" [errorStateMatcher]="matcher">
          @for (ring of rings; track ring) {
            <mat-option [value]="ring">{{ getRingLabel(ring) }}</mat-option>
          }
        </mat-select>
        @if (ringFormControl.hasError('required')) {
          <mat-error>Bitte wähle einen Ring aus.</mat-error>
        }
      </mat-form-field>

      <p></p>

      <mat-form-field class="form-field">
        <mat-label>Beschreibung der Technologie</mat-label>
        <textarea type="text" matInput [formControl]="descriptionFormControl" [errorStateMatcher]="matcher"></textarea>
        <mat-hint>Z.B. Argo CD ist ein deklaratives GitOps-Tool für...</mat-hint>
        @if (descriptionFormControl.hasError('required')) {
          <mat-error>Bitte gib eine Beschreibung der Technologie an.</mat-error>
        }
      </mat-form-field>

      <p></p>

      <mat-form-field class="form-field">
        <mat-label>Einordnung der Technologie</mat-label>
        <textarea type="text" matInput [formControl]="classificationFormControl" [errorStateMatcher]="matcher"></textarea>
        <mat-hint>Z.B. Ohne die GitOps-Technik zu bewerten...</mat-hint>
        @if (classificationFormControl.hasError('required')) {
          <mat-error>Bitte gib deine Einordnung der Technologie an.</mat-error>
        }
      </mat-form-field>

      <p></p>

      <button mat-button type="submit" [disabled]="!technologyFormGroup.valid">Speichern</button>
      @if (submitError() !== '') {
        <div class="submit-error">{{ submitError() }}</div>
      }
    </form>
  `,
  styles: `
    .form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .form-field {
      width: 100%;
    }

    .submit-error {
      color: red;
    }
  `,
})
export class TechFromComponent {
  protected nameFormControl: FormControl = new FormControl('', [Validators.required]);
  protected categoryFormControl: FormControl = new FormControl('', [Validators.required]);
  protected readonly categories: TechCategory[] = Object.values(TechCategory);
  protected ringFormControl: FormControl = new FormControl('', [Validators.required]);
  protected readonly rings: TechRing[] = Object.values(TechRing);
  protected descriptionFormControl: FormControl = new FormControl('', [Validators.required]);
  protected classificationFormControl: FormControl = new FormControl('', [Validators.required]);
  protected submitError: WritableSignal<string> = signal('');

  constructor(private readonly techService: TechApiService) {}

  protected getCategoryLabel(category: TechCategory): string {
    return TechCategoryLabels[category];
  }

  protected getRingLabel(ring: TechRing): string {
    return TechRingLabels[ring];
  }

  technologyFormGroup: FormGroup = new FormGroup({
    name: this.nameFormControl,
    category: this.categoryFormControl,
    ring: this.ringFormControl,
    description: this.descriptionFormControl,
    classification: this.classificationFormControl,
  });

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  submitTechnology(technologyForm: FormGroup): void {
    if (this.technologyFormGroup.valid) {
      this.techService.createTechnology(technologyForm.value).subscribe({
        next: res => {
          this.submitError.set('');
          this.technologyFormGroup.reset();
          this.technologyFormGroup.markAsPristine();
          this.technologyFormGroup.markAsUntouched();
          console.log('Erfolgreich gespeichert.', res);
        },
        error: err => {
          this.submitError.set('Speichern fehlgeschlagen. Bitte erneut versuchen.');
          console.error('Technologie konnte nicht übermittelt werden!', err);
        },
      });
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form?.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
