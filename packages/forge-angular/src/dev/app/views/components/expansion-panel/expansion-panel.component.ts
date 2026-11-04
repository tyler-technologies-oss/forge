import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeCardModule, ForgeExpansionPanelModule, ForgeButtonAreaModule, ForgeOpenIconModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-expansion-panel',
  styleUrls: ['./expansion-panel.component.scss'],
  templateUrl: './expansion-panel.component.html',
  imports: [DemoCardComponent, ForgeCardModule, ForgeExpansionPanelModule, ForgeButtonAreaModule, ForgeOpenIconModule]
})
export class ExpansionPanelComponent {
  public taskCardOneOpen = false;
  public taskCardTwoOpen = false;
  public taskCardThreeOpen = false;
}
