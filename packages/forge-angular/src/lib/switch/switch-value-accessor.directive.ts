import { Directive, Renderer2, ElementRef, forwardRef, HostListener, inject } from '@angular/core';
import { StaticProvider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const SWITCH_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchValueAccessor),
  multi: true
};

@Directive({
  selector: 'forge-switch[formControlName],forge-switch[formControl],forge-switch[ngModel]',
  providers: [SWITCH_VALUE_ACCESSOR],
  standalone: false
})
export class SwitchValueAccessor implements ControlValueAccessor {
  private _elementRef = inject(ElementRef);
  private _renderer = inject(Renderer2);

  @HostListener('forge-switch-change', ['$event'])
  public switchChange(evt: CustomEvent<boolean>): void {
    this.change(evt.detail);
  }

  @HostListener('blur')
  public blur(): void {
    this.onTouched();
  }

  public onChange = (_: any): void => {};
  public onTouched = (): void => {};

  public writeValue(value: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'checked', Boolean(value));
  }

  public registerOnChange(fn: (_: boolean) => void): void {
    this.onChange = value => fn(value);
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(value: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', Boolean(value));
  }

  public change(value: boolean): void {
    this.onChange(value);
  }
}
