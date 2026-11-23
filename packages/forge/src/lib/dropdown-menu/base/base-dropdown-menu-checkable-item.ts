import { tylIconCheck } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ClassInfo } from 'lit/directives/class-map.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { removeDefaultAttribute } from '../../core/utils/lit-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { IconRegistry } from '../../icon/index.js';
import { IDropdownMenuItemSelectEventData } from '../dropdown-menu-constants.js';
import { BaseDropdownMenuItem } from './base-dropdown-menu-item.js';

import '../../icon/icon.js';

const CHECKED_STATE = 'checked';
const UNCHECKED_STATE = 'unchecked';
const ADJOINS_PREVIOUS_STATE = 'adjoins-previous';
const ADJOINS_NEXT_STATE = 'adjoins-next';

/**
 * The base class for items that have a checked state and participate in forms.
 *
 * @dependency forge-icon
 *
 * @event {Event} change - Dispatched when the user changes the checked state of the item.
 *
 * @state checked - Applied when the item is checked.
 * @state adjoins-previous - Applied when the item and the item before it are both checked.
 * @state adjoins-next - Applied when the item and the item after it are both checked.
 *
 * @csspart checkmark - The check icon shown when the item is checked.
 */
export abstract class BaseDropdownMenuCheckableItem extends BaseDropdownMenuItem {
  public static readonly formAssociated = true;

  static {
    IconRegistry.define([tylIconCheck]);
  }

  /**
   * The name of the item, used when submitting the item as part of a form.
   * @default ''
   * @attribute
   */
  @property({ reflect: true, converter: { toAttribute: (value: string) => removeDefaultAttribute(value, '') } })
  public name = '';

  /**
   * The value of the item, used when submitting the item as part of a form and provided in the detail of the select event.
   * @default 'on'
   * @attribute
   */
  @property()
  public override value = 'on';

  /**
   * Whether the item is checked.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * Whether the item is checked by default. The item returns to this state when its form is reset.
   * @default false
   * @attribute default-checked
   */
  @property({ type: Boolean, attribute: 'default-checked' })
  public defaultChecked = false;

  /**
   * The form that the item is associated with.
   */
  public get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  #neighbors: Array<Element | null> = [];

  public override connectedCallback(): void {
    super.connectedCallback();
    if (this.hasUpdated) {
      this.#syncAdjoining();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#neighbors.forEach(neighbor => neighbor?.isConnected && BaseDropdownMenuCheckableItem.#updateAdjoining(neighbor));
    this.#neighbors = [];
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (!this.hasUpdated && this.defaultChecked) {
      this.checked = true;
    }

    if (changedProperties.has('checked')) {
      setDefaultAria(this, this._internals, { ariaChecked: this.checked ? 'true' : 'false' });
      toggleState(this._internals, CHECKED_STATE, this.checked);
    }

    if (changedProperties.has('checked') || changedProperties.has('value')) {
      this._internals.setFormValue(this.checked ? this.value : null, this.checked ? CHECKED_STATE : UNCHECKED_STATE);
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    if (changedProperties.has('checked')) {
      this.#syncAdjoining();
    }
  }

  public formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  public formResetCallback(): void {
    this.checked = this.defaultChecked;
  }

  public formStateRestoreCallback(state: File | string | FormData | null): void {
    this.checked = state === CHECKED_STATE;
  }

  protected override _getRootClasses(): ClassInfo {
    return { ...super._getRootClasses(), checkable: true, checked: this.checked };
  }

  protected override _renderIndicator(): TemplateResult | typeof nothing {
    return this.checked ? html`<forge-icon class="checkmark" part="checkmark" name="check"></forge-icon>` : nothing;
  }

  protected override _getSelectEventData(): IDropdownMenuItemSelectEventData {
    return { ...super._getSelectEventData(), checked: this.checked };
  }

  /** Updates the checked state in response to the user, notifying listeners if it changed. */
  protected _setCheckedByUser(checked: boolean): void {
    if (this.checked === checked) {
      return;
    }

    this.checked = checked;
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  static #updateAdjoining(item: Element | null): void {
    if (!(item instanceof BaseDropdownMenuCheckableItem)) {
      return;
    }

    const adjoins = (sibling: Element | null): boolean => item.checked && sibling instanceof BaseDropdownMenuCheckableItem && sibling.checked;
    toggleState(item._internals, ADJOINS_PREVIOUS_STATE, adjoins(item.previousElementSibling));
    toggleState(item._internals, ADJOINS_NEXT_STATE, adjoins(item.nextElementSibling));
  }

  #syncAdjoining(): void {
    this.#neighbors = [this.previousElementSibling, this.nextElementSibling];
    [this.previousElementSibling, this, this.nextElementSibling].forEach(item => BaseDropdownMenuCheckableItem.#updateAdjoining(item));
  }
}
