import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';

import { ForgeListItemModule, ForgeListModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@NgModule({
  imports: [CommonModule, ForgeListModule, ForgeListItemModule, DemoCardComponent, ListComponent]
})
export class ListModule {}
