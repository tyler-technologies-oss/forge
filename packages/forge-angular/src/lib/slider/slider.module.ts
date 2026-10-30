import { NgModule } from '@angular/core';

import { SliderValueAccessor } from './slider-value-accessor.directive';
import { ForgeSliderProxyModule } from './slider-proxy.module';

@NgModule({
  declarations: [SliderValueAccessor],
  exports: [SliderValueAccessor, ForgeSliderProxyModule]
})
export class ForgeSliderModule {}
