import { Component } from '@angular/core';
import { SplitViewOrientation, SplitViewPanelResizable } from '@tylertech/forge';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

import {
  ForgeSelectProxyModule,
  ForgeSelectModule,
  ForgeOptionModule,
  ForgeCheckboxProxyModule,
  ForgeCheckboxModule,
  ForgeButtonModule,
  ForgeSplitViewModule
} from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-split-view',
  templateUrl: './split-view.component.html',
  imports: [
    DemoCardComponent,
    ForgeSelectProxyModule,
    ForgeSelectModule,
    FormsModule,
    ForgeOptionModule,
    ForgeCheckboxProxyModule,
    ForgeCheckboxModule,
    ForgeButtonModule,
    ForgeSplitViewModule
  ]
})
export class SplitViewComponent {
  public panels: { label: string; resizable: SplitViewPanelResizable; open: boolean }[] = [
    { label: 'Panel one', resizable: 'end', open: true },
    { label: 'Panel two', resizable: 'off', open: true },
    { label: 'Panel three', resizable: 'start', open: true }
  ];
  public orientation: SplitViewOrientation = 'horizontal';
  public allowClose = false;
  public disabled = false;
  public autoClose = false;
  public autoCloseThreshold = 20;

  public addPanel(): void {
    const panels = this.panels.map(s => ({ ...s }));
    panels.push({ label: (this.panels.length + 1).toString() + ' Panel', resizable: 'start', open: true });
    this.panels = panels;
  }

  public removePanel(): void {
    this.panels = this.panels.slice(0, this.panels.length - 1);
  }
}
