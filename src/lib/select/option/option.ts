import { coerceBoolean, CustomElement, FoundationProperty, ICustomElement } from '@tylertech/forge-core';
import { IIconComponent } from '../../icon';
import { BaseComponent } from '../../core/base/base-component';
import { IBaseListDropdownOption, ListDropdownIconType } from '../../list-dropdown/list-dropdown-constants';
import { OptionAdapter } from './option-adapter';
import { OPTION_CONSTANTS } from './option-constants';
import { OptionFoundation } from './option-foundation';

export interface IOptionComponent extends ICustomElement, Required<IBaseListDropdownOption> {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-option': IOptionComponent;
  }
}

/**
 * The custom element class behind the `<forge-option>` element.
 * 
 * @tag forge-option
 */
@CustomElement({
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
      OPTION_CONSTANTS.attributes.TRAILING_ICON_TYPE
    ];
  }

  private _foundation: OptionFoundation;

  constructor() {
    super();
    this._foundation = new OptionFoundation(new OptionAdapter(this));
  }

  public initializedCallback(): void {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'option');
    }
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
    }
  }

  /** Gets/sets the value of this option. */
  @FoundationProperty()
  public declare value: any;

  /** Gets/sets the label of this option. */
  @FoundationProperty()
  public declare label: string;

  /** Gets/sets the secondary label of this option. */
  @FoundationProperty()
  public declare secondaryLabel: string;

  /** Gets/sets the disabled status of this option. */
  @FoundationProperty()
  public declare disabled: boolean;

  /** Gets/sets the whether this option is a divider. */
  @FoundationProperty()
  public declare divider: boolean;

  /** Gets/sets the classes of this option. */
  @FoundationProperty()
  public declare optionClass: string | string[];

  /** Gets/sets the leading icon of this option. */
  @FoundationProperty()
  public declare leadingIcon: string;

  /** Gets/sets the leading icon class of this option. */
  @FoundationProperty()
  public declare leadingIconClass: string;

  /** Gets/sets the leading icon type of this option. */
  @FoundationProperty()
  public declare leadingIconType: ListDropdownIconType;

  /** Gets/sets properties on leading icon component. */
  @FoundationProperty()
  public declare leadingIconComponentProps: Partial<IIconComponent>;

  /** Gets/sets the trailing icon of this option. */
  @FoundationProperty()
  public declare trailingIcon: string;

  /** Gets/sets the trailing icon class of this option. */
  @FoundationProperty()
  public declare trailingIconClass: string;

  /** Gets/sets the trailing icon type of this option. */
  @FoundationProperty()
  public declare trailingIconType: ListDropdownIconType;

  /** Gets/sets properties on trailing icon component. */
  @FoundationProperty()
  public declare trailingIconComponentProps: Partial<IIconComponent>;

  /** Gets/sets the leading builder of this option. */
  @FoundationProperty()
  public declare leadingBuilder: () => HTMLElement;

  /** Gets/sets the trailing builder of this option. */
  @FoundationProperty()
  public declare trailingBuilder: () => HTMLElement;
}
