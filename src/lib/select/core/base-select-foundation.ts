import { isDefined, isDeepEqual, randomChars } from '@tylertech/forge-core';
import { OptionListenerDestructor } from '../select/select-adapter';
import { ISelectOption, ISelectOptionGroup, SelectSelectedTextBuilder, SelectOptionBuilder, BASE_SELECT_CONSTANTS, SelectBeforeValueChangeCallback } from './base-select-constants';
import { isSelectOptionType, SelectOptionType } from './select-utils';
import { IListDropdownConfig, ListDropdownHeaderBuilder, ListDropdownFooterBuilder } from '../../list-dropdown/list-dropdown-constants';
import { IBaseSelectAdapter } from './base-select-adapter';
import { IListDropdownAwareFoundation, ListDropdownAwareFoundation } from '../../list-dropdown/list-dropdown-aware-foundation';

export interface IBaseSelectFoundation extends IListDropdownAwareFoundation {
  value: any;
  selectedIndex: number | number[];
  options: ISelectOption[] | ISelectOptionGroup[];
  multiple: boolean;
  open: boolean;
  popupElement: HTMLElement | undefined;
  optionBuilder: SelectOptionBuilder;
  selectedTextBuilder: SelectSelectedTextBuilder;
  observeScroll: boolean;
  observeScrollThreshold: number;
  syncPopupWidth: boolean;
  beforeValueChange: SelectBeforeValueChangeCallback<any>;
  appendOptions(options: ISelectOption[] | ISelectOptionGroup[]): void;
  selectAll(): void;
  deselectAll(): void;
  initialize(): void;
  initializeTarget(): void;
  disconnect(): void;
}

export abstract class BaseSelectFoundation<T extends IBaseSelectAdapter> extends ListDropdownAwareFoundation implements IBaseSelectFoundation {
  protected _options: ISelectOption[] | ISelectOptionGroup[] = [];
  protected _value: any = [];
  protected _multiple = false;
  protected _open = false;
  protected _optionBuilder: SelectOptionBuilder;
  protected _selectedTextBuilder: SelectSelectedTextBuilder;
  protected _selectedValues: string[] = [];
  protected _selectedLabels: string[] = [];
  protected _selectedIndexes: number[] = [];
  protected _filterTimeout: number | undefined;
  protected _filterString = '';
  protected _identifier: string;
  protected _targetWidthCallback: () => number;
  protected _beforeValueChange: SelectBeforeValueChangeCallback<unknown>;
  private _focusListener: (evt: Event) => void;
  private _blurListener: (evt: FocusEvent) => void;
  private _clickListener: (evt: MouseEvent) => void;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _optionsChangedListener: (options: ISelectOption[] | ISelectOptionGroup[]) => void;
  private _optionListenerDestructor: OptionListenerDestructor;
  private _activeChangeListener: (id: string) => void;
  private _dropdownScrollEndListener: () => void;
  private _valueChanging: Promise<boolean> | undefined;
  private _dismissListener: () => void;

  constructor(protected _adapter: T) {
    super();
    this._focusListener = evt => this._onFocus(evt);
    this._blurListener = evt => this._onBlur(evt);
    this._clickListener = evt => this._onClick(evt);
    this._keydownListener = evt => this._onKeydown(evt);
    this._optionsChangedListener = options => this._onOptionsChanged(options);
    this._activeChangeListener = id => this._onActiveOptionChanged(id);
    this._dropdownScrollEndListener = () => this._onDropdownScrollEnd();
    this._dismissListener = () => this._onDismiss();
    this._identifier = randomChars();
  }

  protected abstract _onDropdownScrollEnd(): void;
  protected _onFocus(evt: Event): void {}

  public initialize(): void {
    this._optionListenerDestructor = this._adapter.setOptionsListener(this._optionsChangedListener);
    this._initializeValue();
  }

  public initializeTarget(): void {
    this._adapter.initializeAccessibility();
    this._adapter.setMultiple(this._multiple);
    this._adapter.addClickListener(this._clickListener);
    this._adapter.addTargetListener('blur', this._blurListener);
    this._adapter.addTargetListener('focus', this._focusListener);
    this._adapter.addTargetListener('keydown', this._keydownListener);
  }

  public disconnect(): void {
    this._adapter.removeClickListener(this._clickListener);
    this._adapter.removeTargetListener('blur', this._blurListener);
    this._adapter.removeTargetListener('focus', this._focusListener);
    this._adapter.removeTargetListener('keydown', this._keydownListener);

    if (this._open) {
      this._closeDropdown();
    }

    if (this._optionListenerDestructor) {
      this._optionListenerDestructor();
    }
  }

