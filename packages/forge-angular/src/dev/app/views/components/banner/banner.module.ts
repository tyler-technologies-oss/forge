import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForgeBannerModule, ForgeButtonModule, ForgeIconModule } from '@tylertech/forge-angular';

import { BannerComponent } from './banner.component';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@NgModule({
  imports: [CommonModule, ForgeBannerModule, ForgeButtonModule, ForgeIconModule, DemoCardComponent, BannerComponent]
})
export class BannerModule {}
