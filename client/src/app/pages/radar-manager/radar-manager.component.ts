import { Component } from '@angular/core';
import {email} from 'zod';
import {FormComponent} from '../../features/user_management/smart_components/form/form.component';

@Component({
  selector: 'app-radar-manager',
  imports: [
    FormComponent

  ],
  template: `
    <management-form></management-form>
  `,
  styles: ``,
})
export class RadarManagerComponent {

  protected readonly email = email;
}
