import { Component, OnInit } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeButtonModule, ForgeTabBarModule, ForgeTabModule, ForgeViewSwitcherModule, ForgeViewModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss'],
  imports: [DemoCardComponent, ForgeButtonModule, ForgeTabBarModule, ForgeTabModule, ForgeViewSwitcherModule, ForgeViewModule]
})
export class ViewSwitcherComponent implements OnInit {
  public tabs: string[] = [];
  public views: string[];
  public index = 0;

  public ngOnInit(): void {
    this.tabs = ['Tab 1', 'Tab 2'];
    this.views = ['Content for 1', 'Content for 2'];
  }

  public onAddView(): void {
    const count = this.tabs.length + 1;
    this.tabs.push(`Tab ${count}`);
    this.views.push(`Content for ${count}`);
    this.index = count - 1;
  }

  public onRemoveView(index: number): void {
    this.tabs.splice(index, 1);
    this.views.splice(index, 1);

    if (index > this.tabs.length - 1) {
      index = this.tabs.length - 1;
    }

    if (index < 0) {
      index = 0;
    }
  }
}
