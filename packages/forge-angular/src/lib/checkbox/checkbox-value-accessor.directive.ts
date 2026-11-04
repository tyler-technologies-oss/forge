import { Directive, Renderer2, ElementRef, forwardRef, HostListener, inject } from '@angular/core';
import { StaticProvider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICheckboxComponent } from '@tylertech/forge';

export const CHECKBOX_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxValueAccessor),
  multi: true
};

@Directive({
  selector: 'forge-checkbox[formControlName],forge-checkbox[formControl],forge-checkbox[ngModel]',
  providers: [CHECKBOX_VALUE_ACCESSOR],
  standalone: false
})
export class CheckboxValueAccessor implements ControlValueAccessor {
  private _elementRef = inject<ElementRef<ICheckboxComponent>>(ElementRef);
  private _renderer = inject(Renderer2);

  @HostListener('change', ['$event'])
  public switchChange(evt: CustomEvent<void>): void {
    this.change((evt.target as ICheckboxComponent).checked);
  }

  @HostListener('blur')
  public blur(): void {
    this.onTouched();
  }

  public onChange = (_: any): void => {};
  public onTouched = (): void => {};

  public writeValue(value: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'checked', !!value);
  }

  public registerOnChange(fn: (_: boolean) => void): void {
    this.onChange = value => fn(value);
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(value: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', value);
  }

  public change(value: boolean): void {
    this.onChange(value);
  }
}
