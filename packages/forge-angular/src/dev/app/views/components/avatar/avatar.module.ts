import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgeAvatarModule, ForgeButtonModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { AvatarComponent } from './avatar.component';

@NgModule({
  imports: [CommonModule, ForgeAvatarModule, ForgeButtonModule, DemoCardComponent, AvatarComponent]
})
export class AvatarModule {}
