import { type ForgeAiDropdownMenuItemComponent } from './ai-dropdown-menu-item.js';

export type DropdownMenuSelectionMode = 'none' | 'single' | 'multi';

/**
 * Base interface for dropdown menu selection change events
 */
export interface BaseDropdownChangeEventDetail {
  selectionMode: DropdownMenuSelectionMode;
  timestamp: number;
}

/**
 * Event detail for 'none' selection mode (actions only)
 */
export interface ActionEventDetail extends BaseDropdownChangeEventDetail {
  selectionMode: 'none';
  value: string;
  selectedItem: ForgeAiDropdownMenuItemComponent;
}

/**
 * Event detail for 'single' selection mode
 */
export interface SingleSelectionEventDetail extends BaseDropdownChangeEventDetail {
  selectionMode: 'single';
  value: string | null;
  selectedItem: ForgeAiDropdownMenuItemComponent | null;
  previousValue?: string | null;
}

/**
 * Event detail for 'multi' selection mode
 */
export interface MultiSelectionEventDetail extends BaseDropdownChangeEventDetail {
  selectionMode: 'multi';
  value: string[];
  selectedItem: ForgeAiDropdownMenuItemComponent[];
  addedItems?: ForgeAiDropdownMenuItemComponent[];
  removedItems?: ForgeAiDropdownMenuItemComponent[];
}

/**
 * Union type for all dropdown change event details
 */
export type DropdownChangeEventDetail = ActionEventDetail | SingleSelectionEventDetail | MultiSelectionEventDetail;

/**
 * Configuration options for selection behavior
 */
export interface SelectionConfig {
  mode: DropdownMenuSelectionMode;
  closeOnSingleSelect?: boolean;
  showSelectionCount?: boolean;
}

/**
 * Manages selection state and behavior for dropdown menus.
 *
 * The SelectionManager is responsible for handling all aspects of item selection
 * within dropdown menus, supporting three distinct modes:
 *
 * - **none**: Items act as actions only, no persistent selection state
 * - **single**: Single selection with radio button behavior
 * - **multi**: Multiple selection with checkbox behavior
 *
 * It provides type-safe event dispatching with mode-specific event details
 * and maintains consistent selection state across all menu items.
 *
 * @example
 * ```typescript
 * const manager = new SelectionManager(
 *   () => getAllMenuItems(),
 *   (detail) => handleSelectionChange(detail),
 *   { mode: 'single', closeOnSingleSelect: true }
 * );
 *
 * // Handle item selection
 * const result = manager.selectItem(menuItem);
 * if (result.shouldClose) {
 *   closeDropdown();
 * }
 * ```
 */
export class SelectionManager {
  private _value: string | string[] | null = null;
  private _config: SelectionConfig;

  constructor(
    private _getMenuItems: () => ForgeAiDropdownMenuItemComponent[],
    private _onSelectionChange: (detail: DropdownChangeEventDetail) => void,
    config: SelectionConfig
  ) {
    this._config = { closeOnSingleSelect: true, showSelectionCount: true, ...config };
  }

  /**
   * Gets the current selection value
   */
  public get value(): string | string[] | null {
    return this._value;
  }

  /**
   * Sets the selection value and updates item states
   */
  public set value(newValue: string | string[] | null) {
    this._value = newValue;
    this._updateItemSelectionState();
  }

  /**
   * Gets the current selection mode
   */
  public get selectionMode(): DropdownMenuSelectionMode {
    return this._config.mode;
  }

  /**
   * Updates the selection mode and reconfigures items
   */
  public set selectionMode(mode: DropdownMenuSelectionMode) {
    this._config.mode = mode;
    this._updateItemSelectionState();
  }

  /**
   * Updates the selection configuration
   */
  public updateConfig(config: Partial<SelectionConfig>): void {
    this._config = { ...this._config, ...config };
    this._updateItemSelectionState();
  }

  /**
   * Handles item selection based on the current mode
   */
  public selectItem(item: ForgeAiDropdownMenuItemComponent): { shouldClose: boolean } {
    const itemValue = item.value || '';

    switch (this._config.mode) {
      case 'none':
        return this._handleActionSelection(item, itemValue);

      case 'single':
        return this._handleSingleSelection(item, itemValue);

      case 'multi':
        return this._handleMultiSelection(item, itemValue);

      default:
        return { shouldClose: false };
    }
  }

