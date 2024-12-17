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
import { debounceTime, tap } from 'rxjs';

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
      Validators.pattern(/^[A-Za-z]+([ '-][A-Za-z]+)*$/),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern(/^[A-Za-z]+([ '-][A-Za-z]+)*$/),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(18),
      Validators.max(100),
    ]),
    studyPlace: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    workPlace: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ]),

    zipcode: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
      Validators.pattern(/^\d{4,10}$/),
    ]),
    terms: new FormControl(null, Validators.requiredTrue),
    gender: new FormControl(null, Validators.required),
    customInput: new FormArray<FormControl<string | null>>([]),
    secondForm: new FormGroup({
      inputName: new FormControl(''),
    }),
  });

  ifSubmited: boolean = false;

  constructor() {
    this.userInfo.controls.email.statusChanges
      .pipe(debounceTime(300))
      .subscribe((res) => {
        if (res === 'VALID') {
          this.userInfo.controls.phone.disable();
          this.userInfo.controls.phone.setValidators([]);
        } else {
          this.userInfo.controls.phone.enable();
          this.userInfo.controls.phone.addValidators([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(15),
          ]);
        }
        this.userInfo.controls.phone.updateValueAndValidity();
      });

    this.userInfo.controls.phone.statusChanges
      .pipe(debounceTime(300))
      .subscribe((res) => {
        if (res === 'VALID') {
          this.userInfo.controls.email.disable();
          this.userInfo.controls.email.setValidators([]);
        } else {
          this.userInfo.controls.email.enable();
          this.userInfo.controls.email.addValidators([
            Validators.required,
            Validators.email,
          ]);
        }
        this.userInfo.controls.phone.updateValueAndValidity();
      });

    this.userInfo.controls.studyPlace.valueChanges
      .pipe(debounceTime(300))
      .subscribe((res) => {
        if (res) {
          this.userInfo.controls.studyPlace.addValidators([
            Validators.required,
            Validators.minLength(4),
          ]);
          this.userInfo.controls.workPlace.setValidators([]);
        } else {
          this.userInfo.controls.workPlace.addValidators([
            Validators.required,
            Validators.minLength(4),
          ]);
        }
        this.userInfo.controls.workPlace.updateValueAndValidity();
      });

    this.userInfo.controls.workPlace.valueChanges
      .pipe(debounceTime(300))
      .subscribe((res) => {
        if (res) {
          this.userInfo.controls.studyPlace.setValidators([]);
        } else {
          this.userInfo.controls.studyPlace.addValidators([
            Validators.required,
            Validators.minLength(4),
          ]);
        }
        this.userInfo.controls.studyPlace.updateValueAndValidity();
      });
  }

  onSubmit() {
    if (this.userInfo.valid) {
      alert('form submitted');
      console.log(this.userInfo.value);
      this.userInfo.reset();
      this.userInfo.markAsUntouched();
      const customInputArray = this.userInfo.get('customInput') as FormArray;
      customInputArray.clear();
    } else {
      this.userInfo.markAllAsTouched();
      this.ifSubmited = true;
      console.log(this.userInfo.invalid);
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
