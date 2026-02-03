import { tylIconCheckBox, tylIconCheckBoxOutlineBlank } from '@tylertech/tyler-icons';

import { IListDropdownConfig, IListDropdownOption, IListDropdownOptionGroup } from './list-dropdown-constants';
import { ListDropdownCore } from './list-dropdown-core';
import { ListDropdownAdapter } from './list-dropdown-adapter';
import { IconRegistry } from '../icon';

export interface IListDropdown {
  dropdownElement: HTMLElement | undefined;
  open(): void;
  close(): Promise<void>;
  destroy(): void;
  getActiveOptionIndex(): number;
  getActiveOption(): IListDropdownOption | undefined;
  toggleOptionMultiple(index: number, isSelected: boolean): void;
  activateSelectedOption(): void;
  activateFirstOption(): number;
  activateOption(index: number): void;
  activateInitialOption(): void;
  clearActiveOption(): void;
  setSelectedValues(values: any[]): void;
  setOptions(options: Array<IListDropdownOption | IListDropdownOptionGroup>): void;
  appendOptions(options: Array<IListDropdownOption | IListDropdownOptionGroup>): void;
  scrollSelectedOptionIntoView(animate?: boolean): void;
  setScrollBottomListener(listener: () => void, threshold?: number): void;
  removeScrollBottomListener(): void;
  setBusyVisibility(isVisible: boolean): void;
  handleKey(key: string): void;
}

export class ListDropdown implements IListDropdown {
  private _core: ListDropdownCore;

  constructor(
    private _targetElement: HTMLElement,
    config: IListDropdownConfig
  ) {
    IconRegistry.define([tylIconCheckBox, tylIconCheckBoxOutlineBlank]);
    this._core = new ListDropdownCore(new ListDropdownAdapter(this._targetElement), config);
  }

  public destroy(): void {
    this._core.destroy();
  }

  /** Opens the dropdown. */
  public open(): void {
    this._core.open();
  }

  /** Closes the dropdown. */
  public close(): Promise<void> {
    return this._core.close();
  }

  /** Gets the currently highlighted option index in the dropdown. */
  public getActiveOptionIndex(): number {
    return this._core.getActiveOptionIndex();
  }

  public getActiveOption(): IListDropdownOption | undefined {
    return this._core.getActiveOption();
  }

  /** Toggles the selected option by index. Only applies when in multiselect mode. */
  public toggleOptionMultiple(index: number, isSelected: boolean): void {
    return this._core.toggleOptionMultiple(index, isSelected);
  }

  /** Activates the first selected option. */
  public activateSelectedOption(): void {
    this._core.activateSelectedOption();
  }

  /** Activates the first non-disabled option. */
  public activateFirstOption(): number {
    return this._core.activateFirstOption();
  }

  /** Activates (highlights) an option by index. */
  public activateOption(index: number): void {
    return this._core.activateOption(index);
  }

  /** Activates the first activatable option. */
  public activateInitialOption(): void {
    return this._core.activateInitialOption();
  }

  /** Clears the active option from the dropdown */
  public clearActiveOption(): void {
    this._core.clearActiveOption();
  }

  /** Sets the selected values. Only applies when in multiselect mode. */
  public setSelectedValues(values: any[]): void {
    return this._core.setSelectedValues(values);
  }

  public get dropdownElement(): HTMLElement | undefined {
    return this._core.dropdownElement;
  }

  public setOptions(options: Array<IListDropdownOption | IListDropdownOptionGroup>): void {
    this._core.setOptions(options);
  }

  public appendOptions(options: Array<IListDropdownOption | IListDropdownOptionGroup>): void {
    this._core.appendOptions(options);
  }

  public scrollSelectedOptionIntoView(animate?: boolean): void {
    this._core.scrollSelectedOptionIntoView(animate);
  }

  public setScrollBottomListener(listener: () => void, threshold?: number): void {
    this._core.setScrollBottomListener(listener, threshold);
  }

  public removeScrollBottomListener(): void {
    this._core.removeScrollBottomListener();
  }

  public setBusyVisibility(isVisible: boolean): void {
    this._core.setBusyVisibility(isVisible);
  }

  public handleKey(key: string): void {
    this._core.handleKey(key);
  }
}
