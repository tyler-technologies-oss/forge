import { attachShadowTemplate, coerceBoolean, CustomElement, getShadowElement } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { BACKDROP_CONSTANTS } from './backdrop-constants';

import template from './backdrop.html';
import styles from './backdrop.scss';

export interface IBackdropComponent extends IBaseComponent {
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

/**
 * @tag forge-backdrop
 * 
 * @property {boolean} [visible=false] - Whether the backdrop is visible.
 * @property {boolean} [fixed=false] - Whether the backdrop uses "fixed" or "relative" positioning.
 * 
 * @attribute {boolean} [visible=false] - Whether the backdrop is visible.
 * @attribute {boolean} [fixed=false] - Whether the backdrop uses "fixed" or "relative" positioning.
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
@CustomElement({
  name: BACKDROP_CONSTANTS.elementName
})
export class BackdropComponent extends BaseComponent {
  public static get observedAttributes(): string[] {
    return Object.values(BACKDROP_CONSTANTS.observedAttributes);
  }

  private _visible = false;
  private _fixed = false;
  private _rootElement: HTMLElement;
  private _animationController: AbortController | undefined;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._rootElement = getShadowElement(this, BACKDROP_CONSTANTS.selectors.ROOT);
  }

  public disconnectedCallback(): void {
    if (this._animationController) {
      this._animationController.abort();
      this._animationController = undefined;
    }

    this.classList.remove(BACKDROP_CONSTANTS.classes.ENTERING, BACKDROP_CONSTANTS.classes.EXITING);
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BACKDROP_CONSTANTS.attributes.VISIBLE:
        this.visible = coerceBoolean(newValue);
        break;
      case BACKDROP_CONSTANTS.attributes.FIXED:
        this.fixed = coerceBoolean(newValue);
        break;
    }
  }

  private async _applyVisibility(visible: boolean, { animate } = { animate: true }): Promise<void> {
    if (this._visible === visible) {
      return;
    }

    this._visible = visible;

    if (!this.isConnected) {
      this.toggleAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE, this._visible);
      return Promise.resolve();
    }

    if (!animate) {
      this.toggleAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE, this._visible);
      return;
    }

    const isVisible = this._visible;
    const className = isVisible ? BACKDROP_CONSTANTS.classes.ENTERING : BACKDROP_CONSTANTS.classes.EXITING;

    if (this._animationController) {
      this._animationController.abort();
      this._rootElement.classList.remove(BACKDROP_CONSTANTS.classes.ENTERING, BACKDROP_CONSTANTS.classes.EXITING);
    }

    this._animationController = new AbortController();

    const animationComplete = new Promise<void>(resolve => {
      this._rootElement.addEventListener('animationend', () => {
        if (!isVisible) {
          this.removeAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE);
        }
        this._rootElement.classList.remove(className);
        resolve();
      }, { once: true, signal: this._animationController?.signal });
    });

    if (isVisible) {
      this.setAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE, '');
    }

    this._rootElement.classList.add(className);

    return animationComplete;
  }

  /** Immediately shows the backdrop by setting the `visibility` to `true` without animations. */
  public show(): void {
    this._applyVisibility(true, { animate: false });
  }

  /** Immediately hides the backdrop by setting the `visibility` to `false` without animations. */
  public hide(): void {
    this._applyVisibility(false, { animate: false });
  }

  /** Sets the `visibility` to `true` and animates in. */
  public fadeIn(): Promise<void> {
    return this._applyVisibility(true);
  }

  /** Sets the `visibility` to `false` and animates out. */
  public fadeOut(): Promise<void> {
    return this._applyVisibility(false);
  }

  public get visible(): boolean {
    return this._visible;
  }
  public set visible(value: boolean) {
    value = Boolean(value);
    if (this._visible !== value) {
      this._applyVisibility(value);
    }
  }

  public get fixed(): boolean {
    return this._fixed;
  }
  public set fixed(value: boolean) {
    value = Boolean(value);
    if (this._fixed !== value) {
      this._fixed = value;
      this.toggleAttribute(BACKDROP_CONSTANTS.attributes.FIXED, this._fixed);
    }
  }
}
