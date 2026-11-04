import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgeButtonModule, ForgeIconModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule, ForgeButtonModule, ForgeIconModule, DemoCardComponent, ButtonComponent]
})
export class ButtonModule {}
