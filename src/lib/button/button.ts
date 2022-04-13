import { MDCRipple } from '@material/ripple';
import { CustomElement, ensureChildren, toggleAttribute } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { BUTTON_CONSTANTS } from './button-constants';

export interface IButtonComponent extends IBaseComponent {
  type: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button': IButtonComponent;
  }
}

/**
 * The custom element class behind the `<forge-button>` element.
 */
@CustomElement({
  name: BUTTON_CONSTANTS.elementName
})
export class ButtonComponent extends BaseComponent implements IButtonComponent {
  public static get observedAttributes(): string[] {
    return [BUTTON_CONSTANTS.attributes.TYPE];
  }

  private _mdcRipple: MDCRipple;
  private _buttonElement: HTMLButtonElement;
  private _type: string;
  private _mutationObserver: MutationObserver;
  private _buttonAttrMutationObserver: MutationObserver;

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

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUTTON_CONSTANTS.attributes.TYPE:
        this.type = newValue;
        break;
    }
  }

  public disconnectedCallback(): void {
    if (this._mdcRipple) {
      this._mdcRipple.destroy();
    }
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }
    if (this._buttonAttrMutationObserver) {
      this._buttonAttrMutationObserver.disconnect();
    }
  }

  /**
   * Sets the type of button decoration.
   * Possbile values are: raised, elevated, outlined, and dense.
   * Can be combined as: outlined-dense.
   */
  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    if (this._type !== value) {
      this._type = value;
      this._applyType(value);
      this.setAttribute(BUTTON_CONSTANTS.attributes.TYPE, this._type);
    }
  }

  private _applyType(type: string): void {
    if (this._buttonElement) {
      this._buttonElement.classList.remove(BUTTON_CONSTANTS.classes.BUTTON_RAISED);
      this._buttonElement.classList.remove(BUTTON_CONSTANTS.classes.BUTTON_UNELEVATED);
      this._buttonElement.classList.remove(BUTTON_CONSTANTS.classes.BUTTON_OUTLINED);
      this._buttonElement.classList.remove(BUTTON_CONSTANTS.classes.BUTTON_DENSE);

      if (type.includes('raised')) {
        this._buttonElement.classList.add(BUTTON_CONSTANTS.classes.BUTTON_RAISED);
      }
      if (type.includes('unelevated')) {
        this._buttonElement.classList.add(BUTTON_CONSTANTS.classes.BUTTON_UNELEVATED);
      }
      if (type.includes('outlined')) {
        this._buttonElement.classList.add(BUTTON_CONSTANTS.classes.BUTTON_OUTLINED);
      }
      if (type.includes('dense')) {
        this._buttonElement.classList.add(BUTTON_CONSTANTS.classes.BUTTON_DENSE);
      }
    }
  }

  private _initialize(): void {
    this._initializeButton();
    this._initializeMutationObserver();
  }

  private _initializeButton(): void {
    this._buttonElement = this.querySelector(BUTTON_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
    if (!this._buttonElement) {
      return;
    }

    if (this.hasAttribute(BUTTON_CONSTANTS.attributes.TYPE)) {
      this._type = this.getAttribute(BUTTON_CONSTANTS.attributes.TYPE) as string;
      this._applyType(this._type);
    }
    this._buttonElement.classList.add(BUTTON_CONSTANTS.classes.BUTTON);

    this._syncDisabledState();
    this._initializeButtonChildren();

    if (this._mdcRipple) {
      this._mdcRipple.destroy();
    }
    this._mdcRipple = new MDCRipple(this._buttonElement);
  }

  private _initializeButtonChildren(): void {
    if (!this._buttonElement.querySelector(BUTTON_CONSTANTS.selectors.RIPPLE)) {
      const rippleElement = document.createElement('span');
      rippleElement.classList.add(BUTTON_CONSTANTS.classes.RIPPLE);
      this._buttonElement.appendChild(rippleElement);
    }

    const labelElement = this.querySelector(BUTTON_CONSTANTS.selectors.LABEL);
    if (labelElement) {
      labelElement.classList.add(BUTTON_CONSTANTS.classes.LABEL);
    }

    const iconElements = Array.from(this.querySelectorAll(BUTTON_CONSTANTS.selectors.ICON));
    iconElements.forEach(iconElement => {
      iconElement.classList.add(BUTTON_CONSTANTS.classes.ICON);
      if (!iconElement.hasAttribute('aria-hidden')) {
        iconElement.setAttribute('aria-hidden', 'true');
      }
    });
  }

  private _initializeMutationObserver(): void {
    if (!this._mutationObserver) {
      const config: MutationObserverInit = { childList: true, subtree: true };
      const callback: MutationCallback = mutationList => {
        if (this._buttonWasAdded(mutationList)) {
          this._initializeButton();
        } else if (mutationList.some(mutation => mutation.addedNodes.length)) {
          this._initializeButtonChildren();
        }
      };
      this._mutationObserver = new MutationObserver(callback);
      this._mutationObserver.observe(this, config);
      
      if (this._buttonElement) {
        // Watch attributes on the `<button>` element
        this._buttonAttrMutationObserver = new MutationObserver(mutationList => {
          if (mutationList.some(mutation => mutation.attributeName === 'disabled')) {
            this._syncDisabledState();
          }
        });
        this._buttonAttrMutationObserver.observe(this._buttonElement, { attributes: true, attributeFilter: ['disabled'] });
      }
    }
  }

  private _buttonWasAdded(mutationList: MutationRecord[]): boolean {
    return mutationList.some(mutation => {
      return Array.from(mutation.addedNodes)
        .some(node => node.nodeName.toLowerCase() === BUTTON_CONSTANTS.selectors.BUTTON);
    });
  }

  private _syncDisabledState(): void {
    toggleAttribute(this, this._buttonElement.disabled, BUTTON_CONSTANTS.attributes.DISABLED);
  }
}

