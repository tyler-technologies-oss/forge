import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { BACKDROP_CONSTANTS } from './backdrop-constants.js';

import styles from './backdrop.scss';

/** @deprecated - This will be removed in the future. Please switch to using BackdropComponent. */
export interface IBackdropComponent extends BaseLitElement {
  visible: boolean;
  fixed: boolean;
  show(): void;
  hide(): void;
  fadeIn(): Promise<void>;
  fadeOut(): Promise<void>;
}

/**
 * @tag forge-backdrop
 *
 * @summary Backdrops provide a semi-transparent overlay behind modal content like dialogs and drawers. These are building blocks for creating modal experiences, not intended to be used directly.
 *
 * @cssproperty --forge-backdrop-background - The backdrop background color.
 * @cssproperty --forge-backdrop-opacity - The backdrop opacity.
 * @cssproperty --forge-backdrop-z-index - The backdrop z-index.
 * @cssproperty --forge-backdrop-enter-animation-duration - The animation duration for the enter animation.
 * @cssproperty --forge-backdrop-enter-animation-easing - The animation easing for the enter animation.
 * @cssproperty --forge-backdrop-exit-animation-duration - The animation duration for the exit animation.
 * @cssproperty --forge-backdrop-exit-animation-easing - The animation easing for the exit animation.
 *
 * @csspart root - The root element of the backdrop.
 */
export class BackdropComponent extends BaseLitElement implements IBackdropComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BACKDROP_CONSTANTS.elementName;

  #visible = false;
  #resolveAnimation: (() => void) | undefined;

  @state() private _animation: 'entering' | 'exiting' | undefined;

  /**
   * Whether the backdrop is visible.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public set visible(value: boolean) {
    this.#applyVisibility(Boolean(value));
  }
  public get visible(): boolean {
    return this.#visible;
  }

  /**
   * Whether the backdrop uses "fixed" or "relative" positioning.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public fixed = false;

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#finishAnimation();
  }

  /** Immediately shows the backdrop by setting the `visibility` to `true` without animations. */
  public show(): void {
    this.#applyVisibility(true, { animate: false });
  }

  /** Immediately hides the backdrop by setting the `visibility` to `false` without animations. */
  public hide(): void {
    this.#applyVisibility(false, { animate: false });
  }

  /** Sets the `visibility` to `true` and animates in. */
  public fadeIn(): Promise<void> {
    return this.#applyVisibility(true);
  }

  /** Sets the `visibility` to `false` and animates out. */
  public fadeOut(): Promise<void> {
    return this.#applyVisibility(false);
  }

  public render(): TemplateResult {
    return html`
      <div
        class=${classMap({
          'forge-backdrop': true,
          [BACKDROP_CONSTANTS.classes.ENTERING]: this._animation === 'entering',
          [BACKDROP_CONSTANTS.classes.EXITING]: this._animation === 'exiting'
        })}
        part="root"
        @animationend=${this.#onAnimationEnd}></div>
    `;
  }

  #applyVisibility(visible: boolean, { animate } = { animate: true }): Promise<void> {
    if (this.#visible === visible) {
      return Promise.resolve();
    }

    this.#visible = visible;

    if (!this.isConnected || !animate) {
      this.#finishAnimation();
      this.toggleAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE, visible);
      return Promise.resolve();
    }

    this.#finishAnimation();

    if (visible) {
      this.setAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE, '');
    }

    return new Promise<void>(resolve => {
      this.#resolveAnimation = resolve;
      this._animation = visible ? 'entering' : 'exiting';
    });
  }

  #onAnimationEnd(): void {
    if (!this._animation) {
      return;
    }

    if (!this.#visible) {
      this.removeAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE);
    }
    this.#finishAnimation();
  }

  #finishAnimation(): void {
    this._animation = undefined;
    this.#resolveAnimation?.();
    this.#resolveAnimation = undefined;
  }
}

tryDefine(BACKDROP_CONSTANTS.elementName, BackdropComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-backdrop': IBackdropComponent;
  }
}
