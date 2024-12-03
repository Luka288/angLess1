import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { toCreateInput, userForm } from '../core/interfaces/userForm';
import { InputGenComponent } from '../input-gen/input-gen.component';

@Component({
  selector: 'app-lesson2',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, InputGenComponent],
  templateUrl: './lesson2.component.html',
  styleUrl: './lesson2.component.scss',
})
export class Lesson2Component {
  userInfo = new FormGroup<userForm>({
    username: new FormControl(''),
    lastname: new FormControl(''),
    age: new FormControl(null),
    email: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(null),
    zipcode: new FormControl(''),
    terms: new FormControl(false),
    gender: new FormControl(null),
  });

  resetForm() {
    this.userInfo.reset();
  }

  checkValues() {
    console.log(this.userInfo.value);
  }

  createCustomInput() {}
}
