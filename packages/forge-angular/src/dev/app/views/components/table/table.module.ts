import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconRegistry } from '@tylertech/forge';
import { ForgeCheckboxModule, ForgeIconButtonModule, ForgeIconModule, ForgeMenuModule, ForgePaginatorModule, ForgeTableModule } from '@tylertech/forge-angular';
import { tylIconMoreVert } from '@tylertech/tyler-icons/standard';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { TableCellMenuComponent } from './table-cell-menu.component';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    CommonModule,
    ForgeTableModule,
    ForgeCheckboxModule,
    ForgeIconButtonModule,
    ForgeIconModule,
    ForgeMenuModule,
    ForgePaginatorModule,
    DemoCardComponent,
    TableComponent,
    TableCellMenuComponent
  ]
})
export class TableModule {
  constructor() {
    IconRegistry.define(tylIconMoreVert);
  }
}
