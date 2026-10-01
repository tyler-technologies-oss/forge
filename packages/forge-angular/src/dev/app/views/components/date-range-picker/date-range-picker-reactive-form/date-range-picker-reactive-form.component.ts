import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDatePickerRange } from '@tylertech/forge';
import { isDate } from '@tylertech/forge-core';
import {
  ForgeDateRangePickerProxyModule,
  ForgeDateRangePickerModule,
  ForgeTextFieldModule,
  ForgeButtonModule,
  ForgeLabelValueModule,
  ForgeTooltipModule,
  ForgeIconModule,
  ForgeSelectProxyModule,
  ForgeSelectModule,
  ForgeOptionModule,
  ForgeCheckboxProxyModule
} from '@tylertech/forge-angular';
import { JsonPipe } from '@angular/common';

interface DemoForm {
  dateRange: FormControl<IDatePickerRange>;
}

@Component({
  selector: 'app-date-range-picker-reactive-form',
  templateUrl: './date-range-picker-reactive-form.component.html',
  styleUrls: ['./date-range-picker-reactive-form.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ForgeDateRangePickerProxyModule,
    ForgeDateRangePickerModule,
    ForgeTextFieldModule,
    ForgeButtonModule,
    ForgeLabelValueModule,
    ForgeTooltipModule,
    ForgeIconModule,
    ForgeSelectProxyModule,
    ForgeSelectModule,
    ForgeOptionModule,
    ForgeCheckboxProxyModule,
    JsonPipe
  ]
})
export class DateRangePickerReactiveFormComponent implements OnInit {
  public demoForm: FormGroup<DemoForm>;
  public dateRangeControl: FormControl<IDatePickerRange>;
  public valueMode: 'object' | 'string' | 'iso-string' = 'object';
  public isDisabled = false;

  public ngOnInit(): void {
    const initDateRange: IDatePickerRange = {
      from: new Date(),
      to: this._getDateWithDayOffset(7)
    };

    this.demoForm = new FormGroup<DemoForm>({
      dateRange: new FormControl(initDateRange, { nonNullable: true, validators: [this._dateRangeIsSevenDaysValidator()] })
    });

    this.dateRangeControl = this.demoForm.controls.dateRange;
  }

  public onSubmit(): void {
    const formJson = JSON.stringify(this.demoForm.value);
    alert(`submitted form: ${formJson}`);
  }

  public disableForm($event: MouseEvent): void {
    const isDisabled = ($event.target as HTMLInputElement).checked;
    if (isDisabled) {
      this.demoForm.disable();
    } else {
      this.demoForm.enable();
    }
  }

  private _getDateWithDayOffset(dayOffset: number): Date {
    const date = new Date();
    return new Date(date.setDate(date.getDate() + dayOffset));
  }

  private _isSevenDays(from: string | Date, to: string | Date): boolean {
    if (!from || !to) {
      return false;
    }

    from = new Date(from);
    to = new Date(to);

    if (!isDate(from) || !isDate(to)) {
      return false;
    }

    const timeDiff = to.getTime() - from.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return dayDiff === 7;
  }

  private _dateRangeIsSevenDaysValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isSevenDays = this._isSevenDays(control.value.from, control.value.to);
      return isSevenDays ? null : { notSevenDays: { value: control.value } };
    };
  }
}
