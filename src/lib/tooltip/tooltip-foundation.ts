import { ICustomElementFoundation, throttle, Platform, isDefined } from '@tylertech/forge-core';

import { ITooltipAdapter } from './tooltip-adapter';
import { TOOLTIP_CONSTANTS, TooltipBuilder } from './tooltip-constants';
import { PopupPlacement } from '../popup';

export interface ITooltipFoundation extends ICustomElementFoundation {
  text: string;
  builder: TooltipBuilder | undefined;
  target: string;
  delay: number;
  position: PopupPlacement;
  open: boolean;
  hide(): void;
  tooltipElement: HTMLElement | null;
}

/**
 * The foundation class behind the tooltip component.
 */
export class TooltipFoundation implements ITooltipFoundation {
  private static _tooltipIdentifier = 0;
  private _identifier: string | null;
  private _text: string;
  private _builder: TooltipBuilder | undefined;
  private _target: string;
  private _delay = TOOLTIP_CONSTANTS.numbers.DEFAULT_DELAY;
  private _position: PopupPlacement = TOOLTIP_CONSTANTS.strings.DEFAULT_POSITION as PopupPlacement;
  private _mouseOverTimeout: number | undefined;
  private _isOpen = false;
  private _touchTimeout: number | undefined;
  private _mouseOverListener: (evt: MouseEvent) => void;
  private _mouseOutListener: (evt: MouseEvent) => void;
  private _touchStartListener: (evt: MouseEvent) => void;
  private _touchEndListener: (evt: MouseEvent) => void;
  private _scrollListener: (evt: Event) => void;
  private _clickListener: (evt: MouseEvent) => void;
  private _mouseDownListener: (evt: MouseEvent) => void;
  private _dragListener: (evt: DragEvent) => void;
  
  constructor(private _adapter: ITooltipAdapter) {
    this._mouseOverListener = evt => this._onMouseOver(evt);
    this._mouseOutListener = evt => this._onMouseOut(evt);
    this._touchStartListener = evt => this._onTouchStart(evt);
    this._touchEndListener = evt => this._onTouchEnd(evt);
    this._scrollListener = throttle((evt: Event) => this._onScroll(evt), 100);
    this._clickListener = () => this._targetInteracted();
    this._mouseDownListener = () => this._targetInteracted();
    this._dragListener = () => this._targetInteracted();
  }

  public initialize(): void {
    this._adapter.initializeTargetElement(this._target);

    if (!this._adapter.hasTargetElement()) {
      throw new Error('Unable to locate target element.');
    }

    // Set a unique id for this tooltip (unless it already has one)
    this._identifier = this._adapter.getHostAttribute('id');
    if (!this._identifier) {
      this._identifier = this._getNextIdentifier();
      this._adapter.setHostAttribute('id', this._identifier);
    }

    this._addTargetListeners();
    this._adapter.initializeAccessibility(this._identifier);
  }

  public disconnect(): void {
    if (this._mouseOverTimeout) {
      window.clearTimeout(this._mouseOverTimeout);
      this._mouseOverTimeout = undefined;
    }
    if (this._touchTimeout) {
      window.clearTimeout(this._touchTimeout);
      this._touchTimeout = undefined;
    }
    this._adapter.destroy(this._identifier);
    if (this._isOpen) {
      this.hide();
    }
    if (this._adapter.hasTargetElement()) {
      this._removeTargetListeners();
    }
  }

  /**
   * Generates the next available tooltip identifier.
   */
  private _getNextIdentifier(): string {
    return `forge-tooltip-${TooltipFoundation._tooltipIdentifier++}`;
  }

  /** Adds event listeners to the target element. */
  private _addTargetListeners(): void {
    if (Platform.isMobile) {
      this._adapter.addTargetEventListener('touchstart', this._touchStartListener);
      this._adapter.addTargetEventListener('touchend', this._touchEndListener);
    } else {
      this._adapter.addTargetEventListener('mouseover', this._mouseOverListener);
      this._adapter.addTargetEventListener('mouseout', this._mouseOutListener);
    }

    this._adapter.addTargetEventListener('click', this._clickListener);
    this._adapter.addTargetEventListener('mousedown', this._mouseDownListener);
    this._adapter.addTargetEventListener('dragstart', this._dragListener);
  }

  /**
   * Removes the event listeners from the target element.
   * @param targetElement The target element instance.
   */
  private _removeTargetListeners(): void {
    if (Platform.isMobile) {
      this._adapter.removeTargetEventListener('touchstart', this._touchStartListener);
      this._adapter.removeTargetEventListener('touchend', this._touchEndListener);
    } else {
      this._adapter.removeTargetEventListener('mouseover', this._mouseOverListener);
      this._adapter.removeTargetEventListener('mouseout', this._mouseOutListener);
    }

    this._adapter.removeTargetEventListener('click', this._clickListener);
    this._adapter.removeTargetEventListener('mousedown', this._mouseDownListener);
    this._adapter.removeTargetEventListener('dragstart', this._dragListener);
  }

