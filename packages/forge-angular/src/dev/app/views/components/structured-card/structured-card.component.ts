import { Component } from '@angular/core';
import { IconRegistry } from '@tylertech/forge';
import { tylIconMoreVert } from '@tylertech/tyler-icons';
import { ForgeStructuredCardModule, ForgeButtonModule, ForgeIconButtonModule, ForgeIconModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-structured-card',
  templateUrl: './structured-card.component.html',
  styleUrls: ['./structured-card.component.scss'],
  imports: [DemoCardComponent, ForgeStructuredCardModule, ForgeButtonModule, ForgeIconButtonModule, ForgeIconModule]
})
export class StructuredCardComponent {
  constructor() {
    IconRegistry.define(tylIconMoreVert);
  }
}
