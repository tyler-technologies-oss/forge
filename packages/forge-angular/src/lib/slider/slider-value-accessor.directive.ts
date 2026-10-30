import { Directive, Renderer2, ElementRef, forwardRef, HostListener, inject } from '@angular/core';
import { StaticProvider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISliderChangeEventData, ISliderRangeChangeEventData } from '@tylertech/forge';

export const SLIDER_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderValueAccessor),
  multi: true
};

@Directive({
  selector: 'forge-slider[formControlName],forge-slider[formControl],forge-slider[ngModel]',
  providers: [SLIDER_VALUE_ACCESSOR],
  standalone: false
})
export class SliderValueAccessor implements ControlValueAccessor {
  private _elementRef = inject(ElementRef);
  private _renderer = inject(Renderer2);

  @HostListener('forge-slider-change', ['$event'])
  public sliderChange(event: CustomEvent<ISliderChangeEventData>): void {
    this.change(event.detail.value);
  }

  @HostListener('forge-slider-input', ['$event'])
  public sliderInput(event: CustomEvent<ISliderChangeEventData>): void {
    this.change(event.detail.value);
  }

  @HostListener('forge-slider-range-change', ['$event'])
  public sliderRangeChange(event: CustomEvent<ISliderRangeChangeEventData>): void {
    this.change(event.detail);
  }

  @HostListener('forge-slider-range-input', ['$event'])
  public sliderRangeInput(event: CustomEvent<ISliderRangeChangeEventData>): void {
    this.change(event.detail);
  }

  @HostListener('blur')
  public blur(): void {
    this.onTouched();
  }

  public onChange = (_: any): void => {};
  public onTouched = (): void => {};

  public writeValue(value: number | ISliderRangeChangeEventData): void {
    if (this._elementRef.nativeElement.range) {
      if (value === null || value === undefined || typeof value !== 'object') {
        this._renderer.setProperty(this._elementRef.nativeElement, 'valueStart', 0);
        this._renderer.setProperty(this._elementRef.nativeElement, 'valueEnd', 0);
        return;
      }
      if ('valueStart' in value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'valueStart', this._toFloat(value.valueStart));
      }
      if ('valueStart' in value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'valueEnd', this._toFloat(value.valueEnd));
      }
    } else {
      this._renderer.setProperty(this._elementRef.nativeElement, 'value', this._toFloat(value));
    }
  }

  public registerOnChange(fn: (_: number | ISliderRangeChangeEventData) => void): void {
    this.onChange = value => fn(value);
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  public change(value: number | ISliderRangeChangeEventData): void {
    this.onChange(value);
  }

  private _toFloat(value: any): number {
    if (value === null || value === undefined) {
      return 0;
    }

    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue) || typeof parsedValue !== 'number') {
      return 0;
    }

    return parsedValue;
  }
}
