import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeListModule, ForgeListItemModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [DemoCardComponent, ForgeListModule, ForgeListItemModule]
})
export class ListComponent {
  public items = [
    {
      label: 'List Item One',
      value: 1
    },
    {
      label: 'List Item Two',
      value: 2
    },
    {
      label: 'List Item Three',
      value: 3
    },
    {
      label: 'List Item Four',
      value: 4
    }
  ];
}
