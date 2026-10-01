import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeAvatarModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  imports: [DemoCardComponent, ForgeAvatarModule]
})
export class AvatarComponent {}
