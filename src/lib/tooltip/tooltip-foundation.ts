import { ICustomElementFoundation, isDefined } from '@tylertech/forge-core';
import { ITooltipAdapter } from './tooltip-adapter';
import { TOOLTIP_CONSTANTS, TooltipPlacement, TooltipTriggerType, TooltipType } from './tooltip-constants';
import { PopupPlacement } from '../popup';
import { WithLongpressListener } from '../core/mixins/interactions/longpress/with-longpress-listener';
import { canUserHoverElements } from '../constants';

export interface ITooltipFoundation extends ICustomElementFoundation {
  open: boolean;
  type: TooltipType;
  placement: `${TooltipPlacement}`;
  delay: number;
  anchor: string;
  anchorElement: HTMLElement | null;
  offset: number;
  triggerType: TooltipTriggerType | TooltipTriggerType[];
  syncTooltipAria(): void;
}

const BaseClass = WithLongpressListener();

export class TooltipFoundation extends BaseClass implements ITooltipFoundation {
  private _open = false;
  private _type: TooltipType = TOOLTIP_CONSTANTS.defaults.TYPE;
  private _anchor: string;
  private _delay = TOOLTIP_CONSTANTS.defaults.DELAY;
  private _placement: TooltipPlacement = TOOLTIP_CONSTANTS.defaults.PLACEMENT;
  private _offset = TOOLTIP_CONSTANTS.defaults.OFFSET;
  private _triggerTypes: TooltipTriggerType[] = TOOLTIP_CONSTANTS.defaults.TRIGGER_TYPES;
  
  // Hover trigger type
  private _hoverStartListener: (evt: MouseEvent) => void = this._onHoverStart.bind(this);
  private _hoverEndListener: (evt: MouseEvent) => void = this._onHoverEnd.bind(this);
  private _hoverTimeout: number | undefined;

  // Focus trigger type
  private _focusListener: (evt: FocusEvent) => void = this._onFocus.bind(this);
  private _blurListener: (evt: FocusEvent) => void = this._onBlur.bind(this);

  // Longpress trigger type
  private _longpressVisibilityTimeout: number | undefined;

  // Dismiss/hide triggers
  private _scrollListener: (evt: Event) => void = this._onTryHide.bind(this);
  private _mouseDownListener: (evt: MouseEvent) => void = this._onTryHide.bind(this);
  private _dragListener: (evt: DragEvent) => void = this._onTryHide.bind(this);
  private _lightDismissListener: (evt: Event) => void = this._onTryHide.bind(this);
  
  constructor(private _adapter: ITooltipAdapter) {
    super();
  }

  public initialize(): void {
    if (!this._adapter.anchorElement) {
      this._adapter.tryLocateAnchorElement(this._anchor);
    }

    this._adapter.syncAria();
    this._attachAnchorListeners();

    if (this._open) {
      this._show();
    }
  }

  public destroy(): void {
    if (this._open) {
      this._hide();
    }
    this._detachAnchorListeners();
  }

  public syncTooltipAria(): void {
    this._adapter.syncAria();
  }

  private _attachAnchorListeners(): void {
    if (!this._adapter.anchorElement) {
      return;
    }

    const triggerTypes = [...this._triggerTypes];

    // If the users input mechanism doesn't support hover, then we need to force longpress as their alternative
    if (!canUserHoverElements) {
      triggerTypes.splice(triggerTypes.indexOf('hover'), 1);
      triggerTypes.push('longpress');
    }

    const triggerInitializers: Record<TooltipTriggerType, () => void> = {
      'hover': () => this._adapter.addAnchorListener('mouseenter', this._hoverStartListener),
      'longpress': () => this._startLongpressListener(this._adapter.anchorElement as HTMLElement),
      'focus': () => this._adapter.addAnchorListener('focusin', this._focusListener)
    };
    triggerTypes.forEach(triggerType => triggerInitializers[triggerType]());
  }

  private _detachAnchorListeners(): void {
    if (!this._adapter.anchorElement) {
      return;
    }

    const triggerTypes = [...this._triggerTypes];

    if (!canUserHoverElements) {
      triggerTypes.push('longpress');
    }

    const triggerRemovers: Record<TooltipTriggerType, () => void> = {
      'hover': () => {
        this._adapter.removeAnchorListener('mouseenter', this._hoverStartListener);
        this._adapter.removeAnchorListener('mousedown', this._hoverEndListener);
        this._adapter.removeAnchorListener('mouseleave', this._hoverEndListener);
      },
      'longpress': () => this._stopLongpressListener(this._adapter.anchorElement as HTMLElement),
      'focus': () => {
        this._adapter.removeAnchorListener('focusin', this._focusListener);
        this._adapter.removeAnchorListener('focusout', this._blurListener);
      }
    };
    triggerTypes.forEach(triggerType => triggerRemovers[triggerType]());
  }

  private _show(): void {
    this._open = true;
    this._adapter.show();
    this._attachDismissListeners();
    this._adapter.toggleHostAttribute(TOOLTIP_CONSTANTS.attributes.OPEN, this._open);
  }

  private _hide(): void {
    window.clearTimeout(this._hoverTimeout);
    window.clearTimeout(this._longpressVisibilityTimeout);

    this._open = false;
    this._adapter.hide();
    this._detachDismissListeners();
    this._adapter.toggleHostAttribute(TOOLTIP_CONSTANTS.attributes.OPEN, this._open);
  }

  private _attachDismissListeners(): void {
    this._adapter.addAnchorListener('mousedown', this._mouseDownListener);
    this._adapter.addAnchorListener('dragstart', this._dragListener);
    this._adapter.addWindowListener('scroll', this._scrollListener);
    this._adapter.addLightDismissListener(this._lightDismissListener);
  }
  
