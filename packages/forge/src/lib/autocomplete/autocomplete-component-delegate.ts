import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core/delegates/form-field-component-delegate.js';
import { TextFieldComponentDelegate } from '../text-field/index.js';
import { IAutocompleteComponent } from './autocomplete.js';
import { AUTOCOMPLETE_CONSTANTS } from './autocomplete-constants.js';
import { IconComponentDelegate, IIconComponentDelegateConfig } from '../icon/index.js';
import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate.js';
import { ITextFieldComponentDelegateConfig } from '../text-field/text-field-component-delegate.js';

export type AutocompleteComponentDelegateProps = Partial<IAutocompleteComponent>;
export interface IAutocompleteComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  useDropdownIcon?: boolean;
  textFieldDelegateConfig?: ITextFieldComponentDelegateConfig;
}

export interface IAutocompleteComponentDelegateConfig extends IBaseComponentDelegateConfig<IAutocompleteComponent, IAutocompleteComponentDelegateOptions> {}

export class AutocompleteComponentDelegate extends FormFieldComponentDelegate<IAutocompleteComponent, IAutocompleteComponentDelegateOptions> {
  private _textFieldDelegate: TextFieldComponentDelegate;

  constructor(config?: IAutocompleteComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IAutocompleteComponent {
    const autocomplete = document.createElement(AUTOCOMPLETE_CONSTANTS.elementName) as IAutocompleteComponent;
    this._attachTextField(autocomplete);
    return autocomplete;
  }

  public get textFieldDelegate(): TextFieldComponentDelegate {
    return this._textFieldDelegate;
  }

  public get value(): any {
    return this._element.value;
  }
  public set value(value: any) {
    this._element.value = value;
  }

  public get disabled(): boolean {
    return this._textFieldDelegate.inputElement.disabled;
  }
  public set disabled(value: boolean) {
    this._textFieldDelegate.inputElement.disabled = value;
  }

  public get invalid(): boolean {
    return this._textFieldDelegate.invalid || false;
  }
  public set invalid(value: boolean) {
    this._textFieldDelegate.invalid = value;
  }

  public onChange(listener: (value: string) => void): void {
    this._element.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, (evt: CustomEvent) => listener(evt.detail));
  }

  public onFocus(listener: (evt: FocusEvent) => void): void {
    this._textFieldDelegate.inputElement.addEventListener('focus', (evt: FocusEvent) => listener(evt));
  }

  public onBlur(listener: (evt: FocusEvent) => void): void {
    this._textFieldDelegate.inputElement.addEventListener('blur', (evt: FocusEvent) => listener(evt));
  }

  private _attachTextField(autocomplete: IAutocompleteComponent): void {
    const textFieldConfig: ITextFieldComponentDelegateConfig = {
      props: { ...this._config.options?.textFieldDelegateConfig?.props },
      options: { ...this._config.options?.textFieldDelegateConfig?.options }
    };

    if (!textFieldConfig.options) {
      textFieldConfig.options = {};
    }

    if (this._config.options?.useDropdownIcon !== false && !textFieldConfig.options?.trailingElement) {
      textFieldConfig.options.trailingElement = this._createDropdownIconElement();
    }

    this._textFieldDelegate = new TextFieldComponentDelegate(textFieldConfig);
    autocomplete.appendChild(this._textFieldDelegate.element);
  }

  private _createDropdownIconElement(): HTMLElement {
    const config: IIconComponentDelegateConfig = {
      props: {
        slot: 'trailing',
        name: 'arrow_drop_down'
      },
      options: {
        attributes: { 'forge-dropdown-icon': '' }
      }
    };
    return new IconComponentDelegate(config).element;
  }
}
