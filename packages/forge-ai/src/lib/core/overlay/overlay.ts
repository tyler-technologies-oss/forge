import { arrow, autoUpdate, computePosition, flip, offset, shift, size, type ComputePositionReturn, type Middleware, type Placement } from '@floating-ui/dom';
import { LitElement, PropertyValues, html, unsafeCSS, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './overlay.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-overlay': ForgeAiOverlayComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-overlay-toggle': CustomEvent<{
      open: boolean;
      newState: string;
      oldState: string;
    }>;
  }
}

export type OverlayPlacement = Placement;

export type OverlayOffset = number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number };

/**
 * @summary A low-level overlay component that positions content relative to an anchor. Used by `forge-ai-popover` and `forge-ai-tooltip`.
 *
 * @slot - The default slot for overlay content.
 *
 * @cssproperty --ai-overlay-available-width - Set on the overlay when `autoSize` is enabled; the width available in the chosen placement direction. Consumers can use this to constrain slotted content instead of being clipped by the viewport.
 * @cssproperty --ai-overlay-available-height - Set on the overlay when `autoSize` is enabled; the height available in the chosen placement direction.
 */
@customElement('forge-ai-overlay')
export class ForgeAiOverlayComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * The anchor element to position the overlay relative to.
   */
  @property({ type: Object })
  public anchor: Element | null = null;

  /**
   * The placement of the overlay relative to the anchor.
   */
  @property()
  public placement: OverlayPlacement = 'bottom-start';

  /**
   * Whether the overlay should flip to the opposite side when there's no space.
   */
  @property({ type: Boolean })
  public flip = true;

  /**
   * Whether the overlay should shift to stay in view.
   */
  @property({ type: Boolean })
  public shift = false;

  /**
   * Whether the overlay should constrain its own size to the space available in the chosen
   * placement direction, exposed as the `--ai-overlay-available-width`/`--ai-overlay-available-height`
   * CSS custom properties on the overlay so slotted content can shrink (and scroll internally)
   * instead of being clipped by the viewport.
   */
  @property({ type: Boolean, attribute: 'auto-size' })
  public autoSize = false;

  /**
   * Whether the overlay is open.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * The arrow element to position relative to the overlay.
   */
  @property({ type: Object })
  public arrowElement: HTMLElement | null = null;

  /**
   * The offset of the overlay from the anchor element.
   * Can be a number (main axis offset) or an object with mainAxis, crossAxis, and alignmentAxis properties.
   */
  @property({ type: Object })
  public offset: OverlayOffset | undefined = undefined;

  /**
   * The dismiss mode for the overlay.
   * - 'auto': Automatically closes on outside clicks and Escape key
   * - 'manual': Requires manual control to close
   */
  @property({ attribute: 'dismiss-mode' })
  public dismissMode: 'auto' | 'manual' = 'auto';

  private _overlayElement: HTMLElement | null = null;
  private _cleanupAutoUpdate: (() => void) | null = null;

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cleanup();
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('open')) {
      this._handleOpenChange();
    }

    if (
      changedProperties.has('anchor') ||
      changedProperties.has('placement') ||
      changedProperties.has('flip') ||
      changedProperties.has('shift') ||
      changedProperties.has('autoSize') ||
      changedProperties.has('offset') ||
      changedProperties.has('arrowElement')
    ) {
      if (this.open && this._overlayElement && this.anchor) {
        this._updatePosition();
      }
    }
  }

  private _handleOpenChange(): void {
    if (this.open) {
      this._showOverlay();
    } else {
      this._hideOverlay();
    }
  }

  private async _showOverlay(): Promise<void> {
    if (!this._overlayElement) {
      await this.updateComplete;
      this._overlayElement = this.shadowRoot?.querySelector('.ai-overlay') as HTMLElement;
    }

    if (this._overlayElement) {
      this._overlayElement.showPopover();

      if (this.anchor) {
        this._updatePosition();
      }
    }
  }

  private _hideOverlay(): void {
    this._overlayElement?.hidePopover();
    this._cleanup();
  }

  private _updatePosition(): void {
    if (!this.anchor || !this._overlayElement) {
      return;
    }

    this._cleanup();

    const middleware: Middleware[] = [
      ...(this.offset !== undefined ? [offset(this.offset)] : []),
      ...(this.flip ? [flip()] : []),
      ...(this.shift ? [shift({ padding: 8 })] : []),
      ...(this.autoSize
        ? [
            size({
              padding: 8,
              apply: ({ availableWidth, availableHeight, elements }) => {
                elements.floating.style.setProperty('--ai-overlay-available-width', `${availableWidth}px`);
                elements.floating.style.setProperty('--ai-overlay-available-height', `${availableHeight}px`);
              }
            })
          ]
        : []),
      ...(this.arrowElement ? [arrow({ element: this.arrowElement, padding: 8 })] : [])
    ];

    this._cleanupAutoUpdate = autoUpdate(this.anchor, this._overlayElement, () => this._computePosition(middleware));
  }

  private async _computePosition(middleware: Middleware[]): Promise<void> {
    if (!this.anchor || !this._overlayElement) {
      return;
    }

    try {
      const result: ComputePositionReturn = await computePosition(this.anchor, this._overlayElement, {
        placement: this.placement,
        strategy: 'fixed',
        middleware
      });

      Object.assign(this._overlayElement.style, {
        left: '0',
        top: '0',
        translate: `${this._roundByDPR(result.x)}px ${this._roundByDPR(result.y)}px`
      });

      // Add a data attribute for the "actual" placement
      this.setAttribute('data-position-placement', result.placement);

      // Position arrow if provided
      if (this.arrowElement && result.middlewareData.arrow) {
        const { x, y } = result.middlewareData.arrow;
        Object.assign(this.arrowElement.style, {
          left: x != null ? `${x}px` : '',
          top: y != null ? `${y}px` : ''
        });
      }
    } catch (error) {
      console.error('Failed to compute overlay position:', error);
    }
  }

  private _roundByDPR(value: number): number {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(value * dpr) / dpr;
  }

  private _cleanup(): void {
    this._cleanupAutoUpdate?.();
    this._cleanupAutoUpdate = null;
    this.removeAttribute('data-position-placement');
  }

  private _onToggle = (event: ToggleEvent): void => {
    if (event.target !== event.currentTarget) {
      return;
    }

    this.open = event.newState === 'open';

    // Dispatch a custom event for consumers to listen to
    this.dispatchEvent(
      new CustomEvent('forge-ai-overlay-toggle', {
        detail: {
          open: this.open,
          newState: event.newState,
          oldState: event.oldState
        },
        bubbles: true,
        composed: true
      })
    );
  };

  public override render(): TemplateResult {
    return html`
      <div class="ai-overlay" popover=${this.dismissMode} @toggle=${this._onToggle}>
        <slot></slot>
      </div>
    `;
  }
}