  public appendOptions(options: ISelectOption[] | ISelectOptionGroup[]): void {
    this._adapter.setOptions(options, false);
    if (this._open) {
      this._adapter.appendDropdownOptions(options);
    }
  }

  public selectAll(): void {
    if (this._multiple) {
      this.value = this._flatOptions.map(o => o.value);
    }
  }

  public deselectAll(): void {
    if (this._multiple) {
      this.value = [];
    }
  }

  protected get _flatOptions(): ISelectOption[] {
    if (isSelectOptionType(this._options, SelectOptionType.Group)) {
      return [].concat.apply([], (this._options as ISelectOptionGroup[]).map(g => g.options)) as ISelectOption[];
    }
    return this._options as ISelectOption[];
  }

  private get _nonDividerOptions(): ISelectOption[] {
    return this._flatOptions.filter(o => !o.divider);
  }

  protected _initializeValue(): void {
    const options = (this._options.length && this._options) || this._adapter.getOptions();
    if (isDefined(this._value) && options.length) {
      this._applyValue(this._value);
    }
  }

  protected _onClick(evt: MouseEvent): void {
    if (evt.button !== 0) {
      return;
    }
    if (!this._open) {
      this._openDropdown();
    } else {
      this._closeDropdown();
    }
  }

  protected _onBlur(evt: FocusEvent): void {
    // If the blur event was triggered by an element within the popup then ignore it
    if (this._adapter.isFocusWithinPopup(evt.relatedTarget as HTMLElement)) {
      return;
    }

    if (this._open) {
      this._closeDropdown();
    }
  }


  protected _openDropdown(): void {
    this._options = this._adapter.getOptions();

    if (!this._flatOptions.length) {
      return;
    }

    this._open = true;
    const config: IListDropdownConfig = {
      options: this._options,
      multiple: this._multiple,
      selectedValues: [...this._selectedValues],
      id: this._identifier,
      optionBuilder: this._optionBuilder,
      syncWidth: this._syncPopupWidth,
      observeScroll: this._observeScroll,
      observeScrollThreshold: this._observeScrollThreshold,
      scrollEndListener: this._dropdownScrollEndListener,
      activeChangeCallback: this._activeChangeListener,
      targetWidthCallback: this._targetWidthCallback,
      popupClasses: this._popupClasses,
      optionLimit: this._optionLimit,
      headerBuilder: this._popupHeaderBuilder,
      footerBuilder: this._popupFooterBuilder,
      closeCallback: () => this._closeDropdown(),
      selectCallback: (value: any) => {
        const flatOptions = this._flatOptions;
        const option = flatOptions.find(o => o.value === value);
        if (option) {
          const index = flatOptions.indexOf(option);
          this._onSelect(option, index, true);
        }
      }
    };
    this._adapter.open(config);
    this._adapter.setDismissListener(this._dismissListener);
  }

  /**
   * Closes the dropdown.
   */
  protected _closeDropdown(): void {
    this._open = false;
    this._adapter.close();
  }

