import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgeButtonModule, ForgeCheckboxModule, ForgeSelectModule, ForgeSelectProxyModule } from '@tylertech/forge-angular';
import { ForgeSplitViewModule, ForgeSplitViewPanelModule } from 'projects/forge-angular/src/public-api';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgeButtonModule,
    ForgeCheckboxModule,
    ForgeSelectModule,
    ForgeSelectProxyModule,
    ForgeSplitViewModule,
    ForgeSplitViewPanelModule,
    DemoCardComponent
  ]
})
export class SplitViewModule {}
