import { NgModule } from '@angular/core';

import { TimePickerValueAccessor } from './time-picker-value-accessor.directive';
import { ForgeTimePickerProxyModule } from './time-picker-proxy.module';

@NgModule({
  declarations: [TimePickerValueAccessor],
  exports: [TimePickerValueAccessor, ForgeTimePickerProxyModule]
})
export class ForgeTimePickerModule {}
