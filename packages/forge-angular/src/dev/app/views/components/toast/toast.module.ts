import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { defineToastComponent } from '@tylertech/forge';
import {
  ForgeButtonModule,
  ForgeCheckboxModule,
  ForgeSelectModule,
  ForgeSelectProxyModule,
  ForgeSliderProxyModule,
  ForgeTextFieldModule
} from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ToastComponent } from './toast.component';

defineToastComponent();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgeButtonModule,
    ForgeCheckboxModule,
    ForgeSelectModule,
    ForgeSelectProxyModule,
    ForgeSliderProxyModule,
    ForgeTextFieldModule,
    DemoCardComponent,
    ToastComponent
  ]
})
export class ToastModule {}
