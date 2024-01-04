import { IOverlayAwareFoundation, OverlayAwareFoundation } from '../overlay/base/overlay-aware-foundation';
import { OverlayLightDismissEventData } from '../overlay/overlay-constants';
import { WithLongpressListener } from '../core/mixins/interactions/longpress/with-longpress-listener';
import { IPopoverAdapter } from './popover-adapter';
import { PopoverAnimationType, IPopoverToggleEventData, PopoverTriggerType, POPOVER_CONSTANTS, PopoverDismissReason } from './popover-constants';
import { IDismissibleStackState, DismissibleStack } from '../core/utils/dismissible-stack';

export interface IPopoverFoundation extends IOverlayAwareFoundation {
  arrow: boolean;
  animationType: PopoverAnimationType;
  triggerType: PopoverTriggerType | PopoverTriggerType[];
  longpressDelay: number;
  dispatchBeforeToggleEvent(state: IDismissibleStackState): boolean;
}

export class PopoverFoundation extends WithLongpressListener(OverlayAwareFoundation<IPopoverAdapter>) implements IPopoverFoundation {
  private _targetElement: HTMLElement;
  private _target: string | null = null;
  private _arrow = false;
  private _animationType: PopoverAnimationType = 'zoom';
  private _triggerTypes: PopoverTriggerType[] = [POPOVER_CONSTANTS.defaults.TRIGGER_TYPE];
  private _previouslyFocusedElement: HTMLElement | null = null;

  // Hover trigger state
  private _hoverTargetLeaveTimeout: undefined | number;
  private _popoverMouseleaveTimeout: undefined | number;
  private _currentHoverCoords: undefined | { x: number; y: number };

  // Click trigger listeners
  private _targetClickListener = this._onTargetClick.bind(this);

  // Double click trigger listeners
  private _targetDoubleClickListener = this._onTargetDoubleClick.bind(this);

  // Hover trigger listeners
  private _targetMouseenterListener = this._onTargetMouseenter.bind(this);
  private _targetMouseleaveListener = this._onTargetMouseleave.bind(this);
  private _popoverMouseenterListener = this._onPopoverMouseenter.bind(this);
  private _popoverMouseleaveListener = this._onPopoverMouseleave.bind(this);
  private _mousemoveListener = this._onMousemove.bind(this);

  // Focus trigger listeners
  private _targetFocusListener = this._onTargetFocus.bind(this);
  private _targetBlurListener = this._onTargetBlur.bind(this);
  private _popoverBlurListener = this._onPopoverBlur.bind(this);

  constructor(adapter: IPopoverAdapter) {
    super(adapter);
  }

  public override initialize(): void {
    super.initialize();

    if (!this._adapter.overlayElement.anchorElement) {
      this._adapter.initializeTargetElement();
      this._initializeTriggerListeners();
    }
  }

  public override destroy(): void {
    super.destroy();
    this._requestClose('destroy');
    this._previouslyFocusedElement = null;
    this._removeTriggerListeners();
  }

  protected async _onOverlayLightDismiss(evt: CustomEvent<OverlayLightDismissEventData>): Promise<void> {
    evt.preventDefault();
    this._requestDismiss(evt.detail.reason);
  }

  public dispatchBeforeToggleEvent({ reason }: IDismissibleStackState): boolean {
    const evt = this._dispatchBeforetoggleEvent();

    if (evt.defaultPrevented) {
      return false;
    }

    const previousFocusedEl = this._previouslyFocusedElement;

    this._closePopover({ dispatchEvents: false });
    this._dispatchToggleEvent();

    if (reason === 'escape' && previousFocusedEl && this._adapter.hasFocus()) {
      previousFocusedEl.focus();
    }

    return true;
  }

  private _openPopover({ dispatchEvents = true, fromKeyboard = false } = {}): void {
    if (dispatchEvents) {
      const evt = this._dispatchBeforetoggleEvent();
      if (evt.defaultPrevented) {
        return;
      }
    }

    this._previouslyFocusedElement = this._adapter.captureFocusedElement();
    this._adapter.setOverlayOpen(true);
    DismissibleStack.instance.add(this._adapter.hostElement);
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
    if (this._triggerTypes.includes('hover')) {
      this._tryRemoveHoverListeners();
    }

    if (dispatchEvents) {
      const evt = this._dispatchBeforetoggleEvent();
      if (evt.defaultPrevented) {
        return;
      }
    }

    this._previouslyFocusedElement = null;
    this._adapter.setOverlayOpen(false);
    DismissibleStack.instance.remove(this._adapter.hostElement);
    this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.OPEN, this.open);

