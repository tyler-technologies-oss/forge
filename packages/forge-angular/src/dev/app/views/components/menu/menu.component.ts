import { Component } from '@angular/core';
import { IMenuOption, IMenuSelectEventData } from '@tylertech/forge';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeMenuModule, ForgeButtonModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [DemoCardComponent, ForgeMenuModule, ForgeButtonModule]
})
export class MenuComponent {
  public lastSelectedValue: string;
  public options: IMenuOption[] = [
    { label: 'Back', value: 'back' },
    { label: 'Forward', value: 'forward' },
    { label: 'Reload', value: 'reload' },
    { label: 'Help & feedback', value: 'help-feedback' },
    { label: 'Settings', value: 'settings' }
  ];

  public onMenuOptionSelected(evt: CustomEvent): void {
    const data = evt.detail as IMenuSelectEventData;
    console.log('[menu] option selected', data);
    this.lastSelectedValue = evt.detail.value;
  }
}
