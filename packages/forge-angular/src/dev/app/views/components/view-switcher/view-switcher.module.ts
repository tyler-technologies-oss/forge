import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForgeButtonModule, ForgeTabBarModule, ForgeViewSwitcherModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ViewSwitcherComponent } from './view-switcher.component';

@NgModule({
  imports: [CommonModule, ForgeViewSwitcherModule, ForgeButtonModule, ForgeTabBarModule, DemoCardComponent, ViewSwitcherComponent]
})
export class ViewSwitcherModule {}
