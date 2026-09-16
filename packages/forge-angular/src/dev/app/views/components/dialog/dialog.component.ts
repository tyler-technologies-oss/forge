import { Component, inject } from '@angular/core';
import {
  DialogService,
  ToastService,
  IDialogOptions,
  ForgeButtonModule,
  ForgeDialogModule,
  ForgeScaffoldModule,
  ForgeToolbarModule,
  ForgeCheckboxProxyModule,
  ForgeCheckboxModule,
  ForgeTextFieldModule
} from '@tylertech/forge-angular';
import { take, takeUntil } from 'rxjs/operators';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  styleUrls: ['./dialog.component.scss'],
  templateUrl: './dialog.component.html',
  imports: [
    DemoCardComponent,
    ForgeButtonModule,
    ForgeDialogModule,
    ForgeScaffoldModule,
    ForgeToolbarModule,
    ForgeCheckboxProxyModule,
    ForgeCheckboxModule,
    FormsModule,
    ForgeTextFieldModule
  ]
})
export class DialogComponent {
  private _dialogService = inject(DialogService);
  private _toastService = inject(ToastService);

  public nonmodal = false;
  public persistent = false;
  public fullscreen = false;
  public moveable = false;
  public lazyload = false;
  public dialogClass = '';
  public preventClose = false;

  public async showConfirmDialog(): Promise<void> {
    const options: IDialogOptions = {
      mode: this.nonmodal ? 'nonmodal' : 'modal',
      persistent: this.persistent,
      fullscreen: this.fullscreen,
      dialogClass: this.dialogClass,
      moveable: this.moveable,
      label: 'Confirm Dialog',
      description: 'This is a confirm dialog'
    };

    const data = {
      title: 'Confirm',
      message: 'Are you sure you want to close the modal?'
    };

    if (!this.lazyload) {
      const dialogRef = this._dialogService.open(ConfirmDialogComponent, { options, data });
      console.log('Native Forge dialog instance', dialogRef.nativeElement);
      console.log('[DialogRef] Angular componentRef', dialogRef.componentRef);
      console.log('[DialogRef] Angular componentInstance', dialogRef.componentInstance);
      dialogRef.afterClosed.pipe(take(1)).subscribe(result => {
        this._toastService.show(`Dialog closed with result: ${result}`);
      });
      if (this.preventClose) {
        dialogRef.beforeClose.pipe(takeUntil(dialogRef.afterClosed)).subscribe(evt => {
          console.log('[beforeClose] preventDefault');
          evt.preventDefault();
        });
      }
    } else {
      // lazyload
      const { LazyLoadedDialogComponent } = await import('./lazyLoadedDialog/lazyLoadedDialog.component');
      const dialogRef = this._dialogService.open(LazyLoadedDialogComponent, { options, config: { data } });
      console.log('Native Forge dialog instance', dialogRef.nativeElement);
      console.log('[DialogRef] Angular componentInstance', dialogRef.componentInstance);
      dialogRef.afterClosed.pipe(take(1)).subscribe(result => {
        this._toastService.show(`Dialog closed with result: ${result}`);
      });
      if (this.preventClose) {
        dialogRef.beforeClose.pipe(takeUntil(dialogRef.afterClosed)).subscribe(evt => {
          console.log('[beforeClose] preventDefault');
          evt.preventDefault();
        });
      }
    }
  }
}
