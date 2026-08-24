import { consume } from '@lit/context';
import { property } from 'lit/decorators.js';
import { SELECT_LIKE_DISABLED } from '../../constants.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import type { IIconComponent } from '../../icon/index.js';
import { ListDropdownIconType, ListDropdownTooltipConfig } from '../../list-dropdown/list-dropdown-constants.js';
import { OPTION_CONSTANTS } from './option-constants.js';
import type { OptionUpdateReason } from './option.js';

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
   * The value of the option used for form submission.
   * @default undefined
   * @attribute
   */
  @property()
  public set value(value: any) {
    const oldValue = this.#value;
    if (oldValue !== value) {
      this.#value = value;
      this.dispatchEvent(new CustomEvent(OPTION_CONSTANTS.events.VALUE_CHANGE, { detail: value, bubbles: true, composed: true }));
      this._dispatchUpdate('value-changed');
    }
  }
  public get value(): any {
    return this.#value;
  }
  #value: any;

  /**
   * Dispatches the unified option update event used by `forge-listbox` to reconcile its value.
   */
  protected _dispatchUpdate(reason: OptionUpdateReason): void {
    this.dispatchEvent(new CustomEvent(OPTION_CONSTANTS.events.UPDATE, { bubbles: true, composed: true, detail: { reason } }));
  }

  /**
   * The label text of the option. __Applies only to config-based options.__
   * @default undefined
   * @attribute
   */
  @property({ reflect: true })
  public label?: string;

  /**
   * The secondary label text of the option. __Applies only to config-based options.__
   * @default undefined
   * @attribute secondary-label
   */
  @property({ attribute: 'secondary-label', reflect: true })
  public secondaryLabel?: string;

  /**
   * Whether the option is disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Whether the option renders as a divider instead of a list item. __Applies only to config-based options.__
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public divider = false;

  /**
   * Classes set on the option. __Applies only to config-based options.__
   * @default []
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
   * The name of the option's leading icon. __Applies only to config-based options.__
   * @default undefined
   * @attribute leading-icon
   */
  @property({ attribute: 'leading-icon', reflect: true })
  public leadingIcon?: string;

  /**
   * Classes set on the option's leading icon. __Applies only to config-based options.__
   * @default undefined
   * @attribute leading-icon-class
   */
  @property({ attribute: 'leading-icon-class', reflect: true })
  public leadingIconClass?: string;

  /**
   * The type of the option's leading icon, either "font" or "component". __Applies only to config-based options.__
   * @default "font"
   * @attribute leading-icon-type
   */
  @property({ attribute: 'leading-icon-type', reflect: true })
  public leadingIconType?: ListDropdownIconType;

  /**
   * Properties set on the leading icon component. __Applies only to config-based options.__
   * @default undefined
   */
  @property({ attribute: false })
  public leadingIconComponentProps?: Partial<IIconComponent>;

  /**
   * The name of the option's trailing icon. __Applies only to config-based options.__
   * @default undefined
   * @attribute trailing-icon
   */
  @property({ attribute: 'trailing-icon', reflect: true })
  public trailingIcon?: string;

  /**
   * Classes set on the option's trailing icon. __Applies only to config-based options.__
   * @default undefined
   * @attribute trailing-icon-class
   */
  @property({ attribute: 'trailing-icon-class', reflect: true })
  public trailingIconClass?: string;

  /**
   * The type of the option's trailing icon, either "font" or "component". __Applies only to config-based options.__
   * @default "font"
   * @attribute trailing-icon-type
   */
  @property({ attribute: 'trailing-icon-type', reflect: true })
  public trailingIconType?: ListDropdownIconType;

  /**
   * Properties set on the trailing icon component. __Applies only to config-based options.__
   * @default undefined
   */
  @property({ attribute: false })
  public trailingIconComponentProps?: Partial<IIconComponent>;

  /**
   * A callback function that returns an element to render in the option's leading slot. __Applies only to config-based options.__
   * @default undefined
   */
  @property({ attribute: false })
  public leadingBuilder?: () => HTMLElement;

  /**
   * A callback function that returns an element to render in the option's trailing slot. __Applies only to config-based options.__
   * @default undefined
   */
  @property({ attribute: false })
  public trailingBuilder?: () => HTMLElement;

  /**
   * Configuration options for an attached tooltip. __Applies only to config-based options.__
   * @default undefined
   */
  @property({ attribute: false })
  public tooltip?: ListDropdownTooltipConfig;

  @consume({ context: SELECT_LIKE_DISABLED, subscribe: true })
  private set _contextDisabled(value: boolean) {
    this.disabled = this.hasUpdated ? value : value || this.disabled;
  }
}