    if (dispatchEvents) {
      this._dispatchToggleEvent();
    }
  }

  private _dispatchBeforetoggleEvent(): CustomEvent<IPopoverToggleEventData> {
    const evt = new CustomEvent<IPopoverToggleEventData>(POPOVER_CONSTANTS.events.BEFORETOGGLE, {
      detail: {
        oldState: this.open ? 'open' : 'closed',
        newState: this.open ? 'closed' : 'open'
      },
      bubbles: false,
      cancelable: true
    });
    this._adapter.dispatchHostEvent(evt);
    return evt;
  }

  private _dispatchToggleEvent(): void {
    this._adapter.dispatchHostEvent(new CustomEvent<IPopoverToggleEventData>(POPOVER_CONSTANTS.events.TOGGLE, {
      detail: {
        oldState: this.open ? 'closed' : 'open',
        newState: this.open ? 'open' : 'closed'
      },
      bubbles: false
    }));
  }

  private _initializeTriggerListeners(): void {
    const types = [...this._triggerTypes];

    // Hover triggers already listen to focus by default
    if (types.includes('hover') && types.includes('focus')) {
      types.splice(types.indexOf('focus'), 1);
    }

    // We don't support both click and doubleclick together; click takes precedence
    if (types.includes('click') && types.includes('doubleclick')) {
      types.splice(types.indexOf('doubleclick'), 1);
    }

    const triggerInitializers = {
      click: () => this._adapter.addTargetListener('click', this._targetClickListener),
      hover: () => {
        this._adapter.addTargetListener('mouseenter', this._targetMouseenterListener);
        this._adapter.addTargetListener('focusin', this._targetFocusListener);
      },
      focus: () => this._adapter.addTargetListener('focusin', this._targetFocusListener),
      longpress: () => this._startLongpressListener(this._adapter.overlayElement.anchorElement),
      doubleclick: () => this._adapter.addTargetListener('dblclick', this._targetDoubleClickListener)
    };

    types.forEach(triggerType => triggerInitializers[triggerType]?.());
  }

  private _removeTriggerListeners(): void {
    const triggerRemovers = {
      click: () => this._adapter.removeTargetListener('click', this._targetClickListener),
      hover: () => {
        this._adapter.removeTargetListener('mouseenter', this._targetMouseenterListener);
        this._adapter.removeTargetListener('mouseleave', this._targetMouseleaveListener);
        this._adapter.removeTargetListener('focusin', this._targetFocusListener);
        this._adapter.removeTargetListener('focusout', this._targetBlurListener);
        this._adapter.removeHostListener('focusout', this._popoverBlurListener);
      },
      focus: () => {
        this._adapter.removeTargetListener('focusin', this._targetFocusListener);
        this._adapter.removeTargetListener('focusout', this._targetBlurListener);
        this._adapter.removeHostListener('focusout', this._popoverBlurListener);
      },
      longpress: () => this._stopLongpressListener(this._adapter.overlayElement.anchorElement),
      doubleclick: () => this._adapter.removeTargetListener('dblclick', this._targetDoubleClickListener)
    };
    this._triggerTypes.forEach(triggerType => triggerRemovers[triggerType]?.());
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

  private _requestDismiss(reason: PopoverDismissReason): void {
    DismissibleStack.instance.requestDismiss(this._adapter.hostElement, { reason });
  }
  
  private _requestClose(reason: PopoverDismissReason): void {
    DismissibleStack.instance.dismiss(this._adapter.hostElement, { reason });
  }

  /**
   * Handles `click` events on the target element.
   * 
   * Only called when using the "click" (default) trigger type.
   */
  private _onTargetClick(evt: PointerEvent): void {
    if (!this.open) {
      const fromKeyboard = evt.detail === 0 && !evt.pointerType;
      this._openPopover({ fromKeyboard });
    } else {
      this._requestClose('click');
    }
  }

  /**
   * Handles `dblclick` events on the target element.
   */
  private _onTargetDoubleClick(): void {
    if (!this.open) {
      this._openPopover();
    } else {
      this._requestClose('doubleclick');
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
        const isOwnElement = mouseElement && (this._adapter.isChildElement(mouseElement) || this._adapter.overlayElement.anchorElement.contains(mouseElement));
        if (isOwnElement) {
          return;
        }
      }
      this._requestClose('hover');
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
        const isOwnElement = mouseElement && (this._adapter.isChildElement(mouseElement) || this._adapter.overlayElement.anchorElement.contains(mouseElement));
        if (isOwnElement) {
          return;
        }
      }

      this._requestClose('hover');
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
      this._requestClose('focus');
    } else {
      // Focus was moved to within the popover element, now we must listen for focus to move outside of the popover
      this._adapter.addHostListener('focusout', this._popoverBlurListener);
    }
  }

  private _onPopoverBlur({ relatedTarget }: FocusEvent): void {
    const popoverHasFocus = this._adapter.hasFocus();
    const targetHasFocus = this._adapter.overlayElement.anchorElement.matches(':focus-within') ||
                           this._adapter.overlayElement.anchorElement.contains(relatedTarget as HTMLElement);
    if (!popoverHasFocus && !targetHasFocus) {
      this._requestClose('focus');
    }
  }

  protected _onLongpress(): void {
    if (!this.open) {
      this._openPopover();
    }
  }

  /**
   * Public API
   */

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

  public override get anchorElement(): HTMLElement {
    return this._targetElement ?? this._adapter.overlayElement.anchorElement;
  }
  public override set anchorElement(value: HTMLElement) {
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

  public override get anchor(): string | null {
    return this._target;
  }
  public override set anchor(value: string | null) {
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

  public get triggerType(): PopoverTriggerType | PopoverTriggerType[] {
    return this._triggerTypes.length === 1 ? this._triggerTypes[0] : this._triggerTypes;
  }
  public set triggerType(value: PopoverTriggerType | PopoverTriggerType[]) {
    if (this._triggerTypes !== value) {
      if (this._adapter.isConnected) {
        this._removeTriggerListeners();
      }

      this._triggerTypes = Array.isArray(value) ? value : [value];

      if (!this._triggerTypes.length) {
        this._triggerTypes = [POPOVER_CONSTANTS.defaults.TRIGGER_TYPE];
      }

      if (this._adapter.isConnected) {
        this._initializeTriggerListeners();
      }
    }
  }

  public get longpressDelay(): number {
    return this._longpressDelay;
  }
  public set longpressDelay(value: number) {
    if (this._longpressDelay !== value) {
      this._longpressDelay = value;
      this._adapter.setHostAttribute(POPOVER_CONSTANTS.attributes.LONGPRESS_DELAY, String(this._longpressDelay));
    }
  }
}
