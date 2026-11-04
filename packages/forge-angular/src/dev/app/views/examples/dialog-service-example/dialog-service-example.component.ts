import { Component, inject } from '@angular/core';
import {
  DialogService,
  IDialogOptions,
  ToastService,
  ForgeDividerModule,
  ForgeCheckboxProxyModule,
  ForgeCheckboxModule,
  ForgeButtonModule
} from '@tylertech/forge-angular';
import { DialogComponent } from './dialog/dialog.component';
import { take } from 'rxjs';
import { CountDownDialogComponent } from './count-down-dialog/count-down-dialog.component';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-service-example',
  templateUrl: './dialog-service-example.component.html',
  styleUrls: ['./dialog-service-example.component.scss'],
  imports: [DemoCardComponent, ForgeDividerModule, ForgeCheckboxProxyModule, ForgeCheckboxModule, FormsModule, ForgeButtonModule]
})
export class DialogServiceExampleComponent {
  private _dialogService = inject(DialogService);
  private _toastService = inject(ToastService);

  public result = false;

  public async showDialog(): Promise<void> {
    this._dialogService.open(DialogComponent);

    setTimeout(() => {
      this._openCountDownDialog();
    }, 2000);
  }

  private _openCountDownDialog(): void {
    const options: IDialogOptions = {
      persistent: false,
      label: 'Countdown Dialog',
      description: 'This is a countdown dialog'
    };

    const data = {
      counter: 5
    };

    const countDownDialogRef = this._dialogService.open(CountDownDialogComponent, { options, data });
    console.log('Native Forge dialog instance', countDownDialogRef.nativeElement);
    console.log('[DialogRef] Angular componentInstance', countDownDialogRef.componentInstance);

    countDownDialogRef.afterClosed.pipe(take(1)).subscribe(result => {
      this._toastService.show(`Dialog closed with result: ${result}`);
    });

    let localCounter = 5;
    const interval = setInterval(() => {
      localCounter--;
      if (localCounter < 0) {
        clearInterval(interval);
        console.log('closing all dialog');
        this._dialogService.closeAllDialogs(this.result);
      }
    }, 1000);
  }
}
