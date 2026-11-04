import { Component } from '@angular/core';
import { IconRegistry } from '@tylertech/forge';
import { tylIconCake } from '@tylertech/tyler-icons';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeInlineMessageModule, ForgeIconModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-inline-message',
  templateUrl: './inline-message.component.html',
  styleUrls: ['./inline-message.component.scss'],
  imports: [DemoCardComponent, ForgeInlineMessageModule, ForgeIconModule]
})
export class InlineMessageComponent {
  constructor() {
    IconRegistry.define(tylIconCake);
  }
}
