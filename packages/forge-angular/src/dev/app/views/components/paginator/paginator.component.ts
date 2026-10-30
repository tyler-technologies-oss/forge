import { Component } from '@angular/core';
import { IPaginatorChangeEventData } from '@tylertech/forge';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgePaginatorModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  imports: [DemoCardComponent, ForgePaginatorModule]
})
export class PaginatorComponent {
  public total = 100;

  public onPaginatorChanged(evt: CustomEvent<IPaginatorChangeEventData>): void {
    console.log('onPaginatorChanged', evt.detail);
  }
}
