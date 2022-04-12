import { MDCRipple } from '@material/ripple';
import { coerceBoolean, coerceNumber, CustomElement, emitEvent, ensureChild } from '@tylertech/forge-core';
import { toggleClass } from '../core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ICON_BUTTON_CONSTANTS } from './icon-button-constants';

export interface IIconButtonComponent extends IBaseComponent {
  toggle: boolean;
  isOn: boolean;
  dense: boolean;
  densityLevel: number;
  layout(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-icon-button': IIconButtonComponent;
  }

  interface HTMLElementEventMap {
    'forge-icon-button-change': CustomEvent<boolean>;
  }
}

/**
 * The custom element class behind the `<forge-icon-button>` element.
 */
@CustomElement({
  name: ICON_BUTTON_CONSTANTS.elementName
})
export class IconButtonComponent extends BaseComponent implements IIconButtonComponent {
  public static get observedAttributes(): string[] {
    return [
      ICON_BUTTON_CONSTANTS.attributes.IS_ON,
      ICON_BUTTON_CONSTANTS.attributes.DENSE,
      ICON_BUTTON_CONSTANTS.attributes.DENSITY_LEVEL,
      ICON_BUTTON_CONSTANTS.attributes.TOGGLE
    ];
  }

  private _mdcRipple: MDCRipple;
  private _buttonElement: HTMLButtonElement;
  private _toggle = false;
  private _isOn = false;
  private _dense = false;
  private _densityLevel = 5;
  private _toggleHandler: (event: Event) => void;

  constructor() {
    super();
  }

  public connectedCallback(): void {
    if (this.querySelector(ICON_BUTTON_CONSTANTS.selectors.BUTTON)) {
      this._initialize();
    } else {
      ensureChild(this, ICON_BUTTON_CONSTANTS.selectors.BUTTON).then(() => this._initialize());
    }
  }

