import { type ForgeAiDropdownMenuItemComponent } from './ai-dropdown-menu-item.js';

/**
 * Controller class to handle keyboard navigation for dropdown menus.
 *
 * This controller manages all aspects of keyboard navigation within dropdown menus,
 * including focus management, selection state, and keyboard event delegation.
 * It supports both parent dropdown menus and nested submenus with proper
 * navigation isolation and event bubbling control.
 *
 * @example
 * ```typescript
 * const controller = new DropdownNavigationController(
 *   hostElement,
 *   () => getMenuItems(),
 *   (index) => selectItem(index),
 *   () => closeDropdown(),
 *   () => openDropdown(),
 *   () => isSubmenu()
 * );
 *
 * // Handle keyboard events
 * controller.handleKeyDown(keyboardEvent, isOpen, triggerButton);
 * ```
 */
export class DropdownNavigationController {
  private _selectedIndex = -1;
  private _openedViaKeyboard = false;

  constructor(
    private _host: HTMLElement,
    private _getMenuItems: () => ForgeAiDropdownMenuItemComponent[],
    private _onItemSelect: (index: number) => void,
    private _onClose: () => void,
    private _onOpen: () => void,
    private _isSubmenu: () => boolean
  ) {}

  /**
   * Gets the current selected index
   */
  public get selectedIndex(): number {
    return this._selectedIndex;
  }

  /**
   * Sets the selected index
   */
  public set selectedIndex(value: number) {
    this._selectedIndex = value;
  }

  /**
   * Gets whether the dropdown was opened via keyboard
   */
  public get openedViaKeyboard(): boolean {
    return this._openedViaKeyboard;
  }

  /**
   * Sets whether the dropdown was opened via keyboard
   */
  public set openedViaKeyboard(value: boolean) {
    this._openedViaKeyboard = value;
  }

  /**
   * Handles keyboard events for the dropdown menu
   */
  public handleKeyDown(event: KeyboardEvent, isOpen: boolean, triggerButton: HTMLElement): boolean {
    // If this event is coming from a submenu, don't handle it here
    const target = event.target as Element;
    if (target && target !== this._host) {
      const nestedDropdown = target.closest('forge-ai-dropdown-menu[data-submenu="true"]');
      if (nestedDropdown && nestedDropdown !== this._host) {
        return false;
      }
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (event.target === triggerButton) {
          event.preventDefault();
          this._onOpen();
          return true;
        } else if (isOpen && this._selectedIndex >= 0) {
          event.preventDefault();
          this._onItemSelect(this._selectedIndex);
          return true;
        }
        break;

      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          this._onClose();
          triggerButton.focus();
          return true;
        }
        break;

      case 'ArrowDown':
        if (isOpen) {
          event.preventDefault();
          this._moveSelection(1);
          return true;
        } else if (event.target === triggerButton) {
          event.preventDefault();
          this._openedViaKeyboard = true;
          this._onOpen();
          return true;
        }
        break;

      case 'ArrowUp':
        if (isOpen) {
          event.preventDefault();
          this._moveSelection(-1);
          return true;
        }
        break;

      case 'ArrowRight':
        if (isOpen && this._selectedIndex >= 0) {
          // Let the menu item handle submenu opening
          const items = this._getMenuItems();
          const selectedItem = items[this._selectedIndex];
          if (selectedItem) {
            selectedItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: false }));
          }
          return true;
        }
        break;

      case 'ArrowLeft':
        if (isOpen && this._isSubmenu()) {
          // Close this submenu and return focus to parent
          event.preventDefault();
          this._onClose();
          const parentItem = this._host.parentElement as HTMLElement;
          if (parentItem && parentItem.tagName.toLowerCase() === 'forge-ai-dropdown-menu-item') {
            parentItem.focus();
          }
          return true;
        }
        break;

      case 'Home':
        if (isOpen) {
          event.preventDefault();
          this._selectedIndex = 0;
          this._updateItemFocus();
          return true;
        }
        break;

      case 'End':
        if (isOpen) {
          event.preventDefault();
          this._selectedIndex = Math.max(0, this._getMenuItems().length - 1);
          this._updateItemFocus();
          return true;
        }
        break;
    }

    return false;
  }

  /**
   * Moves the selection by the specified direction
   */
  private _moveSelection(direction: number): void {
    const items = this._getMenuItems();
    if (items.length === 0) {
      return;
    }

    // Handle initial state (-1) - first navigation should go to appropriate end
    if (this._selectedIndex === -1) {
      if (direction > 0) {
        // Down arrow from no selection -> first item
        this._selectedIndex = 0;
      } else {
        // Up arrow from no selection -> last item
        this._selectedIndex = items.length - 1;
      }
    } else {
      // Calculate new index with wrapping
      let newIndex = this._selectedIndex + direction;

      if (newIndex < 0) {
        // Wrap to last item when going up from first item
        newIndex = items.length - 1;
      } else if (newIndex >= items.length) {
        // Wrap to first item when going down from last item
        newIndex = 0;
      }

      this._selectedIndex = newIndex;
    }

    this._updateItemFocus();
  }

  /**
   * Updates the focus state of menu items
   */
  private _updateItemFocus(): void {
    const items = this._getMenuItems();
    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === this._selectedIndex ? '0' : '-1');
      if (index === this._selectedIndex) {
        (item as HTMLElement).focus();
      }
    });
  }

  /**
   * Focuses the first item in the menu
   */
  public focusFirstItem(): void {
    const items = this._getMenuItems();
    if (items.length > 0) {
      this._selectedIndex = 0;
      this._updateItemFocus();
    }
  }

  /**
   * Clears focus from all menu items
   */
  public clearItemFocus(): void {
    const items = this._getMenuItems();
    items.forEach(item => {
      item.setAttribute('tabindex', '-1');
    });
  }

  /**
   * Resets the navigation state when dropdown opens
   */
  public onOpen(): void {
    this._selectedIndex = -1;
    if (this._openedViaKeyboard) {
      this.focusFirstItem();
      this._openedViaKeyboard = false;
    } else {
      this.clearItemFocus();
    }
  }

  /**
   * Resets the navigation state
   */
  public reset(): void {
    this._selectedIndex = -1;
    this._openedViaKeyboard = false;
  }
}
