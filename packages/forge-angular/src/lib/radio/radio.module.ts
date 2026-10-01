import { NgModule } from '@angular/core';

import { RadioValueAccessor } from './radio-value-accessor.directive';
import { ForgeRadioProxyModule } from './radio-proxy.module';

@NgModule({
  declarations: [RadioValueAccessor],
  exports: [RadioValueAccessor, ForgeRadioProxyModule]
})
export class ForgeRadioModule {}
