import { Component } from '@angular/core';
import { ForgeFooterModule, ForgeFooterItemModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [DemoCardComponent, ForgeFooterModule, ForgeFooterItemModule]
})
export class FooterComponent {
  public year = new Date().getFullYear();
}
