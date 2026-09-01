import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgePageStateModule, ForgeButtonModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-page-state',
  templateUrl: './page-state.component.html',
  imports: [DemoCardComponent, ForgePageStateModule, ForgeButtonModule]
})
export class PageStateComponent {}
