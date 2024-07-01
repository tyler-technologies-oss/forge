import { IAppBarSearchAdapter } from './app-bar-search-adapter';
import { APP_BAR_SEARCH_CONSTANTS, IAppBarSearchInputEventData } from './app-bar-search-constants';

export interface IAppBarSearchCore {
  disabled: boolean;
  value: string;
  placeholder: string;
}

export class AppBarSearchCore implements IAppBarSearchCore {
  private _disabled = false;

  private _keydownListener = (evt: KeyboardEvent): void => this._onKeydown(evt);

  constructor(private _adapter: IAppBarSearchAdapter) {}

  public initialize(): void {
    this._adapter.initialize();
    this._tryForwardInputState();
    this._adapter.addInputEventListener('keydown', this._keydownListener);
  }

  private _tryForwardInputState(): void {
    if (this._disabled) {
      this._adapter.setInputProperty('disabled', this._disabled);
    }
    if (this._adapter.hasHostAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.VALUE)) {
      this._adapter.setInputProperty('value', this._adapter.getHostAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.VALUE) as string);
    }
    if (this._adapter.hasHostAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.PLACEHOLDER)) {
      this._adapter.setInputProperty('placeholder', this._adapter.getHostAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.PLACEHOLDER) as string);
    }
  }

  private _onKeydown({ key, target }: KeyboardEvent): void {
    if (this._disabled) {
      return;
    }

    if (key === 'Enter') {
      const data: IAppBarSearchInputEventData = {
        value: (target as HTMLInputElement).value
      };
      this._adapter.emitHostEvent(APP_BAR_SEARCH_CONSTANTS.events.INPUT, data, true);
    }
  }

  public destroy(): void {
    this._adapter.removeInputEventListener('keydown', this._keydownListener);
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._disabled = value;
      this._adapter.setInputProperty('disabled', this._disabled);
      this._adapter.toggleHostAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get value(): string {
    return this._adapter.getInputProperty('value');
  }
  public set value(value: string) {
    this._adapter.setInputProperty('value', value);
  }

  public get placeholder(): string {
    return this._adapter.getInputProperty('placeholder');
  }

  public set placeholder(value: string) {
    this._adapter.setInputProperty('placeholder', value);
  }
}
