import { Component } from '@angular/core';
import { IconRegistry } from '@tylertech/forge';
import { tylIconLink } from '@tylertech/tyler-icons';
import { ForgeUserProfileModule, ForgeProfileLinkModule, ForgeIconModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [DemoCardComponent, ForgeUserProfileModule, ForgeProfileLinkModule, ForgeIconModule]
})
export class UserProfileComponent {
  constructor() {
    IconRegistry.define(tylIconLink);
  }
}
