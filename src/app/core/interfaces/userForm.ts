import { FormArray, FormControl, FormGroup } from '@angular/forms';

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
  customInput?: FormArray<FormControl<string | null>>;
  secondForm: FormGroup<second>;
}

export interface toCreateInput {
  inputLabelName: FormControl<string | null>;
  inputName: FormControl<string | null>;
  inputType: FormControl<string | null>;
}

interface second {
  inputName: FormControl<string | null>;
}
