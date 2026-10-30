import { Component, inject } from '@angular/core';
import { BottomSheetConfig, BottomSheetRef, ForgeScaffoldModule, ForgeToolbarModule, ForgeButtonModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-confirm-bottom-sheet',
  templateUrl: './confirm-bottom-sheet.component.html',
  styleUrls: ['./confirm-bottom-sheet.component.scss'],
  imports: [ForgeScaffoldModule, ForgeToolbarModule, ForgeButtonModule]
})
export class ConfirmBottomSheetComponent {
  private _bottomSheetConfig = inject(BottomSheetConfig);
  private _bottomSheetRef = inject(BottomSheetRef);

  public title: string;
  public message: string;
  public moveable: boolean;

  constructor() {
    const bottomSheetConfig = this._bottomSheetConfig;

    this.title = bottomSheetConfig.data.title;
    this.message = bottomSheetConfig.data.message;
    this.moveable = bottomSheetConfig.data.moveable;
  }

  public onCancel(): void {
    this._bottomSheetRef.close(false);
  }

  public onConfirm(): void {
    this._bottomSheetRef.close(true);
  }
}
