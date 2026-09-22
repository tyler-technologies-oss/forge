import { Component, inject } from '@angular/core';
import { DialogConfig, ForgeToolbarModule } from '@tylertech/forge-angular';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-count-down-dialog',
  templateUrl: './count-down-dialog.component.html',
  styleUrls: ['./count-down-dialog.component.scss'],
  imports: [ForgeToolbarModule, AsyncPipe]
})
export class CountDownDialogComponent {
  private _dialogConfig = inject<
    DialogConfig<{
      counter: number;
    }>
  >(DialogConfig);

  public counter$: Observable<number>;

  constructor() {
    const dialogConfig = this._dialogConfig;

    let localCounter = dialogConfig.data.counter;

    this.counter$ = new Observable(observer => {
      const interval = setInterval(() => {
        observer.next(localCounter);
        if (localCounter === 0) {
          clearInterval(interval);
          observer.complete();
        }
        localCounter--;
      }, 1000);
    });
  }
}
