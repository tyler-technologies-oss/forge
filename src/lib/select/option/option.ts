import { coerceBoolean, CustomElement, FoundationProperty, ICustomElement } from '@tylertech/forge-core';
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
 */
@CustomElement({
  name: OPTION_CONSTANTS.elementName
})
export class OptionComponent extends BaseComponent implements IOptionComponent {
  public static get observedAttributes(): string[] {
    return [
      OPTION_CONSTANTS.attributes.VALUE,
      OPTION_CONSTANTS.attributes.LABEL,
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
  public value: any;

  /** Gets/sets the label of this option. */
  @FoundationProperty()
  public label: string;

  /** Gets/sets the disabled status of this option. */
  @FoundationProperty()
  public disabled: boolean;

  /** Gets/sets the whether this option is a divider. */
  @FoundationProperty()
  public divider: boolean;

  /** Gets/sets the classes of this option. */
  @FoundationProperty()
  public optionClass: string | string[];

  /** Gets/sets the leading icon of this option. */
  @FoundationProperty()
  public leadingIcon: string;

  /** Gets/sets the leading icon class of this option. */
  @FoundationProperty()
  public leadingIconClass: string;

  /** Gets/sets the leading icon type of this option. */
  @FoundationProperty()
  public leadingIconType: ListDropdownIconType;

  /** Gets/sets the trailing icon of this option. */
  @FoundationProperty()
  public trailingIcon: string;

  /** Gets/sets the trailing icon class of this option. */
  @FoundationProperty()
  public trailingIconClass: string;

  /** Gets/sets the trailing icon type of this option. */
  @FoundationProperty()
  public trailingIconType: ListDropdownIconType;

  /** Gets/sets the leading builder of this option. */
  @FoundationProperty()
  public leadingBuilder: () => HTMLElement;

  /** Gets/sets the trailing builder of this option. */
  @FoundationProperty()
  public trailingBuilder: () => HTMLElement;
}
