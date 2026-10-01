import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defineIconButtonComponent } from '@tylertech/forge';
import { ForgeButtonModule, ForgeIconButtonModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { IconButtonComponent } from './icon-button.component';

defineIconButtonComponent();

@NgModule({
  imports: [CommonModule, ForgeButtonModule, ForgeIconButtonModule, DemoCardComponent, IconButtonComponent]
})
export class IconButtonModule {}
