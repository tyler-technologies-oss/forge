import { Component } from '@angular/core';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFavorite } from '@tylertech/tyler-icons';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeButtonModule, ForgeIconModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [DemoCardComponent, ForgeButtonModule, ForgeIconModule]
})
export class ButtonComponent {
  constructor() {
    IconRegistry.define(tylIconFavorite);
  }
}
