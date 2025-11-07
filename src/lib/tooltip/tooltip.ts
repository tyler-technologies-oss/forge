import { customElement, coerceNumber, coreProperty, coerceBoolean, attachShadowTemplate } from '@tylertech/forge-core';
import { TooltipAdapter } from './tooltip-adapter';
import { TooltipCore } from './tooltip-core';
import { TooltipPlacement, TooltipTriggerType, TooltipType, TOOLTIP_CONSTANTS } from './tooltip-constants';
import { BaseComponent } from '../core/base/base-component';
import { OverlayComponent } from '../overlay/overlay';
import { coerceStringToArray } from '../core/utils/utils';
import { IWithDefaultAria, WithDefaultAria } from '../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../core/mixins/internals/with-element-internals';
import { OverlayFlipState } from '../overlay/overlay-constants';
import { PositionPlacement } from '../core/utils/position-utils';
import { IDismissible, IDismissibleStackState, tryDismiss } from '../core/utils/dismissible-stack';

import template from './tooltip.html';
import styles from './tooltip.scss';

export interface ITooltipComponent extends IWithDefaultAria, IWithElementInternals, IDismissible {
  open: boolean;
  type: TooltipType;
  anchor: string;
  anchorElement: HTMLElement | null;
  /** @deprecated use `anchor` instead */
  target: string;
  placement: `${TooltipPlacement}`;
  /** @deprecated use `placement` instead */
  position: `${TooltipPlacement}`;
  delay: number;
  offset: number;
  flip: OverlayFlipState;
  boundary: string | null;
  boundaryElement: HTMLElement | null;
  fallbackPlacements: PositionPlacement[] | null;
  triggerType: TooltipTriggerType | TooltipTriggerType[];
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tooltip': ITooltipComponent;
  }
}

/**
 * @tag forge-tooltip
 *
 * @summary Tooltips display information related to an element when the user focuses or hovers over an anchor element. Use tooltips to provide additional context or information about elements that may not be immediately apparent.
 *
 * @dependency forge-overlay
 *
 * @property {boolean} [open=false] - Whether or not the tooltip is open.
 * @property {TooltipType} [type="presentation"] - The type of tooltip. Valid values are `presentation` (default), `label`, and `description`.
 * @property {string} anchor - The id of the element that the tooltip is anchored to.
 * @property {TooltipPlacement} [placement="right"] - The placement of the tooltip relative to the anchor element.
 * @property {number} [delay=500] - The delay in milliseconds before the tooltip is shown.
 * @property {number} [offset=4] - The offset in pixels between the tooltip and the anchor element.
 * @property {OverlayFlipState} [flip="auto"] - How the tooltip should place itself if there is not enough space at the desired placement.
 * @property {string | null} boundary - The id of the element that the tooltip should be constrained to.
 * @property {HTMLElement | null} boundaryElement - The element that the tooltip should be constrained to.
 * @property {PositionPlacement[] | null} fallbackPlacements - The fallback placements of the tooltip relative to the anchor element.
 * @property {TooltipTriggerType | TooltipTriggerType[]} [triggerType="hover"] - The trigger type(s) that will open the tooltip. Valid values are `hover` (default), `longpress`, and `focus`.
 *
 * @globalconfig type
 * @globalconfig delay
 * @globalconfig placement
 * @globalconfig offset
 * @globalconfig flip
 * @globalconfig boundaryElement
 * @globalconfig fallbackPlacements
 * @globalconfig triggerType
 *
 * @attribute {boolean} [open=false] - Whether or not the tooltip is open.
 * @attribute {TooltipType} [type="presentation"] - The type of tooltip. Valid values are `presentation` (default), `label`, and `description`.
 * @attribute {string} anchor - The id of the element that the tooltip is anchored to.
 * @attribute {TooltipPlacement} [placement="right"] - The placement of the tooltip relative to the anchor element.
 * @attribute {number} [delay=500] - The delay in milliseconds before the tooltip is shown.
 * @attribute {number} [offset=4] - The offset in pixels between the tooltip and the anchor element.
 * @attribute {OverlayFlipState} [flip="auto"] - How the tooltip should place itself if there is not enough space at the desired placement.
 * @attribute {string | null} boundary - The id of the element that the tooltip should be constrained to.
 * @attribute {PositionPlacement[]} fallback-placements - The fallback placements of the tooltip relative to the anchor element.
 * @attribute {TooltipTriggerType | TooltipTriggerType[]} [trigger-type="hover"] - The trigger type(s) that will open the tooltip. Valid values are `hover` (default), `longpress`, and `focus`.
 *
 * @cssproperty --forge-tooltip-background - The background color of the tooltip surface.
 * @cssproperty --forge-tooltip-color - The text color of the tooltip surface.
 * @cssproperty --forge-tooltip-shape - The shape of the tooltip surface.
 * @cssproperty --forge-tooltip-padding - The padding of the tooltip surface.
 * @cssproperty --forge-tooltip-padding-block - The block padding of the tooltip surface.
 * @cssproperty --forge-tooltip-padding-inline - The inline padding of the tooltip surface.
 * @cssproperty --forge-tooltip-max-width - The maximum width of the tooltip surface.
 * @cssproperty --forge-tooltip-elevation - The elevation of the tooltip surface.
 * @cssproperty --forge-tooltip-border-width - The border width of the tooltip surface.
 * @cssproperty --forge-tooltip-border-style - The border style of the tooltip surface.
 * @cssproperty --forge-tooltip-border-color - The border color of the tooltip surface.
 * @cssproperty --forge-tooltip-animation-timing - The animation timing function of the tooltip surface.
 * @cssproperty --forge-tooltip-animation-duration - The animation duration of the tooltip surface.
 * @cssproperty --forge-tooltip-animation-offset - The animation offset of the tooltip surface.
 * @cssproperty --forge-tooltip-arrow-size - The size of the tooltip arrow.
 * @cssproperty --forge-tooltip-arrow-height - The height of the tooltip arrow.
 * @cssproperty --forge-tooltip-arrow-width - The width of the tooltip arrow.
 * @cssproperty --forge-tooltip-arrow-shape - The shape of the tooltip arrow.
 * @cssproperty --forge-tooltip-arrow-clip-path - The clip path of the tooltip arrow.
 * @cssproperty --forge-tooltip-arrow-rotation - The rotation of the tooltip arrow.
 * @cssproperty --forge-tooltip-arrow-top-rotation - The rotation of the tooltip arrow when the tooltip is placed on top.
 * @cssproperty --forge-tooltip-arrow-right-rotation - The rotation of the tooltip arrow when the tooltip is placed on the right.
 * @cssproperty --forge-tooltip-arrow-bottom-rotation - The rotation of the tooltip arrow when the tooltip is placed on the bottom.
 * @cssproperty --forge-tooltip-arrow-left-rotation - The rotation of the tooltip arrow when the tooltip is placed on the left.
 *
 * @slot - The content to display in the tooltip.
 *
 * @csspart surface - The tooltip surface.
 * @csspart arrow - The tooltip arrow.
 * @csspart overlay - The overlay surface.
 */
