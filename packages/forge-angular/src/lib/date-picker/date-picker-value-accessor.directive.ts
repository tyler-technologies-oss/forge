import { Directive, Renderer2, ElementRef, forwardRef, HostListener, inject } from '@angular/core';
import { StaticProvider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDatePickerComponent } from '@tylertech/forge';

export const DATEPICKER_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerValueAccessor),
  multi: true
};

@Directive({
  selector: 'forge-date-picker[formControlName],forge-date-picker[formControl],forge-date-picker[ngModel]',
  providers: [DATEPICKER_VALUE_ACCESSOR],
  standalone: false
})
export class DatePickerValueAccessor implements ControlValueAccessor {
  private _elementRef = inject<ElementRef<IDatePickerComponent>>(ElementRef);
  private _renderer = inject(Renderer2);

  @HostListener('forge-date-picker-change', ['$event'])
  public datePickerChange(event: CustomEvent<string | Date | null | undefined>): void {
    this.change(event.detail);
  }

  @HostListener('focusout')
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

  public change(value: string | Date | null | undefined): void {
    this.onChange(value);
  }
}
