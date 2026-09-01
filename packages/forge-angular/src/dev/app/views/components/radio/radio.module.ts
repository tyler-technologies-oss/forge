import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgeRadioModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { RadioComponent } from './radio.component';

@NgModule({
  imports: [CommonModule, FormsModule, ForgeRadioModule, DemoCardComponent, RadioComponent]
})
export class RadioModule {}
