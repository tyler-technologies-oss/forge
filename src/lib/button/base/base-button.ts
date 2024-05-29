import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { tylIconArrowDropDown } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '../../icon/icon-registry';
import { BaseComponent } from '../../core/base/base-component';
import { ExperimentalFocusOptions, internals, setDefaultAria } from '../../constants';
import { IBaseButtonAdapter } from './base-button-adapter';
import { BASE_BUTTON_CONSTANTS, ButtonType } from './base-button-constants';
import { BaseButtonFoundation } from './base-button-foundation';
import { WithLabelAwareness, IWithLabelAwareness } from '../../core/mixins/label/with-label-aware';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';

export interface IBaseButton extends IWithLabelAwareness, IWithElementInternals, IWithDefaultAria {
  type: ButtonType;
  disabled: boolean;
  popoverIcon: boolean;
  name: string;
  value: string;
  dense: boolean;
  form: HTMLFormElement | null;
  popoverTargetElement: HTMLElement | null;
  popoverTargetAction: 'click' | 'hover';
  focus(options?: ExperimentalFocusOptions): void;
}

export abstract class BaseButton<T extends BaseButtonFoundation<IBaseButtonAdapter<IBaseButton>>> extends WithDefaultAria(WithElementInternals(WithLabelAwareness(BaseComponent))) implements IBaseButton {
  public static get observedAttributes(): string[] {
    return Object.values(BASE_BUTTON_CONSTANTS.observedAttributes);
  }

  public static readonly formAssociated = true;

  // PopoverInvokerElement
  /** @ignore */
  public popoverTargetElement: HTMLElement | null = null;
  /** @ignore */
  public popoverTargetAction: 'click' | 'hover' = 'click';

  protected abstract _foundation: T;

  constructor() {
    super();
    IconRegistry.define(tylIconArrowDropDown);
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BASE_BUTTON_CONSTANTS.observedAttributes.TYPE:
        this.type = newValue as ButtonType;
        return;
      case BASE_BUTTON_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        return;
      case BASE_BUTTON_CONSTANTS.observedAttributes.POPOVER_ICON:
        this.popoverIcon = coerceBoolean(newValue);
        return;
      case BASE_BUTTON_CONSTANTS.observedAttributes.DENSE:
        this.dense = coerceBoolean(newValue);
        return;
    }
  }

  public labelClickedCallback(): void {
    this._foundation.click({ animateStateLayer: true });
  }

  public labelChangedCallback(value: string | null): void {
    this[setDefaultAria]({ ariaLabel: value }, { setAttribute: !this.hasAttribute('aria-label') });
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
  public declare dense: boolean;

  /** Clicks the button. */
  public override click(): void {
    this._foundation.click({ animateStateLayer: true });
  }

  /** Focuses the button. */
  public override focus(options: ExperimentalFocusOptions): void {
    this._foundation.focus(options);
  }
}
