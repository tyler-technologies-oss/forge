import { Component } from '@angular/core';
import { tylIconAccount } from '@tylertech/tyler-icons';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeIconModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  imports: [DemoCardComponent, ForgeIconModule]
})
export class IconComponent {
  public accountSrc = tylIconAccount.data;
}
