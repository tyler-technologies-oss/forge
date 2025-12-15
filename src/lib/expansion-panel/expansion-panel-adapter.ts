import { getShadowElement, randomChars, toggleAttribute } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { OPEN_ICON_CONSTANTS, OpenIconComponent } from '../open-icon';
import { IExpansionPanelComponent } from './expansion-panel';
import { EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';

export interface IExpansionPanelAdapter extends IBaseAdapter {
  readonly triggerElement?: HTMLElement | null;
  setAnimationCompleteListener(listener: () => void): void;
  addContentSlotListener(listener: EventListener): void;
  addHeaderListener(type: keyof HTMLElementEventMap, listener: EventListener): void;
  removeTriggerListeners(options?: { reset: boolean }): void;
  addTriggerListener(type: keyof HTMLElementEventMap, listener: EventListener): void;
  tryToggleOpenIcon(value: boolean): void;
  setContentVisibility(visible: boolean): void;
  animationStart(): void;
  animationEnd(): void;
  setTriggerElementById(id: string): void;
  setTriggerElement(el?: HTMLElement | null): void;
  setContentId(): void;
  updateAriaControls(): void;
  updateAriaExpanded(open: boolean): void;
  detachTriggerAria(): void;
}

export class ExpansionPanelAdapter extends BaseAdapter<IExpansionPanelComponent> implements IExpansionPanelAdapter {
  private _headerElement: HTMLElement;
  private _contentElement: HTMLElement;
  private _innerElement: HTMLElement;
  private _defaultSlotElement: HTMLSlotElement;
  private _triggerListenerController: AbortController;
  private _triggerElement?: HTMLElement | null;

  private _transitionStartListener: EventListener = this._onTransitionStart.bind(this);
  private _transitionEndListener: EventListener = this._onTransitionEnd.bind(this);
  private _transitionCompleteListener: () => void;

  constructor(component: IExpansionPanelComponent) {
    super(component);
    this._headerElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.HEADER);
    this._contentElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.CONTENT);
    this._innerElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.INNER);
    this._defaultSlotElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
  }

  public get triggerElement(): HTMLElement | null | undefined {
    return this._triggerElement;
  }

  private get _slottedContentElement(): Element | undefined {
    return this._defaultSlotElement.assignedElements({ flatten: true })[0];
  }

  private set _slottedContentId(id: string) {
    this._slottedContentElement?.setAttribute('id', id);
  }

  private get _slottedContentId(): string {
    return this._slottedContentElement?.getAttribute('id') ?? '';
  }

  public setTriggerElementById(id: string): void {
    this._triggerElement = this._getTriggerElementById(id);
  }

  public setAnimationCompleteListener(listener: () => void): void {
    this._transitionCompleteListener = listener;
    this._contentElement.addEventListener('transitionstart', this._transitionStartListener);
    this._contentElement.addEventListener('transitionend', this._transitionEndListener);
  }

  public addContentSlotListener(listener: EventListener): void {
    this._defaultSlotElement.addEventListener('slotchange', listener);
  }

  public addHeaderListener(type: keyof HTMLElementEventMap, listener: EventListener): void {
    this._headerElement.addEventListener(type, listener);
  }

  public removeTriggerListeners(options = { reset: false }): void {
    this._triggerListenerController?.abort();
    if (options?.reset) {
      this._triggerListenerController = new AbortController();
    }
  }

  public addTriggerListener(type: keyof HTMLElementEventMap, listener: EventListener): void {
    this._triggerElement?.addEventListener(type, listener, { signal: this._triggerListenerController.signal });
  }

  public tryToggleOpenIcon(value: boolean): void {
    const openIconElements = [
      this._component.querySelector<OpenIconComponent>(EXPANSION_PANEL_CONSTANTS.selectors.OPEN_ICON),
      this._component.triggerElement?.querySelector<OpenIconComponent>(`${OPEN_ICON_CONSTANTS.elementName}`)
    ];
    for (const openIconElement of openIconElements) {
      if (openIconElement) {
        openIconElement.open = value;
      }
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

  public setTriggerElement(el: HTMLElement | null): void {
    this._triggerElement = el;
  }

  public setContentId(): void {
    if (!this._slottedContentId) {
      this._slottedContentId = `forge-expansion-panel-content-${randomChars()}`;
    }
  }

  public updateAriaControls(): void {
    if (this._triggerElement) {
      toggleAttribute(this._triggerElement, !!this._slottedContentId, 'aria-controls', this._slottedContentId);
    }
  }

  public updateAriaExpanded(open: boolean): void {
    if (this._triggerElement) {
      toggleAttribute(this._triggerElement, true, 'aria-expanded', open.toString());
    }
  }

  public detachTriggerAria(): void {
    this._triggerElement?.removeAttribute('aria-controls');
    this._triggerElement?.removeAttribute('aria-expanded');
  }

  private _getTriggerElementById(id: string): HTMLElement | null {
    if (id && this.isConnected) {
      const rootNode = this._component.getRootNode() as Document | ShadowRoot;
      return rootNode.getElementById(id);
    } else {
      return null;
    }
  }
}
