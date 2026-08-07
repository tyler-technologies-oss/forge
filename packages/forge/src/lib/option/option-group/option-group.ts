import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { customElement, property } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { ListDropdownOptionGroupBuilder } from '../../list-dropdown/list-dropdown-constants.js';
import type { ISelectOption } from '../../select/core/index.js';
import { OPTION_GROUP_CONSTANTS } from './option-group-constants.js';

/** @deprecated - This will be removed in the future. Please switch to using OptionGroupComponent. */
export interface IOptionGroupComponent extends BaseLitElement {
  label: string;
  text: string;
  options?: ISelectOption[];
  builder?: ListDropdownOptionGroupBuilder;
  value?: any;
}

/**
 * @tag forge-option-group
 *
 * @summary Groups related options together with an optional label within select components.
 */
@customElement(OPTION_GROUP_CONSTANTS.elementName)
export class OptionGroupComponent extends BaseLitElement implements IOptionGroupComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = OPTION_GROUP_CONSTANTS.elementName;

  /**
   * Gets/sets the label of this option group.
   * @attribute
   */
  @property({ reflect: true })
  public label = '';

  /**
   * The text content for the group.
   * @attribute
   */
  public get text(): string {
    return this.label;
  }
  public set text(value: string) {
    this.label = value;
  }

  /**
   * The child options of this group.
   */
  @property({ attribute: false })
  public options?: ISelectOption[];

  /**
   * The builder function for the group content.
   */
  @property({ attribute: false })
  public builder?: ListDropdownOptionGroupBuilder;

  /**
   * Gets/sets the optional group value.
   * @attribute
   */
  @property({ attribute: false })
  public value?: any;

  public override createRenderRoot(): HTMLElement | DocumentFragment {
    return this; // Light DOM - no shadow root
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-option-group': IOptionGroupComponent;
  }
}
