import { Component } from '@angular/core';
import { IconRegistry } from '@tylertech/forge';
import { tylIconAdd, tylIconDelete, tylIconFavorite } from '@tylertech/tyler-icons';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeFloatingActionButtonModule, ForgeIconModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  imports: [DemoCardComponent, ForgeFloatingActionButtonModule, ForgeIconModule]
})
export class FloatingActionButtonComponent {
  constructor() {
    IconRegistry.define([tylIconAdd, tylIconDelete, tylIconFavorite]);
  }
}
