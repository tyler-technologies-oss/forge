import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { defineDatePickerComponent, defineLabelValueComponent } from '@tylertech/forge';
import {
  ForgeDatePickerModule,
  ForgeDatePickerProxyModule,
  ForgeDividerModule,
  ForgeLabelValueModule,
  ForgeOptionModule,
  ForgeSelectProxyModule,
  ForgeTextFieldModule
} from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { DatePickerComponent } from './date-picker.component';

defineDatePickerComponent();
defineLabelValueComponent();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgeDatePickerModule,
    ForgeDatePickerProxyModule,
    ForgeDividerModule,
    ForgeLabelValueModule,
    ForgeOptionModule,
    ForgeSelectProxyModule,
    ForgeTextFieldModule,
    DemoCardComponent,
    DatePickerComponent
  ]
})
export class DatePickerModule {}
