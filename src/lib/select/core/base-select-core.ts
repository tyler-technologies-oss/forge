import { isDefined, isDeepEqual, randomChars } from '@tylertech/forge-core';
import { OptionListenerDestructor } from '../select/select-adapter';
import {
  ISelectOption,
  ISelectOptionGroup,
  SelectSelectedTextBuilder,
  SelectOptionBuilder,
  BASE_SELECT_CONSTANTS,
  SelectBeforeValueChangeCallback
} from './base-select-constants';
import { isSelectOptionType, SelectOptionType } from './select-utils';
import {
  IListDropdownConfig,
  ListDropdownHeaderBuilder,
  ListDropdownFooterBuilder,
  LIST_DROPDOWN_CONSTANTS
} from '../../list-dropdown/list-dropdown-constants';
import { IBaseSelectAdapter } from './base-select-adapter';
import { IListDropdownAwareCore, ListDropdownAwareCore } from '../../list-dropdown/list-dropdown-aware-core';

export interface IBaseSelectCore extends IListDropdownAwareCore {
  value: any;
  selectedIndex: number | number[];
  options: ISelectOption[] | ISelectOptionGroup[];
  multiple: boolean;
  open: boolean;
  popupElement: HTMLElement | undefined;
  optionBuilder: SelectOptionBuilder;
  selectedTextBuilder: SelectSelectedTextBuilder;
  beforeValueChange: SelectBeforeValueChangeCallback<any>;
  selectAllLabel: string;
  appendOptions(options: ISelectOption[] | ISelectOptionGroup[]): void;
  selectAll(): void;
  deselectAll(): void;
  initialize(): void;
  initializeTarget(): void;
  destroy(): void;
}

export abstract class BaseSelectCore<T extends IBaseSelectAdapter> extends ListDropdownAwareCore implements IBaseSelectCore {
  protected _options: ISelectOption[] | ISelectOptionGroup[] = [];
  protected _value: any = [];
  protected _multiple = false;
  protected _open = false;
  protected _showSelectAll = false;
  protected _selectAllLabel: string;
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

  protected _onSelectAll(): void {
    if (!this._multiple) {
      return;
    }

    const currentlyAllSelected = this._selectedValues.length === this._nonDividerOptions.length;
    const willSelectAll = !currentlyAllSelected;

    // Emit the select all event
    const newValue = willSelectAll ? this._nonDividerOptions.map(o => o.value) : [];
    const cancelled = !this._adapter.emitHostEvent(
      'forge-select-all',
      {
        value: newValue,
        isAllSelected: willSelectAll
      },
      true,
      true
    );

    if (!cancelled) {
      if (willSelectAll) {
        this.selectAll();
      } else {
        this.deselectAll();
      }

      // Emit the standard change event
      const changeData = this._multiple ? [...this._selectedValues] : this._selectedValues[0];
      this._adapter.emitHostEvent(BASE_SELECT_CONSTANTS.events.CHANGE, changeData, true, true);

      // Update the dropdown to reflect the new selection state
      if (this._open) {
        // Preserve the currently active option index before updating selections
        const activeOptionIndex = this._adapter.getActiveOptionIndex();
        this._adapter.patchSelectedValues(this._selectedValues);
        // Update the select all checkbox to reflect its new state
        this._updateSelectAllState();
        // Restore the active option to preserve highlighting
        if (activeOptionIndex >= 0) {
          this._adapter.highlightActiveOption(activeOptionIndex);
        }
      }
    }
  }

  /** Updates the select all checkbox state based on current selections */
  private _updateSelectAllState(): void {
    if (!this._showSelectAll || !this._multiple || !this._open) {
      return;
    }

    const allSelected = this._selectedValues.length === this._nonDividerOptions.length;
    // The select all option is always at dropdown index 0
    this._adapter.toggleOptionMultiple(0, allSelected);
  }

  public initialize(): void {
    if (this._optionListenerDestructor) {
      this._optionListenerDestructor();
    }
    this._optionListenerDestructor = this._adapter.setOptionsListener(this._optionsChangedListener);
    this._initializeValue();
  }

