import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core';
import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate';
import { ISliderComponent } from '../slider';
import { ISliderChangeEventData, SLIDER_CONSTANTS } from './slider-constants';

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

  public get disabled(): boolean {
    return this._element.disabled;
  }
  public set disabled(value: boolean) {
    this._element.disabled = value;
  }

  public onChange(listener: (value: ISliderChangeEventData) => void): void {
    this._element.addEventListener('forge-slider-change', ({ detail }: CustomEvent<ISliderChangeEventData>) => listener(detail));
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
