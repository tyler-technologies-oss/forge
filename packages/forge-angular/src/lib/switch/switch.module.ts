import { NgModule } from '@angular/core';

import { SwitchValueAccessor } from './switch-value-accessor.directive';
import { ForgeSwitchProxyModule } from './switch-proxy.module';

@NgModule({
  declarations: [SwitchValueAccessor],
  exports: [SwitchValueAccessor, ForgeSwitchProxyModule]
})
export class ForgeSwitchModule {}
