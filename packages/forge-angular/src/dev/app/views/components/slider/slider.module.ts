import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgeSliderModule, ForgeSliderProxyModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { SliderComponent } from './slider.component';

@NgModule({
  imports: [CommonModule, FormsModule, ForgeSliderModule, ForgeSliderProxyModule, DemoCardComponent, SliderComponent]
})
export class SliderModule {}
