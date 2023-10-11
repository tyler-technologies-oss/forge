import { IOverlayAwareFoundation, OverlayAwareFoundation } from '../overlay/overlay-aware-foundation';
import { OverlayLightDismissEventData } from '../overlay/overlay-constants';
import { IPopoverAdapter } from './popover-adapter';
import { PopoverAnimationType, PopoverToggleEventData, PopoverTriggerType, POPOVER_CONSTANTS } from './popover-constants';

export interface IPopoverFoundation extends IOverlayAwareFoundation {
  arrow: boolean;
  animationType: PopoverAnimationType;
  triggerType: PopoverTriggerType;
}

export class PopoverFoundation extends OverlayAwareFoundation<IPopoverAdapter> implements IPopoverFoundation {
  private _targetElement: HTMLElement;
  private _target: string | null = null;
  private _arrow = false;
  private _animationType: PopoverAnimationType = 'zoom';
  private _triggerType: PopoverTriggerType = 'click';
  private _previouslyFocusedElement: HTMLElement | null = null;

  // Hover trigger state
  private _hoverTargetLeaveTimeout: undefined | number;
  private _popoverMouseleaveTimeout: undefined | number;
  private _currentHoverCoords: undefined | { x: number; y: number };

  // Click trigger listeners
  private _targetClickListener: (evt: PointerEvent) => void;

  // Hover trigger listeners
  private _targetMouseenterListener: () => void;
  private _targetMouseleaveListener: () => void;
  private _popoverMouseleaveListener: () => void;
  private _popoverMouseenterListener: () => void;
  private _mousemoveListener: (evt: MouseEvent) => void;

  // Focus trigger listeners
  private _targetFocusListener: (evt: FocusEvent) => void;
  private _targetBlurListener: (evt: FocusEvent) => void;
  private _popoverBlurListener: (evt: FocusEvent) => void;

  constructor(adapter: IPopoverAdapter) {
    super(adapter);
    this._targetClickListener = (evt: PointerEvent) => this._onTargetClick(evt);

    this._targetMouseenterListener = () => this._onTargetMouseenter();
    this._targetMouseleaveListener = () => this._onTargetMouseleave();
    this._popoverMouseleaveListener = () => this._onPopoverMouseleave();
    this._popoverMouseenterListener = () => this._onPopoverMouseenter();
    this._mousemoveListener = (evt: MouseEvent) => this._onMousemove(evt);

    this._targetFocusListener = (evt: FocusEvent) => this._onTargetFocus(evt);
    this._targetBlurListener = (evt: FocusEvent) => this._onTargetBlur(evt);
    this._popoverBlurListener = (evt: FocusEvent) => this._onPopoverBlur(evt);
  }

  public override initialize(): void {
    super.initialize();

    if (!this._adapter.overlayElement.targetElement) {
      this._adapter.initializeTargetElement();
      this._initializeTriggerListeners();
    }
  }

  public override disconnect(): void {
    super.disconnect();
    this._removeTriggerListeners();
  }

  protected _onOverlayLightDismiss(evt: CustomEvent<OverlayLightDismissEventData>): void {
    evt.preventDefault();

    const isCancelled = this._dispatchBeforetoggleEvent({ cancelable: evt.detail.type === 'modal' });
    if (isCancelled) {
      return;
    }

    this._closePopover({ dispatchEvents: false });
    // this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.OPEN, this.open);
    this._dispatchToggleEvent();

    if (this._previouslyFocusedElement && this._adapter.hasFocus()) {
      this._previouslyFocusedElement.focus();
    }
  }

  private _openPopover({ dispatchEvents = true, fromKeyboard = false } = {}): void {
    if (dispatchEvents) {
      this._dispatchBeforetoggleEvent();
    }

    this._previouslyFocusedElement = this._adapter.captureFocusedElement();

    this._adapter.setOverlayOpen(true);
    this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.OPEN, this.open);

    // We only attempt to set initial focus if the event was triggered by a keyboard interaction
    if (fromKeyboard) {
      this._adapter.tryAutofocus();
    }

