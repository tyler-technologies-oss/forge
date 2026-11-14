import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { BaseDropdownMenuCheckableItem } from '../base/base-dropdown-menu-checkable-item.js';
import { DROPDOWN_MENU_ITEM_CHECKBOX_TAG_NAME } from '../dropdown-menu-constants.js';

/**
 * @tag forge-dropdown-menu-item-checkbox
 *
 * @summary Dropdown menu item checkboxes are menu items that toggle between a checked and unchecked state. They do not support submenus.
 *
 * @description
 * Checkbox items are form-associated, so they are submitted with the `name` and `value` of the item when checked. They
 * are styled to match `<forge-option>` and are themed with the same `--forge-option-*` custom properties.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-icon
 * @dependency forge-state-layer
 *
 * @event {Event} change - Dispatched when the user toggles the item.
 * @event {CustomEvent<IDropdownMenuItemSelectEventData>} forge-dropdown-menu-item-select - Dispatched after the user
 * toggles the item, with the item's new checked state in the detail. Cancel the event to keep the menu open.
 *
 * @slot - The default slot for the item's label.
 * @slot start - Content placed at the start of the item.
 * @slot secondary - Content placed below the item's label.
 * @slot tertiary - Content placed below the item's secondary content.
 * @slot end - Content placed at the end of the item.
 *
 * @state disabled - Applied when the item is disabled.
 * @state checked - Applied when the item is checked.
 *
 * @csspart root - The root element of the item.
 * @csspart label - The element containing the label and supporting text.
 * @csspart checkmark - The check icon shown when the item is checked.
 * @csspart focus-indicator - The focus indicator of the item.
 * @csspart state-layer - The state layer of the item.
 */
export class DropdownMenuItemCheckboxComponent extends BaseDropdownMenuCheckableItem {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DROPDOWN_MENU_ITEM_CHECKBOX_TAG_NAME;

  protected readonly _defaultRole = 'menuitemcheckbox';

  protected override _activate(evt: MouseEvent): void {
    this._setCheckedByUser(!this.checked);
    super._activate(evt);
  }
}

tryDefine(DROPDOWN_MENU_ITEM_CHECKBOX_TAG_NAME, DropdownMenuItemCheckboxComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-dropdown-menu-item-checkbox': DropdownMenuItemCheckboxComponent;
  }
}