  /**
   * Handles selecting an item in the dropdown.
   * @param {ISelectOption} option The selected option.
   * @param {number} optionIndex The index of the selected option.
   */
  protected async _onSelect(option: ISelectOption, optionIndex: number, closeDropdown = true): Promise<boolean> {
    return new Promise(async resolve => {
      if (this._valueChanging) {
        return Promise.resolve(false);
      }

      const value = option ? option.value : '';
      const label = option ? option.label : '';

      // Store the current selections in case we need to rollback (if the event was cancelled)
      const prevSelectedValues = [...this._selectedValues];
      const prevSelectedLabels = [...this._selectedLabels];
      const prevSelectedIndexes = [...this._selectedIndexes];

      if (this._multiple) {
        if (this._selectedValues.includes(value)) {
          const index = this._selectedValues.indexOf(value);
          this._selectedValues.splice(index, 1);
          this._selectedLabels.splice(index, 1);
          this._selectedIndexes.splice(index, 1);
        } else {
          this._selectedValues.push(value);
          this._selectedLabels.push(label);
          this._selectedIndexes.push(optionIndex);
        }
      } else {
        if (isDefined(value)) {
          this._selectedValues[0] = value;
          this._selectedLabels[0] = label;
          this._selectedIndexes[0] = optionIndex;
        } else {
          this._selectedValues = [];
          this._selectedLabels = [];
          this._selectedIndexes = [];
        }
      }

      const rollbackValue = (): void => {
        this._selectedValues = [...prevSelectedValues];
        this._selectedLabels = [...prevSelectedLabels];
        this._selectedIndexes = [...prevSelectedIndexes];
      };

      const applyValue = (): void => {
        // Always keep the internal value in sync in case the component needs to reinitialize with the existing value later on
        this._value = [...this._selectedValues];

        // If we're in multiselect mode, we need to toggle the selected option
        if (this._multiple) {
          const isSelected = this._selectedIndexes.includes(optionIndex);
          this._adapter.toggleOptionMultiple(optionIndex, isSelected);
        }

        this._applySelection();
      };

      const data = this.multiple ? [...this._selectedValues] : this._selectedValues[0];

      // We close the dropdown immediately if in single selection mode
      if (this._open && closeDropdown && !this._multiple) {
        this._closeDropdown();
      }

      // First we check to see if there is an before change callback and execute that
      if (typeof this._beforeValueChange === 'function') {
        this._valueChanging = Promise.resolve(this._beforeValueChange.call(null, data));
        const shouldContinue = await this._valueChanging;
        this._valueChanging = undefined;
        if (!shouldContinue) {
          rollbackValue();
          return resolve(false);
        }
      }

      // Now we can emit the change event AFTER the before change callback has been executed and returned true
      const cancelled = !this._adapter.emitHostEvent(BASE_SELECT_CONSTANTS.events.CHANGE, data, true, true);
      if (!cancelled) {
        applyValue();
      } else {
        rollbackValue();
      }

      resolve(!cancelled);
    });
  }

  private _selectActiveOption(): void {
    const activeOptionIndex = this._adapter.getActiveOptionIndex();
    if (activeOptionIndex >= 0 && this._nonDividerOptions[activeOptionIndex]) {
      this._onSelect(this._nonDividerOptions[activeOptionIndex], activeOptionIndex);
    }
  }

  protected _reset(): void {
    this._selectedValues = [];
    this._selectedLabels = [];
    this._selectedIndexes = [];
  }

  protected _applyValue(value: string | string[]): void {
    this._selectedValues = [];
    this._selectedLabels = [];

    this._options = this._adapter.getOptions();

    if (!Array.isArray(value)) {
      value = [value];
    }

    this._value = [];

    // Ensure that the values passed are actually existing options
    for (const val of value) {
      if (!this._value.includes(val)) {
        this._value.push(val);
      }
      const option = this._flatOptions.find(o => isDeepEqual(o.value, val));
      if (option) {
        this._selectedValues.push(option.value);
        this._selectedLabels.push(option.label);
      }
    }

    // Update the selected indexes based on the values that are now selected
    this._selectedIndexes = this._selectedValues.map(val => this._flatOptions.findIndex(o => o.value === val));

    // Update the selected options in the dropdown
    this._adapter.patchSelectedValues(this._selectedValues);
  }
  
  /**
   * Handles the user dismissing the dropdown.
   */
  protected _onDismiss(): void {
    this._closeDropdown();
  }

  /** Creates the selected text value from the selected label values. */
  protected _getSelectedText(): string {
    if (typeof this._selectedTextBuilder === 'function') {
      const selectedOptions = this._flatOptions.filter(o => this._selectedValues.includes(o.value));
      return this._selectedTextBuilder(selectedOptions);
    }

    if (this._multiple) {
      if (this._selectedLabels.length) {
        return `${this._selectedLabels.length} ${this._selectedLabels.length === 1 ? 'option' : 'options'} selected`;
      } else {
        return '';
      }
    }
    
    return this._selectedLabels
      .filter(v => v && v.length)
      .join(' ')
      .trim();
  }

