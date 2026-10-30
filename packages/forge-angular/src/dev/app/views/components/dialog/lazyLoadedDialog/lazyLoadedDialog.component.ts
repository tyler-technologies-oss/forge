import { Component, inject } from '@angular/core';
import { DialogConfig, DialogRef, ForgeScaffoldModule, ForgeToolbarModule, ForgeButtonModule } from '@tylertech/forge-angular';

@Component({
  selector: 'lazy-loaded-dialog',
  templateUrl: './lazyLoadedDialog.component.html',
  styleUrls: ['./lazyLoadedDialog.component.scss'],
  imports: [ForgeScaffoldModule, ForgeToolbarModule, ForgeButtonModule]
})
export class LazyLoadedDialogComponent {
  private _dialogConfig = inject<
    DialogConfig<{
      title: string;
      message: string;
    }>
  >(DialogConfig);
  private _dialogRef = inject(DialogRef);

  public title: string;
  public message: string;

  constructor() {
    const dialogConfig = this._dialogConfig;

    this.title = dialogConfig.data.title;
    this.message = dialogConfig.data.message;
  }

  public onCancel(): void {
    this._dialogRef.close(false);
  }

  public onConfirm(): void {
    this._dialogRef.close(true);
  }
}
