import { Component } from '@angular/core';
import { ForgeScaffoldModule } from '@tylertech/forge-angular';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ForgeScaffoldModule, HeaderComponent, SidenavComponent, RouterOutlet]
})
export class AppComponent {}
