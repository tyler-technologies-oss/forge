import { NgModule } from '@angular/core';

import { DateRangePickerValueAccessor } from './date-range-picker-value-accessor.directive';
import { ForgeDateRangePickerProxyModule } from './date-range-picker-proxy.module';

@NgModule({
  declarations: [DateRangePickerValueAccessor],
  exports: [DateRangePickerValueAccessor, ForgeDateRangePickerProxyModule]
})
export class ForgeDateRangePickerModule {}
