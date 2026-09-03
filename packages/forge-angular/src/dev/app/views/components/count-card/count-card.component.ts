import { Component } from '@angular/core';
import { IconRegistry } from '@tylertech/forge';
import type { CountCardTheme } from '@tylertech/forge/count-card';
import { tylIconPeople } from '@tylertech/tyler-icons';
import { ForgeCountCardModule, ForgeIconModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-count-card',
  templateUrl: './count-card.component.html',
  styleUrls: ['./count-card.component.scss'],
  imports: [DemoCardComponent, ForgeCountCardModule, ForgeIconModule]
})
export class CountCardComponent {
  public themes: CountCardTheme[] = ['none', 'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'];

  constructor() {
    IconRegistry.define(tylIconPeople);
  }
}
