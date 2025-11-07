import { coreProperty, coerceNumber, coerceBoolean } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ListDropdownHeaderBuilder, ListDropdownFooterBuilder, LIST_DROPDOWN_CONSTANTS } from './list-dropdown-constants';
import { PositionPlacement } from '../core/utils/position-utils';
import { OverlayPlacement, IOverlayOffset, OverlayFlipState, OverlayShiftState } from '../overlay/overlay-constants';

export interface IListDropdownAware extends IBaseComponent {
  popupClasses: string | string[];
  popupHeaderBuilder: ListDropdownHeaderBuilder;
  popupFooterBuilder: ListDropdownHeaderBuilder;
  syncPopupWidth: boolean;
  optionLimit: number;
  observeScroll: boolean;
  observeScrollThreshold: number;
  constrainPopupWidth: boolean;
  wrapOptionText: boolean;
  popoverPlacement: OverlayPlacement;
  popoverOffset: IOverlayOffset;
  popoverFlip: OverlayFlipState;
  popoverShift: OverlayShiftState;
  popoverFallbackPlacements: PositionPlacement[] | null;
}

export class ListDropdownAware extends BaseComponent {
  public static get observedAttributes(): string[] {
    return Object.values(LIST_DROPDOWN_CONSTANTS.observedAttributes);
  }

  constructor() {
    super();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.POPUP_CLASSES:
        this.popupClasses = newValue;
        break;
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.OPTION_LIMIT:
        this.optionLimit = coerceNumber(newValue);
        break;
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.OBSERVE_SCROLL:
        this.observeScroll = coerceBoolean(newValue);
        break;
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.OBSERVE_SCROLL_THRESHOLD:
        this.observeScrollThreshold = coerceNumber(newValue);
        break;
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.SYNC_POPUP_WIDTH:
        this.syncPopupWidth = coerceBoolean(newValue);
        break;
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.CONSTRAIN_POPUP_WIDTH:
        this.constrainPopupWidth = coerceBoolean(newValue);
        break;
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.WRAP_OPTION_TEXT:
        this.wrapOptionText = coerceBoolean(newValue);
        break;
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.POPOVER_PLACEMENT:
        this.popoverPlacement = newValue as OverlayPlacement;
        break;
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.POPOVER_OFFSET:
        this.popoverOffset = JSON.parse(newValue);
        break;
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.POPOVER_FLIP:
        this.popoverFlip = newValue as OverlayFlipState;
        break;
      case LIST_DROPDOWN_CONSTANTS.observedAttributes.POPOVER_SHIFT:
        this.popoverShift = newValue as OverlayShiftState;
        break;
    }
  }

  /**
   * Gets/sets the list of classes to apply to the popup element.
   * @attribute popup-classes
   */
  @coreProperty()
  declare public popupClasses: string | string[];

  /** Gets/sets the callback function for generating header content within the popup. */
  @coreProperty()
  declare public popupHeaderBuilder: ListDropdownHeaderBuilder;

  /** Gets/sets the callback function for generating header content within the popup. */
  @coreProperty()
  declare public popupFooterBuilder: ListDropdownFooterBuilder;

  /**
   * Gets/sets whether the popup width is synchronized with the popup target width.
   * @default false
   * @attribute sync-popup-width
   */
  @coreProperty()
  declare public syncPopupWidth: boolean;

  /**
   * Gets/sets the maximum number of options to display in the dropdown.
   * @default 0
   * @attribute option-limit
   */
  @coreProperty()
  declare public optionLimit: number;

  /**
   * Controls the observation of scroll events on the dropdown.
   * @default false
   * @attribute observe-scroll
   */
  @coreProperty()
  declare public observeScroll: boolean;

  /**
   * The number of pixels from the bottom to trigger the scroll bottom event. Only applicable if `observeScroll` is true.
   * @default 0
   * @attribute observe-scroll-threshold
   */
  @coreProperty()
  declare public observeScrollThreshold: number;

  /**
   * Gets/sets whether the popup width will be constrained to a max width of the viewport width (default: `100vw`).
   * @default true
   * @attribute constrain-popup-width
   */
  @coreProperty()
  declare public constrainPopupWidth: boolean;

  /**
   * Gets/sets whether the options will wrap their text or not.
   * This only applies if `constrainPopupWidth` is `true`, if there is an explicit width set via CSS.
   * @default false
   * @attribute wrap-option-text
   */
  @coreProperty()
  declare public wrapOptionText: boolean;

  /**
   * Gets/sets the placement of the popover.
   * @default 'bottom'
   * @attribute popover-placement
   */
  @coreProperty()
  declare public popoverPlacement: OverlayPlacement;

  /**
   * Gets/sets the offset of the popover.
   * @attribute popover-offset
   */
  @coreProperty()
  declare public popoverOffset: IOverlayOffset;

  /**
   * Gets/sets the flip state of the popover.
   * @default 'auto'
   * @attribute popover-flip
   */
  @coreProperty()
  declare public popoverFlip: OverlayFlipState;

  /**
   * Gets/sets whether the popover should shift to fit within the viewport.
   * @default 'auto'
   * @attribute popover-shift
   */
  @coreProperty()
  declare public popoverShift: OverlayShiftState;

  /**
   * Gets/sets the fallback placements of the popover.
   * @attribute popover-fallback-placements
   */
  @coreProperty()
  declare public popoverFallbackPlacements: PositionPlacement[] | null;
}
