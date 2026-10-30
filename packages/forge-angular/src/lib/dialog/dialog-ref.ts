import { Observable, Subject } from 'rxjs';
import { ComponentRef, ElementRef } from '@angular/core';
import { IDialogBeforeCloseEventData, IDialogComponent } from '@tylertech/forge';

export class DialogRef<TComponent = any, TResult = any> {
  private readonly _elementRef: ElementRef<IDialogComponent>;

  private readonly _afterClosed = new Subject<TResult | undefined>();
  public afterClosed: Observable<TResult | undefined> = this._afterClosed.asObservable();

  private readonly _beforeClose = new Subject<CustomEvent<IDialogBeforeCloseEventData>>();
  public beforeClose: Observable<CustomEvent<IDialogBeforeCloseEventData>> = this._beforeClose.asObservable();

  private _isClosed = false;

  public componentInstance: TComponent;
  public componentRef: ComponentRef<TComponent>;

  constructor(instance: IDialogComponent) {
    this._elementRef = new ElementRef(instance);
    instance.addEventListener('forge-dialog-before-close', evt => this._beforeClose.next(evt));
  }

  public close(result?: TResult): void {
    if (this._isClosed) {
      return;
    }

    this._isClosed = true;
    this.nativeElement.open = false;
    this._afterClosed.next(result);
    this._afterClosed.complete();
    this._beforeClose.complete();
  }

  public get nativeElement(): IDialogComponent {
    return this._elementRef.nativeElement;
  }

  public get isClosed(): boolean {
    return this._isClosed;
  }
}
