import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeScaffoldModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-scaffold',
  templateUrl: './scaffold.component.html',
  styleUrls: ['./scaffold.component.scss'],
  imports: [DemoCardComponent, ForgeScaffoldModule]
})
export class ScaffoldComponent {
  public handleClick(target: EventTarget | null): void {
    const element = target as HTMLElement;
    if (element?.classList.contains('slot-container') || element?.classList.contains('inner')) {
      element.remove();
    }
  }
}
