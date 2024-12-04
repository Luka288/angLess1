import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { userForm } from '../core/interfaces/userForm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson2',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './lesson2.component.html',
  styleUrl: './lesson2.component.scss',
})
export class Lesson2Component {
  userInfo = new FormGroup<userForm>({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(10),
      Validators.max(100),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    phone: new FormControl(null, Validators.required),
    zipcode: new FormControl('', Validators.required),
    terms: new FormControl(false, Validators.requiredTrue),
    gender: new FormControl(null, Validators.required),
    customInput: new FormArray<FormControl<string | null>>([]),
    secondForm: new FormGroup({
      inputName: new FormControl(''),
    }),
  });

  onSubmit() {
    if (this.userInfo.valid) {
      console.log(this.userInfo.value);
      this.userInfo.reset();
    } else {
      console.log('form not valid');
    }
  }

  resetForm() {
    this.userInfo.reset();
  }

  createCustomInput(value: string | null) {
    const customInputArray = this.userInfo.get('customInput') as FormArray;

    const control = new FormControl(value);
    customInputArray.push(control);

    console.log(this.userInfo.controls.customInput?.value);
  }

  createInput() {
    const value = this.userInfo.controls.secondForm.controls.inputName.value;
    this.createCustomInput(value);
  }
}
