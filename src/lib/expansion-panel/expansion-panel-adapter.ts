import { getShadowElement, randomChars } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { OpenIconComponent } from '../open-icon';
import { IExpansionPanelComponent } from './expansion-panel';
import { EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';

export interface IExpansionPanelAdapter extends IBaseAdapter {
  setAnimationCompleteListener(listener: () => void): void;
  addHeaderListener(type: keyof HTMLElementEventMap, listener: EventListener): void;
  addTriggerListener(type: keyof HTMLElementEventMap, listener: EventListener): void;
  tryToggleOpenIcon(value: boolean): void;
  setContentVisibility(visible: boolean): void;
  animationStart(): void;
  animationEnd(): void;
  tryLocateTriggerElement(id: string): void;
  initializeAccessibility(): void;
  updateAriaExpanded(open: boolean): void;
  detachAria(): void;
}

export class ExpansionPanelAdapter extends BaseAdapter<IExpansionPanelComponent> implements IExpansionPanelAdapter {
  private _headerElement: HTMLElement;
  private _contentElement: HTMLElement;
  private _innerElement: HTMLElement;
  private _headerSlotElement: HTMLSlotElement;
  private _defaultSlotElement: HTMLSlotElement;
  private _triggerElement: HTMLElement | null;

  private _transitionStartListener: EventListener = this._onTransitionStart.bind(this);
  private _transitionEndListener: EventListener = this._onTransitionEnd.bind(this);
  private _transitionCompleteListener: () => void;

  constructor(component: IExpansionPanelComponent) {
    super(component);
    this._headerElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.HEADER);
    this._contentElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.CONTENT);
    this._innerElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.INNER);
    this._headerSlotElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.HEADER_SLOT) as HTMLSlotElement;
    this._defaultSlotElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
  }

  public setAnimationCompleteListener(listener: () => void): void {
    this._transitionCompleteListener = listener;
    this._contentElement.addEventListener('transitionstart', this._transitionStartListener);
    this._contentElement.addEventListener('transitionend', this._transitionEndListener);
  }

  public addHeaderListener(type: keyof HTMLElementEventMap, listener: EventListener): void {
    this._headerElement.addEventListener(type, listener);
  }

  public addTriggerListener(type: keyof HTMLElementEventMap, listener: EventListener): void {
    if (this._triggerElement) {
      this._triggerElement.addEventListener(type, listener);
    }
  }

  public tryToggleOpenIcon(value: boolean): void {
    const openIconElement = this._component.querySelector<OpenIconComponent>(EXPANSION_PANEL_CONSTANTS.selectors.OPEN_ICON);
    if (openIconElement) {
      openIconElement.open = value;
    }
  }

  public setContentVisibility(visible: boolean): void {
    this._contentElement.classList.toggle(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN, !visible);
  }

  private _onTransitionStart(evt: TransitionEvent): void {
    if (evt.propertyName.startsWith('grid-template')) {
      this.toggleHostAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING, true);
    }
  }

  private _onTransitionEnd(evt: TransitionEvent): void {
    if (evt.propertyName.startsWith('grid-template')) {
      this.toggleHostAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING, false);
      this._transitionCompleteListener();
    }
  }

  public animationStart(): void {
    this._innerElement.style.overflow = 'hidden';
  }

  public animationEnd(): void {
    this._innerElement.style.removeProperty('overflow');
  }

  public tryLocateTriggerElement(id: string): void {
    this._triggerElement = this._tryFindTriggerElement(id);
  }

  public initializeAccessibility(): void {
    const slottedContent = this._defaultSlotElement.assignedElements()[0] as Element | undefined;
    if (this._triggerElement && slottedContent) {
      const contentElementId = slottedContent.getAttribute('id') ?? `forge-expansion-panel-content-${randomChars()}`;
      slottedContent.setAttribute('id', contentElementId);
      this._triggerElement.setAttribute('aria-controls', contentElementId);
    }
  }

  public updateAriaExpanded(open: boolean): void {
    if (this._triggerElement) {
      if (open) {
        this._triggerElement.setAttribute('aria-expanded', 'true');
      } else {
        this._triggerElement.setAttribute('aria-expanded', 'false');
      }
    }
  }

  public detachAria(): void {
    if (this._triggerElement) {
      this._triggerElement.removeAttribute('aria-controls');
      this._triggerElement.removeAttribute('aria-expanded');
    }
  }

  private _tryFindTriggerElement(id: string): HTMLElement | null {
    if (id) {
      const rootNode = this._component.getRootNode() as Document | ShadowRoot;
      const triggerEl = rootNode.getElementById(id);
      return triggerEl;
    } else {
      return null;
    }
  }
}
