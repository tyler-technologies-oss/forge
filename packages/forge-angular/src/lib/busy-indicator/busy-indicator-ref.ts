import { Observable, Subject } from 'rxjs';
import { ElementRef } from '@angular/core';
import { IBusyIndicatorComponent } from '@tylertech/forge/busy-indicator';

export class BusyIndicatorRef {
  private readonly _elementRef: ElementRef<IBusyIndicatorComponent>;

  private readonly _afterCancel = new Subject<CustomEvent<void>>();
  public afterCancel: Observable<CustomEvent<void>> = this._afterCancel.asObservable();

  constructor(instance: IBusyIndicatorComponent) {
    this._elementRef = new ElementRef(instance);
    if (instance.cancelable) {
      instance.addEventListener('forge-busy-indicator-cancel', evt => this._afterCancel.next(evt));
    }
  }

  public hide(): void {
    this.nativeElement.open = false;
    this.nativeElement.remove();
    this._afterCancel.complete();
  }

  public get nativeElement(): IBusyIndicatorComponent {
    return this._elementRef.nativeElement;
  }
}
