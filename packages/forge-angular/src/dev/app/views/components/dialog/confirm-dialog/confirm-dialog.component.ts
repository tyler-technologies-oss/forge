import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef, ForgeScaffoldModule, ForgeToolbarModule, ForgeButtonModule } from '@tylertech/forge-angular';

export interface IConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  imports: [ForgeScaffoldModule, ForgeToolbarModule, ForgeButtonModule]
})
export class ConfirmDialogComponent {
  private _data = inject<IConfirmDialogData>(DIALOG_DATA);
  private _dialogRef = inject(DialogRef);

  public title: string;
  public message: string;

  constructor() {
    const data = this._data;

    this.title = data.title;
    this.message = data.message;
  }

  public onCancel(): void {
    this._dialogRef.close(false);
  }

  public onConfirm(): void {
    this._dialogRef.close(true);
  }
}
