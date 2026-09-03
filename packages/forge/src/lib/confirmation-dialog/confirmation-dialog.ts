import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedNodes } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconClose } from '@tylertech/tyler-icons';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { composeSlottedTextContent } from '../core/utils/lit-utils.js';
import { ButtonComponent } from '../button/index.js';
import { CircularProgressComponent } from '../circular-progress/index.js';
import { DialogComponent, IDialogBeforeCloseEventData } from '../dialog/index.js';
import { IconButtonComponent } from '../icon-button/index.js';
import { IconComponent, IconRegistry } from '../icon/index.js';
import { ConfirmationDialogActionEventData, ConfirmationDialogActionEventReason } from './confirmation-dialog-constants.js';

import '../button/button.js';
import '../circular-progress/circular-progress.js';
import '../dialog/dialog.js';
import '../icon-button/icon-button.js';
import '../icon/icon.js';

import styles from './confirmation-dialog.scss';

export interface IConfirmationDialogComponent extends BaseLitElement {
  open: boolean;
  isBusy: boolean;
  busyLabel: string;
  label: string | undefined;
  description: string | undefined;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-confirmation-dialog': IConfirmationDialogComponent;
  }

  interface HTMLElementEventMap {
    'forge-confirmation-dialog-action': CustomEvent<ConfirmationDialogActionEventData>;
  }
}

export const CONFIRMATION_DIALOG_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-confirmation-dialog';

/**
 * @tag forge-confirmation-dialog
 *
 * @summary A modal dialog used to present users with a brief message or alert requiring a primary or secondary decision.
 *
 * @meta extended
 *
 * @dependency forge-button
 * @dependency forge-circular-progress
 * @dependency forge-dialog
 * @dependency forge-icon-button
 * @dependency forge-icon
 *
 * @slot title - The title of the dialog
 * @slot message - The dialog message
 * @slot secondary-button-text - The text used in the secondary action button
 * @slot primary-button-text - The text used in the primary action button
 *
 * @event {CustomEvent<ConfirmationDialogActionEventData>} forge-confirmation-dialog-action - Fired when an action button is clicked. Will contain `false` if the secondary button is clicked, `true` if the primary button is clicked.
 */
