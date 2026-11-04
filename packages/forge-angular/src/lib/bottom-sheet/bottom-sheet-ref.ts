import { ElementRef } from '@angular/core';
import { AsyncSubject, Observable, Subject } from 'rxjs';
import { IBottomSheetComponent } from '@tylertech/forge';

export class BottomSheetRef<TComponent = any, TResult = any> {
  private readonly _elementRef: ElementRef<IBottomSheetComponent>;

  private readonly _afterClosed = new AsyncSubject<TResult | undefined>();
  public afterClosed: Observable<TResult | undefined> = this._afterClosed.asObservable();

  private readonly _beforeClose = new Subject<CustomEvent<void>>();
  public beforeClose: Observable<CustomEvent<void>> = this._beforeClose.asObservable();

  public componentInstance: TComponent;

  constructor(instance: IBottomSheetComponent) {
    this._elementRef = new ElementRef(instance);
    instance.addEventListener('forge-bottom-sheet-before-close', evt => this._beforeClose.next(evt));
  }

  public close(result?: TResult): void {
    this.nativeElement.open = false;
    this._afterClosed.next(result);
    this._afterClosed.complete();
    this._beforeClose.complete();
  }

  public get nativeElement(): IBottomSheetComponent {
    return this._elementRef.nativeElement;
  }
}
