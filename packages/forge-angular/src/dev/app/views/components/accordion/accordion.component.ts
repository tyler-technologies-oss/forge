import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeAccordionModule, ForgeExpansionPanelModule, ForgeButtonAreaModule, ForgeOpenIconModule, ForgeDividerModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  imports: [DemoCardComponent, ForgeAccordionModule, ForgeExpansionPanelModule, ForgeButtonAreaModule, ForgeOpenIconModule, ForgeDividerModule]
})
export class AccordionComponent {}
