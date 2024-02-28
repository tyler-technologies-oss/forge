import { IOverlayAwareFoundation, OverlayAwareFoundation } from '../overlay/base/overlay-aware-foundation';
import { OverlayLightDismissEventData } from '../overlay/overlay-constants';
import { WithLongpressListener } from '../core/mixins/interactions/longpress/with-longpress-listener';
import { IPopoverAdapter } from './popover-adapter';
import { PopoverAnimationType, IPopoverToggleEventData, PopoverTriggerType, POPOVER_CONSTANTS, PopoverDismissReason, POPOVER_HOVER_TIMEOUT } from './popover-constants';
import { IDismissibleStackState, DismissibleStack } from '../core/utils/dismissible-stack';
import { VirtualElement } from '../core/utils/position-utils';

export interface IPopoverFoundation extends IOverlayAwareFoundation {
  arrow: boolean;
  animationType: PopoverAnimationType;
  triggerType: PopoverTriggerType | PopoverTriggerType[];
  longpressDelay: number;
  persistentHover: boolean;
  hoverDismissDelay: number;
  hoverDelay: number;
  dispatchBeforeToggleEvent(state: IDismissibleStackState): boolean;
}

const BaseClass = WithLongpressListener(OverlayAwareFoundation<IPopoverAdapter>);

export class PopoverFoundation extends BaseClass implements IPopoverFoundation {
  private _anchor: string | null = null;
  private _arrow = false;
  private _animationType: PopoverAnimationType = 'zoom';
  private _triggerTypes: PopoverTriggerType[] = [POPOVER_CONSTANTS.defaults.TRIGGER_TYPE];
  private _persistentHover = false;
  private _hoverDismissDelay = POPOVER_HOVER_TIMEOUT;
  private _hoverDelay = POPOVER_CONSTANTS.defaults.HOVER_DELAY;
  private _previouslyFocusedElement: HTMLElement | null = null;

  // Hover trigger state
  private _hoverAnchorLeaveTimeout: undefined | number;
  private _popoverMouseleaveTimeout: undefined | number;
  private _currentHoverCoords: undefined | { x: number; y: number };
  private _hoverTimeout: number | undefined;

  // Click trigger listeners
  private _anchorClickListener = this._onAnchorClick.bind(this);

  // Double click trigger listeners
  private _anchorDoubleClickListener = this._onAnchorDoubleClick.bind(this);

  // Hover trigger listeners
  private _anchorMouseenterListener = this._onAnchorMouseenter.bind(this);
  private _anchorMouseleaveListener = this._onAnchorMouseleave.bind(this);
  private _popoverMouseenterListener = this._onPopoverMouseenter.bind(this);
  private _popoverMouseleaveListener = this._onPopoverMouseleave.bind(this);
  private _mousemoveListener = this._onMousemove.bind(this);

  // Focus trigger listeners
  private _anchorFocusListener = this._onAnchorFocus.bind(this);
  private _anchorBlurListener = this._onAnchorBlur.bind(this);
  private _popoverBlurListener = this._onPopoverBlur.bind(this);

  // Contextmenu listener
  private _contextmenuListener = this._onContextmenu.bind(this);

  constructor(adapter: IPopoverAdapter) {
    super(adapter);
  }

  public override initialize(): void {
    super.initialize();

    if (!this.anchorElement) {
      this._adapter.tryLocateAnchorElement(this._anchor);
    }

    this._initializeTriggerListeners();
  }

  public override destroy(): void {
    super.destroy();
    this._previouslyFocusedElement = null;

    if (this.open) {
      this._closePopover();
    }

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

    this._closePopover();
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

    if (!this.overlayElement.persistent) {
      DismissibleStack.instance.add(this._adapter.hostElement);
    }

    this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.OPEN, this.open);

    // We only attempt to set initial focus if the event was triggered by a keyboard interaction
    if (fromKeyboard) {
      this._adapter.tryAutofocus();
    }

