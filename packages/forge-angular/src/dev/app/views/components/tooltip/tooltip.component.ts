import { Component } from '@angular/core';
import { TOOLTIP_CONSTANTS } from '@tylertech/forge';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import {
  ForgeButtonModule,
  ForgeTooltipModule,
  ForgeTextFieldModule,
  ForgeSelectProxyModule,
  ForgeSelectModule,
  ForgeOptionModule
} from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  imports: [
    DemoCardComponent,
    ForgeButtonModule,
    ForgeTooltipModule,
    ForgeTextFieldModule,
    FormsModule,
    ForgeSelectProxyModule,
    ForgeSelectModule,
    ForgeOptionModule
  ]
})
export class TooltipComponent {
  public text = `Hey I'm a useful tooltip!`;
  public delay = TOOLTIP_CONSTANTS.defaults.DELAY;
  public placement = TOOLTIP_CONSTANTS.defaults.PLACEMENT;
}
