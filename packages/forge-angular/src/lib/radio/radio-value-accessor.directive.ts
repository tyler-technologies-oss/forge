import { Directive, ElementRef, HostListener, Renderer2, StaticProvider, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IRadioComponent } from '@tylertech/forge';

export const RADIO_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioValueAccessor),
  multi: true
};

@Directive({
  selector: 'forge-radio[formControlName],forge-radio[formControl],forge-radio[ngModel]',
  providers: [RADIO_VALUE_ACCESSOR],
  standalone: false
})
export class RadioValueAccessor implements ControlValueAccessor {
  private _elementRef = inject<ElementRef<IRadioComponent>>(ElementRef);
  private _renderer = inject(Renderer2);

  @HostListener('change', ['$event'])
  public switchChange(evt: CustomEvent<void>): void {
    const target = evt.target as IRadioComponent;
    this.change(target.value);
  }

  @HostListener('blur')
  public blur(): void {
    this.onTouched();
  }

  public onChange = (_: any): void => {};
  public onTouched = (): void => {};

  public writeValue(value: string): void {
    const checked = value === this._elementRef.nativeElement.value;
    this._renderer.setProperty(this._elementRef.nativeElement, 'checked', checked);
  }

  public registerOnChange(fn: (_: string) => void): void {
    this.onChange = value => fn(value);
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(value: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', value);
  }

  public change(value: string): void {
    this.onChange(value);
  }
}
