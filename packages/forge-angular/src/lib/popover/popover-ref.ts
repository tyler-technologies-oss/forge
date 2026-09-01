import { ElementRef } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import type { IPopoverComponent } from '@tylertech/forge';

export class PopoverRef<TComponent = unknown, TResult = unknown> {
  private readonly _elementRef: ElementRef<IPopoverComponent>;

  private readonly _afterClosed = new AsyncSubject<TResult | undefined>();
  public afterClosed: Observable<TResult | undefined> = this._afterClosed.asObservable();

  public componentInstance: TComponent;

  constructor(instance: IPopoverComponent) {
    this._elementRef = new ElementRef(instance);
  }

  public close(result?: TResult): void {
    this.nativeElement.open = false;
    this._afterClosed.next(result);
    this._afterClosed.complete();
  }

  public get nativeElement(): IPopoverComponent {
    return this._elementRef.nativeElement;
  }
}