@customElement({
  name: TOOLTIP_CONSTANTS.elementName,
  dependencies: [OverlayComponent]
})
export class TooltipComponent extends WithDefaultAria(WithElementInternals(BaseComponent)) implements ITooltipComponent {
  public static get observedAttributes(): string[] {
    return Object.values(TOOLTIP_CONSTANTS.observedAttributes);
  }

  private _core: TooltipCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new TooltipCore(new TooltipAdapter(this));
  }

  public [tryDismiss](state?: IDismissibleStackState<string> | undefined): boolean {
    return true;
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TOOLTIP_CONSTANTS.observedAttributes.ID:
        this._core.syncTooltipAria();
        break;
      case TOOLTIP_CONSTANTS.observedAttributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case TOOLTIP_CONSTANTS.observedAttributes.TYPE:
        this.type = newValue?.trim() ? (newValue as TooltipType) : TOOLTIP_CONSTANTS.defaults.TYPE;
        break;
      case TOOLTIP_CONSTANTS.observedAttributes.TARGET:
      case TOOLTIP_CONSTANTS.observedAttributes.ANCHOR:
        this.anchor = newValue;
        break;
      case TOOLTIP_CONSTANTS.observedAttributes.DELAY:
        this.delay = coerceNumber(newValue);
        break;
      case TOOLTIP_CONSTANTS.observedAttributes.POSITION:
      case TOOLTIP_CONSTANTS.observedAttributes.PLACEMENT:
        this.placement = newValue as TooltipPlacement;
        break;
      case TOOLTIP_CONSTANTS.observedAttributes.OFFSET:
        this.offset = coerceNumber(newValue);
        break;
      case TOOLTIP_CONSTANTS.observedAttributes.FLIP:
        this.flip = newValue as OverlayFlipState;
        break;
      case TOOLTIP_CONSTANTS.observedAttributes.BOUNDARY:
        this.boundary = newValue;
        break;
      case TOOLTIP_CONSTANTS.observedAttributes.FALLBACK_PLACEMENTS:
        this.fallbackPlacements = newValue?.trim() ? coerceStringToArray<PositionPlacement>(newValue) : null;
        break;
      case TOOLTIP_CONSTANTS.observedAttributes.TRIGGER_TYPE:
        this.triggerType = newValue?.trim() ? coerceStringToArray<TooltipTriggerType>(newValue) : TOOLTIP_CONSTANTS.defaults.TRIGGER_TYPES;
        break;
    }
  }

  @coreProperty()
  declare public open: boolean;

  @coreProperty()
  declare public type: TooltipType;

  @coreProperty()
  declare public anchor: string;

  @coreProperty()
  declare public anchorElement: HTMLElement | null;

  /** @deprecated use `anchor` instead */
  @coreProperty({ name: 'anchor' })
  declare public target: string;

  @coreProperty()
  declare public placement: `${TooltipPlacement}`;

  /** @deprecated use `placement` instead */
  @coreProperty({ name: 'placement' })
  declare public position: `${TooltipPlacement}`;

  @coreProperty()
  declare public delay: number;

  @coreProperty()
  declare public offset: number;

  @coreProperty()
  declare public flip: OverlayFlipState;

  @coreProperty()
  declare public boundary: string | null;

  @coreProperty()
  declare public boundaryElement: HTMLElement | null;

  @coreProperty()
  declare public fallbackPlacements: PositionPlacement[] | null;

  @coreProperty()
  declare public triggerType: TooltipTriggerType | TooltipTriggerType[];
}
