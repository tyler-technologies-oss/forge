import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgeButtonModule, ForgeMenuModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [CommonModule, ForgeButtonModule, ForgeMenuModule, DemoCardComponent, MenuComponent]
})
export class MenuModule {}
