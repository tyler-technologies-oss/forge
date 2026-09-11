import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAutocompleteComponent, IOption } from '@tylertech/forge';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import {
  ForgeTextFieldModule,
  ForgeSwitchProxyModule,
  ForgeSwitchModule,
  ForgeDatePickerProxyModule,
  ForgeDatePickerModule,
  ForgeTimePickerProxyModule,
  ForgeTimePickerModule,
  ForgeRadioGroupModule,
  ForgeRadioProxyModule,
  ForgeRadioModule,
  ForgeAutocompleteProxyModule,
  ForgeAutocompleteModule,
  ForgeSelectProxyModule,
  ForgeSelectModule,
  ForgeOptionModule,
  ForgeSliderProxyModule,
  ForgeSliderModule,
  ForgeChipSetModule,
  ForgeChipProxyModule,
  ForgeChipModule,
  ForgeCheckboxProxyModule,
  ForgeCheckboxModule,
  ForgeButtonModule
} from '@tylertech/forge-angular';
import { JsonPipe } from '@angular/common';

interface DemoForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  send: FormControl<boolean>;
  dob: FormControl<Date | null>;
  tob: FormControl<Date | null>;
  gender: FormControl<'male' | 'female'>;
  state: FormControl<string | null>;
  country: FormControl<string>;
  favoriteNumber: FormControl<number>;
  shirtSize: FormControl<'xs' | 's' | 'm' | 'l' | 'xl'>;
  shirtQuantity: FormControl<number>;
  agree: FormControl<boolean>;
}

@Component({
  selector: 'app-form',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.scss'],
  imports: [
    DemoCardComponent,
    FormsModule,
    ReactiveFormsModule,
    ForgeTextFieldModule,
    ForgeSwitchProxyModule,
    ForgeSwitchModule,
    ForgeDatePickerProxyModule,
    ForgeDatePickerModule,
    ForgeTimePickerProxyModule,
    ForgeTimePickerModule,
    ForgeRadioGroupModule,
    ForgeRadioProxyModule,
    ForgeRadioModule,
    ForgeAutocompleteProxyModule,
    ForgeAutocompleteModule,
    ForgeSelectProxyModule,
    ForgeSelectModule,
    ForgeOptionModule,
    ForgeSliderProxyModule,
    ForgeSliderModule,
    ForgeChipSetModule,
    ForgeChipProxyModule,
    ForgeChipModule,
    ForgeCheckboxProxyModule,
    ForgeCheckboxModule,
    ForgeButtonModule,
    JsonPipe
  ]
})
export class ReactiveFormExampleComponent implements OnInit {
  public readonly stateAutocomplete = viewChild('stateAutocomplete', { read: ElementRef });

  public exampleForm: FormGroup<DemoForm>;
  public shirtQuantityControl: FormControl<number>;

  constructor() {
    this.exampleForm = new FormGroup<DemoForm>({
      firstName: new FormControl('', { nonNullable: true, validators: Validators.required }),
      lastName: new FormControl('', { nonNullable: true, validators: Validators.required }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      send: new FormControl(true, { nonNullable: true }),
      dob: new FormControl(null, Validators.required),
      tob: new FormControl(null, Validators.required),
      gender: new FormControl('male', { nonNullable: true, validators: Validators.required }),
      state: new FormControl(null, Validators.required),
      country: new FormControl('', { nonNullable: true, validators: Validators.required }),
      favoriteNumber: new FormControl(0, { nonNullable: true, validators: Validators.required }),
      shirtSize: new FormControl('m', { nonNullable: true, validators: Validators.required }),
      shirtQuantity: new FormControl(1, { nonNullable: true, validators: Validators.min(1) }),
      agree: new FormControl(false, { nonNullable: true, validators: Validators.required })
    });

    this.shirtQuantityControl = this.exampleForm.controls.shirtQuantity;
  }

  public ngOnInit(): void {
    const stateAutocompleteRef = this.stateAutocomplete();
    if (stateAutocompleteRef) {
      (stateAutocompleteRef.nativeElement as IAutocompleteComponent).filter = filter => this._onFilterStates(filter);
    }
  }

  private _onFilterStates(filter: string): IOption[] {
    return this.states.filter(state => state.label.toLowerCase().includes(filter.toLowerCase()));
  }

  public get shirtSize(): FormControl<'xs' | 's' | 'm' | 'l' | 'xl'> {
    return this.exampleForm.controls.shirtSize;
  }

  public get favoriteNumber(): FormControl<number> {
    return this.exampleForm.controls.favoriteNumber;
  }

  public onSubmit(): void {
    if (this.exampleForm.invalid) {
      return;
    }
    console.log(this.exampleForm.value);
  }

  public onReset(): void {
    this.exampleForm.reset();
  }

  public states: IOption<string>[] = [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' }
  ];

  public listItems = [
    {
      label: 'List Item One',
      value: 1
    },
    {
      label: 'List Item Two',
      value: 2
    },
    {
      label: 'List Item Three',
      value: 3
    },
    {
      label: 'List Item Four',
      value: 4
    }
  ];

  public isInvalid(name: string): boolean {
    const control = this.exampleForm.get(name);
    return !!control && control.touched && control.invalid;
  }
}
