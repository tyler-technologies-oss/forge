import { ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfirmationDialogActionEventData, IConfirmationDialogComponent } from '@tylertech/forge/confirmation-dialog';

export class ConfirmationDialogRef {
  private readonly _elementRef: ElementRef<IConfirmationDialogComponent>;

  private readonly _onAction = new Subject<CustomEvent<ConfirmationDialogActionEventData>>();
  public onAction: Observable<CustomEvent<ConfirmationDialogActionEventData>> = this._onAction.asObservable();

  constructor(instance: IConfirmationDialogComponent) {
    this._elementRef = new ElementRef(instance);
    instance.addEventListener('forge-confirmation-dialog-action', evt => this._onAction.next(evt));
  }

  public close(): void {
    this.nativeElement.open = false;
    this.nativeElement.remove();
    this._onAction.complete();
  }

  public get nativeElement(): IConfirmationDialogComponent {
    return this._elementRef.nativeElement;
  }

  public get isBusy(): boolean {
    return this.nativeElement.isBusy;
  }

  public set isBusy(newValue: boolean) {
    this.nativeElement.isBusy = newValue;
  }
}
