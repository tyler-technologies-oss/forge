import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconRegistry } from '@tylertech/forge';
import { ForgeIconModule, ForgeTextFieldModule } from '@tylertech/forge-angular';
import { tylIconEvent } from '@tylertech/tyler-icons/standard';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { TextFieldComponent } from './text-field.component';

@NgModule({
  imports: [CommonModule, FormsModule, ForgeTextFieldModule, ForgeIconModule, DemoCardComponent, TextFieldComponent]
})
export class TextFieldModule {
  constructor() {
    IconRegistry.define(tylIconEvent);
  }
}
