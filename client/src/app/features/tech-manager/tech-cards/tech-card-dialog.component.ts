import {Component, inject, signal, WritableSignal} from '@angular/core';
import {
  TechnologyEntry,
  TechRingLabels,
  TechRing
} from '../../../types/technology-entry';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {TechApiService} from '../../../global-services/tech-api/tech-api.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'tech-card-dialog-component',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    CdkTextareaAutosize
  ],
  template: `
    <h2 mat-dialog-title>{{ data.name }}</h2>
    <mat-dialog-content>
      <form id="techDialog" class="form" [formGroup]="technologyDialogFormGroup" #formDirective="ngForm" (ngSubmit)="publishTechnology(technologyDialogFormGroup, formDirective)">
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
        <mat-form-field class="form-field">
          <mat-label>Einordnung der Technologie</mat-label>
          <textarea type="text" matInput [formControl]="classificationFormControl" cdkTextareaAutosize></textarea>
          <mat-hint>Z.B. Ohne die GitOps-Technik zu bewerten...</mat-hint>
          @if (classificationFormControl.hasError('required')) {
            <mat-error>Bitte begründe deine Einordnung.</mat-error>
          }
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="false" cdkFocusInitial>Abbrechen</button>
      <button mat-button type="submit" form="techDialog" [disabled]="!technologyDialogFormGroup.valid">Technologie publizieren</button>
      @if (submitError() !== '') {
        <div class="submit-error">{{ submitError() }}</div>
      }
    </mat-dialog-actions>
  `,
  styles: `
    .form {
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
export class TechCardDialogComponent {
  readonly data: TechnologyEntry = inject<TechnologyEntry>(MAT_DIALOG_DATA);
  protected matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  protected ringFormControl: FormControl = new FormControl('', [Validators.required]);
  protected readonly rings: TechRing[] = Object.values(TechRing);
  protected classificationFormControl: FormControl = new FormControl('', [Validators.required]);
  protected technologyDialogFormGroup: FormGroup = new FormGroup({
    ring: this.ringFormControl,
    classification: this.classificationFormControl,
  });
  protected submitError: WritableSignal<string> = signal('');

  constructor(private readonly techService: TechApiService) {
    this.ringFormControl.setValue(this.data.ring);
    this.classificationFormControl.setValue(this.data.classification);
  }

  getRingLabel(ring: string): string {
    return TechRingLabels[ring as keyof typeof TechRingLabels] || ring;
  }

  publishTechnology(technologyDialogFormGroup: FormGroup, formDirective: FormGroupDirective): void {
    if (this.technologyDialogFormGroup.valid) {
      this.techService.updateTechnology(this.data.id, {...technologyDialogFormGroup.value, published: true}).subscribe({
        next: (res: TechnologyEntry) => {
          this.submitError.set('');
          this.technologyDialogFormGroup.reset();
          formDirective.resetForm();
          console.log('Erfolgreich publiziert.', res);
        },
        error: (err: unknown) => {
          this.submitError.set('Publizieren fehlgeschlagen. Bitte erneut versuchen.');
          console.error('Technologie konnte nicht publiziert werden!', err);
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
