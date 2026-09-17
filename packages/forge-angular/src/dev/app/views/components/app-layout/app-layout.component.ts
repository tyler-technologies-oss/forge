import { Component } from '@angular/core';
import { ForgeAppLayoutModule, ForgeListModule, ForgeListItemModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  imports: [DemoCardComponent, ForgeAppLayoutModule, ForgeListModule, ForgeListItemModule]
})
export class AppLayoutComponent {}
