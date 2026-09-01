import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgeButtonModule, ForgeCheckboxModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { CheckboxComponent } from './checkbox.component';
@NgModule({
  imports: [CommonModule, FormsModule, ForgeButtonModule, ForgeCheckboxModule, DemoCardComponent, CheckboxComponent]
})
export class CheckboxModule {}
