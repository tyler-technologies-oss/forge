import { frame } from '../core';
import { IExpansionPanelAdapter } from './expansion-panel-adapter';
import { ExpansionPanelAnimationType, ExpansionPanelOrientation, EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';

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

  private _clickListener: EventListener = this._onClick.bind(this);
  private _keydownListener: EventListener = this._onKeydown.bind(this);
  private _animationCompleteListener = this._onAnimationComplete.bind(this);
  private _slotListener = this._handleContentSlotChange.bind(this);

  constructor(private _adapter: IExpansionPanelAdapter) {}

  public async initialize(): Promise<void> {
    this._adapter.addHeaderListener('click', this._clickListener);
    this._adapter.addHeaderListener('keydown', this._keydownListener);
    this._adapter.setAnimationCompleteListener(this._animationCompleteListener);
    this._adapter.addContentSlotListener(this._slotListener);
    this._adapter.setContentId();
    await frame();
    this._syncTrigger();
  }

  public destroy(): void {
    this._adapter.detachTriggerAria();
    this._adapter.removeTriggerListeners();
    this._adapter.setTriggerElement(undefined);
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
  }

  private _onClick(evt: MouseEvent): void {
    const fromIgnoredEl = evt
      .composedPath()
      .find((el: HTMLElement) => el.nodeType === Node.ELEMENT_NODE && el.matches(EXPANSION_PANEL_CONSTANTS.selectors.IGNORE));
    if (fromIgnoredEl) {
      return;
    }

    evt.stopPropagation();
    this._toggle();
    this.dispatchToggleEvent();
  }

  private _onKeydown(evt: KeyboardEvent): void {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.stopPropagation();
      evt.preventDefault();
      this._toggle();
      this.dispatchToggleEvent();
    }
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

      if (this._adapter.isConnected) {
        this._adapter.setTriggerElementById(this._trigger);
        this._syncTrigger();
      }
    }
  }

  public get triggerElement(): HTMLElement | null | undefined {
    return this._adapter.triggerElement;
  }
  public set triggerElement(el: HTMLElement | null | undefined) {
    if (this._adapter.triggerElement !== el) {
      this._clearTrigger();

      this._adapter.setTriggerElement(el);

      if (this._adapter.isConnected) {
        this._syncTrigger();
      }
    }
  }
}
