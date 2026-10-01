import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgeChipProxyModule, ForgeChipSetModule, ForgeIconButtonModule, ForgeIconModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ChipsComponent } from './chips.component';

@NgModule({
  imports: [CommonModule, ForgeChipProxyModule, ForgeChipSetModule, ForgeIconButtonModule, ForgeIconModule, DemoCardComponent, ChipsComponent]
})
export class ChipsModule {}