@customElement(CONFIRMATION_DIALOG_TAG_NAME)
export class ConfirmationDialogComponent extends BaseLitElement implements IConfirmationDialogComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = CONFIRMATION_DIALOG_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ButtonComponent, CircularProgressComponent, DialogComponent, IconButtonComponent, IconComponent];

  static {
    IconRegistry.define([tylIconClose]);
  }

  public static styles = unsafeCSS(styles);

  /** Indicates whether the confirmation dialog is open. */
  @property({ type: Boolean })
  public open = false;

  /** The accessible label for the dialog. */
  @property()
  public label: string | undefined;

  /** The accessible description for the dialog. */
  @property()
  public description: string | undefined;

  /** Indicates whether the confirmation dialog is in a busy state. */
  @property({ type: Boolean, attribute: 'is-busy' })
  public isBusy = false;

  /** ARIA label for the busy indicator when loading. */
  @property({ type: String, attribute: 'busy-label' })
  public busyLabel = 'Loading';

  @queryAssignedNodes({ slot: 'title', flatten: true })
  private readonly _slottedTitleNodes!: Node[];

  @queryAssignedNodes({ slot: 'message', flatten: true })
  private readonly _slottedMessageNodes!: Node[];

  @queryAssignedNodes({ slot: 'secondary-button-text', flatten: true })
  private readonly _slottedSecondaryButtonTextNodes!: Node[];

  @query('#primary-button')
  private readonly _primaryButtonRef!: ButtonComponent | null;

  #primaryButtonWidth: string | undefined;

  get #title(): TemplateResult {
    const showTitle = this._slottedTitleNodes.length > 0;
    return when(
      showTitle,
      () => html`<h1>${this.#titleSlot}</h1>`,
      () => html`${this.#titleSlot}`
    );
  }

  readonly #titleSlot = html`<slot name="title" id="confirmation-dialog-title" class="title"></slot>`;

  get #closeIconButton(): TemplateResult {
    return html`
      <forge-icon-button autofocus aria-label="Close confirmation dialog" @click=${() => this.#onAction(false)}>
        <forge-icon name="close"></forge-icon>
      </forge-icon-button>
    `;
  }

  readonly #secondaryButtonSlot = html`<slot name="secondary-button-text" id="secondary-button-slot"></slot>`;

  get #primaryButtonSlot(): TemplateResult {
    return this.isBusy ? this.#busyIndicator : html`<slot name="primary-button-text" id="primary-button-slot">Confirm</slot>`;
  }

  get #busyIndicator(): TemplateResult {
    return html`<forge-circular-progress slot="end" aria-label=${this.busyLabel}></forge-circular-progress>`;
  }

  get #secondaryButton(): TemplateResult {
    const showSecondaryButton = this._slottedSecondaryButtonTextNodes.length > 0;
    return when(
      showSecondaryButton,
      () => html`
        <forge-button variant="outlined" ?disabled=${this.isBusy} id="secondary-button" @click=${() => this.#onAction(false)}>
          ${this.#secondaryButtonSlot}
        </forge-button>
      `,
      () => html`${this.#secondaryButtonSlot}`
    );
  }

  get #primaryButton(): TemplateResult {
    return html`
      <forge-button
        ?disabled=${this.isBusy}
        variant="raised"
        id="primary-button"
        style=${styleMap({ minWidth: this.#primaryButtonWidth })}
        @click=${() => this.#onAction(true)}>
        ${this.#primaryButtonSlot}
      </forge-button>
    `;
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('isBusy')) {
      this.#primaryButtonWidth = this.isBusy && this._primaryButtonRef ? `${this._primaryButtonRef.clientWidth}px` : undefined;
    }
  }

  public render(): TemplateResult {
    const showTitleContainer = this._slottedTitleNodes.length > 0;
    return html`
      <forge-dialog
        @slotchange=${this.#handleSlotChange}
        @forge-dialog-before-close=${this.#onBeforeClose}
        @forge-dialog-close=${() => (this.isBusy = false)}
        fullscreen-threshold="0"
        ?open=${this.open}
        .label=${this.label || composeSlottedTextContent(this._slottedTitleNodes) || ''}
        .description=${this.description || composeSlottedTextContent(this._slottedMessageNodes) || ''}>
        <div class="outer-container">
          <div class="title-container" style=${styleMap({ display: showTitleContainer ? 'grid' : 'none' })}>
            ${this.#title}
            <div class="close-button-container">${this.#closeIconButton}</div>
          </div>
          <div class="message-container">
            <slot name="message" id="confirmation-message"></slot>
          </div>
          <div class="actions-container">${this.#secondaryButton} ${this.#primaryButton}</div>
        </div>
      </forge-dialog>
    `;
  }

  #onAction(value: boolean, reason: ConfirmationDialogActionEventReason = 'action', lightDismissEvt?: CustomEvent<IDialogBeforeCloseEventData>): void {
    const actionEvent = new CustomEvent<ConfirmationDialogActionEventData>('forge-confirmation-dialog-action', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        value,
        reason
      }
    });

    this.dispatchEvent(actionEvent);

    if (actionEvent.defaultPrevented && lightDismissEvt) {
      lightDismissEvt?.preventDefault();
    } else if (!actionEvent.defaultPrevented) {
      this.open = false;
      this.isBusy = false;
    }
  }

  #onBeforeClose(evt: CustomEvent<IDialogBeforeCloseEventData>): void {
    if (evt.detail.reason === 'backdrop') {
      evt.preventDefault();
      return;
    }
    this.#onAction(false, 'light-dismiss', evt);
  }

  #handleSlotChange(evt: Event): void {
    const slotName = (evt.target as HTMLSlotElement).name;
    if (['title', 'secondary-button-text', 'primary-button-text'].includes(slotName)) {
      this.requestUpdate();
    }
  }
}
