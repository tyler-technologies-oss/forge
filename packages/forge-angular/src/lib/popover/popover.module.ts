import { NgModule } from '@angular/core';

import { PopoverDirective } from './popover.directive';
import { ForgePopoverProxyModule } from './popover-proxy.module';

@NgModule({
  declarations: [PopoverDirective],
  exports: [PopoverDirective, ForgePopoverProxyModule]
})
export class ForgePopoverModule {}
