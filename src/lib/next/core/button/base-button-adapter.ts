import { getShadowElement, toggleAttribute, toggleClass } from '@tylertech/forge-core';
import { IRippleComponent, RippleComponent } from '@tylertech/forge/ripple';
import { BaseAdapter, IBaseAdapter, userInteractionListener } from '../../../core';
import { NextButtonType, NEXT_BASE_BUTTON_CONSTANTS } from './base-button-constants';
import { INextBaseButtonElement } from './base-button-element';

export interface INextBaseButtonAdapter extends IBaseAdapter {
  deferRippleInitialization():  Promise<void>;
  setButtonType(type: NextButtonType): void;
  setDisabled(value: boolean): void;
  setHref(value: string | undefined): void;
}

export abstract class NextBaseButtonAdapter<T extends INextBaseButtonElement> extends BaseAdapter<T> implements INextBaseButtonAdapter {
  protected _rootElement: HTMLButtonElement | HTMLAnchorElement;
  protected _rippleElement: IRippleComponent | undefined;

  constructor(protected _component: T) {
    super(_component);
    this._rootElement = getShadowElement(_component, NEXT_BASE_BUTTON_CONSTANTS.selectors.ROOT) as HTMLButtonElement;
  }

  public async deferRippleInitialization(): Promise<void> {
    const type = await userInteractionListener(this._rootElement);

    if (!this._rippleElement) {
      this._initializeRipple();

      if (this._rippleElement && type === 'focusin') {
        (this._rippleElement as IRippleComponent)?.handleFocus();
      }
    }
  }

  public setButtonType(type: NextButtonType): void {
    if (this._rootElement instanceof HTMLButtonElement) {
      this._rootElement.type = type;
    }
  }

  public setDisabled(value: boolean): void {
    toggleAttribute(this._rootElement, value, 'disabled');
    toggleClass(this._rootElement, value, NEXT_BASE_BUTTON_CONSTANTS.classes.DISABLED);
  }

  public setHref(value: string | undefined): void {
    const isLink = !!value;
    let newRoot: HTMLButtonElement | HTMLAnchorElement | undefined;

    if (isLink) {
      if (this._rootElement instanceof HTMLAnchorElement) {
        this._rootElement.href = value;
      } else {
        newRoot = document.createElement('a');
      }
    } else if (this._rootElement instanceof HTMLAnchorElement) {
      newRoot = document.createElement('button');
    }

    if (newRoot) {
      this._replaceRootElement(newRoot);

      if (this._rippleElement) {
        this._rippleElement.remove();
        this._initializeRipple();
      }
    }
  }

  private _replaceRootElement(el: HTMLButtonElement | HTMLAnchorElement): void {
    this._rootElement.parentNode?.replaceChild(el, this._rootElement);

    // Copy children
    el.append(...Array.from(this._rootElement.childNodes));

    // Initialize element
    el.classList.add(NEXT_BASE_BUTTON_CONSTANTS.classes.ROOT);
    el.setAttribute('part', 'root');

    this._rootElement = el;
  }

  private _initializeRipple(): void {
    if (!this._rippleElement) {
      this._rippleElement = document.createElement('forge-ripple');
    }
    this._rootElement.appendChild(this._rippleElement);
  }
}
