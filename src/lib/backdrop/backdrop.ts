import { attachShadowTemplate, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { BackdropAdapter } from './backdrop-adapter';
import { BackdropAppearance, BACKDROP_CONSTANTS } from './backdrop-constants';
import { BackdropFoundation } from './backdrop-foundation';

import template from './backdrop.html';
import styles from './backdrop.scss';

export interface IBackdropComponent extends IBaseComponent {
  delay: number;
  maxOpacity: number;
  appearance: BackdropAppearance;
  fadeOut(): Promise<void>;
  fadeIn(): Promise<void>;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-backdrop': IBackdropComponent;
  }

  interface HTMLElementEventMap {
    'forge-backdrop-click': CustomEvent<void>;
  }
}

/**
 * A web component that renders a backdrop covering its parent container with a semi-opaque element.
 * 
 * @tag forge-backdrop
 */
@CustomElement({
  name: BACKDROP_CONSTANTS.elementName
})
export class BackdropComponent extends BaseComponent {
  public static get observedAttributes(): string[] {
    return [
      BACKDROP_CONSTANTS.attributes.DELAY,
      BACKDROP_CONSTANTS.attributes.MAX_OPACITY
    ];
  }

  protected _foundation: BackdropFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new BackdropFoundation(new BackdropAdapter(this));
  }

  public connectedCallback(): void {
    if (this.hasAttribute(BACKDROP_CONSTANTS.attributes.DELAY) && this.getAttribute(BACKDROP_CONSTANTS.attributes.DELAY)) {
      const inDelay = Number(this.getAttribute(BACKDROP_CONSTANTS.attributes.DELAY));
      this.delay = inDelay >= 0 ? inDelay : BACKDROP_CONSTANTS.numbers.DELAY;
    }

    if (this.hasAttribute(BACKDROP_CONSTANTS.attributes.MAX_OPACITY)) {
      const inMaxOpacity = Number(this.getAttribute(BACKDROP_CONSTANTS.attributes.MAX_OPACITY));
      this.maxOpacity = inMaxOpacity >= 0 && inMaxOpacity <= 1 ? inMaxOpacity : BACKDROP_CONSTANTS.numbers.OPACITY;
    }

    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BACKDROP_CONSTANTS.attributes.DELAY:
        const delayValue = Number(newValue);
        this.delay = delayValue >= 0 ? delayValue : BACKDROP_CONSTANTS.numbers.DELAY;
        break;
      case BACKDROP_CONSTANTS.attributes.MAX_OPACITY:
        const opacityValue = Number(newValue);
        this.maxOpacity = opacityValue >= 0 && opacityValue <= 1 ? opacityValue : BACKDROP_CONSTANTS.numbers.OPACITY;
        break;
      case BACKDROP_CONSTANTS.attributes.APPEARANCE:
        this.appearance = newValue as BackdropAppearance;
        break;
    }
  }

  /**
   * The time in milliseconds to delay the fade in animation of the opacity.
   * Note: The element will start with 0% opacity when the component is rendered.
   */
  @FoundationProperty()
  public declare delay: number;

  /** Controls whether the theme defaults to light vs dark compatibility. */
  @FoundationProperty()
  public declare appearance: BackdropAppearance;

  /** The max opacity to fade the element to. This defines how opaque the backdrop is when visible. */
  @FoundationProperty()
  public declare maxOpacity: number;

  /**
   * Starts the fade-out animation to animate the backdrop to 0% opacity.
   */
  public fadeOut(): Promise<void> {
    return this._foundation.fadeOut();
  }

  /**
   * Starts the fade-in animation to animate the backdrop to max opacity.
   */
  public fadeIn(): Promise<void> {
    return this._foundation.fadeIn();
  }
}
