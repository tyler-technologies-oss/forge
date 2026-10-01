import { Directive, ElementRef, forwardRef, HostListener, Renderer2, StaticProvider, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDatePickerRange, IDateRangePickerChangeEventData } from '@tylertech/forge';

export const DATE_RANGE_PICKER_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateRangePickerValueAccessor),
  multi: true
};

@Directive({
  selector: 'forge-date-range-picker[formControlName],forge-date-range-picker[formControl],forge-date-range-picker[ngModel]',
  providers: [DATE_RANGE_PICKER_VALUE_ACCESSOR],
  standalone: false
})
export class DateRangePickerValueAccessor implements ControlValueAccessor {
  private _elementRef = inject(ElementRef);
  private _renderer = inject(Renderer2);

  @HostListener('forge-date-range-picker-change', ['$event'])
  public dateRangePickerChange(event: CustomEvent<IDateRangePickerChangeEventData>): void {
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

  public change(value: IDatePickerRange): void {
    this.onChange(value);
  }
}
