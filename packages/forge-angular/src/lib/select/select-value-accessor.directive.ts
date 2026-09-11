import { Directive, Renderer2, ElementRef, forwardRef, HostListener, inject } from '@angular/core';
import { StaticProvider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectComponent } from '@tylertech/forge';

export const SELECT_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectValueAccessor),
  multi: true
};

@Directive({
  selector: 'forge-select[formControlName],forge-select[formControl],forge-select[ngModel]',
  providers: [SELECT_VALUE_ACCESSOR],
  standalone: false
})
export class SelectValueAccessor implements ControlValueAccessor {
  private _elementRef = inject(ElementRef);
  private _renderer = inject(Renderer2);

  @HostListener('change', ['$event'])
  public selectChange(event: Event): void {
    this.change((event.target as ISelectComponent).value);
  }

  @HostListener('blur')
  public blur(): void {
    this.onTouched();
  }

  public onChange = (_: any): void => {};
  public onTouched = (): void => {};

  public writeValue(value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
  }

  public registerOnChange(fn: (_: boolean) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  public change(value: string | string[]): void {
    this.onChange(value);
  }
}
