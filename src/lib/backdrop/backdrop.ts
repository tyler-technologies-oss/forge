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

  public show(): void {
    this._applyVisibility(true, { animate: false });
  }

  public hide(): void {
    this._applyVisibility(false, { animate: false });
  }

  public fadeIn(): Promise<void> {
    return this._applyVisibility(true);
  }

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
