import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { ILabelValueComponent, LABEL_VALUE_TAG_NAME } from '../label-value';

export type LabelValueComponentDelegateProps = Partial<ILabelValueComponent>;
export interface ILabelValueComponentDelegateOptions extends IBaseComponentDelegateOptions {
  labelText: string;
  valueText: string;
  iconElement?: HTMLElement;
}
export interface ILabelValueComponentDelegateConfig extends IBaseComponentDelegateConfig<ILabelValueComponent, ILabelValueComponentDelegateOptions> {}

export class LabelValueComponentDelegate extends BaseComponentDelegate<ILabelValueComponent, ILabelValueComponentDelegateOptions> {
  private _labelElement: HTMLElement;
  private _valueElement: HTMLElement;

  constructor(config?: ILabelValueComponentDelegateConfig) {
    super(config);
  }

  public get labelElement(): HTMLElement {
    return this._labelElement;
  }

  public get valueElement(): HTMLElement {
    return this._valueElement;
  }

  public get labelText(): string {
    return this._labelElement.textContent ?? '';
  }
  public set labelText(value: string) {
    this._labelElement.textContent = value;
  }

  public get valueText(): string {
    return this._valueElement.textContent ?? '';
  }
  public set valueText(value: string) {
    this._valueElement.textContent = value;
  }

  protected _build(): ILabelValueComponent {
    return document.createElement(LABEL_VALUE_TAG_NAME) as ILabelValueComponent;
  }

  protected override _configure(): void {
    if (this._config.options?.labelText) {
      this._labelElement = this._createTextElement(this._config.options.labelText, 'label');
    }
    if (this._config.options?.valueText) {
      this._valueElement = this._createTextElement(this._config.options.valueText, 'value');
    }
    if (this._config.options?.iconElement) {
      this._element.appendChild(this._config.options.iconElement);
    }
  }

  private _createTextElement(text: string, slot: string): HTMLElement {
    const span = document.createElement('span');
    span.textContent = text;
    span.slot = slot;
    this._element.appendChild(span);
    return span;
  }
}