    if (dispatchEvents) {
      this._dispatchToggleEvent();
    }
  }

  private _closePopover({ dispatchEvents = true } = {}): void {
    if (this._triggerType === 'hover') {
      this._tryRemoveHoverListeners();
    }

    this._previouslyFocusedElement = null;

    if (dispatchEvents) {
      this._dispatchBeforetoggleEvent();
    }

    this._adapter.setOverlayOpen(false);
    this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.OPEN, this.open);

    if (dispatchEvents) {
      this._dispatchToggleEvent();
    }
  }

  private _dispatchBeforetoggleEvent({ cancelable = false } = {}): boolean {
    return this._adapter.dispatchHostEvent({
      type: POPOVER_CONSTANTS.events.BEFORETOGGLE,
      detail: {
        oldState: this.open ? 'open' : 'closed',
        newState: this.open ? 'closed' : 'open'
      } as PopoverToggleEventData,
      bubbles: false,
      cancelable
    });
  }

  private _dispatchToggleEvent(): void {
    this._adapter.dispatchHostEvent({
      type: POPOVER_CONSTANTS.events.TOGGLE,
      detail: {
        oldState: this.open ? 'closed' : 'open',
        newState: this.open ? 'open' : 'closed'
      } as PopoverToggleEventData,
      bubbles: false
    });
  }

  private _initializeTriggerListeners(): void {
    switch (this._triggerType) {
      case 'click':
        this._adapter.addTargetListener('click', this._targetClickListener);
        break;
      case 'hover':
        this._adapter.addTargetListener('mouseenter', this._targetMouseenterListener);

        // We also need to listen for focus events when using hover trigger
        this._adapter.addTargetListener('focusin', this._targetFocusListener);
        break;
      case 'focus':
        this._adapter.addTargetListener('focusin', this._targetFocusListener);
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

        // We also need to remove focus events when using hover trigger
        this._adapter.removeTargetListener('focusin', this._targetFocusListener);
        this._adapter.removeTargetListener('focusout', this._targetBlurListener);
        this._adapter.removeHostListener('focusout', this._popoverBlurListener);
        break;
      case 'focus':
        this._adapter.removeTargetListener('focusin', this._targetFocusListener);
        this._adapter.removeTargetListener('focusout', this._targetBlurListener);
        this._adapter.removeHostListener('focusout', this._popoverBlurListener);
        break;
    }
  }

  private _startHoverListeners(): void {
    this._adapter.addDocumentListener('mousemove', this._mousemoveListener);
    this._adapter.addSurfaceListener('mouseenter', this._popoverMouseenterListener);
    this._adapter.addSurfaceListener('mouseleave', this._popoverMouseleaveListener);
  }

  private _tryRemoveHoverListeners(): void {
    this._adapter.removeDocumentListener('mousemove', this._mousemoveListener);
    this._adapter.removeSurfaceListener('mouseenter', this._popoverMouseenterListener);
    this._adapter.removeSurfaceListener('mouseleave', this._popoverMouseleaveListener);
  }

  /**
   * Handles `click` events on the target element. This is used to determine if the popover should be opened or closed.
   * 
   * Only called when using the "click" (default) trigger type.
   */
  private _onTargetClick(evt: PointerEvent): void {
    if (!this.open) {
      const fromKeyboard = evt.detail === 0 && !evt.pointerType;
      this._openPopover({ fromKeyboard });
    } else {
      this._closePopover();
    }
  }

  /**
   * Handles `mouseenter` events on the target element. This is used to determine if the popover should be opened.
   * 
   * Only called when using the "hover" trigger type.
   */
  private _onTargetMouseenter(): void {
    window.clearTimeout(this._hoverTargetLeaveTimeout);
    if (!this._adapter.overlayElement.open) {
      this._adapter.addTargetListener('mouseleave', this._targetMouseleaveListener);
      this._openPopover();
    }
  }

  /**
   * Handles `mouseleave` events on the target element. This is used to determine if the popover should be closed.
   * 
   * Only called when using the "hover" trigger type.
   * 
   * We use a timeout here to allow for the user to take an indirect path toward the popover.
   */
  private _onTargetMouseleave(): void {
    this._startHoverListeners();

    this._hoverTargetLeaveTimeout = window.setTimeout(() => {
      this._hoverTargetLeaveTimeout = undefined;

      if (!this.open) {
        return;
      }
      if (this._currentHoverCoords) {
        const mouseElement = document.elementFromPoint(this._currentHoverCoords.x, this._currentHoverCoords.y) as HTMLElement;
        const isOwnElement = mouseElement && (this._adapter.isChildElement(mouseElement) || this._adapter.overlayElement.targetElement.contains(mouseElement));
        if (isOwnElement) {
          return;
        }
      }
      this._closePopover();
    }, 500);
  }

  /**
   * Handles `mouseenter` events on the popover element. This is used to determine if the mouse has entered the popover element, 
   * only after the mouse leaves the target element..
   */
  private _onPopoverMouseenter(): void {
    window.clearTimeout(this._hoverTargetLeaveTimeout);
    window.clearTimeout(this._popoverMouseleaveTimeout);
  }

  /**
   * Handles `mouseleave` events on the popover element. This is used to determine if the mouse has moved outside of the popover.
   * 
   * Only called when using the "hover" trigger type.
   * 
   * We use a timeout here to allow for the user to take an indirect path toward an open child menu.
   * This allows for the popup to stay open while the user is moving their mouse to it to avoid closing immediately.
   */
  private _onPopoverMouseleave(): void {
    this._popoverMouseleaveTimeout = window.setTimeout(() => {
      this._popoverMouseleaveTimeout = undefined;

      if (!this.open) {
        return;
      }

      if (this._currentHoverCoords) {
        const mouseElement = document.elementFromPoint(this._currentHoverCoords.x, this._currentHoverCoords.y) as HTMLElement;
        const isOwnElement = mouseElement && (this._adapter.isChildElement(mouseElement) || this._adapter.overlayElement.targetElement.contains(mouseElement));
        if (isOwnElement) {
          return;
        }
      }

      this._closePopover();
    }, 500);
  }

  /**
   * Handles `mousemove` events on the document. This is used to determine if the mouse has moved outside of the popover.
   * 
   * This listener is only initialized once the mouse leaves the target element.
   * 
   * Only called when using the "hover" trigger type.
   */
  private _onMousemove(evt: MouseEvent): void {
    this._currentHoverCoords = { x: evt.pageX, y: evt.pageY };
  }
  
  /**
   * Handles `focusin` events on the target element. This is used to determine if focus has been received on the target element when using the "focus" trigger type.
   */
  private _onTargetFocus(_evt: FocusEvent): void {
    if (!this._adapter.overlayElement.open) {
      this._adapter.addTargetListener('focusout', this._targetBlurListener);
      this._openPopover({ fromKeyboard: true });
    }
  }

  /**
   * Handles `focusout` events on the target element. This is used to determine if focus has been moved outside of the target element when using the "focus" trigger type.
   */
  private _onTargetBlur(evt: FocusEvent): void {
    if (!this._adapter.isChildElement(evt.relatedTarget as HTMLElement)) {
      // Focus was moved outside of the popover element, so let's assume we need to close
      this._closePopover();
    } else {
      // Focus was moved to within the popover element, now we must listen for focus to move outside of the popover
      this._adapter.addHostListener('focusout', this._popoverBlurListener);
    }
  }

  private _onPopoverBlur({ relatedTarget }: FocusEvent): void {
    const popoverHasFocus = this._adapter.hasFocus();
    const targetHasFocus = this._adapter.overlayElement.targetElement.matches(':focus-within') ||
                           this._adapter.overlayElement.targetElement.contains(relatedTarget as HTMLElement);
    if (!popoverHasFocus && !targetHasFocus) {
      this._closePopover();
    }
  }

  public override get open(): boolean {
    return this._adapter.overlayElement.open;
  }
  public override set open(value: boolean) {
    if (this._adapter.overlayElement.open !== value) {
      if (value) {
        this._openPopover({ dispatchEvents: false });
      } else {
        this._closePopover({ dispatchEvents: false });
      }
    }
  }

  public override get targetElement(): HTMLElement {
    return this._targetElement ?? this._adapter.overlayElement.targetElement;
  }
  public override set targetElement(value: HTMLElement) {
    if (this._targetElement !== value) {
      this._targetElement = value;
      if (this._adapter.isConnected) {
        this._removeTriggerListeners();
        if (this._targetElement) {
          this._adapter.initializeTargetElement();
        }
        this._initializeTriggerListeners();
      }
    }
  }

  public override get target(): string | null {
    return this._target;
  }
  public override set target(value: string | null) {
    if (this._target !== value) {
      this._target = value;
      if (this._adapter.isConnected) {
        this._removeTriggerListeners();
        this._adapter.initializeTargetElement();
        this._initializeTriggerListeners();
      }
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
