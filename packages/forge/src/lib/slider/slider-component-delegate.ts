import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core/index.js';
import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate.js';
import { ISliderComponent } from '../slider/index.js';
import { ISliderChangeEventData, ISliderRangeChangeEventData, SLIDER_CONSTANTS } from './slider-constants.js';

export type SliderComponentDelegateProps = Partial<ISliderComponent>;
export interface ISliderComponentDelegateOptions extends IFormFieldComponentDelegateOptions {}
export interface ISliderComponentDelegateConfig extends IBaseComponentDelegateConfig<ISliderComponent, ISliderComponentDelegateOptions> {}

export class SliderComponentDelegate extends FormFieldComponentDelegate<ISliderComponent, ISliderComponentDelegateOptions> {
  constructor(config?: ISliderComponentDelegateConfig) {
    super(config);
  }

  public get value(): number {
    return this._element.value;
  }
  public set value(value: number) {
    this._element.value = value;
  }

  public get valueStart(): number {
    return this._element.valueStart;
  }
  public set valueStart(value: number) {
    this._element.valueStart = value;
  }

  public get valueEnd(): number {
    return this._element.valueEnd;
  }
  public set valueEnd(value: number) {
    this._element.valueEnd = value;
  }

  public get disabled(): boolean {
    return this._element.disabled;
  }
  public set disabled(value: boolean) {
    this._element.disabled = value;
  }

  public get min(): number {
    return this._element.min;
  }
  public set min(value: number) {
    this._element.min = value;
  }

  public get max(): number {
    return this._element.max;
  }
  public set max(value: number) {
    this._element.max = value;
  }

  public get step(): number {
    return this._element.step;
  }

  public get range(): boolean {
    return this._element.range;
  }
  public set range(value: boolean) {
    this._element.range = value;
  }

  public get tickmarks(): boolean {
    return this._element.tickmarks;
  }
  public set tickmarks(value: boolean) {
    this._element.tickmarks = value;
  }

  public get labeled(): boolean {
    return this._element.labeled;
  }
  public set labeled(value: boolean) {
    this._element.labeled = value;
  }

  public get labelBuilder(): (value: number, which?: 'start' | 'end') => string {
    return this._element.labelBuilder;
  }
  public set labelBuilder(value: (value: number, which?: 'start' | 'end') => string) {
    this._element.labelBuilder = value;
  }

  public onInput(listener: (value: ISliderChangeEventData) => void): void {
    this._element.addEventListener('forge-slider-input', ({ detail }: CustomEvent<ISliderChangeEventData>) => listener(detail));
  }

  public onChange(listener: (value: ISliderChangeEventData) => void): void {
    this._element.addEventListener('forge-slider-change', ({ detail }: CustomEvent<ISliderChangeEventData>) => listener(detail));
  }

  public onRangeInput(listener: (value: ISliderRangeChangeEventData) => void): void {
    this._element.addEventListener('forge-slider-range-input', ({ detail }: CustomEvent<ISliderRangeChangeEventData>) => listener(detail));
  }

  public onRangeChange(listener: (value: ISliderRangeChangeEventData) => void): void {
    this._element.addEventListener('forge-slider-range-change', ({ detail }: CustomEvent<ISliderRangeChangeEventData>) => listener(detail));
  }

  public onFocus(listener: (evt: Event) => void): void {
    this._element.addEventListener('focus', evt => listener(evt));
  }

  public onBlur(listener: (evt: Event) => void): void {
    this._element.addEventListener('blur', evt => listener(evt));
  }

  protected _build(): ISliderComponent {
    return document.createElement(SLIDER_CONSTANTS.elementName);
  }
}
