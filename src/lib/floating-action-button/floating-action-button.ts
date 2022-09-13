import { coerceBoolean, CustomElement, ensureChildren, toggleClass } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ForgeRipple } from '../ripple';
import { FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants';

export interface IFloatingActionButtonComponent extends IBaseComponent {
  exited: boolean;
  mini: boolean;
  extended: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-fab': IFloatingActionButtonComponent;
  }
}

/**
 * The custom element class behind the `<forge-fab>` element.
 * 
 * @tag forge-fab
 */
@CustomElement({
  name: FLOATING_ACTION_BUTTON_CONSTANTS.elementName
})
export class FloatingActionButton extends BaseComponent implements IFloatingActionButtonComponent {
  public static get observedAttributes(): string[] {
    return [
      FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXITED,
      FLOATING_ACTION_BUTTON_CONSTANTS.attributes.MINI,
      FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXTENDED
    ];
  }

  private _rippleInstance: ForgeRipple;
  private _isExtended = false;
  private _isMini = false;
  private _isExited = false;
  private _buttonElement: HTMLButtonElement;

  constructor() {
    super();
  }

  public connectedCallback(): void {
    if (this.children.length) {
      this._initialize();
    } else {
      ensureChildren(this).then(() => this._initialize());
    }
  }

  public disconnectedCallback(): void {
    if (this._rippleInstance) {
      this._rippleInstance.destroy();
    }
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXITED:
        this.exited = coerceBoolean(newValue);
        break;
      case FLOATING_ACTION_BUTTON_CONSTANTS.attributes.MINI:
        this.mini = coerceBoolean(newValue);
        break;
      case FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXTENDED:
        this.extended = coerceBoolean(newValue);
        break;
    }
  }

  private _initialize(): void {
    // Make sure we have a button element
    this._buttonElement = this.querySelector(FLOATING_ACTION_BUTTON_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
    if (!this._buttonElement) {
      return;
    }

    this._buttonElement.classList.add(FLOATING_ACTION_BUTTON_CONSTANTS.classes.BUTTON);

    const rippleElement = this._buttonElement.querySelector(`.${FLOATING_ACTION_BUTTON_CONSTANTS.classes.RIPPLE}`) || document.createElement('div');
    rippleElement.classList.add(FLOATING_ACTION_BUTTON_CONSTANTS.classes.RIPPLE);
    this._buttonElement.insertAdjacentElement('afterbegin', rippleElement);
    this._sync();

    if (this._rippleInstance) {
      this._rippleInstance.destroy();
    }

    this._rippleInstance = new ForgeRipple(this._buttonElement);
  }

  private _sync(): void {
    if (!this._buttonElement) {
      return;
    }

    toggleClass(this._buttonElement, this._isExited, FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXITED);
    toggleClass(this._buttonElement, this._isMini, FLOATING_ACTION_BUTTON_CONSTANTS.classes.BUTTON_MINI);
    toggleClass(this._buttonElement, this._isExtended, FLOATING_ACTION_BUTTON_CONSTANTS.classes.BUTTON_EXTENDED);

    // Check if we need to set the label class
    const labelElement = this.querySelector(FLOATING_ACTION_BUTTON_CONSTANTS.selectors.LABEL);
    if (labelElement) {
      labelElement.classList.add(FLOATING_ACTION_BUTTON_CONSTANTS.classes.LABEL);
    }

    // Check if we need to set the icon class
    const iconElement = this.querySelector(FLOATING_ACTION_BUTTON_CONSTANTS.selectors.ICON);
    if (iconElement) {
      iconElement.classList.add(FLOATING_ACTION_BUTTON_CONSTANTS.classes.ICON);
      iconElement.setAttribute('aria-hidden', 'true');
    }
  }

  /** Gets/sets the exited state. */
  public set exited(value: boolean) {
    if (this._isExited !== value) {
      this._isExited = value;
      this.setAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXITED, this._isExited.toString());
      this._sync();
    }
  }
  public get exited(): boolean {
    return this._isExited;
  }
  
  /** Gets/sets the mini state. */
  public set mini(value: boolean) {
    if (this._isMini !== value) {
      this._isMini = value;
      this.setAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.MINI, this._isMini.toString());
      this._sync();
    }
  }
  public get mini(): boolean {
    return this._isMini;
  }
  
  /** Gets/sets the extended state. */
  public set extended(value: boolean) {
    if (this._isExtended !== value) {
      this._isExtended = value;
      this.setAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXTENDED, this._isExtended.toString());
      this._sync();
    }
  }
  public get extended(): boolean {
    return this._isExtended;
  }
}
