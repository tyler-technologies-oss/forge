import { Component } from '@angular/core';
import { ForgeThemeToggleModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  imports: [DemoCardComponent, ForgeThemeToggleModule]
})
export class ThemeToggleComponent {}
