import { NgModule } from '@angular/core';

import { SelectValueAccessor } from './select-value-accessor.directive';
import { ForgeSelectProxyModule } from './select-proxy.module';

@NgModule({
  declarations: [SelectValueAccessor],
  exports: [SelectValueAccessor, ForgeSelectProxyModule]
})
export class ForgeSelectModule {}
