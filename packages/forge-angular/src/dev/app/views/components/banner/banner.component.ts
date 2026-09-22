import { Component } from '@angular/core';
import { IconRegistry } from '@tylertech/forge';
import { tylIconAddAlert } from '@tylertech/tyler-icons';
import { ForgeBannerModule, ForgeIconModule, ForgeButtonModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  imports: [ForgeBannerModule, ForgeIconModule, ForgeButtonModule, DemoCardComponent]
})
export class BannerComponent {
  public isDismissed = false;

  constructor() {
    IconRegistry.define(tylIconAddAlert);
  }

  public openAlert(): void {
    alert('Some more info...');
    this.dismissBanner();
  }

  public toggleBanner(): void {
    this.isDismissed = !this.isDismissed;
  }

  public dismissBanner(): void {
    this.isDismissed = true;
  }
}
