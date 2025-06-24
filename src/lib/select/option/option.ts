import { coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { IIconComponent } from '../../icon';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IBaseListDropdownOption, ListDropdownIconType, ListDropdownTooltipConfig } from '../../list-dropdown/list-dropdown-constants';
import { OptionAdapter } from './option-adapter';
import { OPTION_CONSTANTS } from './option-constants';
import { OptionCore } from './option-core';

export interface IOptionComponent extends IBaseComponent, Required<IBaseListDropdownOption> {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-option': IOptionComponent;
  }
}

/**
 * @tag forge-option
 */
@customElement({
  name: OPTION_CONSTANTS.elementName
})
export class OptionComponent extends BaseComponent implements IOptionComponent {
  public static get observedAttributes(): string[] {
    return [
      OPTION_CONSTANTS.attributes.VALUE,
      OPTION_CONSTANTS.attributes.LABEL,
      OPTION_CONSTANTS.attributes.SECONDARY_LABEL,
      OPTION_CONSTANTS.attributes.DISABLED,
      OPTION_CONSTANTS.attributes.DIVIDER,
      OPTION_CONSTANTS.attributes.OPTION_CLASS,
      OPTION_CONSTANTS.attributes.LEADING_ICON,
      OPTION_CONSTANTS.attributes.LEADING_ICON_CLASS,
      OPTION_CONSTANTS.attributes.LEADING_ICON_TYPE,
      OPTION_CONSTANTS.attributes.TRAILING_ICON,
      OPTION_CONSTANTS.attributes.TRAILING_ICON_CLASS,
      OPTION_CONSTANTS.attributes.TRAILING_ICON_TYPE,
      OPTION_CONSTANTS.attributes.TOOLTIP
    ];
  }

  private _core: OptionCore;

  constructor() {
    super();
    this._core = new OptionCore(new OptionAdapter(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case OPTION_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case OPTION_CONSTANTS.attributes.LABEL:
        this.label = newValue;
        break;
      case OPTION_CONSTANTS.attributes.SECONDARY_LABEL:
        this.secondaryLabel = newValue;
        break;
      case OPTION_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case OPTION_CONSTANTS.attributes.DIVIDER:
        this.divider = this.hasAttribute(OPTION_CONSTANTS.attributes.DIVIDER);
        break;
      case OPTION_CONSTANTS.attributes.OPTION_CLASS:
        this.optionClass = newValue;
        break;
      case OPTION_CONSTANTS.attributes.LEADING_ICON:
        this.leadingIcon = newValue;
        break;
      case OPTION_CONSTANTS.attributes.LEADING_ICON_CLASS:
        this.leadingIconClass = newValue;
        break;
      case OPTION_CONSTANTS.attributes.LEADING_ICON_TYPE:
        this.leadingIconType = newValue as ListDropdownIconType;
        break;
      case OPTION_CONSTANTS.attributes.TRAILING_ICON:
        this.trailingIcon = newValue;
        break;
      case OPTION_CONSTANTS.attributes.TRAILING_ICON_CLASS:
        this.trailingIconClass = newValue;
        break;
      case OPTION_CONSTANTS.attributes.TRAILING_ICON_TYPE:
        this.trailingIconType = newValue as ListDropdownIconType;
        break;
      case OPTION_CONSTANTS.attributes.TOOLTIP:
        this.tooltip = newValue ? { text: newValue } : (undefined as any);
        break;
    }
  }

  /**
   * Gets/sets the value of this option.
   * @attribute
   */
  @coreProperty()
  declare public value: any;

  /**
   * Gets/sets the label of this option.
   * @attribute
   */
  @coreProperty()
  declare public label: string;

  /**
   * Gets/sets the secondary label of this option.
   * @attribute secondary-label
   */
  @coreProperty()
  declare public secondaryLabel: string;

  /**
   * Gets/sets the disabled status of this option.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public disabled: boolean;

  /**
   * Gets/sets the whether this option is a divider.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public divider: boolean;

  /**
   * Gets/sets the classes of this option.
   * @attribute option-class
   */
  @coreProperty()
  declare public optionClass: string | string[];

  /**
   * Gets/sets the leading icon of this option.
   * @attribute leading-icon
   */
  @coreProperty()
  declare public leadingIcon: string;

  /**
   * Gets/sets the leading icon class of this option.
   * @attribute leading-icon-class
   */
  @coreProperty()
  declare public leadingIconClass: string;

  /**
   * Gets/sets the leading icon type of this option.
   * @default "component"
   * @attribute leading-icon-type
   */
  @coreProperty()
  declare public leadingIconType: ListDropdownIconType;

  /**
   * Gets/sets properties on leading icon component.
   */
  @coreProperty()
  declare public leadingIconComponentProps: Partial<IIconComponent>;

  /**
   * Gets/sets the trailing icon of this option.
   * @attribute trailing-icon
   */
  @coreProperty()
  declare public trailingIcon: string;

  /**
   * Gets/sets the trailing icon class of this option.
   * @attribute trailing-icon-class
   */
  @coreProperty()
  declare public trailingIconClass: string;

  /**
   * Gets/sets the trailing icon type of this option.
   * @default "component"
   * @attribute trailing-icon-type
   */
  @coreProperty()
  declare public trailingIconType: ListDropdownIconType;

  /**
   * Gets/sets properties on trailing icon component.
   */
  @coreProperty()
  declare public trailingIconComponentProps: Partial<IIconComponent>;

  /**
   * Gets/sets the leading builder of this option.
   */
  @coreProperty()
  declare public leadingBuilder: () => HTMLElement;

  /**
   * Gets/sets the trailing builder of this option.
   */
  @coreProperty()
  declare public trailingBuilder: () => HTMLElement;

  /**
   * Gets/sets the tooltip configuration for this option.
   */
  @coreProperty()
  declare public tooltip: ListDropdownTooltipConfig;
}
