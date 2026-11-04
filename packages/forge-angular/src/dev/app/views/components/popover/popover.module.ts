import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgeButtonModule, ForgePopoverModule, ForgePopoverProxyModule, ForgeTextFieldModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { PopoverComponent } from './popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgeButtonModule,
    ForgePopoverModule,
    ForgePopoverProxyModule,
    ForgeTextFieldModule,
    DemoCardComponent,
    PopoverComponent
  ]
})
export class PopoverModule {}
