import { FormArray, FormControl } from '@angular/forms';

export interface userForm {
  username: FormControl<string | null>;
  lastname: FormControl<string | null>;
  age: FormControl<number | null>;
  email: FormControl<string | null>;
  address: FormControl<string | null>;
  phone: FormControl<number | null>;
  zipcode: FormControl<string | null>;
  terms: FormControl<boolean | null>;
  gender: FormControl<'male' | 'female' | 'other' | null>;
}

export interface toCreateInput {
  inputLabelName: FormControl<string | null>;
  inputName: FormControl<string | null>;
  inputType: FormControl<string | null>;
}
