import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconRegistry } from '@tylertech/forge';
import {
  ForgeButtonModule,
  ForgeCheckboxModule,
  ForgeDateRangePickerModule,
  ForgeDateRangePickerProxyModule,
  ForgeDividerModule,
  ForgeIconModule,
  ForgeLabelValueModule,
  ForgeOptionModule,
  ForgeSelectModule,
  ForgeSelectProxyModule,
  ForgeTextFieldModule,
  ForgeTooltipModule
} from '@tylertech/forge-angular';
import { tylIconInfoOutline } from '@tylertech/tyler-icons/standard';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { DateRangePickerReactiveFormComponent } from './date-range-picker-reactive-form/date-range-picker-reactive-form.component';
import { DateRangePickerSimpleComponent } from './date-range-picker-simple/date-range-picker-simple.component';
import { DateRangePickerComponent } from './date-range-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ForgeButtonModule,
    ForgeCheckboxModule,
    ForgeDateRangePickerModule,
    ForgeDateRangePickerProxyModule,
    ForgeDividerModule,
    ForgeLabelValueModule,
    ForgeOptionModule,
    ForgeSelectModule,
    ForgeSelectProxyModule,
    ForgeTextFieldModule,
    ForgeTooltipModule,
    ForgeIconModule,
    DemoCardComponent,
    DateRangePickerComponent,
    DateRangePickerSimpleComponent,
    DateRangePickerReactiveFormComponent
  ]
})
export class DateRangePickerModule {
  constructor() {
    IconRegistry.define(tylIconInfoOutline);
  }
}
