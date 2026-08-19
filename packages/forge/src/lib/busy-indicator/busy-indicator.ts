import { PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { composeSlottedTextContent } from '../core/utils/lit-utils.js';
import { HeadingLevel } from '../core/utils/utils.js';
import { defineButtonComponent } from '../button/index.js';
import { defineCircularProgressComponent } from '../circular-progress/index.js';
import { defineDialogComponent } from '../dialog/index.js';
import { defineLinearProgressComponent } from '../linear-progress/index.js';
import { BusyIndicatorMode, BusyIndicatorVariant } from './busy-indicator-constants.js';

import styles from './busy-indicator.scss';

export interface IBusyIndicatorComponent extends BaseLitElement {
  open: boolean;
  mode: BusyIndicatorMode;
  titleText?: string;
  headingLevel: HeadingLevel;
  message?: string;
  label: string | undefined;
  description: string | undefined;
  cancelable: boolean;
  variant: BusyIndicatorVariant;
  determinate: boolean;
  progress: number;
  buffer: number;
  transparent: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-busy-indicator': IBusyIndicatorComponent;
  }

  interface HTMLElementEventMap {
    'forge-busy-indicator-cancel': CustomEvent<void>;
  }
}

export const BUSY_INDICATOR_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-busy-indicator';

/**
 * @tag forge-busy-indicator
 *
 * @summary Busy indicators communicate to the user that an operation is in progress and blocks interaction with the page or a specific region of it.
 *
 * @slot title - The title text to display.
 * @slot message - The message to display.
 * @slot cancel-text - The text for the cancel button.
 *
 * @event {CustomEvent<void>} forge-busy-indicator-cancel - Fired when the cancel button is clicked.
 */
@customElement(BUSY_INDICATOR_TAG_NAME)
export class BusyIndicatorComponent extends BaseLitElement implements IBusyIndicatorComponent {
  static {
    defineDialogComponent();
    defineCircularProgressComponent();
    defineLinearProgressComponent();
    defineButtonComponent();
  }

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BUSY_INDICATOR_TAG_NAME;

  public static styles = unsafeCSS(styles);

  /** Indicates whether the busy indicator is open. */
  @property({ type: Boolean })
  public open = false;

  /** Whether the busy indicator is fullscreen or inline. */
  @property({ type: String })
  public mode: BusyIndicatorMode = 'fullscreen';

  /** The title text to display. */
  @property({ attribute: 'title-text' })
  public titleText?: string;

  /** The heading level for the title. */
  @property({ attribute: 'heading-level', type: Number })
  public headingLevel: HeadingLevel = 1;

  /** The message to display. */
  @property()
  public message?: string;

  /** The accessible label for dialog. */
  @property()
  public label: string | undefined;

  /** The accessible description for dialog. */
  @property()
  public description: string | undefined;

  /** Indicates whether the cancel button is displayed. */
  @property({ type: Boolean })
  public cancelable = false;

  /**
   * The variant of the busy indicator.
   * - `spinner` (default): displays a spinner.
   * - `progress`: displays a progress bar.
   * - `message-only`: No progress indicator is displayed.
   * @default message
   */
  @property()
  public variant: BusyIndicatorVariant = 'spinner';

  /** Indicates whether the loading indicator is determinate. */
  @property({ type: Boolean })
  public determinate = false;

  /** The progress amount for the progress bar. */
  @property({ type: Number })
  public progress = 0;

  /** The buffer amount for the progress bar. */
  @property({ type: Number })
  public buffer = 0;

  /** Indicates whether the busy indicator surface should be transparent (no background or elevation). */
  @property({ type: Boolean })
  public transparent = false;

  /** Holds the previously focused element before the busy indicator was opened. */
  #previousActiveElement: HTMLElement | null = null;

  @queryAssignedNodes({ slot: 'title', flatten: true })
  private readonly _slottedTitleNodes!: Node[];

  @queryAssignedNodes({ slot: 'message', flatten: true })
  private readonly _slottedMessageNodes!: Node[];

