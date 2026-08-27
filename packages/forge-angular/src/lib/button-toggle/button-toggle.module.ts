import { NgModule } from '@angular/core';

import { ButtonToggleGroupValueAccessor } from './button-toggle-group-value-accessor.directive';
import { ForgeButtonToggleProxyModule } from './button-toggle-proxy.module';

@NgModule({
  declarations: [ButtonToggleGroupValueAccessor],
  exports: [ButtonToggleGroupValueAccessor, ForgeButtonToggleProxyModule]
})
export class ForgeButtonToggleModule {}
