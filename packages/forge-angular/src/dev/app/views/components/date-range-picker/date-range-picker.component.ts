import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { DateRangePickerSimpleComponent } from './date-range-picker-simple/date-range-picker-simple.component';
import { ForgeDividerModule } from '@tylertech/forge-angular';
import { DateRangePickerReactiveFormComponent } from './date-range-picker-reactive-form/date-range-picker-reactive-form.component';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  imports: [DemoCardComponent, DateRangePickerSimpleComponent, ForgeDividerModule, DateRangePickerReactiveFormComponent]
})
export class DateRangePickerComponent {}
