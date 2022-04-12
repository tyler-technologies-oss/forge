import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IAppBarSearchAdapter } from './app-bar-search-adapter';
import { APP_BAR_SEARCH_CONSTANTS, IAppBarSearchInputEventData } from './app-bar-search-constants';
import { IOption } from '../../select';

export interface IAppBarSearchFoundation extends ICustomElementFoundation {
  disabled: boolean;
  value: string;
  placeholder: string;
  combined: boolean;
  combinedOptions: IOption[];
  selectedCombinedOption: string;
  global: boolean;
}

/**
 * Provides facilities and helper methods for creating an app-bar-search component.
 */
export class AppBarSearchFoundation implements IAppBarSearchFoundation {
  private _disabled = false;
  private _combined = false;
  private _combinedContext = APP_BAR_SEARCH_CONSTANTS.strings.DEFAULT_CONTEXT;
  private _combinedOptions: IOption[] = [];
  private _selectedCombinedOption: string;
  private _global = false;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _focusListener: (evt: Event) => void;
  private _blurListener: (evt: Event) => void;

  constructor(private _adapter: IAppBarSearchAdapter) {
    this._keydownListener = evt => this._onKeyDown(evt);
    this._focusListener = evt => this._onFocus(evt);
    this._blurListener = evt => this._onBlur(evt);
  }

  public initialize(): void {
    this._adapter.initialize();

    if (!this._adapter.hasInputElement()) {
      throw new Error('An input element is required as a child of the app-bar-search component.');
    }

    this._adapter.setGlobalIconVisibility(this._global);
    this._adapter.setContextVisibility(this._combined);
    this._adapter.addSearchInputEventListener('keydown', this._keydownListener);
    this._adapter.addSearchInputEventListener('focus', this._focusListener);
    this._adapter.addSearchInputEventListener('blur', this._blurListener);
  }

  /**
   * Handles keydown events on our search input.
   * @param {KeyboardEvent} evt
   */
  private _onKeyDown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.keyCode === 13) {
      const data: IAppBarSearchInputEventData = {
        value: (evt.target as HTMLInputElement).value,
        combined: this._combined,
        context: this._combinedContext
      };
      this._adapter.emitHostEvent(APP_BAR_SEARCH_CONSTANTS.events.INPUT, data, true);
    }
  }

  private _onFocus(evt: Event): void {
    this._adapter.addRootClass(APP_BAR_SEARCH_CONSTANTS.classes.FOCUSED);
  }

  private _onBlur(evt: Event): void {
    this._adapter.removeRootClass(APP_BAR_SEARCH_CONSTANTS.classes.FOCUSED);
  }

  public disconnect(): void {
    this._adapter.removeSearchInputEventListener('keydown', this._keydownListener);
    this._adapter.removeSearchInputEventListener('focus', this._focusListener);
    this._adapter.removeSearchInputEventListener('blur', this._blurListener);
  }

  /** Gets/sets the disabled state of the input. */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  /** Gets/sets the input value. */
  public get value(): string {
    return this._adapter.getInputValue();
  }
  public set value(value: string) {
    this._adapter.setInputValue(value);
  }

  /** Sets the placeholder text. */
  public set placeholder(value: string) {
    this._adapter.setInputPlaceholder(value);
  }

  /** Gets/sets the combined bool. */
  public get combined(): boolean {
    return this._combined;
  }
  public set combined(value: boolean) {
    if (this._combined !== value) {
      this._combined = value;
      this._adapter.setContextVisibility(this._combined);
    }
  }

  /** Gets/sets options for the combined search dropdown. */
  // Note: this is currently the end of the combinedOptions implemention.
  //   In the future this will feed into a select or menu type dropdown.
  public get combinedOptions(): IOption[] {
    if (!this._combinedOptions) {
      return [];
    }

    return this._combinedOptions.map(co => ({ ...co }));
  }
  public set combinedOptions(value: IOption[]) {
    if (!value) {
      this._combinedOptions = [];
    }

    this._combinedOptions = value.map(v => ({ ...v }));
  }

  /** Gets/sets selected option for the combined search dropdown. */
  // Note: this is currently the end of the selectedCombinedOption implemention.
  //   In the future this will hold the selected select or menu type dropdown value.
  public get selectedCombinedOption(): string {
    return this._selectedCombinedOption;
  }
  public set selectedCombinedOption(value: string) {
    if (this._selectedCombinedOption !== value) {
      this._selectedCombinedOption = value;
    }
  }

  /** Gets/sets the input value. */
  public get global(): boolean {
    return this._global;
  }
  public set global(value: boolean) {
    if (this._global !== value) {
      this._global = value;
      this._adapter.setGlobalIconVisibility(this._global);
    }
  }
}
