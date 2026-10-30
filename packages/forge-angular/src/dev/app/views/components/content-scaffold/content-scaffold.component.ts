import { Component } from '@angular/core';
import { ForgeContentScaffoldModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-content-scaffold',
  templateUrl: './content-scaffold.component.html',
  styleUrls: ['./content-scaffold.component.scss'],
  imports: [DemoCardComponent, ForgeContentScaffoldModule]
})
export class ContentScaffoldComponent {}