  private _detachDismissListeners(): void {
    this._adapter.removeAnchorListener('mousedown', this._mouseDownListener);
    this._adapter.removeAnchorListener('dragstart', this._dragListener);
    this._adapter.removeWindowListener('scroll', this._scrollListener);
    this._adapter.removeLightDismissListener(this._lightDismissListener);
  }

  private _onHoverStart(_evt: MouseEvent): void {
    if (this._open) {
      return;
    }

    this._adapter.addAnchorListener('mousedown', this._hoverEndListener);
    this._adapter.addAnchorListener('mouseleave', this._hoverEndListener);
  
    if (this._delay) {
      this._hoverTimeout = window.setTimeout(() => {
        this._onTryShow();
      }, this._delay);
    } else {
      this._onTryShow();
    }
  }

  private _onHoverEnd(_evt: MouseEvent): void {
    this._adapter.removeAnchorListener('mousedown', this._hoverEndListener);
    this._adapter.removeAnchorListener('mouseleave', this._hoverEndListener);
    window.clearTimeout(this._hoverTimeout);
    this._onTryHide();
  }

  private _onFocus(_evt: FocusEvent): void {
    if (this._open) {
      return;
    }
    this._adapter.addAnchorListener('focusout', this._blurListener);
    this._onTryShow();
  }

  private _onBlur(_evt: FocusEvent): void {
    this._adapter.removeAnchorListener('focusout', this._blurListener);
    this._onTryHide();
  }

  protected _onLongpress(): void {
    this._onTryShow();
  }

  protected override _onLongpressEnd(evt: PointerEvent | TouchEvent): void {
    super._onLongpressEnd(evt);

    // We only start the timeout to hide the tooltip after the user lifts the pointer
    this._longpressVisibilityTimeout = window.setTimeout(() => {
      this._onTryHide();
    }, TOOLTIP_CONSTANTS.numbers.LONGPRESS_VISIBILITY_DURATION);
  }

  private _onTryShow(): void {
    if (!this._open) {
      this._show();
    }
  }

  private _onTryHide(): void {
    if (this._open) {
      this._hide();
    }
  }
  
  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      if (this._adapter.isConnected) {
        if (this._open) {
          this._show();
        } else {
          this._hide();
        }
      } else {
        this._open = value;
      }
    }
  }

  public get type(): TooltipType {
    return this._type;
  }
  public set type(value: TooltipType) {
    if (this._type !== value) {
      this._type = value ?? TOOLTIP_CONSTANTS.defaults.TYPE;
      if (this._adapter.isConnected) {
        this._adapter.syncAria();
      }
      this._adapter.setHostAttribute(TOOLTIP_CONSTANTS.attributes.TYPE, this._type);
    }
  }

  public get anchor(): string {
    return this._anchor;
  }
  public set anchor(value: string) {
    if (this._anchor !== value) {
      this._anchor = value;

      if (this._adapter.isConnected) {
        this._detachAnchorListeners();
      }

      this._adapter.tryLocateAnchorElement(this._anchor);
      this._adapter.syncAria();
      
      if (this._adapter.isConnected) {
        this._attachAnchorListeners();
      }
    }
  }

  public get anchorElement(): HTMLElement | null {
    return this._adapter.anchorElement;
  }
  public set anchorElement(element: HTMLElement | null) {
    if (this._adapter.anchorElement !== element) {
      if (this._adapter.isConnected) {
        this._detachAnchorListeners();
      }

      this._adapter.setAnchorElement(element);
      
      if (this._adapter.isConnected) {
        this._adapter.syncAria();
        this._attachAnchorListeners();
      }
    }
  }

  public get delay(): number {
    return this._delay;
  }
  public set delay(value: number) {
    if (this._delay !== value) {
      this._delay = value;
      this._adapter.setHostAttribute(TOOLTIP_CONSTANTS.attributes.DELAY, isDefined(this._delay) ? this._delay.toString() : '');
    }
  }

  public get placement(): PopupPlacement {
    return this._placement;
  }
  public set placement(value: PopupPlacement) {
    if (this._placement !== value) {
      this._placement = value ?? TOOLTIP_CONSTANTS.defaults.PLACEMENT;
      this._adapter.setHostAttribute(TOOLTIP_CONSTANTS.attributes.PLACEMENT, String(this._placement));
    }
  }

  public get offset(): number {
    return this._offset;
  }
  public set offset(value: number) {
    if (this._offset !== value) {
      this._offset = value ?? TOOLTIP_CONSTANTS.defaults.OFFSET;
      this._adapter.toggleHostAttribute(TOOLTIP_CONSTANTS.attributes.OFFSET, this._offset !== TOOLTIP_CONSTANTS.defaults.OFFSET, String(this._offset));
    }
  }

  public get triggerType(): TooltipTriggerType | TooltipTriggerType[] {
    return this._triggerTypes;
  }
  public set triggerType(value: TooltipTriggerType | TooltipTriggerType[]) {
    if (this._triggerTypes !== value) {
      if (this._adapter.isConnected) {
        this._detachAnchorListeners();
      }

      this._triggerTypes = Array.isArray(value) ? value : [value];
      this._triggerTypes = this._triggerTypes.filter(type => !!type);

      if (!this._triggerTypes.length) {
        this._triggerTypes = TOOLTIP_CONSTANTS.defaults.TRIGGER_TYPES;
      }

      if (this._adapter.isConnected) {
        this._attachAnchorListeners();
      }
    }
  }
}
