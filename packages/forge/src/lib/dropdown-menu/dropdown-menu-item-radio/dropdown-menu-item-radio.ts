import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { PropertyValues } from 'lit';
import { BaseDropdownMenuCheckableItem } from '../base/base-dropdown-menu-checkable-item.js';
import { DROPDOWN_MENU_ITEM_RADIO_TAG_NAME } from '../dropdown-menu-constants.js';
import { getRootMenu } from '../dropdown-menu-utils.js';

/**
 * @tag forge-dropdown-menu-item-radio
 *
 * @summary Dropdown menu item radios are menu items that, along with other radios sharing the same `name`, allow only one
 * item to be checked at a time. They do not support submenus.
 *
 * @description
 * Radios with the same `name` within a `<forge-dropdown-menu>` form a group. Radio items are form-associated, so the
 * checked radio is submitted with the `name` and `value` of the item. They are styled to match `<forge-option>` and are
 * themed with the same `--forge-option-*` custom properties.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-icon
 * @dependency forge-state-layer
 *
 * @event {Event} change - Dispatched when the user checks the item.
 * @event {CustomEvent<IDropdownMenuItemSelectEventData>} forge-dropdown-menu-item-select - Dispatched after the user
 * selects the item, with the item's checked state in the detail. Cancel the event to keep the menu open.
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
export class DropdownMenuItemRadioComponent extends BaseDropdownMenuCheckableItem {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DROPDOWN_MENU_ITEM_RADIO_TAG_NAME;

  protected readonly _defaultRole = 'menuitemradio';

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked') && this.checked) {
      this.#getGroupPeers().forEach(radio => (radio.checked = false));
    }
  }

  protected override _activate(evt: MouseEvent): void {
    this._setCheckedByUser(true);
    super._activate(evt);
  }

  #getGroupPeers(): DropdownMenuItemRadioComponent[] {
    if (!this.name) {
      return [];
    }

    const scope = getRootMenu(this) ?? (this.getRootNode() as ParentNode);
    return Array.from(scope.querySelectorAll<DropdownMenuItemRadioComponent>(DROPDOWN_MENU_ITEM_RADIO_TAG_NAME)).filter(
      radio => radio !== this && radio.name === this.name
    );
  }
}

tryDefine(DROPDOWN_MENU_ITEM_RADIO_TAG_NAME, DropdownMenuItemRadioComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-dropdown-menu-item-radio': DropdownMenuItemRadioComponent;
  }
}