  private _onKeydown(evt: KeyboardEvent): void {
    const isEscapeKey = evt.key === 'Escape' || evt.keyCode === 27;
    const isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    const isSpace = evt.key === 'Space' || evt.keyCode === 32;
    const isArrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
    const isArrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
    const isFilterableCharacter = evt.keyCode >= 48 && evt.keyCode <= 90;
    const isHomeKey = evt.key === 'Home' || evt.keyCode === 36;
    const isEndKey = evt.key === 'End' || evt.keyCode === 35;
    const isTabKey = evt.key === 'Tab';

    // We automatically select the active option if the dropdown is open and in single selection mode
    if (isTabKey && this._open && !this._multiple) {
      this._selectActiveOption();
      return;
    }

    // If an active filter was started, clear it now
    if (!isFilterableCharacter && this._filterTimeout) {
      window.clearTimeout(this._filterTimeout);
      this._filterString = '';
      this._filterTimeout = undefined;
    }

    if (isEscapeKey) {
      evt.preventDefault();
      if (this._open) {
        this._closeDropdown();
        return;
      }
    }

    if (isSpace) {
      evt.preventDefault();

      if (!this._open) {
        this._openDropdown();
      } else {
        this._closeDropdown();
      }
    } else if (isEnter) {
      if (this._open) {
        evt.stopPropagation();
        evt.preventDefault();
        this._options = this._adapter.getOptions();
        this._selectActiveOption();
      }
    } else if (isArrowUp || isArrowDown) {
      evt.preventDefault();

      if (this._multiple && !this._open) {
        this._openDropdown();
        this._adapter.activateFirstOption();
        return;
      }

      if (this._flatOptions.length === 0) {
        return;
      }

      let optionIndex = 0;
      if (this._open) {
        optionIndex = this._adapter.getActiveOptionIndex();
        if (optionIndex === -1) {
          optionIndex = this._getFirstSelectedOptionIndex();
        }
      } else {
        optionIndex = this._getFirstSelectedOptionIndex();
      }

      if (isArrowUp) {
        optionIndex = this._getPreviousHighlightableOptionIndex(optionIndex, this._nonDividerOptions);
      } else {
        optionIndex = this._getNextHighlightableOptionIndex(optionIndex, this._nonDividerOptions);
      }

      // If the dropdown is open then we just move the active index, otherwise we change the selection (to mimic the native <select>)
      if (this._open) {
        this._adapter.highlightActiveOption(optionIndex);
      } else {
        this._onSelect(this._nonDividerOptions[optionIndex], optionIndex);
      }
    } else if (isHomeKey) {
      if (this._open) {
        evt.preventDefault();
        this._adapter.highlightActiveOption(this._nonDividerOptions.findIndex(o => !o.disabled));
      }
    } else if (isEndKey) {
      if (this._open) {
        evt.preventDefault();
        const options = this._nonDividerOptions;
        for (let i = options.length - 1; i >= 0; i--) {
          if (!options[i].disabled) {
            this._adapter.highlightActiveOption(i);
            break;
          }
        }
      }
    } else if (isFilterableCharacter) {
      this._filter(evt.key);
    }
  }

  private _getFirstSelectedOptionIndex(): number {
    return this._nonDividerOptions.findIndex(option => this._selectedValues.includes(option.value));
  }

  private _getPreviousHighlightableOptionIndex(startIndex: number, options: ISelectOption[]): number {
    let index = startIndex;
    if (index <= 0) {
      index = options.length - 1;
    } else {
      index--;
    }
    if (options[index].disabled) {
      return this._getPreviousHighlightableOptionIndex(index, options);
    }
    return index;
  }

  private _getNextHighlightableOptionIndex(startIndex: number, options: ISelectOption[]): number {
    let index = startIndex;
    if (index === options.length - 1) {
      index = 0;
    } else {
      index++;
    }
    if (options[index].disabled) {
      return this._getNextHighlightableOptionIndex(index, options);
    }
    return index;
  }

  private _filter(key: string): void {
    // This allows for typing numbers and/or characters while the select is focused to auto-select the closest match
    if (this._filterTimeout) {
      window.clearTimeout(this._filterTimeout);
      this._filterTimeout = undefined;
    }
    this._filterString += key;
    this._filterTimeout = window.setTimeout(() => {
      this._filterString = '';
      this._filterTimeout = undefined;
    }, 300);
    this._options = this._adapter.getOptions();
    // TODO(kieran.nichols): Enhance this to cycle through closest matches (see the native select)
    const matchedOption = this._flatOptions.find(option => !option.disabled && option.label.toLowerCase().startsWith(this._filterString));
    if (matchedOption) {
      const optionIndex = this._flatOptions.indexOf(matchedOption);
      if (this._open) {
        this._adapter.highlightActiveOption(optionIndex);
      } else if (!this._multiple) {
        this._onSelect(matchedOption, optionIndex, false);
      }
    }
  }

  private _onOptionsChanged(options: ISelectOption[] | ISelectOptionGroup[]): void {
    this._options = options;
    this._applyValue(this._value);
  }

  private _onActiveOptionChanged(id: string): void {
    this._adapter.updateActiveDescendant(id);
  }

  /** Gets/sets the value of the component. */
  public get value(): any {
    return this._multiple ? [...this._selectedValues] : this._selectedValues[0];
  }
  public set value(value: any) {
    let _value: string | string[];
  
    if (Array.isArray(value)) {
      _value = [ ...value ];
    } else {
      _value = value;
    }

    this._applyValue(_value);
  }

