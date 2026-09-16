import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgeOptionModule, ForgeSelectModule, ForgeSelectProxyModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [CommonModule, FormsModule, ForgeOptionModule, ForgeSelectModule, ForgeSelectProxyModule, DemoCardComponent, SelectComponent]
})
export class SelectModule {}