  /**
   * Gets the currently selected items
   */
  public getSelectedItems(): ForgeAiDropdownMenuItemComponent[] {
    const items = this._getMenuItems();
    const selectedValues = this._getSelectedValuesArray();
    return items.filter(item => {
      const itemValue = item.value || '';
      return selectedValues.includes(itemValue);
    });
  }

  /**
   * Gets text representation of the current selection
   */
  public getSelectedText(): string {
    if (this._config.mode === 'none') {
      return '';
    }

    const selectedItems = this.getSelectedItems();

    if (selectedItems.length === 0) {
      return '';
    }

    if (this._config.mode === 'single') {
      return selectedItems[0].labelText || '';
    }

    if (this._config.mode === 'multi' && this._config.showSelectionCount) {
      return selectedItems.length === 1 ? '1 option selected' : `${selectedItems.length} options selected`;
    }

    return '';
  }

  /**
   * Checks if selection text should be displayed
   */
  public shouldShowSelectedText(): boolean {
    return (this._config.mode === 'single' || this._config.mode === 'multi') && this.getSelectedText() !== '';
  }

  /**
   * Updates the selection state of all menu items
   */
  private _updateItemSelectionState(): void {
    const items = this._getMenuItems();
    const selectedValues = this._getSelectedValuesArray();

    items.forEach(item => {
      item.selectionMode = this._config.mode;
      const itemValue = item.value || '';
      item.selected = selectedValues.includes(itemValue);
    });
  }

  /**
   * Handles action-only selection (no state change)
   */
  private _handleActionSelection(item: ForgeAiDropdownMenuItemComponent, itemValue: string): { shouldClose: boolean } {
    const eventDetail: ActionEventDetail = {
      selectionMode: 'none',
      value: itemValue,
      selectedItem: item,
      timestamp: Date.now()
    };
    this._onSelectionChange(eventDetail);
    return { shouldClose: true };
  }

  /**
   * Handles single selection mode
   */
  private _handleSingleSelection(item: ForgeAiDropdownMenuItemComponent, itemValue: string): { shouldClose: boolean } {
    const previousValue = typeof this._value === 'string' ? this._value : null;
    this._value = itemValue;
    this._updateItemSelectionState();

    const eventDetail: SingleSelectionEventDetail = {
      selectionMode: 'single',
      value: this._value,
      selectedItem: item,
      previousValue,
      timestamp: Date.now()
    };
    this._onSelectionChange(eventDetail);

    return { shouldClose: !!this._config.closeOnSingleSelect };
  }

  /**
   * Handles multi-selection mode
   */
  private _handleMultiSelection(item: ForgeAiDropdownMenuItemComponent, itemValue: string): { shouldClose: boolean } {
    const currentValues = this._getSelectedValuesArray();
    const itemIndex = currentValues.indexOf(itemValue);
    let addedItems: ForgeAiDropdownMenuItemComponent[] = [];
    let removedItems: ForgeAiDropdownMenuItemComponent[] = [];

    if (itemIndex >= 0) {
      // Remove from selection
      currentValues.splice(itemIndex, 1);
      removedItems = [item];
    } else {
      // Add to selection
      currentValues.push(itemValue);
      addedItems = [item];
    }

    this._value = currentValues;
    this._updateItemSelectionState();

    const selectedItems = this.getSelectedItems();
    const eventDetail: MultiSelectionEventDetail = {
      selectionMode: 'multi',
      value: currentValues,
      selectedItem: selectedItems,
      addedItems: addedItems.length > 0 ? addedItems : undefined,
      removedItems: removedItems.length > 0 ? removedItems : undefined,
      timestamp: Date.now()
    };
    this._onSelectionChange(eventDetail);

    return { shouldClose: false }; // Keep dropdown open for multi-select
  }

  /**
   * Gets the selected values as an array
   */
  private _getSelectedValuesArray(): string[] {
    if (Array.isArray(this._value)) {
      return [...this._value];
    }
    return this._value ? [this._value] : [];
  }

  /**
   * Resets the selection state
   */
  public reset(): void {
    this._value = null;
    this._updateItemSelectionState();
  }
}
