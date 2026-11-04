import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { defineAvatarComponent } from '@tylertech/forge';
import {
  ForgeButtonModule,
  ForgeCheckboxModule,
  ForgeSelectModule,
  ForgeSelectProxyModule,
  ForgeTextFieldModule,
  ForgeTooltipModule
} from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { TooltipComponent } from './tooltip.component';

defineAvatarComponent();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgeTooltipModule,
    ForgeButtonModule,
    ForgeCheckboxModule,
    ForgeSelectModule,
    ForgeSelectProxyModule,
    ForgeTextFieldModule,
    DemoCardComponent,
    TooltipComponent
  ]
})
export class TooltipModule {}
