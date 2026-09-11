import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeRadioProxyModule, ForgeRadioModule } from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  imports: [DemoCardComponent, ForgeRadioProxyModule, ForgeRadioModule, FormsModule]
})
export class RadioComponent {
  public selected = 'two';
}
