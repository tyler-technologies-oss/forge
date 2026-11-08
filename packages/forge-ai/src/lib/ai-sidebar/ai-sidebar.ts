import { LitElement, PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Ref, createRef, ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import { ResizeController } from '../core/resize-controller.js';
import { readStoredNumber, removeStoredValue, writeStoredNumber } from '../utils/storage-utils';
import type { StorageKind } from '../utils/storage-utils';
import type { FeatureToggle } from '../types/index.js';

import styles from './ai-sidebar.scss?inline';

const DEFAULT_WIDTH = 420;
const MIN_WIDTH = 360;
const MAX_WIDTH = 800;

const WIDTH_STORAGE_KEY = 'forge-ai-sidebar-width';
const WIDTH_STORAGE_KINDS: readonly StorageKind[] = ['session', 'local'];

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-sidebar': AiSidebarComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-sidebar-open': CustomEvent<void>;
    'forge-ai-sidebar-close': CustomEvent<void>;
    'forge-ai-sidebar-resize': CustomEvent<ForgeAiSidebarResizeEventData>;
  }
}

export interface ForgeAiSidebarResizeEventData {
  width: number;
}

export const AiSidebarComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-sidebar';

/**
 * @tag forge-ai-sidebar
 *
 * @slot - Default slot for sidebar content (typically ai-chat-interface)
 *
 * @fires forge-ai-sidebar-open - Fired when the sidebar is opened
 * @fires forge-ai-sidebar-close - Fired when the sidebar is closed
 * @fires forge-ai-sidebar-resize - Fired when a resize is committed via pointer release or keyboard step
 */
