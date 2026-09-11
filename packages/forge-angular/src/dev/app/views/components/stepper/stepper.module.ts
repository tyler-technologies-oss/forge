import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgeButtonModule, ForgeCheckboxModule, ForgeSelectModule, ForgeSelectProxyModule, ForgeStepperModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { StepperComponent } from './stepper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgeButtonModule,
    ForgeCheckboxModule,
    ForgeSelectModule,
    ForgeSelectProxyModule,
    ForgeStepperModule,
    DemoCardComponent,
    StepperComponent
  ]
})
export class StepperModule {}
