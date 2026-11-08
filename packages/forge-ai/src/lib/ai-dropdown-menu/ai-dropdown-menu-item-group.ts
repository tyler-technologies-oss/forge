import { LitElement, html, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, queryAssignedNodes, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { generateUniqueId } from '../utils/dom.js';

import styles from './ai-dropdown-menu-item-group.scss?inline';

import './ai-dropdown-menu-separator.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-dropdown-menu-item-group': ForgeAiDropdownMenuItemGroupComponent;
  }
}

/**
 * @summary A group component for organizing items within ai-dropdown-menu.
 *
 * @description
 * This component groups related dropdown menu items together with an optional label.
 * It provides semantic structure and visual organization for dropdown menu content.
 *
 * @since 1.2.0
 *
 * @slot - The default slot for dropdown menu items.
 * @slot label - The label slot for the group heading text.
 */
@customElement('forge-ai-dropdown-menu-item-group')
export class ForgeAiDropdownMenuItemGroupComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @queryAssignedNodes({ slot: 'label', flatten: true })
  private _labelSlottedNodes!: Node[];

  @state()
  private _groupId = generateUniqueId('group');

  private get _hasLabel(): boolean {
    return this._labelSlottedNodes.length > 0;
  }

  readonly #labelSlot = html`<slot name="label"></slot>`;
  readonly #contentSlot = html`<slot></slot>`;

  get #conditionalLabel(): TemplateResult {
    return when(
      this._hasLabel,
      () => html`<div class="ai-dropdown-menu-item-group__label" id="${this._groupId}-label">${this.#labelSlot}</div>`,
      () => this.#labelSlot
    );
  }

  #handleSlotChange(evt: Event): void {
    const slotName = (evt.target as HTMLSlotElement).name;
    if (slotName === 'label') {
      this.requestUpdate();
    }
  }

  public override render(): TemplateResult {
    return html`
      <forge-ai-dropdown-menu-separator></forge-ai-dropdown-menu-separator>
      <div
        class="ai-dropdown-menu-item-group"
        role="${ifDefined(this._hasLabel ? 'group' : undefined)}"
        aria-labelledby="${ifDefined(this._hasLabel ? `${this._groupId}-label` : undefined)}">
        ${this.#conditionalLabel}
        <div class="ai-dropdown-menu-item-group__content" @slotchange=${this.#handleSlotChange}>${this.#contentSlot}</div>
      </div>
    `;
  }
}
