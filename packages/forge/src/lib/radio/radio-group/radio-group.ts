import { attachShadowTemplate, coerceBoolean, customElement, coreProperty, toggleAttribute } from '@tylertech/forge-core';
import { internals, setDefaultAria } from '../../constants.js';
import { BaseComponent } from '../../core/base/base-component.js';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria.js';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals.js';
import { IWithLabelAwareness, WithLabelAwareness } from '../../core/mixins/label/with-label-aware.js';
import { RadioComponent } from '../radio/radio.js';
import { RadioGroupAdapter } from './radio-group-adapter.js';
import { RADIO_GROUP_CONSTANTS } from './radio-group-constants.js';
import { RadioGroupCore } from './radio-group-core.js';

import template from './radio-group.html';

export interface IRadioGroupComponent extends IWithLabelAwareness, IWithElementInternals, IWithDefaultAria {
  readonly form: HTMLFormElement | null;
  readonly labels: NodeList;
  name: string;
  disabled: boolean;
  formDisabledCallback(disabled: boolean): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-radio-group': IRadioGroupComponent;
  }
}

/**
 * @tag forge-radio-group
 *
 * @dependency forge-radio
 *
 * @summary The Forge Radio Group component groups a set of radio buttons together.
 */
@customElement({
  name: RADIO_GROUP_CONSTANTS.elementName,
  dependencies: [RadioComponent]
})
export class RadioGroupComponent extends WithLabelAwareness(WithDefaultAria(WithElementInternals(BaseComponent))) implements IRadioGroupComponent {
  public static readonly formAssociated = true;

  /** @ignore */
  public get form(): HTMLFormElement | null {
    return this[internals].form;
  }

  /** @ignore */
  public get labels(): NodeList {
    return this[internals].labels;
  }

  /** @ignore */
  public get name(): string {
    return this.getAttribute('name') ?? '';
  }
  /** @ignore */
  public set name(value: string) {
    toggleAttribute(this, !!value, 'name', value);
  }

  public static get observedAttributes(): string[] {
    return Object.values(RADIO_GROUP_CONSTANTS.observedAttributes);
  }

  private _core: RadioGroupCore;

  constructor() {
    super();
    attachShadowTemplate(this, template);
    this._core = new RadioGroupCore(new RadioGroupAdapter(this));
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this[setDefaultAria]({
      role: 'radiogroup',
      ariaDisabled: this.disabled ? 'true' : null
    });
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case RADIO_GROUP_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  public formDisabledCallback(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public labelChangedCallback(value: string | null): void {
    this[setDefaultAria]({
      ariaLabel: value ?? null
    });
  }

  /**
   * Controls whether the radio group is disabled.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public disabled: boolean;
}
