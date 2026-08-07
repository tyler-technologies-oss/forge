import { consume } from '@lit/context';
import { property } from 'lit/decorators.js';
import { SELECT_LIKE_DISABLED } from '../../constants.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import type { IIconComponent } from '../../icon/index.js';
import { ListDropdownIconType, ListDropdownTooltipConfig } from '../../list-dropdown/list-dropdown-constants.js';
import { OPTION_CONSTANTS } from './option-constants.js';

export interface IOptionConfigComponent extends BaseLitElement {
  value: any;
  label?: string;
  secondaryLabel?: string;
  disabled: boolean;
  divider: boolean;
  optionClass: string | string[];
  leadingIcon?: string;
  leadingIconClass?: string;
  leadingIconType?: ListDropdownIconType;
  leadingIconComponentProps?: Partial<IIconComponent>;
  trailingIcon?: string;
  trailingIconClass?: string;
  trailingIconType?: ListDropdownIconType;
  trailingIconComponentProps?: Partial<IIconComponent>;
  leadingBuilder?: () => HTMLElement;
  trailingBuilder?: () => HTMLElement;
  tooltip?: ListDropdownTooltipConfig;
}

/**
 * Abstract base component for config-based option usage.
 * Contains all configuration properties for programmatic option creation.
 */
export abstract class OptionConfigComponent extends BaseLitElement {
  /**
   * Gets/sets the value of this option.
   * @attribute
   */
  @property()
  public set value(value: any) {
    const oldValue = this.#value;
    if (oldValue !== value) {
      this.#value = value;
      this.dispatchEvent(new CustomEvent(OPTION_CONSTANTS.events.VALUE_CHANGE, { detail: value, bubbles: true, composed: true }));
    }
  }
  public get value(): any {
    return this.#value;
  }
  #value: any;

  /**
   * Gets/sets the label of this option.
   * @attribute
   */
  @property({ reflect: true })
  public label?: string;

  /**
   * Gets/sets the secondary label of this option.
   * @attribute secondary-label
   */
  @property({ attribute: 'secondary-label', reflect: true })
  public secondaryLabel?: string;

  /**
   * Gets/sets the disabled status of this option.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Gets/sets whether this option is a divider.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public divider = false;

  /**
   * Gets/sets the classes of this option.
   * @attribute option-class
   */
  @property({
    attribute: 'option-class',
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) {
          return [];
        }
        return value.split(' ').filter(v => v && !/\s+/.test(v));
      },
      toAttribute: (value: string | string[]) => {
        if (!value) {
          return null;
        }
        const classes = typeof value === 'string' ? value.split(' ').filter(v => v && !/\s+/.test(v)) : value.filter(v => v && !/\s+/.test(v));
        return classes.length > 0 ? classes.join(' ') : null;
      }
    }
  })
  public optionClass: string | string[] = [];

  /**
   * Gets/sets the leading icon of this option.
   * @attribute leading-icon
   */
  @property({ attribute: 'leading-icon', reflect: true })
  public leadingIcon?: string;

  /**
   * Gets/sets the leading icon class of this option.
   * @attribute leading-icon-class
   */
  @property({ attribute: 'leading-icon-class', reflect: true })
  public leadingIconClass?: string;

  /**
   * Gets/sets the leading icon type of this option.
   * @default "font"
   * @attribute leading-icon-type
   */
  @property({ attribute: 'leading-icon-type', reflect: true })
  public leadingIconType?: ListDropdownIconType;

  /**
   * Gets/sets properties on leading icon component.
   */
  @property({ attribute: false })
  public leadingIconComponentProps?: Partial<IIconComponent>;

  /**
   * Gets/sets the trailing icon of this option.
   * @attribute trailing-icon
   */
  @property({ attribute: 'trailing-icon', reflect: true })
  public trailingIcon?: string;

  /**
   * Gets/sets the trailing icon class of this option.
   * @attribute trailing-icon-class
   */
  @property({ attribute: 'trailing-icon-class', reflect: true })
  public trailingIconClass?: string;

  /**
   * Gets/sets the trailing icon type of this option.
   * @default "font"
   * @attribute trailing-icon-type
   */
  @property({ attribute: 'trailing-icon-type', reflect: true })
  public trailingIconType?: ListDropdownIconType;

  /**
   * Gets/sets properties on trailing icon component.
   */
  @property({ attribute: false })
  public trailingIconComponentProps?: Partial<IIconComponent>;

  /**
   * Gets/sets the leading builder of this option.
   */
  @property({ attribute: false })
  public leadingBuilder?: () => HTMLElement;

  /**
   * Gets/sets the trailing builder of this option.
   */
  @property({ attribute: false })
  public trailingBuilder?: () => HTMLElement;

  /**
   * Gets/sets the tooltip configuration for this option.
   */
  @property({ attribute: false })
  public tooltip?: ListDropdownTooltipConfig;

  @consume({ context: SELECT_LIKE_DISABLED })
  private set _contextDisabled(value: boolean) {
    this.disabled = value || this.disabled;
  }
}
