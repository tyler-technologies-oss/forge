import { Component } from '@angular/core';
import { IconRegistry, IMenuOption } from '@tylertech/forge';
import { tylIconMoreVert } from '@tylertech/tyler-icons';
import { ForgeResponsiveToolbarModule, ForgeButtonModule, ForgeMenuModule, ForgeIconButtonModule, ForgeIconModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.scss'],
  imports: [DemoCardComponent, ForgeResponsiveToolbarModule, ForgeButtonModule, ForgeMenuModule, ForgeIconButtonModule, ForgeIconModule]
})
export class ResponsiveToolbarComponent {
  public overflowMenuOptions: IMenuOption[] = [
    { label: 'Export', value: 'export' },
    { label: 'Filter', value: 'filter' },
    { label: 'Add new', value: 'add-new' }
  ];

  constructor() {
    IconRegistry.define(tylIconMoreVert);
  }
}
