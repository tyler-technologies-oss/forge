import { frame } from '../core/index.js';
import { IOpenIconComponent } from '../open-icon/index.js';
import { IExpansionPanelAdapter } from './expansion-panel-adapter.js';
import { ExpansionPanelAnimationType, ExpansionPanelOrientation, EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants.js';

export interface IExpansionPanelCore {
  open: boolean;
  orientation: ExpansionPanelOrientation;
  animationType: ExpansionPanelAnimationType;
  trigger: string;
  triggerElement?: HTMLElement | null;
  dispatchToggleEvent(): void;
}

export class ExpansionPanelCore implements IExpansionPanelCore {
  private _open = false;
  private _orientation: ExpansionPanelOrientation = 'vertical';
  private _animationType: ExpansionPanelAnimationType = 'default';
  private _trigger = '';
  private _openIcon = '';

  private _clickListener: EventListener = this._onClick.bind(this);
  private _keydownListener: EventListener = this._onKeydown.bind(this);
  private _keyupListener: EventListener = this._onKeyup.bind(this);
  private _animationCompleteListener = this._onAnimationComplete.bind(this);
  private _slotListener = this._handleContentSlotChange.bind(this);

  constructor(private _adapter: IExpansionPanelAdapter) {}

  public async initialize(): Promise<void> {
    this._adapter.addHeaderListener('click', this._clickListener);
    this._adapter.addHeaderListener('keydown', this._keydownListener);
    this._adapter.addHeaderListener('keyup', this._keyupListener);
    this._adapter.setAnimationCompleteListener(this._animationCompleteListener);
    this._adapter.addContentSlotListener(this._slotListener);
    this._adapter.setContentId();
    await frame();
    this._syncTrigger();
    this._syncOpenIcon();
  }

  public destroy(): void {
    this._adapter.detachTriggerAria();
    this._adapter.removeTriggerListeners();
    this._adapter.setTriggerElement(undefined);
    this._adapter.setOpenIcon(undefined);
  }

  private _handleContentSlotChange(): void {
    this._adapter.setContentId();
    this._syncTrigger();
  }

  private _clearTrigger(): void {
    this._adapter.removeTriggerListeners({ reset: true });
    this._adapter.detachTriggerAria();
  }

  private _syncTrigger(): void {
    if (!this._adapter.triggerElement?.isConnected) {
      this._clearTrigger();
      if (this._trigger) {
        this._adapter.setTriggerElementById(this._trigger);
      } else {
        this._adapter.setTriggerElement(undefined);
      }
    }

    this._adapter.updateAriaControls();
    this._adapter.updateAriaExpanded(this._open);
    this._adapter.removeTriggerListeners({ reset: true });
    this._adapter.addTriggerListener('click', this._clickListener);
    this._adapter.addTriggerListener('keydown', this._keydownListener);
    this._adapter.addTriggerListener('keyup', this._keyupListener);
  }

  private _syncOpenIcon(): void {
    if (!this._adapter.openIcon?.isConnected) {
      if (this._openIcon) {
        this._adapter.setOpenIconById(this._openIcon);
      } else {
        this._adapter.setOpenIcon(undefined);
      }
    }
  }

  private _onClick(evt: MouseEvent): void {
    this._tryToggle(evt);
  }

  private _onKeydown(evt: KeyboardEvent): void {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.preventDefault();
    }
  }

  private _onKeyup(evt: KeyboardEvent): void {
    if (evt.key === ' ' || evt.key === 'Enter') {
      this._tryToggle(evt);
    }
  }

  private _tryToggle(evt: Event): void {
    if (this._canIgnoreEvent(evt)) {
      return;
    }
    evt.stopPropagation();
    this._toggle();
    this.dispatchToggleEvent();
  }

  private _canIgnoreEvent(evt: Event): boolean {
    return evt.composedPath().some((el: HTMLElement) => el.nodeType === Node.ELEMENT_NODE && el.matches(EXPANSION_PANEL_CONSTANTS.selectors.IGNORE));
  }

  private _onAnimationComplete(): void {
    if (!this._open) {
      this._adapter.setContentVisibility(false);
    } else if (this._animationType !== 'none') {
      this._adapter.animationEnd();
    }
    this._adapter.dispatchHostEvent(new CustomEvent(EXPANSION_PANEL_CONSTANTS.events.ANIMATION_COMPLETE, { detail: this._open }));
  }

  private _togglePanel(): void {
    this._adapter.toggleHostAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN, this._open);
    this._adapter.tryToggleOpenIcon(this._open);
    this._adapter.updateAriaExpanded(this._open);
    if (this._open) {
      if (this._animationType !== 'none') {
        this._adapter.animationStart();
      }
      this._adapter.setContentVisibility(true);
    }
  }

  public dispatchToggleEvent(): void {
    const evt = new CustomEvent<boolean>(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, {
      detail: this._open,
      bubbles: true,
      composed: true
    });
    this._adapter.dispatchHostEvent(evt);
  }

  private _toggle(): void {
    this.open = !this.open;
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._open = value;
      this._togglePanel();
    }
  }

  public get orientation(): ExpansionPanelOrientation {
    return this._orientation;
  }
  public set orientation(value: ExpansionPanelOrientation) {
    if (this._orientation !== value) {
      this._orientation = value;
      this._adapter.setHostAttribute(EXPANSION_PANEL_CONSTANTS.attributes.ORIENTATION, this._orientation);
    }
  }

  public get animationType(): ExpansionPanelAnimationType {
    return this._animationType;
  }
  public set animationType(value: ExpansionPanelAnimationType) {
    if (this._animationType !== value) {
      this._animationType = value;
      this._adapter.setHostAttribute(EXPANSION_PANEL_CONSTANTS.attributes.ANIMATION_TYPE, this._animationType);
    }
  }

  public get trigger(): string {
    return this._trigger;
  }
  public set trigger(value: string) {
    if (this._trigger !== value) {
      this._clearTrigger();

      this._trigger = value;

      this._adapter.setTriggerElementById(this._trigger);
      this._syncTrigger();
    }
  }

  public get triggerElement(): HTMLElement | null | undefined {
    return this._adapter.triggerElement;
  }
  public set triggerElement(el: HTMLElement | null | undefined) {
    if (this._adapter.triggerElement !== el) {
      this._clearTrigger();

      this._adapter.setTriggerElement(el);

      this._syncTrigger();
    }
  }

  public get openIcon(): string {
    return this._openIcon;
  }
  public set openIcon(value: string) {
    if (this._openIcon !== value) {
      this._openIcon = value;
      this._syncOpenIcon();
    }
  }

  public get openIconElement(): IOpenIconComponent | null | undefined {
    return this._adapter.openIcon;
  }
  public set openIconElement(openIcon: IOpenIconComponent | null | undefined) {
    if (this._adapter.openIcon !== openIcon) {
      this._adapter.setOpenIcon(openIcon);
    }
  }
}
