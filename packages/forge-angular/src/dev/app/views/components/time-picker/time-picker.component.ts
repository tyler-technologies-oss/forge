import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { mergeDateWithTime } from '@tylertech/forge';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import {
  ForgeTimePickerProxyModule,
  ForgeTimePickerModule,
  ForgeTextFieldModule,
  ForgeDatePickerProxyModule,
  ForgeDatePickerModule
} from '@tylertech/forge-angular';

interface DemoForm {
  time: FormControl<string | null>;
  date: FormControl<Date | null>;
}

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  imports: [
    DemoCardComponent,
    ForgeTimePickerProxyModule,
    ForgeTimePickerModule,
    FormsModule,
    ForgeTextFieldModule,
    ReactiveFormsModule,
    ForgeDatePickerProxyModule,
    ForgeDatePickerModule
  ]
})
export class TimePickerComponent {
  public time = '23:40';
  public combinedDate: Date | null = new Date();
  public form: FormGroup<DemoForm>;

  constructor() {
    this.form = new FormGroup<DemoForm>({
      time: new FormControl('17:34:13', [Validators.required]),
      date: new FormControl(this.combinedDate, [Validators.required])
    });
    this.combinedDate = mergeDateWithTime(this.combinedDate as Date, this.timeControl.value, true);

    // An example of how to keep a backing model Date object in sync with a date picker and time picker using values from both
    this.timeControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      this.combinedDate = new Date(mergeDateWithTime(this.combinedDate as Date, value, true));
    });
    this.dateControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      this.combinedDate = value;
      if (this.timeControl.value) {
        this.combinedDate = new Date(mergeDateWithTime(this.combinedDate as Date, this.timeControl.value, true));
      }
    });
  }

  public get timeControl(): AbstractControl {
    return this.form.controls.time;
  }

  public get dateControl(): AbstractControl {
    return this.form.controls.date;
  }
}
