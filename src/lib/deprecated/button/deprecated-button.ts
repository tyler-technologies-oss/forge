import { attachShadowTemplate, coerceBoolean, customElement, ensureChildren, getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { FocusIndicatorComponent, FOCUS_INDICATOR_CONSTANTS, IFocusIndicatorComponent } from '../../focus-indicator';
import { IStateLayerComponent, StateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer';
import { DeprecatedButtonType, DEPRECATED_BUTTON_CONSTANTS } from './deprecated-button-constants';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import template from './deprecated-button.html';
import styles from './deprecated-button.scss';

/**
 * @deprecated Use `IButtonComponent` component instead.
 */
export interface IDeprecatedButtonComponent extends IBaseComponent {
  type: string;
  disabled: boolean;
  fullWidth: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-deprecated-button': IDeprecatedButtonComponent;
  }
}

/**
 * @tag forge-deprecated-button
 *
 * @deprecated Use the `<forge-button>` element instead.
 */
@customElement({
  name: DEPRECATED_BUTTON_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent]
})
export class DeprecatedButtonComponent extends BaseComponent implements IDeprecatedButtonComponent {
  public static get observedAttributes(): string[] {
    return Object.values(DEPRECATED_BUTTON_CONSTANTS.attributes);
  }

  private _slotElement: HTMLSlotElement;
  private _focusIndicator: IFocusIndicatorComponent;
  private _stateLayer: IStateLayerComponent;
  private _buttonOrAnchorElement: HTMLButtonElement | HTMLAnchorElement | null = null;
  private _type: DeprecatedButtonType;
  private _disabled = false;
  private _fullWidth = false;
  private _buttonChangeListener = this._onButtonChange.bind(this);
  private _buttonAttrMutationObserver: MutationObserver | undefined;
  private _keydownListener = (evt: KeyboardEvent): void => this._onKeydown(evt);

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._slotElement = getShadowElement(this, 'slot:not([name])') as HTMLSlotElement;
    this._focusIndicator = getShadowElement(this, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayer = getShadowElement(this, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public connectedCallback(): void {
    this._slotElement.addEventListener('slotchange', this._buttonChangeListener);

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
      case DEPRECATED_BUTTON_CONSTANTS.attributes.TYPE:
        this.type = newValue as DeprecatedButtonType;
        return;
      case DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        return;
      case DEPRECATED_BUTTON_CONSTANTS.attributes.FULL_WIDTH:
        this.fullWidth = coerceBoolean(newValue);
        return;
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.key === ' ') {
      this._stateLayer.playAnimation();
    }
  }

  private _onButtonChange(): void {
    this._detachButton();
    this._initialize();
  }

  private _initialize(): void {
    this._buttonOrAnchorElement = this.querySelector<HTMLButtonElement | HTMLAnchorElement>(DEPRECATED_BUTTON_CONSTANTS.selectors.BUTTON);
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
    toggleAttribute(this, isDisabled, DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED);
  }

  private _detachButton(): void {
    this._buttonOrAnchorElement?.removeEventListener('keydown', this._keydownListener);

    if (this._buttonAttrMutationObserver) {
      this._buttonAttrMutationObserver.disconnect();
      this._buttonAttrMutationObserver = undefined;
    }
  }

  public get type(): DeprecatedButtonType {
    return this._type;
  }
  public set type(value: DeprecatedButtonType) {
    if (this._type !== value) {
      this._type = value;
      this.setAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.TYPE, this._type);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._buttonOrAnchorElement?.toggleAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED, this._disabled);
      this.toggleAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get fullWidth(): boolean {
    return this._fullWidth;
  }
  public set fullWidth(value: boolean) {
    if (this._fullWidth !== value) {
      this._fullWidth = value;
      this.toggleAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.FULL_WIDTH, this._fullWidth);
    }
  }

  public override focus(options?: FocusOptions | undefined): void {
    this._buttonOrAnchorElement?.focus(options);
  }
}
