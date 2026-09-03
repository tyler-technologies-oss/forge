import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { ButtonComponent } from '../button/index.js';
import { ToolbarComponent } from '../toolbar/index.js';

import '../button/button.js';
import '../toolbar/toolbar.js';

import styles from './multi-select-header.scss';

export interface IMultiSelectHeaderComponent extends BaseLitElement {
  text: string;
  noBorder: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-multi-select-header': IMultiSelectHeaderComponent;
  }

  interface HTMLElementEventMap {
    'forge-multi-select-header-select-all': CustomEvent<void>;
  }
}

export const MULTI_SELECT_HEADER_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-multi-select-header';

/**
 * @tag forge-multi-select-header
 *
 * @summary A toolbar for displaying selection state and actions when multiple items are selected in a data table, list, or grid.
 *
 * @meta extended
 *
 * @dependency forge-button
 * @dependency forge-toolbar
 *
 * @slot select-all-button-text - Text content for the select-all button
 * @slot actions - Action buttons (maps to the toolbar end slot)
 *
 * @event {CustomEvent<void>} forge-multi-select-header-select-all - Fired when the select-all button is clicked
 */
@customElement(MULTI_SELECT_HEADER_TAG_NAME)
export class MultiSelectHeaderComponent extends BaseLitElement implements IMultiSelectHeaderComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = MULTI_SELECT_HEADER_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ButtonComponent, ToolbarComponent];

  public static styles = unsafeCSS(styles);

  /** The text to display in the header (typically showing selection count). */
  @property({ type: String })
  public text = '';

  /** Hides the toolbar divider. */
  @property({ type: Boolean, attribute: 'no-border' })
  public noBorder = true;

  @queryAssignedNodes({ slot: 'select-all-button-text', flatten: true })
  private readonly _slottedSelectAllNodes!: Node[];

  readonly #selectAllSlot = html`<slot name="select-all-button-text"></slot>`;

  get #selectAllButton(): TemplateResult {
    const showSelectAllButton = this._slottedSelectAllNodes.length > 0;
    return when(
      showSelectAllButton,
      () => html`<forge-button id="select-all-button" @click=${this.#handleSelectAllClick}>${this.#selectAllSlot}</forge-button>`,
      () => html`${this.#selectAllSlot}`
    );
  }

  public render(): TemplateResult {
    return html`
      <forge-toolbar ?no-divider=${this.noBorder} @slotchange=${this.#handleSlotChange}>
        <div slot="start" class="start-container">
          <span class="selected-text">${this.text}</span>
          ${this.#selectAllButton}
        </div>
        <slot name="actions" slot="end"></slot>
      </forge-toolbar>
    `;
  }

  #handleSlotChange(evt: Event): void {
    const slotName = (evt.target as HTMLSlotElement).name;
    if (['select-all-button-text', 'actions'].includes(slotName)) {
      this.requestUpdate();
    }
  }

  #handleSelectAllClick(): void {
    const event = new CustomEvent<void>('forge-multi-select-header-select-all', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}
