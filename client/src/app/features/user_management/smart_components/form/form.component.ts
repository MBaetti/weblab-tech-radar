import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';

@Component({
  selector: 'management-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form">
      <mat-form-field>
        <mat-label>Name der Technologie</mat-label>
        <input
          matInput
          placeholder="ArgoCD"
          [formControl]="name"
          (blur)="updateErrorMessageName()"
          required
        />
        @if (name.invalid) {
          <mat-error>{{errorMessageName()}}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Kategorie</mat-label>
        <input
          matInput
          placeholder="Tools"
          [formControl]="category"
          (blur)="updateErrorMessageCategory()"
          required
        />
        @if (category.invalid) {
          <mat-error>{{errorMessageCategory()}}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Ring</mat-label>
        <input
          matInput
          placeholder="Trial"
          [formControl]="ring"
          (blur)="updateErrorMessageRing()"
          required
        />
        @if (ring.invalid) {
          <mat-error>{{errorMessageRing()}}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Description</mat-label>
        <input
          matInput
          placeholder="Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes."
          [formControl]="ring"
          (blur)="updateErrorMessageDescription()"
          required
        />
        @if (ring.invalid) {
          <mat-error>{{errorMessageDescription()}}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Classification</mat-label>
        <input
          matInput
          placeholder="Without making a judgment of the GitOps technique, we’d like to talk about Argo CD within the scope of deploying and monitoring applications in Kubernetes environments. Based on its ability to automate the deployment of the desired application state in the specified target environments in Kubernetes and our good experience with troubleshooting failed deployments, verifying logs and monitoring deployment status, we recommend you give Argo CD a try. You can even see graphically what is going on in the cluster, how a change is propagated and how pods are created and destroyed in real time."
          [formControl]="ring"
          (blur)="updateErrorMessageClassification()"
          required
        />
        @if (ring.invalid) {
          <mat-error>{{errorMessageClassification()}}</mat-error>
        }
      </mat-form-field>
    </div>
  `,
  styles: ``,
})
export class FormComponent {
  readonly name = new FormControl('', [Validators.required]);
  readonly category = new FormControl('', [Validators.required]);
  readonly ring = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  readonly classification = new FormControl('', [Validators.required]);

  errorMessageName = signal('');
  errorMessageCategory = signal('');
  errorMessageRing = signal('');
  errorMessageDescription = signal('');
  errorMessageClassification = signal('');

  constructor() {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageName());
    merge(this.category.statusChanges, this.category.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageCategory());
    merge(this.ring.statusChanges, this.ring.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageCategory());
    merge(this.ring.valueChanges, this.ring.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageDescription());
    merge(this.ring.valueChanges, this.ring.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageClassification());
  }

  updateErrorMessageName() {
    if (this.name.hasError('required')) {
      this.errorMessageName.set('Das Feld darf nicht leer sein.');
    } else {
      this.errorMessageName.set('');
    }
  }

  updateErrorMessageCategory() {
    if (this.category.hasError('required')) {
      this.errorMessageCategory.set('Das Feld darf nicht leer sein.');
    } else {
      this.errorMessageCategory.set('');
    }
  }

  updateErrorMessageRing() {
    if (this.ring.hasError('required')) {
      this.errorMessageRing.set('Das Feld darf nicht leer sein.');
    } else {
      this.errorMessageRing.set('');
    }
  }

  updateErrorMessageDescription() {
    if (this.description.hasError('required')) {
      this.errorMessageDescription.set('Das Feld darf nicht leer sein.');
    } else {
      this.errorMessageDescription.set('');
    }
  }

  updateErrorMessageClassification() {
    if (this.classification.hasError('required')) {
      this.errorMessageClassification.set('Das Feld darf nicht leer sein.');
    } else {
      this.errorMessageClassification.set('');
    }
  }
}
