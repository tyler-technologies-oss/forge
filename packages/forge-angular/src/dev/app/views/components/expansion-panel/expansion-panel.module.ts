import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForgeButtonAreaModule, ForgeCardModule, ForgeExpansionPanelModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ExpansionPanelComponent } from './expansion-panel.component';

@NgModule({
  imports: [CommonModule, ForgeCardModule, ForgeExpansionPanelModule, ForgeButtonAreaModule, DemoCardComponent, ExpansionPanelComponent]
})
export class ExpansionPanelModule {}
