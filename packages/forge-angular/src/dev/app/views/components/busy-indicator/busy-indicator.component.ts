import { Component } from '@angular/core';
import { ForgeBusyIndicatorModule, ForgeButtonModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss'],
  imports: [DemoCardComponent, ForgeBusyIndicatorModule, ForgeButtonModule]
})
export class BusyIndicatorComponent {
  public open = false;
}