  public disconnectedCallback(): void {
    if (this._mdcRipple) {
      this._mdcRipple.destroy();
    }
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case ICON_BUTTON_CONSTANTS.attributes.IS_ON:
        this.isOn = coerceBoolean(newValue);
        break;
      case ICON_BUTTON_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case ICON_BUTTON_CONSTANTS.attributes.DENSITY_LEVEL:
        this.densityLevel = coerceNumber(newValue);
        break;
      case ICON_BUTTON_CONSTANTS.attributes.TOGGLE:
        this.toggle = coerceBoolean(newValue);
        break;
    }
  }

  /** Gets/sets whether the button is togglable. */
  public get toggle(): boolean {
    return this._toggle;
  }
  public set toggle(value: boolean) {
    this._toggle = value;

    if (this._toggle) {
      this._initializeToggle();
    } else {
      this._destroyToggle();
    }
  }

  /** Gets/sets the toggled state of the icon button. Only applies when `toggle = true`. */
  public get isOn(): boolean {
    return this._isOn;
  }
  public set isOn(value: boolean) {
    if (this._isOn !== value) {
      this._isOn = value;
      this._applyToggle();
    }
  }

  /** Gets/sets whether the icon button is dense. */
  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._applyDensity();
    }
  }

  /** Controls the density level. 1 (least dense) to 6 (most dense). */
  public get densityLevel(): number {
    return this._densityLevel;
  }
  public set densityLevel(value: number) {
    if (this._densityLevel !== value) {
      this._densityLevel = value;

      if (this._densityLevel <= 0) {
        this._densityLevel = 1;
      } else if (this._densityLevel > 6) {
        this._densityLevel = 6;
      } else if (typeof this._densityLevel !== 'number') {
        this._densityLevel = 5;
      }

      this._applyDensity();
    }
  }

  private _initialize(): void {
    this._buttonElement = this.querySelector(ICON_BUTTON_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
    if (!this._buttonElement) {
      return;
    }

    this._buttonElement.classList.add(ICON_BUTTON_CONSTANTS.classes.BUTTON);
    this._applyToggle();
    this._applyDensity();
    this._toggleHandler = () => {
      this._toggleValue();
      emitEvent(this, ICON_BUTTON_CONSTANTS.events.CHANGE, this._isOn, true);
    };

    if (this._toggle) {
      this._initializeToggle();
    }

    if (this._mdcRipple) {
      this._mdcRipple.destroy();
    }

    this._mdcRipple = new MDCRipple(this._buttonElement);
    this._mdcRipple.unbounded = true;
  }

  private _toggleValue(): void {
    this._isOn = !this._isOn;
    this._applyToggle();
  }

  private _applyToggle(): void {
    if (!this._buttonElement) {
      return;
    }
    toggleClass(this._buttonElement, this._isOn, ICON_BUTTON_CONSTANTS.classes.BUTTON_ON);
    if (this._toggle) {
      this._buttonElement.setAttribute('aria-pressed', `${this._isOn}`);
    }
  }

  private _applyDensity(): void {
    if (!this._buttonElement) {
      return;
    }

    // Remove all other density classes first
    ICON_BUTTON_CONSTANTS.classes.DENSITY.forEach(c => this._buttonElement.classList.remove(c));

    if (this._dense) {
      this.setAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSE, '');
      this._buttonElement.classList.add(ICON_BUTTON_CONSTANTS.classes.BUTTON_DENSE);

      // 5 is the default density level (we apply 5 implicitly in the regular dense class)
      // Exclude 5 since its already covered by dense class
      if (this._densityLevel < 7 && this._densityLevel > 0 && this.densityLevel !== 5) {
        const densityLevelClass = ICON_BUTTON_CONSTANTS.classes.DENSITY[this._densityLevel - 1];
        this._buttonElement.classList.add(densityLevelClass);
        this.setAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY_LEVEL, this._densityLevel.toString());
      }
    } else {
      this.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSE);
      this._buttonElement.classList.remove(ICON_BUTTON_CONSTANTS.classes.BUTTON_DENSE);
    }

    // re-layout the ripple for cases where dense was changed after initial layout
    if (this._mdcRipple) {
      this._mdcRipple.layout();
    }
  }

  private _initializeToggle(): void {
    if (!this._buttonElement) {
      return;
    }
    const icons = Array.from(this._buttonElement.querySelectorAll(ICON_BUTTON_CONSTANTS.selectors.ICON));

    // We require two icon/image elements to be specified for the "on" and "off" states
    if (icons.length !== 2) {
      throw new Error('You must specify two icons, one for "on" and one for "off".');
    }

    // Add the icon class to each icon
    icons.forEach(icon => icon.classList.add(ICON_BUTTON_CONSTANTS.classes.ICON));

    // If there are no icons that specify the "on" class, then automatically choose the first icon as the "on" icon and add the class,
    // alternatively we check for the existence of a `forge-icon-button-on` attribute on any of the icons and use that.
    if (!icons.some(icon => icon.classList.contains(ICON_BUTTON_CONSTANTS.classes.ICON_ON))) {
      const requestedOnIcon = icons.find(icon => icon.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.ICON_ON));
      if (requestedOnIcon) {
        requestedOnIcon.classList.add(ICON_BUTTON_CONSTANTS.classes.ICON_ON);
      } else {
        icons[0].classList.add(ICON_BUTTON_CONSTANTS.classes.ICON_ON);
      }
    }

    this._buttonElement.addEventListener('click', this._toggleHandler);

    // Wait a frame to ensure the value of the `on` property has been set
    window.requestAnimationFrame(() => {
      if (this._isOn) {
        this._buttonElement.classList.add(ICON_BUTTON_CONSTANTS.classes.BUTTON_ON);
        this._buttonElement.setAttribute('aria-pressed', `${this._isOn}`);
      }
    });
  }

  private _destroyToggle(): void {
    if (!this._buttonElement) {
      return;
    }
    this._buttonElement.removeEventListener('click', this._toggleHandler);
  }

  public layout(): void {
    if (this._mdcRipple) {
      this._mdcRipple.layout();
    }
  }
}
