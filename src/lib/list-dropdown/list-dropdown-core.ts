import { IListDropdownAdapter } from './list-dropdown-adapter';
import { DEFAULT_LIST_DROPDOWN_CONFIG, IListDropdownConfig, IListDropdownOption, IListDropdownOptionGroup } from './list-dropdown-constants';
import { getFlattenedOptions } from './list-dropdown-utils';

export interface IListDropdownCore {
  dropdownElement: HTMLElement | undefined;
  open(): void;
  close(): Promise<void>;
  getActiveOptionIndex(): number;
  getActiveOption(): IListDropdownOption | undefined;
  toggleOptionMultiple(index: number, isSelected: boolean): void;
  activateSelectedOption(): void;
  activateFirstOption(): number;
  activateOption(index: number): void;
  setSelectedValues(values: any): void;
  clearActiveOption(): void;
  setOptions(options: Array<IListDropdownOption | IListDropdownOptionGroup>): void;
  appendOptions(options: Array<IListDropdownOption | IListDropdownOptionGroup>): void;
  scrollSelectedOptionIntoView(animate?: boolean): void;
  setScrollBottomListener(listener: () => void, threshold?: number): void;
  removeScrollBottomListener(): void;
  setBusyVisibility(isVisible: boolean): void;
  handleKey(key: string): void;
}

export class ListDropdownCore implements IListDropdownCore {
  private _config: IListDropdownConfig;
  private _open = false;
  private _selectListener: (value: any, id: string) => void;
  private _closeListener: () => void;
  private _scrollEndListener: () => void;

  constructor(
    private _adapter: IListDropdownAdapter,
    config: IListDropdownConfig
  ) {
    this._config = Object.assign({ ...DEFAULT_LIST_DROPDOWN_CONFIG }, { ...config });
    this._selectListener = (value, id) => this._onSelect(value, id);
    this._closeListener = () => {
      if (typeof this._config.closeCallback === 'function') {
        this._config.closeCallback();
      }
    };
    this._scrollEndListener = () => {
      if (this._config.observeScroll && typeof this._config.scrollEndListener === 'function') {
        this._config.scrollEndListener();
      }
    };
  }

  public destroy(): void {
    this._adapter.remove();
  }

  public open(): void {
    if (!this._open) {
      this._open = true;
      this._adapter.open(this._config, this._selectListener, this._closeListener);
      window.requestAnimationFrame(() => {
        if (this._open) {
          this.activateInitialOption();
        }
      });

      if (this._config.observeScroll && this._config.scrollEndListener) {
        this._adapter.setScrollBottomListener(this._scrollEndListener, this._config.observeScrollThreshold || 0);
      }
    }
  }

  public async close(): Promise<void> {
    if (this._open) {
      this._open = false;
      if (this._config.observeScroll && this._config.scrollEndListener) {
        this._adapter.removeScrollBottomListener(this._scrollEndListener);
      }
      await this._adapter.close();
    }
  }

  private _onSelect(value: any, id: string): void {
    if (typeof this._config.activeChangeCallback === 'function') {
      this._config.activeChangeCallback(id);
    }

    if (typeof this._config.selectCallback === 'function') {
      this._config.selectCallback(value);
    }

    if (this._open) {
      const sync = this._config.syncWidth === undefined ? true : false;
      // Keep the popup width at least the same as the target if the target size has now changed
      this._adapter.syncWidth(sync);
    }
  }

  public getActiveOptionIndex(): number {
    return this._adapter.getActiveOptionIndex();
  }

  public getActiveOption(): IListDropdownOption | undefined {
    const index = this.getActiveOptionIndex();
    return index >= 0 ? this._nonDividerOptions[index] : undefined;
  }

  public toggleOptionMultiple(index: number, isSelected: boolean): void {
    return this._adapter.toggleOptionMultiple(index, isSelected);
  }

  public activateSelectedOption(): void {
    this._adapter.activateSelectedOption(this._config);
  }

  public activateFirstOption(): number {
    const index = this._nonDividerOptions.findIndex(o => !o.disabled);
    if (index !== -1) {
      this.activateOption(index);
    }
    return index;
  }

  public activateLastOption(): number {
    const options = this._nonDividerOptions;
    const index = options.length - 1 - options.findIndex(o => !o.disabled);
    if (index !== -1) {
      this.activateOption(index);
    }
    return index;
  }

  public activateOption(index: number, animate?: boolean): void {
    return this._adapter.activateOption(index, this._config.activeChangeCallback, animate);
  }

