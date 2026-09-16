import { Component, inject } from '@angular/core';
import { BottomSheetConfig, BottomSheetRef, ForgeButtonModule } from '@tylertech/forge-angular';

@Component({
  selector: 'lazy-bottom-sheet',
  templateUrl: './lazy-bottom-sheet.component.html',
  styleUrls: ['./lazy-bottom-sheet.component.scss'],
  imports: [ForgeButtonModule]
})
export class LazyBottomSheetComponent {
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
