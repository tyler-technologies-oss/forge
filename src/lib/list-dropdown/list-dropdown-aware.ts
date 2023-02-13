import { FoundationProperty, coerceNumber, coerceBoolean } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ListDropdownHeaderBuilder, ListDropdownFooterBuilder, LIST_DROPDOWN_CONSTANTS } from './list-dropdown-constants';

export interface IListDropdownAware extends IBaseComponent {
  popupClasses: string | string[];
  popupHeaderBuilder: ListDropdownHeaderBuilder;
  popupFooterBuilder: ListDropdownHeaderBuilder;
  syncPopupWidth: boolean;
  optionLimit: number;
  observeScroll: boolean;
  observeScrollThreshold: number;
}

export class ListDropdownAware extends BaseComponent {
  constructor() {
    super();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LIST_DROPDOWN_CONSTANTS.attributes.POPUP_CLASSES:
        this.popupClasses = newValue;
        break;
      case LIST_DROPDOWN_CONSTANTS.attributes.OPTION_LIMIT:
        this.optionLimit = coerceNumber(newValue);
        break;
      case LIST_DROPDOWN_CONSTANTS.attributes.OBSERVE_SCROLL:
        this.observeScroll = coerceBoolean(newValue);
        break;
      case LIST_DROPDOWN_CONSTANTS.attributes.OBSERVE_SCROLL_THRESHOLD:
        this.observeScrollThreshold = coerceNumber(newValue);
        break;
      case LIST_DROPDOWN_CONSTANTS.attributes.SYNC_POPUP_WIDTH:
        this.syncPopupWidth = coerceBoolean(newValue);
        break;
    }
  }
  
  /** Gets/sets the list of classes to apply to the popup element. */
  @FoundationProperty()
  public declare popupClasses: string | string[];

  /** Gets/sets the list of classes to apply to the popup element. */
  @FoundationProperty()
  public declare popupHeaderBuilder: ListDropdownHeaderBuilder;

  /** Gets/sets the list of classes to apply to the popup element. */
  @FoundationProperty()
  public declare popupFooterBuilder: ListDropdownFooterBuilder;

  /** Gets/sets whether the popup width is synchronized with the popup target width. */
  @FoundationProperty()
  public declare syncPopupWidth: boolean;

  /** Gets/sets the maximum number of options to display in the dropdown. */
  @FoundationProperty()
  public declare optionLimit: number;

  /** Controls the observation of scroll events on the dropdown. */
  @FoundationProperty()
  public declare observeScroll: boolean;

  /** The number of pixels from the bottom to trigger the scroll bottom event. Only applicable if `observeScroll` is true. */
  @FoundationProperty()
  public declare observeScrollThreshold: number;
}
