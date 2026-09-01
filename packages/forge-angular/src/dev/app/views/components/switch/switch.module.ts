import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgeButtonModule, ForgeSwitchModule, ForgeSwitchProxyModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { SwitchComponent } from './switch.component';

@NgModule({
  imports: [CommonModule, FormsModule, ForgeButtonModule, ForgeSwitchModule, ForgeSwitchProxyModule, DemoCardComponent, SwitchComponent]
})
export class SwitchModule {}
