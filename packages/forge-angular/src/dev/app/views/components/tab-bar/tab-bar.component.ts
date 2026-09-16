import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeTabBarModule, ForgeTabPanelModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  imports: [DemoCardComponent, ForgeTabBarModule, ForgeTabPanelModule]
})
export class TabBarComponent {
  public selectedTab = 1;
}
