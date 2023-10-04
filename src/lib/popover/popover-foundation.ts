import { OverlayToggleEventData } from '../overlay';
import { IOverlayAwareFoundation, OverlayAwareFoundation } from '../overlay/overlay-aware-foundation';
import { IPopoverAdapter } from './popover-adapter';
import { PopoverAnimationType, PopoverTriggerType, POPOVER_CONSTANTS } from './popover-constants';

export interface IPopoverFoundation extends IOverlayAwareFoundation {
  targetElement: HTMLElement;
  arrow: boolean;
  animationType: PopoverAnimationType;
  triggerType: PopoverTriggerType;
}

export class PopoverFoundation extends OverlayAwareFoundation<IPopoverAdapter> implements IPopoverFoundation {
  private _targetElement: HTMLElement;
  private _arrow = false;
  private _animationType: PopoverAnimationType = 'zoom';
  private _triggerType: PopoverTriggerType = 'click';

  private _hoverTimeout: number | undefined;

  private _targetClickListener: () => void;
  private _targetMouseenterListener: () => void;
  private _targetMouseleaveListener: () => void;
  private _targetFocusListener: () => void;
  private _targetBlurListener: (evt: FocusEvent) => void;

  constructor(adapter: IPopoverAdapter) {
    super(adapter);
    this._targetClickListener = () => this._onTargetClick();
    this._targetMouseenterListener = () => this._onTargetMouseenter();
    this._targetMouseleaveListener = () => this._onTargetMouseleave();
    this._targetFocusListener = () => this._onTargetFocus();
    this._targetBlurListener = (evt: FocusEvent) => this._onTargetBlur(evt);
  }

  public override initialize(): void {
    super.initialize();
    this._adapter.initialize(this._targetElement);
    this._initializeTriggerListeners();
  }

  public disconnect(): void {
    this._removeTriggerListeners();
  }

  protected _onToggle(evt: CustomEvent<OverlayToggleEventData>): void {
    this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.OPEN, evt.detail.open);
  }

  private _initializeTriggerListeners(): void {
    switch (this._triggerType) {
      case 'click':
        this._adapter.addTargetListener('click', this._targetClickListener);
        break;
      case 'hover':
        this._adapter.addTargetListener('mouseenter', this._targetMouseenterListener);
        this._adapter.addTargetListener('mouseleave', this._targetMouseleaveListener);
        break;
      case 'focus':
        this._adapter.addTargetListener('focusin', this._targetFocusListener);
        this._adapter.addTargetListener('focusout', this._targetBlurListener);
        break;
    }
  }

  private _removeTriggerListeners(): void {
    switch (this._triggerType) {
      case 'click':
        this._adapter.removeTargetListener('click', this._targetClickListener);
        break;
      case 'hover':
        this._adapter.removeTargetListener('mouseenter', this._targetMouseenterListener);
        this._adapter.removeTargetListener('mouseleave', this._targetMouseleaveListener);
        break;
      case 'focus':
        this._adapter.removeTargetListener('focusin', this._targetFocusListener);
        this._adapter.removeTargetListener('focusout', this._targetBlurListener);
        break;
    }
  }

  private _onTargetClick(): void {
    this._adapter.setOverlayOpen(!this._adapter.overlay.open);
  }

  private _onTargetMouseenter(): void {

  }

  private _onTargetMouseleave(): void {

  }
  
  private _onTargetFocus(): void {
    this._adapter.setOverlayOpen(true);
  }

  private _onTargetBlur(evt: FocusEvent): void {
    if (!this._adapter.isChildElement(evt.relatedTarget as HTMLElement)) {
      // Focus was moved outside of the popover element, so let's assume we need to close
      // TODO: we should dispatch events here so it can be cancelled
      this._adapter.setOverlayOpen(false);
    } else {
      // Focus was moved to within the popover element, now we must listen for focus to move outside of the popover
      this._adapter.addHostListener('focusout', (focusEvt: FocusEvent) => {
        if (!this._adapter.overlay.targetElement.contains(focusEvt.relatedTarget as HTMLElement)) {
          this._adapter.overlay.targetElement.querySelector('button')?.focus();
          // this._adapter.setOverlayOpen(false);
        }
      }, { once: true });
    }
  }

  public get open(): boolean {
    return this._adapter.overlay.open;
  }
  public set open(value: boolean) {
    this._adapter.overlay.open = value;
  }

  public get targetElement(): HTMLElement {
    return this._targetElement;
  }
  public set targetElement(value: HTMLElement) {
    this._targetElement = value;
    if (this._adapter.isConnected) {
      this._adapter.initialize(this._targetElement);
    }
  }

  public get arrow(): boolean {
    return this._arrow;
  }
  public set arrow(value: boolean) {
    value = Boolean(value);
    if (this._arrow !== value) {
      this._arrow = value;
      this._adapter.toggleArrow(value);
      this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.ARROW, value);
    }
  }

  public get animationType(): PopoverAnimationType {
    return this._animationType;
  }
  public set animationType(value: PopoverAnimationType) {
    if (this._animationType !== value) {
      this._animationType = value;
      this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.ANIMATION_TYPE, !!this._animationType, this._animationType);
    }
  }

  public get triggerType(): PopoverTriggerType {
    return this._triggerType;
  }
  public set triggerType(value: PopoverTriggerType) {
    if (this._triggerType !== value) {
      if (this._adapter.isConnected) {
        this._removeTriggerListeners();
      }

      this._triggerType = value;

      if (this._adapter.isConnected) {
        this._initializeTriggerListeners();
      }

      this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE, !!this._triggerType, this._triggerType);
    }
  }
}
