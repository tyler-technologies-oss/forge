import { NgModule } from '@angular/core';

import { DatePickerValueAccessor } from './date-picker-value-accessor.directive';
import { ForgeDatePickerProxyModule } from './date-picker-proxy.module';

@NgModule({
  declarations: [DatePickerValueAccessor],
  exports: [DatePickerValueAccessor, ForgeDatePickerProxyModule]
})
export class ForgeDatePickerModule {}