    if (dispatchEvents) {
      this._dispatchToggleEvent();
    }
  }

  private _closePopover(): void {
    this._previouslyFocusedElement = null;
    this._adapter.setOverlayOpen(false);
    DismissibleStack.instance.remove(this._adapter.hostElement);
    this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.OPEN, this.open);
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
    if (this._triggerTypes.includes('manual')) {
      return;
    }

    let types = [...this._triggerTypes];

    // When contextmenu is used, we ignore all other trigger types
    if (types.includes('contextmenu')) {
      types = ['contextmenu'];
    } else {
      // Hover triggers already listen to focus by default
      if (types.includes('hover') && types.includes('focus')) {
        types.splice(types.indexOf('focus'), 1);
      }

      // We don't support both click and doubleclick together; click takes precedence
      if (types.includes('click') && types.includes('doubleclick')) {
        types.splice(types.indexOf('doubleclick'), 1);
      }
    }

    const triggerInitializers: Record<Exclude<PopoverTriggerType, 'manual'>, () => void> = {
      click: () => this._adapter.addAnchorListener('click', this._anchorClickListener),
      hover: () => {
        this._adapter.addAnchorListener('mouseenter', this._anchorMouseenterListener);
        this._adapter.addAnchorListener('focusin', this._anchorFocusListener);
      },
      focus: () => this._adapter.addAnchorListener('focusin', this._anchorFocusListener),
      longpress: () => {
        if (this._adapter.overlayElement.anchorElement && !(this._adapter.overlayElement.anchorElement instanceof VirtualElement)) {
          this._startLongpressListener(this._adapter.overlayElement.anchorElement);
        }
      },
      doubleclick: () => this._adapter.addAnchorListener('dblclick', this._anchorDoubleClickListener),
      contextmenu: () => this._adapter.addDocumentListener('contextmenu', this._contextmenuListener)
    };

    types.forEach(triggerType => triggerInitializers[triggerType]?.());
  }

  private _removeTriggerListeners(): void {
    const triggerRemovers: Record<Exclude<PopoverTriggerType, 'manual'>, () => void> = {
      click: () => this._adapter.removeAnchorListener('click', this._anchorClickListener),
      hover: () => {
        this._adapter.removeAnchorListener('mouseenter', this._anchorMouseenterListener);
        this._adapter.removeAnchorListener('mouseleave', this._anchorMouseleaveListener);
        this._adapter.removeAnchorListener('focusin', this._anchorFocusListener);
        this._adapter.removeAnchorListener('focusout', this._anchorBlurListener);
        this._adapter.removeHostListener('focusout', this._popoverBlurListener);
        this._tryRemoveHoverListeners();
      },
      focus: () => {
        this._adapter.removeAnchorListener('focusin', this._anchorFocusListener);
        this._adapter.removeAnchorListener('focusout', this._anchorBlurListener);
        this._adapter.removeHostListener('focusout', this._popoverBlurListener);
      },
      longpress: () => {
        if (this._adapter.overlayElement.anchorElement && !(this._adapter.overlayElement.anchorElement instanceof VirtualElement)) {
          this._stopLongpressListener(this._adapter.overlayElement.anchorElement);
        }
      },
      doubleclick: () => this._adapter.removeAnchorListener('dblclick', this._anchorDoubleClickListener),
      contextmenu: () => this._adapter.removeDocumentListener('contextmenu', this._contextmenuListener)
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

  private _onHoverClose(): void {
    /* c8 ignore next 3 */
    if (!this.open) {
      return;
    }
    
    if (this._currentHoverCoords) {
      const mouseElement = document.elementFromPoint(this._currentHoverCoords.x, this._currentHoverCoords.y) as HTMLElement;
      const isOwnElement = mouseElement &&
                           (this._adapter.isChildElement(mouseElement) ||
                           (!(this._adapter.overlayElement.anchorElement instanceof VirtualElement) && this._adapter.overlayElement.anchorElement?.contains(mouseElement)));
      /* c8 ignore next 3 */
      if (isOwnElement) {
        return;
      }
    }
    window.clearTimeout(this._hoverTimeout);
    this._tryRemoveHoverListeners();
    this._requestClose('hover');
  }

  /**
   * Handles `click` events on the anchor element.
   * 
   * Only called when using the "click" (default) trigger type.
   */
  private _onAnchorClick(evt: PointerEvent): void {
    if (!this.open) {
      const fromKeyboard = evt.detail === 0 && !evt.pointerType;
      this._openPopover({ fromKeyboard });
    } else {
      this._requestClose('click');
    }
  }

  /**
   * Handles `dblclick` events on the anchor element.
   */
  private _onAnchorDoubleClick(): void {
    if (!this.open) {
      this._openPopover();
    } else {
      this._requestClose('doubleclick');
    }
  }

  /**
   * Handles `mouseenter` events on the anchor element. This is used to determine if the popover should be opened.
   * 
   * Only called when using the "hover" trigger type.
   */
  private _onAnchorMouseenter(): void {
    window.clearTimeout(this._hoverAnchorLeaveTimeout);
    if (!this._adapter.overlayElement.open) {
      if (!this._persistentHover) {
        this._adapter.addAnchorListener('mouseleave', this._anchorMouseleaveListener);
      }
      if (this._hoverDelay) {
        this._hoverTimeout = window.setTimeout(() => {
        this._openPopover();
       }, this._hoverDelay);
      } else {
        this._openPopover();
      }
    }
  }

  /**
   * Handles `mouseleave` events on the anchor element. This is used to determine if the popover should be closed.
   * 
   * Only called when using the "hover" trigger type.
   * 
   * We use a timeout here to allow for the user to take an indirect path toward the popover.
   */
  private _onAnchorMouseleave(): void {
    this._startHoverListeners();
    window.clearTimeout(this._hoverTimeout);

    this._hoverAnchorLeaveTimeout = window.setTimeout(() => {
      this._hoverAnchorLeaveTimeout = undefined;
      this._onHoverClose();
    }, this._hoverDismissDelay);
  }

  /**
   * Handles `mouseenter` events on the popover element. This is used to determine if the mouse has entered the popover element, 
   * only after the mouse leaves the anchor element..
   */
  private _onPopoverMouseenter(): void {
    window.clearTimeout(this._hoverAnchorLeaveTimeout);
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
      this._onHoverClose();
    }, this._hoverDismissDelay);
  }

  /**
   * Handles `mousemove` events on the document. This is used to determine if the mouse has moved outside of the popover.
   * 
   * This listener is only initialized once the mouse leaves the anchor element.
   * 
   * Only called when using the "hover" trigger type.
   */
  private _onMousemove(evt: MouseEvent): void {
    this._currentHoverCoords = { x: evt.pageX, y: evt.pageY };
  }
  
  /**
   * Handles `focusin` events on the anchor element. This is used to determine if focus has been received on the anchor element when using the "focus" trigger type.
   */
  private _onAnchorFocus(_evt: FocusEvent): void {
    if (!this._adapter.overlayElement.open) {
      this._adapter.addAnchorListener('focusout', this._anchorBlurListener);
      this._openPopover({ fromKeyboard: true });
    }
  }

  /**
   * Handles `focusout` events on the anchor element. This is used to determine if focus has been moved outside of the anchor element when using the "focus" trigger type.
   */
  private _onAnchorBlur(evt: FocusEvent): void {
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
    const anchorHasFocus = !(this._adapter.overlayElement.anchorElement instanceof VirtualElement) &&
                           (this._adapter.overlayElement.anchorElement?.matches(':focus-within') ||
                            this._adapter.overlayElement.anchorElement?.contains(relatedTarget as HTMLElement));
    if (!popoverHasFocus && !anchorHasFocus) {
      this._requestClose('focus');
    }
  }

  protected _onLongpress(): void {
    if (!this.open) {
      this._openPopover();
    }
  }

  private _onContextmenu(evt: MouseEvent): void {
    evt.preventDefault();
    this.anchorElement = VirtualElement.fromEvent(evt);
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
        this._closePopover();
      }
    }
  }

  public override get anchorElement(): HTMLElement | VirtualElement | null {
    return this._adapter.overlayElement.anchorElement;
  }
  public override set anchorElement(value: HTMLElement | VirtualElement | null) {
    if (this._adapter.overlayElement.anchorElement !== value) {
      if (this._adapter.isConnected) {
        this._removeTriggerListeners();
      }

      this._adapter.overlayElement.anchorElement = value;

      if (this._adapter.isConnected) {
        this._initializeTriggerListeners();
      }
    }
  }

  public override get anchor(): string | null {
    return this._anchor;
  }
  public override set anchor(value: string | null) {
    if (this._anchor !== value) {
      this._anchor = value;
      
      if (this._adapter.isConnected) {
        this._removeTriggerListeners();
        this._adapter.tryLocateAnchorElement(this._anchor);
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
      this._triggerTypes = this._triggerTypes.filter(type => !!type);

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

  public get persistentHover(): boolean {
    return this._persistentHover;
  }
  public set persistentHover(value: boolean) {
    value = Boolean(value);
    if (this._persistentHover !== value) {
      this._persistentHover = value;

      if (this._persistentHover && this._triggerTypes.includes('hover') && this._adapter.isConnected) {
        this._removeTriggerListeners();
        this._initializeTriggerListeners();
      }

      this._adapter.toggleHostAttribute(POPOVER_CONSTANTS.attributes.PERSISTENT_HOVER, value);
    }
  }

  public get hoverDelay(): number {
    return this._hoverDelay;
  }
  public set hoverDelay(value: number) {
    if (this._hoverDelay !== value) {
      this._hoverDelay = value;
      this._adapter.setHostAttribute(POPOVER_CONSTANTS.attributes.HOVER_DELAY, String(this._hoverDelay));
    }
  }

  public get hoverDismissDelay(): number {
    return this._hoverDismissDelay;
  }
  public set hoverDismissDelay(value: number) {
    if (this._hoverDismissDelay !== value) {
      this._hoverDismissDelay = value;
      this._adapter.setHostAttribute(POPOVER_CONSTANTS.attributes.HOVER_DISMISS_DELAY, String(this._hoverDismissDelay));
    }
  }
}
