import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ForgeDatePickerModule,
  ForgeDatePickerProxyModule,
  ForgeTextFieldModule,
  ForgeTimePickerModule,
  ForgeTimePickerProxyModule
} from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { TimePickerComponent } from './time-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ForgeDatePickerModule,
    ForgeDatePickerProxyModule,
    ForgeTextFieldModule,
    ForgeTimePickerModule,
    ForgeTimePickerProxyModule,
    DemoCardComponent,
    TimePickerComponent
  ]
})
export class TimePickerModule {}
