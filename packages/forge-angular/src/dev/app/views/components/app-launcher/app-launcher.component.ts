import { Component } from '@angular/core';
import type { AppLauncherOption } from '@tylertech/forge/app-launcher';
import { ForgeAppLauncherModule, ForgeAppLauncherLinkModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-app-launcher',
  templateUrl: './app-launcher.component.html',
  imports: [DemoCardComponent, ForgeAppLauncherModule, ForgeAppLauncherLinkModule]
})
export class AppLauncherComponent {
  public relatedApps: AppLauncherOption[] = [
    { label: 'Munis', uri: 'https://www.tylertech.com', iconName: 'application' },
    { label: 'ExecuTime', uri: 'https://www.tylertech.com', iconName: 'application' }
  ];

  public allApps: AppLauncherOption[] = [
    ...this.relatedApps,
    { label: 'Content Manager', uri: 'https://www.tylertech.com', iconName: 'application' },
    { label: 'Enterprise Asset Management', uri: 'https://www.tylertech.com', iconName: 'application' }
  ];
}
