import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { DROPDOWN_MENU_GROUP_TAG_NAME } from '../dropdown-menu-constants.js';

import styles from './dropdown-menu-group.scss';

/**
 * @tag forge-dropdown-menu-group
 *
 * @summary Groups related items together with a label within a `<forge-dropdown-menu>`.
 *
 * @description
 * Items within a group are part of the same keyboard navigation sequence as the items outside of it. Groups can also
 * be placed within the submenu of an item. They are themed with the same `--forge-option-group-*` custom properties as
 * `<forge-option-group>`.
 *
 * @slot - The default slot for the items within the group.
 * @slot label - The label for the group. Takes precedence over the `label` attribute.
 *
 * @csspart root - The root element of the group.
 * @csspart label - The label element of the group.
 */
export class DropdownMenuGroupComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DROPDOWN_MENU_GROUP_TAG_NAME;

  /**
   * The label of the group.
   * @default ''
   * @attribute
   */
  @property({ reflect: true })
  public label = '';

  @query('#label', true)
  private _labelElement!: HTMLElement;

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'group' });
  }

  public override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.#internals.ariaLabelledByElements = [this._labelElement];
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-dropdown-menu-group" part="root">
        <div id="label" class="label" part="label" role="presentation">
          <slot name="label">${this.label}</slot>
        </div>
        <slot></slot>
      </div>
    `;
  }
}

tryDefine(DROPDOWN_MENU_GROUP_TAG_NAME, DropdownMenuGroupComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-dropdown-menu-group': DropdownMenuGroupComponent;
  }
}