  /**
   * Handles the touchstart event on the target element to detect long press.
   */
  private _onTouchStart(evt: Event): void {
    this._touchTimeout = window.setTimeout(() => {
      this._show();
      window.setTimeout(() => this.hide(), TOOLTIP_CONSTANTS.numbers.LONGPRESS_VISIBILITY_DURATION);
      this._touchTimeout = undefined;
    }, TOOLTIP_CONSTANTS.numbers.LONGPRESS_THRESHOLD);
  }
  
  /**
   * Handles the touchend event on the target element to cancel a long press action.
   */
  private _onTouchEnd(evt: Event): void {
    if (this._touchTimeout) {
      this._clearTouchTimer();
    }
  }

  private _clearTouchTimer(): void {
    window.clearTimeout(this._touchTimeout);
    this._touchTimeout = undefined;
  }

  /**
   * Handles the mouseover event on the target element.
   */
  private _onMouseOver(evt: MouseEvent): void {
    if (this._isOpen || !this._adapter.hasTargetElement() || !this._adapter.isTargetElementConnected()) {
      return;
    }

    if (this._delay) {
      this._mouseOverTimeout = window.setTimeout(() => {
        this._show();
        this._mouseOverTimeout = undefined;
      }, this._delay);
    } else {
      this._show();
    }
  }

  /**
   * Handles the mouseout event on the target element.
   */
  private _onMouseOut(evt: MouseEvent): void {
    if (this._mouseOverTimeout) {
      window.clearTimeout(this._mouseOverTimeout);
      this._mouseOverTimeout = undefined;
      return;
    }
    this.hide();
  }

  /**
   * Displays the tooltip.
   */
  private _show(): void {
    let content: HTMLElement | undefined;

    if (this._builder && typeof this._builder === 'function') {
      content = this._builder();
    }

    this._adapter.showTooltip(this._position, content);

    if (this._adapter.hasTooltipElement()) {
      this._isOpen = true;
      this._adapter.addWindowListener('scroll', this._scrollListener);
    }
  }

  /**
   * Hides the tooltip.
   */
  public hide(): void {
    if (!this._isOpen) {
      return;
    }
    if (this._touchTimeout) {
      this._clearTouchTimer();
    }
    this._isOpen = false;
    this._adapter.removeWindowListener('scroll', this._scrollListener);
    this._adapter.hideTooltip();
  }

  /**
   * Handles scrolling events when the tooltip is open.
   */
  private _onScroll(evt: Event): void {
    if (!this._isOpen) {
      return;
    }
    this.hide();
  }

  private _targetInteracted(): void {
    if (this._mouseOverTimeout) {
      window.clearTimeout(this._mouseOverTimeout);
    }
    if (this._isOpen) {
      this.hide();
    }
  }

  /** Gets/sets the tooltip text. */
  public get text(): string {
    return this._text || this._adapter.getInnerText();
  }
  public set text(value: string) {
    if (this._text !== value) {
      this._text = value;
      this._adapter.setTextContent(this._text);
      this._adapter.setHostAttribute(TOOLTIP_CONSTANTS.attributes.TEXT, this._text);
    }
  }

  /** Sets the tooltip builder function. */
  public get builder(): TooltipBuilder | undefined {
    return this._builder;
  }
  public set builder(value: TooltipBuilder | undefined) {
    this._builder = value;
  }
  
  /** Gets/sets the target element CSS selector. */
  public get target(): string {
    return this._target;
  }
  public set target(value: string) {
    if (this._target !== value) {
      this._target = value;

      if (this._adapter.hasTargetElement()) {
        this._removeTargetListeners();
      }

      this._adapter.initializeTargetElement(this._target);
      
      if (this._adapter.hasTargetElement()) {
        this._addTargetListeners();
      }

      this._adapter.setHostAttribute(TOOLTIP_CONSTANTS.attributes.TARGET, isDefined(this._target) ? this._target : '');
    }
  }

  /** Gets/sets the interaction delay. */
  public get delay(): number {
    return this._delay;
  }
  public set delay(value: number) {
    if (this._delay !== value) {
      this._delay = value;
      this._adapter.setHostAttribute(TOOLTIP_CONSTANTS.attributes.DELAY, isDefined(this._delay) ? this._delay.toString() : '');
    }
  }

  /** Gets/sets the tooltip position. */
  public get position(): PopupPlacement {
    return this._position;
  }
  public set position(value: PopupPlacement) {
    if (this._position !== value) {
      this._position = value;
      this._adapter.setHostAttribute(TOOLTIP_CONSTANTS.attributes.POSITION, isDefined(this._position) ? this._position.toString() : '');
    }
  }

  public get open(): boolean {
    return this._isOpen;
  }

  public get tooltipElement(): HTMLElement | null {
    return this._adapter.getTooltipElement();
  }
}
