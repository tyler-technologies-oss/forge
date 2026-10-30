import { property } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { ListDropdownOptionGroupBuilder } from '../../list-dropdown/list-dropdown-constants.js';
import type { ISelectOption } from '../../select/core/index.js';

export interface IOptionGroupConfigComponent extends BaseLitElement {
  label: string;
  text: string;
  options?: ISelectOption[];
  builder?: ListDropdownOptionGroupBuilder;
  value?: any;
}

/**
 * Abstract base component for config-based option group usage.
 * Contains all configuration properties for programmatic option group creation.
 */
export abstract class OptionGroupConfigComponent extends BaseLitElement {
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
}
