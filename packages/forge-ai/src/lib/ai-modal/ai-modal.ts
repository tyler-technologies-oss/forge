import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { toggleState } from '../utils/dom.js';
import styles from './ai-modal.scss?inline';

const FULLSCREEN_WIDTH_THRESHOLD = 768;

export type AiModalSizeStrategy = 'auto' | 'fixed';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-modal': AiModalComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-modal-open': CustomEvent<void>;
    'forge-ai-modal-close': CustomEvent<{ reason: 'backdrop' | 'escape' | 'programmatic' }>;
    'forge-ai-modal-fullscreen-change': CustomEvent<{ isFullscreen: boolean }>;
  }
}

/**
 * @tag forge-ai-modal
 *
 * @slot - Default slot for modal content
 *
 * @event {CustomEvent<void>} forge-ai-modal-open - Fired when the modal is opened
 * @event {CustomEvent<{ reason: 'backdrop' | 'escape' | 'programmatic' }>} forge-ai-modal-close - Fired when the modal is closed. Detail includes reason for closing.
 * @event {CustomEvent<{ isFullscreen: boolean }>} forge-ai-modal-fullscreen-change - Fired when the fullscreen state changes
 *
 * @cssproperty --forge-ai-modal-width - Width of the modal in non-fullscreen mode
 * @cssproperty --forge-ai-modal-height - Height of the modal in non-fullscreen mode
 *
 * @state fullscreen - The modal is in fullscreen mode
 */
@customElement('forge-ai-modal')
export class AiModalComponent extends LitElement {
  public static readonly styles = unsafeCSS(styles);

  @query('dialog')
  private _dialog!: HTMLDialogElement;

  /**
   * Controls whether the modal is open or closed.
   */
  @property({ type: Boolean })
  public open = false;

  /**
   * Controls whether the modal is displayed in fullscreen mode.
   * When not explicitly set, this will be automatically determined based on viewport size.
   */
  @property({ type: Boolean })
  public fullscreen?: boolean;

  /**
   * Controls the modal sizing strategy.
   * - 'auto' (default): Automatically switches to fullscreen on viewports < 768px
   * - 'fixed': Maintains defined size regardless of viewport, never auto-fullscreens
   */
  @property({ type: String, attribute: 'size-strategy' })
  public sizeStrategy: AiModalSizeStrategy = 'auto';

  /**
   * Accessible label for the dialog, announced by screen readers when the modal opens.
   */
  @property({ type: String })
  public label = 'AI Assistant';

  @state()
  private _autoFullscreen = window.innerWidth <= FULLSCREEN_WIDTH_THRESHOLD;

  #mediaQuery?: MediaQueryList;
  readonly #internals: ElementInternals;
  #closeReason: 'backdrop' | 'escape' | 'programmatic' = 'programmatic';

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#updateFullscreenState();
  }

  public render(): TemplateResult {
    const isFullscreen = this.sizeStrategy === 'fixed' ? (this.fullscreen ?? false) : (this.fullscreen ?? this._autoFullscreen);
    const classes = {
      'forge-dialog': true,
      'forge-dialog--fullscreen': isFullscreen
    };
    return html`
      <dialog
        class=${classMap(classes)}
        aria-label=${this.label}
        @close=${this.#handleDialogClose}
        @click=${this.#handleDialogClick}
        @keydown=${this.#handleDialogKeydown}>
        <slot></slot>
      </dialog>
    `;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#setupMediaQuery();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#cleanupMediaQuery();
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        if (this._dialog && !this._dialog.open) {
          this.setAttribute('data-handles-escape', '');
          this._dialog.showModal();
          this.dispatchEvent(new CustomEvent('forge-ai-modal-open', { bubbles: true, composed: true }));
        }
      } else if (changedProperties.get('open') === true) {
        if (this._dialog?.open) {
          this._dialog.close();
        }
        this.removeAttribute('data-handles-escape');
        this.dispatchEvent(
          new CustomEvent('forge-ai-modal-close', {
            bubbles: true,
            composed: true,
            detail: { reason: this.#closeReason }
          })
        );
        this.#closeReason = 'programmatic';
      }
    }

    if (changedProperties.has('fullscreen') || changedProperties.has('sizeStrategy')) {
      this.#updateFullscreenState();
    }
  }

  #updateFullscreenState(): void {
    const isFullscreen = this.sizeStrategy === 'fixed' ? (this.fullscreen ?? false) : (this.fullscreen ?? this._autoFullscreen);
    toggleState(this.#internals, 'fullscreen', isFullscreen);
  }

  #handleDialogClose(): void {
    if (this.open) {
      this.#closeReason = 'escape';
    }
    this.open = false;
  }

  #handleDialogClick(event: MouseEvent): void {
    // Close modal when clicking on the backdrop (the dialog element itself)
    if (event.target === this._dialog) {
      event.stopPropagation();
      this.#closeReason = 'backdrop';
      this.open = false;
    }
  }

  #handleDialogKeydown(event: KeyboardEvent): void {
    // Stop Escape key from propagating to parent containers
    if (event.key === 'Escape') {
      event.stopPropagation();
    }
  }

  /**
   * Shows the modal dialog.
   */
  public show(): void {
    this.open = true;
  }

  /**
   * Closes the modal dialog.
   */
  public close(): void {
    this.#closeReason = 'programmatic';
    this.open = false;
  }

  #setupMediaQuery(): void {
    this.#mediaQuery = window.matchMedia(`(max-width: ${FULLSCREEN_WIDTH_THRESHOLD}px)`);
    this.#mediaQuery.addEventListener('change', this.#handleMediaChange);
    this.#handleMediaChange(this.#mediaQuery);
  }

  #cleanupMediaQuery(): void {
    this.#mediaQuery?.removeEventListener('change', this.#handleMediaChange);
  }

  #handleMediaChange = (e: MediaQueryList | MediaQueryListEvent): void => {
    const previousFullscreen = this._autoFullscreen;
    this._autoFullscreen = e.matches;

    if (previousFullscreen !== this._autoFullscreen) {
      this.#updateFullscreenState();

      if (this.fullscreen === undefined) {
        const event = new CustomEvent('forge-ai-modal-fullscreen-change', {
          bubbles: true,
          composed: true,
          detail: { isFullscreen: this._autoFullscreen }
        });
        this.dispatchEvent(event);
      }
    }
  };
}
