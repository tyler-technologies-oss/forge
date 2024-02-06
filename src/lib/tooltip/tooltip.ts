import { CustomElement, coerceNumber, hideElementVisually, FoundationProperty } from '@tylertech/forge-core';
import { TooltipAdapter } from './tooltip-adapter';
import { TooltipFoundation } from './tooltip-foundation';
import { TOOLTIP_CONSTANTS, TooltipBuilder } from './tooltip-constants';
import { PopupPlacement } from '../popup';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

export interface ITooltipComponent extends IBaseComponent {
  text: string;
  builder: TooltipBuilder | undefined;
  target: string;
  delay: number;
  position: PopupPlacement;
  open: boolean;
  hide(): void;
  tooltipElement: HTMLElement | null;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tooltip': ITooltipComponent;
  }
}

/**
 * The custom element class behind the `<forge-tooltip>` element.
 * 
 * @tag forge-tooltip
 */
@CustomElement({
  name: TOOLTIP_CONSTANTS.elementName
})
export class TooltipComponent extends BaseComponent implements ITooltipComponent {
  public static get observedAttributes(): string[] {
    return [
      TOOLTIP_CONSTANTS.attributes.TEXT,
      TOOLTIP_CONSTANTS.attributes.TARGET,
      TOOLTIP_CONSTANTS.attributes.DELAY,
      TOOLTIP_CONSTANTS.attributes.POSITION
    ];
  }

  private _foundation: TooltipFoundation;

  constructor() {
    super();
    this._foundation = new TooltipFoundation(new TooltipAdapter(this));
  }

  public connectedCallback(): void {
    hideElementVisually(this);
    requestAnimationFrame(() => this._foundation.initialize());
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TOOLTIP_CONSTANTS.attributes.TEXT:
        this.text = newValue;
        break;
      case TOOLTIP_CONSTANTS.attributes.TARGET:
        this.target = newValue;
        break;
      case TOOLTIP_CONSTANTS.attributes.DELAY:
        this.delay = coerceNumber(newValue);
        break;
      case TOOLTIP_CONSTANTS.attributes.POSITION:
        this.position = newValue as PopupPlacement;
        break;
    }
  }

  /** Gets/sets the tooltip text. */
  @FoundationProperty()
  public declare text: string;

  /** Sets the tooltip builder function for display complex tooltip content. */
  @FoundationProperty()
  public declare builder: TooltipBuilder | undefined;
  
  /** Gets/sets the target element selector. */
  @FoundationProperty()
  public declare target: string;

  /** The tooltip display delay in milliseconds. */
  @FoundationProperty()
  public declare delay: number;

  /** Gets/sets the position. */
  @FoundationProperty()
  public declare position: `${PopupPlacement}`;

  /** Gets the open state of the tooltip. */
  @FoundationProperty()
  public declare open: boolean;

  /** @readonly */
  @FoundationProperty({ set: false })
  public declare tooltipElement: HTMLElement | null;

  /** Hides the tooltip if it's open. */
  public hide(): void {
    this._foundation.hide();
  }
}
