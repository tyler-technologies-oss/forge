import { Component } from '@angular/core';
import { ForgeMultiSelectHeaderModule, ForgeButtonModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-multi-select-header',
  templateUrl: './multi-select-header.component.html',
  imports: [DemoCardComponent, ForgeMultiSelectHeaderModule, ForgeButtonModule]
})
export class MultiSelectHeaderComponent {
  public selectedAll = false;

  public get selectedText(): string {
    return `${this.selectedAll ? 5 : 2} selected`;
  }
}
