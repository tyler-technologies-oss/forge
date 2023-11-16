import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BaseFocusableComponent } from '../../core/base/base-focusable-component';
import { internals } from '../../constants';
import { IBaseComponent } from '../../core/base/base-component';
import { IBaseButtonAdapter } from './base-button-adapter';
import { BASE_BUTTON_CONSTANTS, ButtonType } from './base-button-constants';
import { BaseButtonFoundation } from './base-button-foundation';
import { ILabelAware } from '../../label/label-aware';

export interface IBaseButton extends IBaseComponent {
  type: ButtonType;
  disabled: boolean;
  popoverIcon: boolean;
  name: string;
  value: string;
  dense: boolean;
  anchor: boolean;
  href: string;
  target: string;
  download: string;
  rel: string;
  form: HTMLFormElement | null;
}

export abstract class BaseButton<T extends BaseButtonFoundation<IBaseButtonAdapter>> extends BaseFocusableComponent implements IBaseButton, ILabelAware {
  public static readonly formAssociated = true;

  public [internals]: ElementInternals;

  protected abstract _foundation: T;

  constructor() {
    super();
    this[internals] = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._foundation.initialize();
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BASE_BUTTON_CONSTANTS.observedAttributes.TYPE:
        this.type = newValue as ButtonType;
        break;
      case BASE_BUTTON_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case BASE_BUTTON_CONSTANTS.observedAttributes.POPOVER_ICON:
        this.popoverIcon = coerceBoolean(newValue);
        break;
      case BASE_BUTTON_CONSTANTS.observedAttributes.ANCHOR:
        this.anchor = coerceBoolean(newValue);
        break;
      case BASE_BUTTON_CONSTANTS.observedAttributes.HREF:
        this.href = newValue;
        break;
      case BASE_BUTTON_CONSTANTS.observedAttributes.TARGET:
        this.target = newValue;
        break;
      case BASE_BUTTON_CONSTANTS.observedAttributes.DOWNLOAD:
        this.download = newValue;
        break;
      case BASE_BUTTON_CONSTANTS.observedAttributes.REL:
        this.rel = newValue;
        break;
      case BASE_BUTTON_CONSTANTS.observedAttributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  public labelClickedCallback(): void {
    this._foundation.click({ animateStateLayer: true });
  }

  public labelChangedCallback(value: string | null): void {
    this._foundation.proxyLabel(value);
  }

  public get form(): HTMLFormElement | null {
    return this[internals].form;
  }

  public get name(): string {
    return this.getAttribute('name') ?? '';
  }
  public set name(name: string) {
    this.setAttribute('name', name);
  }

  public get value(): string {
    return this.getAttribute('value') ?? '';
  }
  public set value(value: string) {
    this.setAttribute('value', value);
  }

  @FoundationProperty()
  public declare type: ButtonType;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare popoverIcon: boolean;

  @FoundationProperty()
  public declare anchor: boolean;

  @FoundationProperty()
  public declare href: string;

  @FoundationProperty()
  public declare target: string;

  @FoundationProperty()
  public declare download: string;

  @FoundationProperty()
  public declare rel: string;

  @FoundationProperty()
  public declare dense: boolean;

  public override click(): void {
    this._foundation.click({ animateStateLayer: true });
  }
}
