import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element';
import { toggleState } from '../core/utils/utils';

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
const STATE_VISIBLE = 'visible';
const STATE_ENTERING = 'entering';
const STATE_EXITING = 'exiting';

/**
 * @tag forge-backdrop
 *
 * @summary Backdrops provide a semi-transparent overlay behind modal content like dialogs and drawers.
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
 *
 * @state visible - whether or not the backdrop is visible
 * @state entering - applied during enter animation
 * @state exiting - applied during exit animation
 */
@customElement(BACKDROP_TAG_NAME)
export class BackdropComponent extends BaseLitElement implements IBackdropComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BACKDROP_TAG_NAME;

  /**
   * Controls whether or not the backdrop is visible.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public visible = false;

  /**
   * Controls whether the backdrop uses "fixed" or "relative" positioning.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public fixed = false;

  #internals: ElementInternals;
  #animationController?: AbortController;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#cancelAnimation();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has(STATE_VISIBLE)) {
      // Default behavior: animate if component has rendered at least once
      if (this.hasUpdated) {
        void this.#animateVisibility(this.visible);
      } else {
        // No animation on initial render
        this.toggleAttribute(STATE_VISIBLE, this.visible);
      }
    }
  }

  /** Immediately shows without animation. */
  public show(): void {
    this.#cancelAnimation();
    this.visible = true;
    this.toggleAttribute(STATE_VISIBLE, true);
  }

  /** Immediately hides without animation. */
  public hide(): void {
    this.#cancelAnimation();
    this.visible = false;
    this.toggleAttribute(STATE_VISIBLE, false);
  }

  /** Shows with enter animation. */
  public async fadeIn(): Promise<void> {
    this.visible = true;
    await this.#animateVisibility(true);
  }

  /** Hides with exit animation. */
  public async fadeOut(): Promise<void> {
    this.visible = false;
    await this.#animateVisibility(false);
  }

  public override render(): TemplateResult {
    return html` <div class=${BACKDROP_TAG_NAME} part="root"></div> `;
  }

  async #animateVisibility(visible: boolean): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    this.#cancelAnimation();

    // Set visible attribute for enter animations before starting
    if (visible) {
      this.toggleAttribute(STATE_VISIBLE, true);
    }

    // Set animation state
    toggleState(this.#internals, STATE_ENTERING, visible);
    toggleState(this.#internals, STATE_EXITING, !visible);

    await this.updateComplete;

    // Get the root element from shadow DOM to listen for animation events
    const rootElement = this.shadowRoot?.querySelector(`.${BACKDROP_TAG_NAME}`) as HTMLElement;
    if (!rootElement) {
      return;
    }

    // Wait for CSS animation to complete
    this.#animationController = new AbortController();
    const signal = this.#animationController.signal;

    try {
      await new Promise<void>((resolve, reject) => {
        rootElement.addEventListener('animationend', () => resolve(), { once: true, signal });
        signal.addEventListener('abort', () => reject(new Error('Animation cancelled')));
      });
    } catch {
      // Animation was cancelled
      return;
    }

    // Clean up animation states
    toggleState(this.#internals, STATE_ENTERING, false);
    toggleState(this.#internals, STATE_EXITING, false);

    // Remove visible attribute for exit animations after completion
    if (!visible) {
      this.toggleAttribute(STATE_VISIBLE, false);
    }

    this.#animationController = undefined;
  }

  #cancelAnimation(): void {
    if (this.#animationController) {
      this.#animationController.abort();
      this.#animationController = undefined;
    }
    toggleState(this.#internals, STATE_ENTERING, false);
    toggleState(this.#internals, STATE_EXITING, false);
  }
}