@customElement(AiSidebarComponentTagName)
export class AiSidebarComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * Indicates whether the sidebar is open.
   */
  @property({ type: Boolean })
  public open = false;

  /**
   * Enables sidebar resizing. Set to `'off'` to disable and reset to the default width.
   */
  @property()
  public resizable: FeatureToggle = 'on';

  /**
   * The current width of the sidebar in pixels. Clamped to the min/max bounds and viewport.
   * Resized widths are persisted per tab in sessionStorage and shared across tabs via localStorage.
   * On load the session value is preferred, then the local value, then the default.
   */
  @property({ type: Number })
  public width = DEFAULT_WIDTH;

  /**
   * Indicates whether the sidebar is in a closing animation state.
   */
  @state()
  private _closing = false;

  /**
   * Indicates whether the animation container is in a closing state.
   */
  @state()
  private _containerClosing = false;

  /**
   * Indicates whether the sidebar is being resized.
   */
  @state()
  private _isResizing = false;

  #resizeHandleRef: Ref<HTMLElement> = createRef();
  #drawerRef: Ref<HTMLElement> = createRef();
  #containerRef: Ref<HTMLElement> = createRef();
  readonly #resizeController: ResizeController;

  constructor() {
    super();
    this.width = this.#readPersistedWidth() ?? DEFAULT_WIDTH;
    this.#resizeController = new ResizeController(this, {
      targetElementRef: this.#containerRef,
      resizeHandleRef: this.#resizeHandleRef,
      minWidth: MIN_WIDTH,
      maxWidth: MAX_WIDTH,
      defaultWidth: DEFAULT_WIDTH,
      onResize: width => {
        this.width = width;
      },
      onResizeStart: () => {
        this._isResizing = true;
      },
      onResizeEnd: () => {
        this._isResizing = false;
      },
      onCommit: width => {
        this.#handleResizeCommit(width);
      }
    });
  }

  public override render(): TemplateResult {
    const containerClasses = {
      'animation-container': true,
      'animation-container--open': this.open && !this._containerClosing,
      'animation-container--closing': this._containerClosing,
      'animation-container--closed': !this.open && !this._containerClosing,
      'animation-container--resizing': this._isResizing
    };

    const drawerClasses = {
      'forge-drawer': true,
      'forge-drawer--right': true,
      'forge-drawer--closing': this._closing,
      'forge-drawer--closed': !this.open && !this._closing,
      'forge-drawer--resizing': this._isResizing
    };

    const handleClasses = {
      'resize-handle': true,
      'resize-handle--active': this._isResizing
    };

    const containerStyles = {
      '--forge-drawer-width': `${this.width}px`
    };

    return html`
      <div
        ${ref(this.#containerRef)}
        class=${classMap(containerClasses)}
        style=${styleMap(containerStyles)}
        @transitionend=${this.#handleContainerTransitionEnd}>
        <aside
          ${ref(this.#drawerRef)}
          class=${classMap(drawerClasses)}
          ?open=${this.open}
          role="complementary"
          aria-hidden=${!this.open}
          @transitionend=${this.#handleDrawerTransitionEnd}>
          ${when(
            this.resizable === 'on',
            () => html`
              <div
                ${ref(this.#resizeHandleRef)}
                class=${classMap(handleClasses)}
                role="slider"
                aria-orientation="vertical"
                aria-label="Resize chatbot panel, use left and right arrow keys"
                aria-valuemin="${MIN_WIDTH}"
                aria-valuemax="${MAX_WIDTH}"
                aria-valuenow=${this.width}
                aria-valuetext="${this.width} pixels"
                tabindex="0"
                @pointerdown=${this.#handleResizePointerDown}
                @keydown=${this.#handleResizeKeyDown}>
                <span class="resize-handle__grip" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2" />
                  </svg>
                </span>
              </div>
            `
          )}
          <slot></slot>
        </aside>
      </div>
    `;
  }

  /**
   * Opens the sidebar.
   */
  public show(): void {
    if (!this.open) {
      this._closing = false;
      this._containerClosing = false;
      this.open = true;
      this.#dispatchEvent('forge-ai-sidebar-open');
    }
  }

  /**
   * Closes the sidebar.
   */
  public close(): void {
    if (this.open && !this._closing && !this._containerClosing) {
      this._closing = true;
      this._containerClosing = true;
      // The actual closing and event dispatch will happen in transition end handlers
    }
  }

  /**
   * Toggles the sidebar open state.
   */
  public toggle(): void {
    if (this.open) {
      this.close();
    } else {
      this.show();
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('width') && this.width !== this.#resizeController.currentWidth) {
      this.#resizeController.setWidth(this.width);
    }
    if (changedProperties.has('resizable') && this.resizable === 'off') {
      this.#resizeController.resetWidth();
      if (this.hasUpdated) {
        this.#clearPersistedWidth();
      }
    }
  }

  #handleContainerTransitionEnd(evt: TransitionEvent): void {
    // Only handle transitions from the animation container, not child elements
    if (evt.target === evt.currentTarget && this._containerClosing) {
      this._containerClosing = false;
      // Wait for drawer animation to complete before finalizing close state
    }
  }

  #handleDrawerTransitionEnd(evt: TransitionEvent): void {
    // Only handle transitions from the drawer element, not child elements
    if (evt.target === evt.currentTarget && this._closing) {
      this.open = false;
      this._closing = false;
      this.#dispatchEvent('forge-ai-sidebar-close');
    }
  }

  #handleResizePointerDown(event: PointerEvent): void {
    this.#resizeController.handlePointerDown(event);
  }

  #handleResizeKeyDown(event: KeyboardEvent): void {
    this.#resizeController.handleKeyDown(event);
  }

  #handleResizeCommit(width: number): void {
    this.#dispatchEvent('forge-ai-sidebar-resize', { width });
    this.#persistWidth(width);
  }

  #readPersistedWidth(): number | undefined {
    for (const kind of WIDTH_STORAGE_KINDS) {
      const width = readStoredNumber({ kind, key: WIDTH_STORAGE_KEY });
      if (width !== undefined) {
        return width;
      }
    }
    return undefined;
  }

  #persistWidth(width: number): void {
    for (const kind of WIDTH_STORAGE_KINDS) {
      writeStoredNumber({ kind, key: WIDTH_STORAGE_KEY, value: width });
    }
  }

  #clearPersistedWidth(): void {
    for (const kind of WIDTH_STORAGE_KINDS) {
      removeStoredValue({ kind, key: WIDTH_STORAGE_KEY });
    }
  }

  #dispatchEvent<T>(type: keyof HTMLElementEventMap, detail?: T): void {
    const event = new CustomEvent<T>(type, {
      bubbles: true,
      composed: true,
      detail
    });
    this.dispatchEvent(event);
  }
}
