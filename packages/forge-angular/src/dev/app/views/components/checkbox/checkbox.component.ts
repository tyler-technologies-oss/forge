import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeCheckboxProxyModule, ForgeCheckboxModule, ForgeButtonModule } from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  imports: [DemoCardComponent, ForgeCheckboxProxyModule, ForgeCheckboxModule, FormsModule, ForgeButtonModule]
})
export class CheckboxComponent {
  public checked = true;
}
