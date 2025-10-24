import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element';

import styles from './backdrop.scss';

export interface IBackdropComponent extends BaseLitElement {
  visible: boolean;
  fixed: boolean;
  show(): void;
  hide(): void;
  fadeIn(): Promise<void>;
  fadeOut(): Promise<void>;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-backdrop': IBackdropComponent;
  }
}

export const BACKDROP_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-backdrop';

/** Unsure where these should go, for now, here */
const ATTR_VISIBLE = 'visible';
const ENTERING = 'entering';
const EXITING = 'exiting';

/**
 * @tag forge-backdrop
 *
 * @summary Backdrops provide a semi-transparent overlay behind modal content like dialogs and drawers.
 *
 * @cssproperty --forge-backdrop-background
 * @cssproperty --forge-backdrop-opacity
 * @cssproperty --forge-backdrop-z-index
 * @cssproperty --forge-backdrop-enter-animation-duration
 * @cssproperty --forge-backdrop-enter-animation-easing
 * @cssproperty --forge-backdrop-exit-animation-duration
 * @cssproperty --forge-backdrop-exit-animation-easing
 *
 * @csspart root - The root element of the backdrop.
 *
 * @state visible - whether or not the backdrop is visible
 * @state fixed - whether the backdrop uses fixed or relative positioning
 */
@customElement(BACKDROP_TAG_NAME)
export class BackdropComponent extends BaseLitElement implements IBackdropComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BACKDROP_TAG_NAME;

  /** Convenience accessor for the root node. */
  @query('[part="root"]') private _root!: HTMLElement;

  /** Controls whether or not the backdrop is visible
   * @default false;
   */
  @property({ type: Boolean })
  public visible = false;

  /** Controls whether the backdrop uses "fixed" or "relative" positioning
   * @default false;
   */
  @property({ type: Boolean, reflect: true })
  public fixed = false;

  private _didFirstUpdate = false;
  private _animationController?: AbortController;

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearAnimation();
  }

  public override async firstUpdated(): Promise<void> {
    this._didFirstUpdate = true;
    if (this.visible) {
      await this.updateComplete;
      this.show();
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has(ATTR_VISIBLE)) {
      // Property changed by user or API. Default uses animation.
      // If you need immediate change, call show()/hide().
      const animate = this._didFirstUpdate; // no animation on initial render
      void this._applyVisibility(this.visible, { animate });
    }
  }

  /** Immediately shows without animation. */
  public show(): void {
    void this._applyVisibility(true, { animate: false });
  }

  /** Immediately hides without animation. */
  public hide(): void {
    void this._applyVisibility(false, { animate: false });
  }

  /** Shows with enter animation. */
  public fadeIn(): Promise<void> {
    return this._applyVisibility(true, { animate: true });
  }

  /** Hides with exit animation. */
  public fadeOut(): Promise<void> {
    return this._applyVisibility(false, { animate: true });
  }

  private async _applyVisibility(visible: boolean, { animate }: { animate: boolean }): Promise<void> {
    // If not connected, just sync attribute state and stop.
    if (!this.isConnected) {
      this._toggleVisibleAttr(visible);
      return;
    }

    if (!animate) {
      // Immediate sync. No animation classes. Attribute reflects current state.
      this._clearAnimation();
      this._toggleVisibleAttr(visible);
      return;
    }

    // Animated path.
    const className = visible ? ENTERING : EXITING;

    // Cancel any in-flight animation.
    this._clearAnimation();

    this._animationController = new AbortController();
    const signal = this._animationController.signal;

    // For enter, attribute must be present before animation starts.
    if (visible) {
      this._ensureVisibleAttr();
    }

    // Kick off CSS animation via class.
    this._root.classList.add(className);

    // Wait for animationend once.
    await new Promise<void>(resolve => {
      this._root.addEventListener('animationend', () => resolve(), { once: true, signal });
    });

    this._root.classList.remove(ENTERING, EXITING);
    if (!visible) {
      this._removeVisibleAttr();
    }
  }

  private _clearAnimation(): void {
    if (this._animationController) {
      this._animationController.abort();
      this._animationController = undefined;
    }
    this._root?.classList.remove(ENTERING, EXITING);
  }

  // Since visible does not reflect but is instead managed by animation state, we need these helpers

  private _ensureVisibleAttr(): void {
    this.setAttribute(ATTR_VISIBLE, '');
  }

  private _removeVisibleAttr(): void {
    this.removeAttribute(ATTR_VISIBLE);
  }

  private _toggleVisibleAttr(on: boolean): void {
    this.toggleAttribute(ATTR_VISIBLE, on);
  }

  public override render(): TemplateResult {
    return html` <div class="forge-backdrop" part="root"></div> `;
  }
}
