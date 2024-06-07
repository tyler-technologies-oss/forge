import { attachShadowTemplate, coerceBoolean, coerceNumber, customElement, ensureChildren, getShadowElement } from '@tylertech/forge-core';
import { FocusIndicatorComponent, FOCUS_INDICATOR_CONSTANTS, IFocusIndicatorComponent } from '../../focus-indicator';
import { IStateLayerComponent, StateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer';
import { DEPRECATED_ICON_BUTTON_CONSTANTS } from './deprecated-icon-button-constants';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IconComponent } from '../../icon/icon';

import template from './deprecated-icon-button.html';
import styles from './deprecated-icon-button.scss';

/**
 * @deprecated Use `IIconButtonComponent` component instead.
 */
export interface IDeprecatedIconButtonComponent extends IBaseComponent {
  disabled: boolean;
  toggle: boolean;
  isOn: boolean;
  densityLevel: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-deprecated-icon-button': IDeprecatedIconButtonComponent;
  }
}

/**
 * @tag forge-deprecated-icon-button
 *
 * @deprecated Use the `<forge-icon-button>` element instead.
 */
@customElement({
  name: DEPRECATED_ICON_BUTTON_CONSTANTS.elementName,
  dependencies: [IconComponent, FocusIndicatorComponent, StateLayerComponent]
})
export class DeprecatedIconButtonComponent extends BaseComponent implements IDeprecatedIconButtonComponent {
  public static get observedAttributes(): string[] {
    return Object.values(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes);
  }

  // State
  private _disabled = false;
  private _toggle = false;
  private _isOn = false;
  private _densityLevel = 0;

  // Element refs
  private _slotElement: HTMLSlotElement;
  private _focusIndicator: IFocusIndicatorComponent;
  private _stateLayer: IStateLayerComponent;
  private _buttonOrAnchorElement: HTMLButtonElement | HTMLAnchorElement | null = null;

  // Listeners
  private _slotChangeListener = this._onSlotChange.bind(this);
  private _buttonAttrMutationObserver: MutationObserver | undefined;
  private _keydownListener: EventListener = this._onKeydown.bind(this);
  private _toggleClickListener: EventListener = this._onToggle.bind(this);

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._slotElement = getShadowElement(this, 'slot:not([name])') as HTMLSlotElement;
    this._focusIndicator = getShadowElement(this, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayer = getShadowElement(this, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public connectedCallback(): void {
    this._slotElement.addEventListener('slotchange', this._slotChangeListener);

    if (this.children.length) {
      this._initialize();
    } else {
      ensureChildren(this).then(() => this._initialize());
    }
  }

  public disconnectedCallback(): void {
    this._detachButton();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        return;
      case DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.TOGGLE:
        this.toggle = coerceBoolean(newValue);
        return;
      case DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.IS_ON:
        this.isOn = coerceBoolean(newValue);
        return;
      case DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DENSITY_LEVEL:
        this.densityLevel = coerceNumber(newValue);
        return;
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.key === ' ') {
      this._stateLayer.playAnimation();
    }
  }

  private _onSlotChange(): void {
    this._detachButton();
    this._initialize();
  }

  private _onToggle(): void {
    this.isOn = !this._isOn;
    this.dispatchEvent(new CustomEvent('forge-icon-button-toggle', { bubbles: true, composed: true, detail: this._isOn }));
  }

  private _initialize(): void {
    this._buttonOrAnchorElement = this.querySelector<HTMLButtonElement | HTMLAnchorElement>(DEPRECATED_ICON_BUTTON_CONSTANTS.selectors.BUTTON);
    if (!this._buttonOrAnchorElement) {
      return;
    }

    this._stateLayer.targetElement = this._buttonOrAnchorElement;
    this._focusIndicator.targetElement = this._buttonOrAnchorElement;

    this._buttonOrAnchorElement.addEventListener('keydown', this._keydownListener);

    // Sync disabled state
    if (this._buttonOrAnchorElement instanceof HTMLButtonElement && this._disabled && !this._buttonOrAnchorElement.disabled) {
      this._buttonOrAnchorElement.disabled = true;
    } else {
      this.disabled = this._buttonOrAnchorElement instanceof HTMLButtonElement && this._buttonOrAnchorElement.disabled;
    }

    if (this._toggle) {
      this._initializeToggle();
    }

    // Listen for disabled attribute changes on the button
    if (this._buttonOrAnchorElement instanceof HTMLButtonElement) {
      this._buttonAttrMutationObserver = new MutationObserver(mutationList => {
        if (mutationList.some(mutation => mutation.attributeName === 'disabled')) {
          this._syncDisabledState();
        }
      });
      this._buttonAttrMutationObserver.observe(this._buttonOrAnchorElement, {
        attributes: true,
        attributeFilter: ['disabled']
      });
    }
  }

  private _syncDisabledState(): void {
    const isDisabled = this._buttonOrAnchorElement instanceof HTMLButtonElement && this._buttonOrAnchorElement.disabled;
    this.toggleAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED, isDisabled);
  }

  private _detachButton(): void {
    this._buttonOrAnchorElement?.removeEventListener('keydown', this._keydownListener);

    if (this._buttonAttrMutationObserver) {
      this._buttonAttrMutationObserver.disconnect();
      this._buttonAttrMutationObserver = undefined;
    }
  }

  private _initializeToggle(): void {
    /* c8 ignore next 3 */
    if (!this._buttonOrAnchorElement) {
      return;
    }
    this._buttonOrAnchorElement.addEventListener('click', this._toggleClickListener);
    this._syncToggleState();
  }

  private _destroyToggle(): void {
    this._buttonOrAnchorElement?.removeEventListener('click', this._toggleClickListener);
  }

  private _syncToggleState(): void {
    const iconLikeElements = Array.from(this.querySelectorAll(DEPRECATED_ICON_BUTTON_CONSTANTS.selectors.ICON_LIKE));
    const onIconElement = iconLikeElements.find(el => el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.ON_ICON));
    const offIconElements = iconLikeElements.filter(el => el !== onIconElement);
    onIconElement?.toggleAttribute('hidden', !this._isOn);
    offIconElements.forEach(el => el.toggleAttribute('hidden', this._isOn));
    this.toggleAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.IS_ON, this._isOn);
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    value = Boolean(value);
    if (this._disabled !== value) {
      this._disabled = value;
      this._buttonOrAnchorElement?.toggleAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED, this._disabled);
      this.toggleAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get toggle(): boolean {
    return this._toggle;
  }
  public set toggle(value: boolean) {
    value = Boolean(value);
    if (this._toggle !== value) {
      this._toggle = value;

      if (this.isConnected) {
        if (this._toggle) {
          this._initializeToggle();
        } else {
          this._destroyToggle();
        }
      }

      this.toggleAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.TOGGLE, this._toggle);
    }
  }

  public get isOn(): boolean {
    return this._isOn;
  }
  public set isOn(value: boolean) {
    value = Boolean(value);
    if (this._isOn !== value) {
      this._isOn = value;
      if (this.isConnected) {
        this._syncToggleState();
      }
    }
  }

  public get densityLevel(): number {
    return this._densityLevel;
  }
  public set densityLevel(value: number) {
    if (this._densityLevel !== value) {
      this._densityLevel = value;
      this.setAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DENSITY_LEVEL, String(this._densityLevel));
    }
  }

  public override focus(options?: FocusOptions | undefined): void {
    this._buttonOrAnchorElement?.focus(options);
  }
}
