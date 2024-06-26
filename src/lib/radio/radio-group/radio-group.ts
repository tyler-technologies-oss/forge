import { attachShadowTemplate, coerceBoolean, customElement, coreProperty, toggleAttribute } from '@tylertech/forge-core';
import { internals, setDefaultAria } from '../../constants';
import { BaseComponent } from '../../core/base/base-component';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { IWithLabelAwareness, WithLabelAwareness } from '../../core/mixins/label/with-label-aware';
import { RadioComponent } from '../radio/radio';
import { RadioGroupAdapter } from './radio-group-adapter';
import { RADIO_GROUP_CONSTANTS } from './radio-group-constants';
import { RadioGroupCore } from './radio-group-core';

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
 * @summary The Forge Radio Group component groups a set of radio buttons together.
 *
 * @property {boolean} disabled - Whether or not the radio group is disabled.
 *
 * @attribute {boolean} disabled - Whether or not the radio group is disabled.
 */
@customElement({
  name: RADIO_GROUP_CONSTANTS.elementName,
  dependencies: [RadioComponent]
})
export class RadioGroupComponent extends WithLabelAwareness(WithDefaultAria(WithElementInternals(BaseComponent))) implements IRadioGroupComponent {
  public static readonly formAssociated = true;

  public get form(): HTMLFormElement | null {
    return this[internals].form;
  }

  public get labels(): NodeList {
    return this[internals].labels;
  }

  public get name(): string {
    return this.getAttribute('name') ?? '';
  }
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

  @coreProperty()
  public declare disabled: boolean;
}