  get #titleTemplate(): TemplateResult | typeof nothing {
    const hasTitle = !!this.titleText?.trim() || this._slottedTitleNodes.length > 0;
    return when(
      hasTitle,
      // prettier-ignore
      () => html`<div role="heading" aria-level=${this.headingLevel} id="title" class="title"><slot name="title">${this.titleText}</slot></div>`,
      () => html`<slot name="title"></slot>`
    );
  }

  get #messageTemplate(): TemplateResult | typeof nothing {
    const hasMessage = !!this.message?.trim() || this._slottedMessageNodes.length > 0;
    return when(
      hasMessage,
      () => html`<p id="message" class="message"><slot name="message">${this.message}</slot></p>`,
      () => html`<slot name="message"></slot>`
    );
  }

  get #spinnerTemplate(): TemplateResult | typeof nothing {
    return when(
      this.variant === 'spinner',
      () =>
        html`<div>
          <forge-circular-progress class="spinner" aria-hidden="true" ?determinate="${this.determinate}" .progress=${this.progress}></forge-circular-progress>
        </div>`
    );
  }

  get #contentTemplate(): TemplateResult | typeof nothing {
    const visible = this.variant === 'message-only' || this.message || this.cancelable;
    return when(visible, () => html`<div class="content">${this.#messageTemplate} ${this.#cancelButtonTemplate}</div>`);
  }

  get #cancelButtonTemplate(): TemplateResult | typeof nothing {
    return when(
      this.cancelable,
      () =>
        html`<forge-button class="cancel-button" variant="outlined" @click=${this.#onCancel}>
          <slot name="cancel-text">Cancel</slot>
        </forge-button>`
    );
  }

  get #progressBarTemplate(): TemplateResult | typeof nothing {
    return when(
      this.variant === 'progress',
      () =>
        html`<div class="progress-container">
          <forge-linear-progress
            aria-hidden="true"
            .determinate="${this.determinate}"
            .buffer=${this.buffer}
            .progress=${this.progress}></forge-linear-progress>
        </div>`
    );
  }

  public override disconnectedCallback(): void {
    if (this.#previousActiveElement) {
      this.#releaseFocus();
    }
    super.disconnectedCallback();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('open')) {
      this.#tryManageFocus();
    }
  }

  public render(): TemplateResult {
    return html`
      <forge-dialog
        class=${classMap({ inline: this.mode === 'inline', transparent: this.transparent })}
        persistent
        fullscreen-threshold="0"
        .open=${this.open}
        .mode=${this.mode === 'inline' ? 'inline-modal' : 'modal'}
        .label=${this.label || this.titleText || composeSlottedTextContent(this._slottedTitleNodes) || ''}
        .description=${this.description || this.message || composeSlottedTextContent(this._slottedMessageNodes) || ''}>
        <div class="surface" @slotchange=${this.#handleSlotChange}>
          ${this.#titleTemplate}
          ${when(
            this.variant === 'spinner' || this.variant === 'message-only' || this.message || this.cancelable,
            () => html`<div class="layout-container">${this.#spinnerTemplate} ${this.#contentTemplate}</div>`
          )}
          ${this.#progressBarTemplate}
        </div>
      </forge-dialog>
    `;
  }

  #onCancel(): void {
    const event = new CustomEvent('forge-busy-indicator-cancel', { bubbles: true, cancelable: true });
    this.dispatchEvent(event);
    if (!event.defaultPrevented) {
      this.open = false;
    }
  }

  #tryManageFocus(): void {
    if (this.open && this.mode === 'fullscreen') {
      this.#captureFocusedElement();
    } else if (this.#previousActiveElement) {
      this.#releaseFocus();
    }
  }

  #captureFocusedElement(): void {
    this.#previousActiveElement = document.activeElement as HTMLElement;
  }

  #releaseFocus(): void {
    this.#previousActiveElement?.focus({ preventScroll: true });
    this.#previousActiveElement = null;
  }

  #handleSlotChange(evt: Event): void {
    const slotName = (evt.target as HTMLSlotElement).name;
    if (['title', 'message'].includes(slotName)) {
      this.requestUpdate();
    }
  }
}