  public activateInitialOption(): void {
    if (typeof this._config.activeStartIndex === 'number' && this._nonDividerOptions[this._config.activeStartIndex]) {
      this.activateOption(this._config.activeStartIndex, false);
      this._adapter.scrollSelectedOptionIntoView(false);
    } else if (this._config.selectedValues && this._config.selectedValues.length) {
      this._adapter.scrollSelectedOptionIntoView(false);
    } else if (typeof this._config.visibleStartIndex === 'number' && this._nonDividerOptions[this._config.visibleStartIndex]) {
      this._adapter.scrollOptionIntoView(this._config.visibleStartIndex);
    }
  }

  public setSelectedValues(values: any[]): void {
    if (!Array.isArray(values)) {
      values = [values];
    }
    if (!this._config.multiple && values.length > 1) {
      values = [values[0]];
    }
    this._config.selectedValues = values;
    this._adapter.setSelectedValues(values, this._config.multiple);
  }

  public clearActiveOption(): void {
    this._adapter.clearActiveOption();
  }

  public setOptions(options: Array<IListDropdownOption | IListDropdownOptionGroup>): void {
    this._config.options = options;
    if (!this._open) {
      return;
    }
    this._adapter.setOptions(this._config);
    this.activateInitialOption();
  }

  public appendOptions(options: Array<IListDropdownOption | IListDropdownOptionGroup>): void {
    this._config.options = [...this._config.options, ...options] as Array<IListDropdownOption | IListDropdownOptionGroup>;
    if (!this._open) {
      return;
    }
    this._adapter.appendOptions(options, this._config);
  }

  public get dropdownElement(): HTMLElement | undefined {
    return this._adapter.dropdownElement;
  }

  public scrollSelectedOptionIntoView(animate = true): void {
    this._adapter.scrollSelectedOptionIntoView(animate);
  }

  public setScrollBottomListener(listener: () => void, threshold?: number): void {
    this._config.scrollEndListener = listener;
    this._config.observeScroll = true;
    this._config.observeScrollThreshold = threshold;
    this._adapter.setScrollBottomListener(this._scrollEndListener, this._config.observeScrollThreshold || 0);
  }

  public removeScrollBottomListener(): void {
    this._config.scrollEndListener = undefined;
    this._adapter.removeScrollBottomListener(this._scrollEndListener);
  }

  public setBusyVisibility(isVisible: boolean): void {
    if (!this._config.allowBusy) {
      return;
    }
    this._adapter.setBusyVisibility(isVisible);
  }

  public handleKey(key: string): void {
    switch (key) {
      case 'Enter':
      case 'NumpadEnter':
        const activeOptionIndex = this.getActiveOptionIndex();
        const activeOption = this._nonDividerOptions[activeOptionIndex];
        if (this._canSelectOption(activeOption)) {
          const id = this._adapter.getActiveOptionIdByIndex(activeOptionIndex);
          if (id) {
            this._onSelect(activeOption.value, id);
          }
        }
        break;
      case 'Up':
      case 'ArrowUp':
      case 'Down':
      case 'ArrowDown':
        const options = this._nonDividerOptions;
        if (options.length && options.every(o => !this._canSelectOption(o))) {
          return;
        }
        const index = this._getNextActiveOptionIndex(key);
        this.activateOption(index);
        break;
      case 'Home':
        this.activateFirstOption();
        break;
      case 'End':
        this.activateLastOption();
        break;
    }
  }

  private _canSelectOption(option: IListDropdownOption): boolean {
    return option && !option.disabled && !option.divider;
  }

  private _getNextActiveOptionIndex(key: string): number {
    let index = this._adapter.getActiveOptionIndex();
    if (index === -1) {
      index = this._adapter.getSelectedOptionIndex();
    }
    if (key === 'ArrowUp' || key === 'Up') {
      return this._getPreviousHighlightableOptionIndex(index, this._nonDividerOptions);
    }
    return this._getNextHighlightableOptionIndex(index, this._nonDividerOptions);
  }

  private _getPreviousHighlightableOptionIndex(startIndex: number, options: IListDropdownOption[]): number {
    const index = startIndex <= 0 ? options.length - 1 : startIndex - 1;
    if (options[index].disabled) {
      return this._getPreviousHighlightableOptionIndex(index, options);
    }
    return index;
  }

  private _getNextHighlightableOptionIndex(startIndex: number, options: IListDropdownOption[]): number {
    const index = startIndex === options.length - 1 ? 0 : startIndex + 1;
    if (options[index].disabled) {
      return this._getNextHighlightableOptionIndex(index, options);
    }
    return index;
  }

  private get _flatOptions(): IListDropdownOption[] {
    return getFlattenedOptions(this._config.options);
  }

  private get _nonDividerOptions(): IListDropdownOption[] {
    return this._flatOptions.filter(o => !o.divider);
  }
}
