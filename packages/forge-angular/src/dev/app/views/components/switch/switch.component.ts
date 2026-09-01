import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeSwitchProxyModule, ForgeSwitchModule, ForgeButtonModule } from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  imports: [DemoCardComponent, ForgeSwitchProxyModule, ForgeSwitchModule, FormsModule, ForgeButtonModule]
})
export class SwitchComponent {
  public withLabel = true;
  public withoutLabel = false;

  public onChange(evt: CustomEvent<boolean>): void {
    console.log(evt.detail);
  }
}
