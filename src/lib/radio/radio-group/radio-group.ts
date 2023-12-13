import { CustomElement, FoundationProperty, attachShadowTemplate, coerceBoolean, toggleAttribute } from '@tylertech/forge-core';
import { internals, setDefaultAria } from '../../constants';
import { BaseComponent } from '../../core/base/base-component';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { IWithLabelAwareness, WithLabelAwareness } from '../../core/mixins/label/with-label-aware';
import { RadioGroupAdapter } from './radio-group-adapter';
import { RADIO_GROUP_CONSTANTS } from './radio-group-constants';
import { RadioGroupFoundation } from './radio-group-foundation';

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

const BaseRadioGroupClass = WithLabelAwareness(WithDefaultAria(WithElementInternals(BaseComponent)));

/**
 * @tag forge-radio-group
 * 
 * @summary The Forge Radio Group component groups a set of radio buttons together.
 * 
 * @property {boolean} disabled - Whether or not the radio group is disabled.
 * 
 * @attribute {boolean} disabled - Whether or not the radio group is disabled.
 */
@CustomElement({
  name: RADIO_GROUP_CONSTANTS.elementName
})
export class RadioGroupComponent extends BaseRadioGroupClass implements IRadioGroupComponent {
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
    return [
      RADIO_GROUP_CONSTANTS.attributes.DISABLED
    ];
  }

  private _foundation: RadioGroupFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template);
    this._foundation = new RadioGroupFoundation(new RadioGroupAdapter(this));
  }

  public connectedCallback(): void {
    this[setDefaultAria]({
      role: 'radiogroup',
      ariaDisabled: this.disabled ? 'true' : null
    });
    this._foundation.initialize();
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

  @FoundationProperty()
  public declare disabled: boolean;
}
