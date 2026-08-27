import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForgeAccordionModule, ForgeButtonAreaModule, ForgeDividerModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { AccordionComponent } from './accordion.component';

@NgModule({
  imports: [CommonModule, ForgeAccordionModule, ForgeButtonAreaModule, ForgeDividerModule, DemoCardComponent, AccordionComponent]
})
export class AccordionModule {}