  /** Gets/sets the selected index(s). */
  public get selectedIndex(): number | number[] {
    return this._multiple ? [ ...this._selectedIndexes ] : this._selectedIndexes[0];
  }
  public set selectedIndex(indexes: number | number[]) {
    this._options = this._adapter.getOptions();

    let indicies: number [];
    if (Array.isArray(indexes)) {
      indicies = [ ...indexes ];
    } else {
      indicies = [indexes];
    }

    indicies.sort();

    if (this.multiple) {
      this.value = indicies
                    .map(index => this._flatOptions[index])
                    .filter(o => o)
                    .map(o => o.value);
    } else {
      const option = this._flatOptions[indicies[indicies.length - 1]];
      if (!option) {
        return;
      }
      this.value = option.value;
    }
  }

  /** Gets/sets the available options. */
  public get options(): ISelectOption[] | ISelectOptionGroup[] {
    return this._adapter.getOptions();
  }
  public set options(value: ISelectOption[] | ISelectOptionGroup[]) {
    let _value: ISelectOption[] | ISelectOptionGroup[];
    if (isSelectOptionType(value, SelectOptionType.Group)) {
      _value = (value as ISelectOptionGroup[]).map(v => ({ ...v }));
    } else {
      _value = (value as ISelectOption[]).map(v => ({ ...v }));
    }

    this._options = _value;
    this._adapter.setOptions(_value); // Must set options before intializing value
    this._initializeValue();

    if (this._open) {
      this._adapter.setDropdownOptions(_value);
    }
  }

  /** Gets/sets the multiple select state. */
  public get multiple(): boolean {
    return this._multiple;
  }
  public set multiple(value: boolean) {
    if (this._multiple !== value) {
      this._multiple = value;
      this._reset();
      if (this._open) {
        this._closeDropdown();
      }
      this._adapter.setMultiple(this._multiple);
    }
  }

  /** Gets/sets the open state of the dropdown. */
  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (this._open !== value) {
      if (value) {
        this._openDropdown();
      } else {
        this._closeDropdown();
      }
    }
  }

  /** Gets/sets the builder callback to use when building options. */
  public get optionBuilder(): SelectOptionBuilder {
    return this._optionBuilder;
  }
  public set optionBuilder(value: SelectOptionBuilder) {
    this._optionBuilder = value;
  }

  /** Sets the selected text builder callback that will be executed when getting the selected text to display in the field. */
  public get selectedTextBuilder(): SelectSelectedTextBuilder {
    return this._selectedTextBuilder;
  }
  public set selectedTextBuilder(fn: SelectSelectedTextBuilder) {
    this._selectedTextBuilder = fn;
  }

  public get observeScroll(): boolean {
    return this._observeScroll;
  }
  public set observeScroll(value: boolean) {
    this._observeScroll = value;
  }

  public get observeScrollThreshold(): number {
    return this._observeScrollThreshold;
  }
  public set observeScrollThreshold(value: number) {
    this._observeScrollThreshold = value;
  }

  public get syncPopupWidth(): boolean {
    return this._syncPopupWidth;
  }
  public set syncPopupWidth(value: boolean) {
    this._syncPopupWidth = value;
  }


  public get optionLimit(): number {
    return this._optionLimit;
  }
  public set optionLimit(value: number) {
    this._optionLimit = value;
  }
  
  public get popupClasses(): string | string[] {
    return this._popupClasses;
  }
  public set popupClasses(value: string | string[]) {
    this._popupClasses = value;
  }

  public get popupHeaderBuilder(): ListDropdownHeaderBuilder {
    return this._popupHeaderBuilder;
  }
  public set popupHeaderBuilder(value: ListDropdownHeaderBuilder) {
    this._popupHeaderBuilder = value;
  }

  public get popupFooterBuilder(): ListDropdownFooterBuilder {
    return this._popupFooterBuilder;
  }
  public set popupFooterBuilder(value: ListDropdownFooterBuilder) {
    this._popupFooterBuilder = value;
  }

  /** Gets the currently active popup element when the dropdown is open. */
  public get popupElement(): HTMLElement | undefined {
    return this._adapter.popupElement;
  }

  /** Sets the callback to be executed when the user selects a value. */
  public get beforeValueChange(): SelectBeforeValueChangeCallback<any> {
    return this._beforeValueChange;
  }
  public set beforeValueChange(value: SelectBeforeValueChangeCallback<any>) {
    this._beforeValueChange = value;
  }
}
