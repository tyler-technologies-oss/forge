import { CustomElement, attachShadowTemplate, coerceBoolean, getShadowElement, emitEvent, toggleAttribute, toggleClass } from '@tylertech/forge-core';
import { MDCSwitch } from '@material/switch';
import { SwitchLabelPosition, SWITCH_CONSTANTS } from './switch-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './switch.html';
import styles from './switch.scss';

export interface ISwitchComponent extends IBaseComponent {
  dense: boolean;
  disabled: boolean;
  selected: boolean;
  labelPosition: SwitchLabelPosition;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-switch': ISwitchComponent;
  }

  interface HTMLElementEventMap {
    'forge-switch-select': CustomEvent<boolean>;
  }
}

/**
 * The custom element class behind the `<forge-switch>` element.
 */
@CustomElement({
  name: SWITCH_CONSTANTS.elementName
})
export class SwitchComponent extends BaseComponent implements ISwitchComponent {
  public static get observedAttributes(): string[] {
    return [
      SWITCH_CONSTANTS.attributes.DENSE,
      SWITCH_CONSTANTS.attributes.DISABLED,
      SWITCH_CONSTANTS.attributes.SELECTED,
      SWITCH_CONSTANTS.attributes.LABEL_POSITION,
      SWITCH_CONSTANTS.attributes.BUTTON_ARIA_LABEL
    ];
  }

  private _containerElement: HTMLElement;
  private _buttonElement: HTMLButtonElement;
  private _mdcSwitch: MDCSwitch;
  private _dense = false;
  private _disabled = false;
  private _selected = false;
  private _labelPosition: SwitchLabelPosition = 'end';
  private _clickListener: (evt: MouseEvent) => void;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._initialize();
  }

  private _initialize(): void {
    this._buttonElement = getShadowElement(this, SWITCH_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
    this._containerElement = getShadowElement(this, SWITCH_CONSTANTS.selectors.CONTAINER);
    this._clickListener = evt => this._onClick(evt);
  }

  public connectedCallback(): void {
    // Add our click listener before initializing MDCSwitch to ensure we receive the event **first**
    this._buttonElement.addEventListener('click', this._clickListener);

    this._mdcSwitch = new MDCSwitch(this._buttonElement);
    this._mdcSwitch.initialize();

    this._applyInitialState();
  }

  public disconnectedCallback(): void {
    if (this._mdcSwitch) {
      this._mdcSwitch.destroy();
    }
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SWITCH_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.attributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.attributes.LABEL_POSITION:
        this.labelPosition = newValue as SwitchLabelPosition;
        break;
      case SWITCH_CONSTANTS.attributes.BUTTON_ARIA_LABEL:
        this._applyButtonLabel(newValue);
    }
  }

  private _applyInitialState(): void {
    this._mdcSwitch.disabled = this._disabled;
    this._mdcSwitch.selected = this._selected;


    this._applyDense();
    this._applyLabelPosition();
    this._applyButtonLabel(this.getAttribute(SWITCH_CONSTANTS.attributes.BUTTON_ARIA_LABEL) ?? '');
  }

  private _onClick(evt: MouseEvent): void {
    if (this._mdcSwitch.disabled) {
      return;
    }

    this._mdcSwitch.ripple.layout();
    const isCancelled = !emitEvent(this, SWITCH_CONSTANTS.events.SELECT, !this._selected, true, true);

    if (isCancelled) {
      evt.stopImmediatePropagation(); // Prevents MDCSwitch from receiving the click event in the targeting phase
    } else {
      this._selected = !this._selected;
    }
  }

  private _applyDense(): void {
    toggleAttribute(this, this._dense, SWITCH_CONSTANTS.attributes.DENSE);
    if (this._mdcSwitch) {
      this._mdcSwitch.ripple.layout();
    }
  }

  private _applyLabelPosition(): void {
    toggleClass(this._containerElement, this._labelPosition === 'start', SWITCH_CONSTANTS.classes.LABEL_START);
  }

  private _applyButtonLabel(value: string): void {
    if (!this._buttonElement) {
      return;
    }
    toggleAttribute(this._buttonElement, !!value, 'aria-label', value);
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._applyDense();
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      if (this._mdcSwitch) {
        this._mdcSwitch.disabled = this._disabled;
      }
      toggleAttribute(this, this._disabled, SWITCH_CONSTANTS.attributes.DISABLED);
    }
  }

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    if (this._selected !== value) {
      this._selected = value;
      if (this._mdcSwitch) {
        this._mdcSwitch.selected = this._selected;
      }
      toggleAttribute(this, this._selected, SWITCH_CONSTANTS.attributes.SELECTED);
    }
  }

  public get labelPosition(): SwitchLabelPosition {
    return this._labelPosition;
  }
  public set labelPosition(value: SwitchLabelPosition) {
    if (this._labelPosition !== value) {
      this._labelPosition = value;
      this._applyLabelPosition();
      this.setAttribute(SWITCH_CONSTANTS.attributes.LABEL_POSITION, this._labelPosition);
    }
  }
}
