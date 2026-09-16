import { NgModule } from '@angular/core';

import { ChipValueAccessor } from './chip-value-accessor.directive';
import { ForgeChipProxyModule } from './chip-proxy.module';

@NgModule({
  declarations: [ChipValueAccessor],
  exports: [ChipValueAccessor, ForgeChipProxyModule]
})
export class ForgeChipModule {}
