import { ButtonComponentDelegate } from '../button/button-component-delegate';
import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { IFilePickerComponent } from './file-picker';
import { FILE_PICKER_CONSTANTS, IFilePickerChangeEventData } from './file-picker-constants';

export type FilePickerComponentDelegateProps = Partial<IFilePickerComponent>;
export interface IFilePickerComponentDelegateOptions extends IBaseComponentDelegateOptions {
  primaryText?: string;
  secondaryText?: string;
  helperText?: string;
  buttonText?: string;
}
export interface IFilePickerComponentDelegateConfig extends IBaseComponentDelegateConfig<IFilePickerComponent, IFilePickerComponentDelegateOptions> {}

export class FilePickerComponentDelegate extends BaseComponentDelegate<IFilePickerComponent, IFilePickerComponentDelegateOptions> {
  constructor(config?: IFilePickerComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IFilePickerComponent {
    return document.createElement(FILE_PICKER_CONSTANTS.elementName);
  }

  protected _configure(): void {
    if (this._config.options?.primaryText) {
      const primarySpan = document.createElement('span');
      primarySpan.slot = 'primary';
      primarySpan.textContent = this._config.options.primaryText;
      this._element.appendChild(primarySpan);
    }

    if (this._config.options?.secondaryText) {
      const secondarySpan = document.createElement('span');
      secondarySpan.slot = 'secondary';
      secondarySpan.textContent = this._config.options.secondaryText;
      this._element.appendChild(secondarySpan);
    }

    if (this._config.options?.buttonText) {
      new ButtonComponentDelegate({
        options: {
          parent: this._element,
          text: this._config.options.buttonText
        },
        props: { variant: 'outlined' }
      });
    }

    if (this._config.options?.helperText) {
      const helperTextSpan = document.createElement('span');
      helperTextSpan.slot = 'helper-text';
      helperTextSpan.textContent = this._config.options.helperText;
      this._element.appendChild(helperTextSpan);
    }
  }

  public onChange(cb: (evt: IFilePickerChangeEventData) => void): void {
    this._element.addEventListener(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, (evt: CustomEvent<IFilePickerChangeEventData>) => cb(evt.detail));
  }
}
