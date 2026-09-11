import { Component, OnInit, input } from '@angular/core';
import {
  ForgeScaffoldModule,
  ForgeTabBarModule,
  ForgeTabModule,
  ForgeViewSwitcherModule,
  ForgeViewModule,
  ForgeLabelValueModule,
  ForgePageStateModule
} from '@tylertech/forge-angular';

@Component({
  selector: 'ev-view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss'],
  imports: [ForgeScaffoldModule, ForgeTabBarModule, ForgeTabModule, ForgeViewSwitcherModule, ForgeViewModule, ForgeLabelValueModule, ForgePageStateModule]
})
export class ViewSwitcherDemoComponent implements OnInit {
  public readonly user = input<any>();

  public currentIndex = 0;

  public listItems = [
    { label: 'Account', icon: 'payment' },
    { label: 'Past bills', icon: 'pageview' }
  ];

  public ngOnInit(): void {
    console.log(this.user());
  }

  public tabClicked(evt: number): void {
    this.currentIndex = evt;
  }
}
