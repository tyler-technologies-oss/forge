import { Location, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IconRegistry } from '@tylertech/forge';
import { tylIconHome, tylIconSettings, tylIconSettingsInputComponent } from '@tylertech/tyler-icons';
import {
  ForgeDialogModule,
  ForgeDrawerModule,
  ForgeListModule,
  ForgeListItemModule,
  ForgeIconModule,
  ForgeExpansionPanelModule,
  ForgeOpenIconModule
} from '@tylertech/forge-angular';
import { DrawerService } from '../../services/drawer.service';

IconRegistry.define([tylIconHome, tylIconSettingsInputComponent, tylIconSettings]);

export interface IMenuItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-sidenav',
  styleUrls: ['./sidenav.component.scss'],
  templateUrl: './sidenav.component.html',
  imports: [
    ForgeDialogModule,
    NgTemplateOutlet,
    ForgeDrawerModule,
    ForgeListModule,
    ForgeListItemModule,
    ForgeIconModule,
    RouterLink,
    RouterLinkActive,
    ForgeExpansionPanelModule,
    ForgeOpenIconModule
  ]
})
export class SidenavComponent implements OnInit {
  private _location = inject(Location);
  private _cd = inject(ChangeDetectorRef);
  private _drawerService = inject(DrawerService);

  public readonly componentExpansionPanel = viewChild('componentExpansionPanel', { read: ElementRef });
  public readonly exampleExpansionPanel = viewChild('exampleExpansionPanel', { read: ElementRef });

  public open = this._drawerService.open;
  public isSmallViewPort = signal(false);

  @HostListener('window:resize')
  public onResize(): void {
    this.updateViewportSize();
  }

  public componentMenuItems: IMenuItem[] = [
    { label: 'Accordion', value: '/component/accordion' },
    { label: 'Autocomplete', value: '/component/autocomplete' },
    { label: 'Avatar', value: '/component/avatar' },
    { label: 'Banner', value: '/component/banner' },
    { label: 'Bottom Sheet', value: '/component/bottom-sheet' },
    { label: 'Button', value: '/component/button' },
    { label: 'Checkbox', value: '/component/checkbox' },
    { label: 'Chip Field', value: '/component/chip-field' },
    { label: 'Chips', value: '/component/chips' },
    { label: 'Circular Progress', value: '/component/circular-progress' },
    { label: 'Date picker', value: '/component/date-picker' },
    { label: 'Date Range Picker', value: '/component/date-range-picker' },
    { label: 'Dialog', value: '/component/dialog' },
    { label: 'Expansion Panel', value: '/component/expansion-panel' },
    { label: 'Floating Action Button', value: '/component/floating-action-button' },
    { label: 'Icon', value: '/component/icon' },
    { label: 'Icon Button', value: '/component/icon-button' },
    { label: 'Inline Message', value: '/component/inline-message' },
    { label: 'Linear Progress', value: '/component/linear-progress' },
    { label: 'List', value: '/component/list' },
    { label: 'Menu', value: '/component/menu' },
    { label: 'Page State', value: '/component/page-state' },
    { label: 'Paginator', value: '/component/paginator' },
    { label: 'Popover', value: '/component/popover' },
    { label: 'Radio', value: '/component/radio' },
    { label: 'Scaffold', value: '/component/scaffold' },
    { label: 'Select', value: '/component/select' },
    { label: 'Slider', value: '/component/slider' },
    { label: 'Split View', value: '/component/split-view' },
    { label: 'Stepper', value: '/component/stepper' },
    { label: 'Switch', value: '/component/switch' },
    { label: 'Tab Bar', value: '/component/tab-bar' },
    { label: 'Table', value: '/component/table' },
    { label: 'Text Field', value: '/component/text-field' },
    { label: 'Time Picker', value: '/component/time-picker' },
    { label: 'Toast', value: '/component/toast' },
    { label: 'Tooltip', value: '/component/tooltip' },
    { label: 'View Switcher', value: '/component/view-switcher' }
  ];

  public exampleMenuItems: IMenuItem[] = [
    { label: 'Dialog Service', value: '/example/dialog-service' },
    { label: 'Expansion panel', value: '/example/expansion-panel' },
    { label: 'Reactive form', value: '/example/reactive-form' },
    { label: 'Table', value: '/example/table' },
    { label: 'Toolbar', value: '/example/toolbar-example' },
    { label: 'Two column layout', value: '/example/two-column-grid' }
  ];

  constructor() {
    const router = inject(Router);

    router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.open()) {
          this._drawerService.closeDrawer();
        }
      }
    });
  }

  public updateViewportSize(): void {
    if (window.innerWidth < 750) {
      this._drawerService.closeDrawer();
      this._drawerService.showDrawerToggle();
      this.isSmallViewPort.set(true);
    } else {
      this._drawerService.hideDrawerToggle();
      this.isSmallViewPort.set(false);
    }
  }

  public closeDrawer(): void {
    this._drawerService.closeDrawer();
  }

  public ngOnInit(): void {
    window.requestAnimationFrame(() => {
      this.updateViewportSize();
    });
  }

  public ngAfterViewInit(): void {
    const path = this._location.path() || '/';
    this._cd.detectChanges();

    // Automatically expand a menu item if the active menu item exists within it
    if (path.match(/^\/component\//)) {
      const compPanel = this.componentExpansionPanel();
      if (compPanel) {
        compPanel.nativeElement.open = true;
      }
    } else if (path.match(/^\/example\//)) {
      const exPanel = this.exampleExpansionPanel();
      if (exPanel) {
        exPanel.nativeElement.open = true;
      }
    }
  }
}
