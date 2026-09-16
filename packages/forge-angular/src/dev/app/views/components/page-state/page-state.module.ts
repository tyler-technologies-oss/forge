import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgeButtonModule, ForgePageStateModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { PageStateComponent } from './page-state.component';

@NgModule({
  imports: [CommonModule, ForgeButtonModule, ForgePageStateModule, DemoCardComponent, PageStateComponent]
})
export class PageStateModule {}
