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
    terms: new FormControl(null, Validators.requiredTrue),
    gender: new FormControl(null, Validators.required),
    customInput: new FormArray<FormControl<string | null>>([]),
    secondForm: new FormGroup({
      inputName: new FormControl(''),
    }),
  });

  ifSubmited: boolean = false;

  onSubmit() {
    if (this.userInfo.valid) {
      console.log(this.userInfo.value);
      this.userInfo.reset();
      this.userInfo.markAsUntouched();
      const customInputArray = this.userInfo.get('customInput') as FormArray;
      customInputArray.clear();
    } else {
      this.userInfo.markAllAsTouched();
      this.ifSubmited = true;
    }
  }

  resetForm() {
    this.userInfo.reset();
    this.userInfo.controls.customInput?.clear();
    this.userInfo.markAsUntouched();
    this.ifSubmited = false;
  }

  createCustomInput(value: string | null) {
    const customInputArray = this.userInfo.get('customInput') as FormArray;

    const control = new FormControl(value);
    customInputArray.push(control);

    console.log(this.userInfo.controls.customInput?.value);
  }

  createInput() {
    const value = this.userInfo.controls.secondForm.controls.inputName.value;
    if (!value) {
      return;
    }
    this.createCustomInput(value);
  }
}