  public initializeTarget(): void {
    this._adapter.initializeAccessibility();
    this._adapter.addClickListener(this._clickListener);
    this._adapter.addTargetListener('blur', this._blurListener);
    this._adapter.addTargetListener('focus', this._focusListener);
    this._adapter.addTargetListener('keydown', this._keydownListener);
  }

  public destroy(): void {
    this._adapter.removeClickListener(this._clickListener);
    this._adapter.removeTargetListener('blur', this._blurListener);
    this._adapter.removeTargetListener('focus', this._focusListener);
    this._adapter.removeTargetListener('keydown', this._keydownListener);

    if (this._optionListenerDestructor) {
      this._optionListenerDestructor();
    }

    this._open = false;
    this._adapter.destroyListDropdown();
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
      return this._options.flatMap(g => g.options);
    }
    return this._options as ISelectOption[];
  }

  private get _nonDividerOptions(): ISelectOption[] {
    return this._flatOptions.filter(o => !o.divider);
  }

  /** Adjusts an index from list-dropdown coordinate system to select coordinate system */
  private _adjustIndexFromDropdown(dropdownIndex: number): number {
    // If select all is shown and enabled, the first option (index 0) in the dropdown is select all
    // So we need to subtract 1 from the dropdown index to get the actual option index
    if (this._showSelectAll && this._multiple && dropdownIndex > 0) {
      return dropdownIndex - 1;
    }
    return dropdownIndex;
  }

  /** Adjusts an index from select coordinate system to list-dropdown coordinate system */
  private _adjustIndexToDropdown(selectIndex: number): number {
    // If select all is shown and enabled, we need to add 1 to account for the select all option
    if (this._showSelectAll && this._multiple) {
      return selectIndex + 1;
    }
    return selectIndex;
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
      referenceElement: this._adapter.hostElement,
      multiple: this._multiple,
      selectedValues: [...this._selectedValues],
      id: this._identifier,
      optionBuilder: this._optionBuilder,
      syncWidth: this._syncPopupWidth,
      constrainViewportWidth: this._constrainPopupWidth,
      wrapOptionText: this._wrapOptionText,
      observeScroll: this._observeScroll,
      observeScrollThreshold: this._observeScrollThreshold,
      scrollEndListener: this._dropdownScrollEndListener,
      activeChangeCallback: this._activeChangeListener,
      targetWidthCallback: this._targetWidthCallback,
      popupPlacement: this._popoverPlacement,
      popupOffset: this._popoverOffset,
      popupFlip: this._popoverFlip,
      popupShift: this._popoverShift,
      popupFallbackPlacements: this._popoverFallbackPlacements,
      popupClasses: this._popupClasses,
      optionLimit: this._optionLimit,
      headerBuilder: this._popupHeaderBuilder,
      footerBuilder: this._popupFooterBuilder,
      showSelectAll: this._showSelectAll && this._multiple,
      selectAllLabel: this._selectAllLabel,
      closeCallback: () => this._closeDropdown(),
      selectCallback: (value: any) => {
        // Handle select all option
        if (value === LIST_DROPDOWN_CONSTANTS.selectAllOption.VALUE) {
          this._onSelectAll();
          return;
        }

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

    // Ensure select all state is synchronized after opening dropdown
    this._updateSelectAllState();
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
    if (this._valueChanging) {
      return false;
    }

    const value = option ? option.value : '';
    const label = option ? option.label : '';

    // Store the current selections in case we need to rollback (if the event was cancelled)
    const prevValues = [...this._value];
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

    this._value = [...this._selectedValues];

    const rollbackValue = (): void => {
      this._selectedValues = [...prevSelectedValues];
      this._selectedLabels = [...prevSelectedLabels];
      this._selectedIndexes = [...prevSelectedIndexes];
      this._value = [...prevValues];
    };

    const applyValue = (): void => {
      // If we're in multiselect mode, we need to toggle the selected option
      if (this._multiple) {
        const isSelected = this._selectedIndexes.includes(optionIndex);
        const dropdownIndex = this._adjustIndexToDropdown(optionIndex);
        this._adapter.toggleOptionMultiple(dropdownIndex, isSelected);

        // Update select all checkbox state if it's visible
        if (this._showSelectAll && this._open) {
          // Preserve the currently active option index before updating select all state
          const activeOptionIndex = this._adapter.getActiveOptionIndex();
          this._updateSelectAllState();
          // Restore the active option to preserve highlighting
          if (activeOptionIndex >= 0) {
            this._adapter.highlightActiveOption(activeOptionIndex);
          }
        }
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
        this._tryUpdateDropdownPosition();
        return false;
      }
    }

    // Now we can emit the change event AFTER the before change callback has been executed and returned true
    const cancelled = !this._adapter.emitHostEvent(BASE_SELECT_CONSTANTS.events.CHANGE, data, true, true);
    if (!cancelled) {
      applyValue();
    } else {
      rollbackValue();
    }

    this._tryUpdateDropdownPosition();
    return !cancelled;
  }

  private _selectActiveOption(): void {
    const activeDropdownIndex = this._adapter.getActiveOptionIndex();
    if (activeDropdownIndex >= 0) {
      // Check if the active option is the select all option
      if (this._showSelectAll && this._multiple && activeDropdownIndex === 0) {
        this._onSelectAll();
        return;
      }

      const adjustedIndex = this._adjustIndexFromDropdown(activeDropdownIndex);
      if (this._nonDividerOptions[adjustedIndex]) {
        this._onSelect(this._nonDividerOptions[adjustedIndex], adjustedIndex);
      }
    }
  }

  protected _tryUpdateDropdownPosition(): void {
    if (this._open) {
      this._adapter.queueDropdownPositionUpdate();
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
        if (this._selectedLabels.length === 1) {
          return this._selectedLabels[0];
        } else {
          return `${this._selectedLabels.length} options selected`;
        }
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
      evt.stopPropagation();
      if (this._open) {
        this._closeDropdown();
        return;
      }
    }

    if (isSpace) {
      evt.preventDefault();
      evt.stopPropagation();

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

      if (!this._open) {
        this._openDropdown();
        this._adapter.activateFirstOption();
        return;
      }

      if (this._flatOptions.length === 0) {
        return;
      }

      let dropdownIndex = 0;
      if (this._open) {
        dropdownIndex = this._adapter.getActiveOptionIndex();
        if (dropdownIndex === -1) {
          // No option is currently active, so activate the first/last highlightable option based on direction
          if (isArrowUp) {
            dropdownIndex = this._getLastHighlightableDropdownIndex();
          } else {
            dropdownIndex = this._getFirstHighlightableDropdownIndex();
          }
        } else {
          // An option is already active, move to the previous/next one
          if (isArrowUp) {
            dropdownIndex = this._getPreviousHighlightableDropdownIndex(dropdownIndex);
          } else {
            dropdownIndex = this._getNextHighlightableDropdownIndex(dropdownIndex);
          }
        }
      } else {
        const firstSelectedIndex = this._getFirstSelectedOptionIndex();
        dropdownIndex = firstSelectedIndex >= 0 ? this._adjustIndexToDropdown(firstSelectedIndex) : 0;
      }

      this._adapter.highlightActiveOption(dropdownIndex);
    } else if (isHomeKey) {
      if (this._open) {
        evt.preventDefault();
        const firstDropdownIndex = this._getFirstHighlightableDropdownIndex();
        if (firstDropdownIndex >= 0) {
          this._adapter.highlightActiveOption(firstDropdownIndex);
        }
      }
    } else if (isEndKey) {
      if (this._open) {
        evt.preventDefault();
        const lastDropdownIndex = this._getLastHighlightableDropdownIndex();
        if (lastDropdownIndex >= 0) {
          this._adapter.highlightActiveOption(lastDropdownIndex);
        }
      }
    } else if (isFilterableCharacter) {
      this._filter(evt.key);
    }
  }

  private _getFirstSelectedOptionIndex(): number {
    return this._nonDividerOptions.findIndex(option => this._selectedValues.includes(option.value));
  }

  /** Navigation methods that work in dropdown coordinate system (includes select all when enabled) */
  private _getPreviousHighlightableDropdownIndex(startIndex: number): number {
    if (!this._adapter.popupElement) {
      return startIndex;
    }

    const listItems = this._adapter.popupElement.querySelectorAll('forge-list-item');
    const totalItems = listItems.length;

    if (totalItems === 0) {
      return startIndex;
    }

    let index = startIndex;
    do {
      if (index <= 0) {
        index = totalItems - 1;
      } else {
        index--;
      }

      const listItem = listItems[index] as any;
      if (listItem && !this._isDropdownOptionDisabled(listItem)) {
        return index;
      }
    } while (index !== startIndex);

    return startIndex;
  }

  private _getNextHighlightableDropdownIndex(startIndex: number): number {
    if (!this._adapter.popupElement) {
      return startIndex;
    }

    const listItems = this._adapter.popupElement.querySelectorAll('forge-list-item');
    const totalItems = listItems.length;

    if (totalItems === 0) {
      return startIndex;
    }

    let index = startIndex;
    do {
      if (index === totalItems - 1) {
        index = 0;
      } else {
        index++;
      }

      const listItem = listItems[index] as any;
      if (listItem && !this._isDropdownOptionDisabled(listItem)) {
        return index;
      }
    } while (index !== startIndex);

    return startIndex;
  }

  private _getFirstHighlightableDropdownIndex(): number {
    if (!this._adapter.popupElement) {
      return 0;
    }

    const listItems = this._adapter.popupElement.querySelectorAll('forge-list-item');

    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i] as any;
      if (listItem && !this._isDropdownOptionDisabled(listItem)) {
        return i;
      }
    }

    return 0;
  }

  private _getLastHighlightableDropdownIndex(): number {
    if (!this._adapter.popupElement) {
      return 0;
    }

    const listItems = this._adapter.popupElement.querySelectorAll('forge-list-item');

    for (let i = listItems.length - 1; i >= 0; i--) {
      const listItem = listItems[i] as any;
      if (listItem && !this._isDropdownOptionDisabled(listItem)) {
        return i;
      }
    }

    return 0;
  }

  private _isDropdownOptionDisabled(listItem: any): boolean {
    // Check if it's a divider (dividers are not selectable)
    if (listItem.querySelector && listItem.querySelector('forge-divider')) {
      return true;
    }

    // Check if the button inside is disabled
    const button = listItem.querySelector('button');
    if (button && button.disabled) {
      return true;
    }

    return false;
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
    // TODO: Enhance this to cycle through closest matches (see the native select)
    const matchedOption = this._flatOptions.find(
      ({ disabled, label }) => !disabled && label.trim().toLowerCase().startsWith(this._filterString.trim().toLowerCase())
    );
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
    return this._multiple ? [...this._value] : this._value[0];
  }
  public set value(value: any) {
    let _value: string | string[];

    if (Array.isArray(value)) {
      _value = [...value];
    } else {
      _value = value;
    }

    this._applyValue(_value);
  }

  /** Gets/sets the selected index(s). */
  public get selectedIndex(): number | number[] {
    return this._multiple ? [...this._selectedIndexes] : this._selectedIndexes[0];
  }
  public set selectedIndex(indexes: number | number[]) {
    this._options = this._adapter.getOptions();

    let indicies: number[];
    if (Array.isArray(indexes)) {
      indicies = [...indexes];
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

  /** Gets/sets whether to show the select all option when in multiple mode. */
  public get showSelectAll(): boolean {
    return this._showSelectAll;
  }
  public set showSelectAll(value: boolean) {
    this._showSelectAll = value;
  }

  /** Gets/sets the label for the select all option. */
  public get selectAllLabel(): string {
    return this._selectAllLabel;
  }
  public set selectAllLabel(value: string) {
    this._selectAllLabel = value;
  }
}
