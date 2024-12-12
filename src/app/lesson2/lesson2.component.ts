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
import { debounce, debounceTime, filter, tap } from 'rxjs';

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
    studyPlace: new FormControl('', [Validators.required]),
    workPlace: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    zipcode: new FormControl('', Validators.required),
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
          this.userInfo.controls.phone.removeValidators;
        } else {
          this.userInfo.controls.phone.enable();
          this.userInfo.controls.phone.addValidators([
            Validators.required,
            Validators.minLength(4),
          ]);
        }
      });

    this.userInfo.controls.phone.statusChanges
      .pipe(debounceTime(300))
      .subscribe((res) => {
        if (res === 'VALID') {
          this.userInfo.controls.email.disable();
          this.userInfo.controls.email.removeValidators;
        } else {
          this.userInfo.controls.email.enable();
          this.userInfo.controls.email.addValidators([
            Validators.required,
            Validators.email,
          ]);
        }
      });

    this.userInfo.controls.studyPlace.valueChanges
      .pipe(
        tap((res) => {
          if (res) {
            this.userInfo.controls.studyPlace.addValidators([
              Validators.required,
              Validators.minLength(10),
            ]);

            this.userInfo.controls.workPlace.removeValidators([
              Validators.required,
            ]);
          } else {
            this.userInfo.controls.workPlace.addValidators([
              Validators.required,
              Validators.minLength(10),
            ]);
          }
        })
      )
      .subscribe((res) => {});

    this.userInfo.controls.workPlace.valueChanges.pipe(
      tap((res) => {
        if (res) {
          this.userInfo.controls.studyPlace.removeValidators([
            Validators.required,
          ]);
        } else {
          this.userInfo.controls.studyPlace.addValidators([
            Validators.required,
            Validators.minLength(10),
          ]);
        }
      })
    );
  }

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
