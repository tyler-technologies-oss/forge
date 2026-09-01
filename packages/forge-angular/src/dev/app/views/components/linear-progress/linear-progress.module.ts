import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgeCheckboxModule, ForgeLinearProgressModule, ForgeSliderProxyModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { LinearProgressComponent } from './linear-progress.component';

@NgModule({
  imports: [CommonModule, FormsModule, ForgeCheckboxModule, ForgeLinearProgressModule, ForgeSliderProxyModule, DemoCardComponent, LinearProgressComponent]
})
export class LinearProgressModule {}
