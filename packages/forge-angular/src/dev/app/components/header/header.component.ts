import { Component, inject } from '@angular/core';
import {
  ToastService,
  ForgeAppBarProxyModule,
  ForgeAppBarModule,
  ForgeAppBarMenuButtonModule,
  ForgeIconModule,
  ForgeIconButtonModule,
  ForgeTooltipModule
} from '@tylertech/forge-angular';
import { IAppBarSearchInputEventData, IconRegistry } from '@tylertech/forge';
import { toggleClass } from '@tylertech/forge-core';
import { tylIconBrightness3, tylIconTylerTalkingTLogo, tylIconWbSunny } from '@tylertech/tyler-icons';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [ForgeAppBarProxyModule, ForgeAppBarModule, ForgeAppBarMenuButtonModule, ForgeIconModule, ForgeIconButtonModule, ForgeTooltipModule]
})
export class HeaderComponent {
  private _toastService = inject(ToastService);
  private _sidenavService = inject(DrawerService);

  private _isDark = false;
  public themeSwitcherIcon: string = tylIconBrightness3.name;

  public displayDrawerToggle = this._sidenavService.displayDrawerToggle;

  constructor() {
    IconRegistry.define([tylIconTylerTalkingTLogo, tylIconWbSunny, tylIconBrightness3]);
  }

  public onMenuClicked(): void {
    this._sidenavService.toggleDrawer();
  }

  public onSearch(evt: CustomEvent<IAppBarSearchInputEventData>): void {
    this._toastService.show(`Search: ${evt.detail}`);
  }

  public toggleTheme(): void {
    this._isDark = !this._isDark;
    toggleClass(document.body, this._isDark, 'app-theme-dark');
    this.themeSwitcherIcon = this._isDark ? tylIconWbSunny.name : tylIconBrightness3.name;
  }
}
