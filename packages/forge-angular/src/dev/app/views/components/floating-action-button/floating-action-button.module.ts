import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defineFloatingActionButtonComponent } from '@tylertech/forge';
import { ForgeFloatingActionButtonModule, ForgeIconModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { FloatingActionButtonComponent } from './floating-action-button.component';

defineFloatingActionButtonComponent();

@NgModule({
  imports: [CommonModule, ForgeFloatingActionButtonModule, ForgeIconModule, DemoCardComponent, FloatingActionButtonComponent]
})
export class FloatingActionButtonModule {}
