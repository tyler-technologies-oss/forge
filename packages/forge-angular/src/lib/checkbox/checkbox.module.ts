import { NgModule } from '@angular/core';

import { CheckboxValueAccessor } from './checkbox-value-accessor.directive';
import { ForgeCheckboxProxyModule } from './checkbox-proxy.module';

@NgModule({
  declarations: [CheckboxValueAccessor],
  exports: [CheckboxValueAccessor, ForgeCheckboxProxyModule]
})
export class ForgeCheckboxModule {}
