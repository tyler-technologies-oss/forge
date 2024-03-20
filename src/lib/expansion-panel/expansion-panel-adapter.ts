import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { OpenIconComponent } from '../open-icon';
import { IExpansionPanelComponent } from './expansion-panel';
import { EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';

export interface IExpansionPanelAdapter extends IBaseAdapter {
  setAnimationCompleteListener(listener: () => void): void;
  addHeaderListener(type: keyof HTMLElementEventMap, listener: EventListener): void;
  tryToggleOpenIcon(value: boolean): void;
  setContentVisibility(visible: boolean): void;
}

export class ExpansionPanelAdapter extends BaseAdapter<IExpansionPanelComponent> implements IExpansionPanelAdapter {
  private _headerElement: HTMLElement;
  private _contentElement: HTMLElement;

  private _transitionStartListener: EventListener = this._onTransitionStart.bind(this);
  private _transitionEndListener: EventListener = this._onTransitionEnd.bind(this);
  private _transitionCompleteListener: () => void;

  constructor(component: IExpansionPanelComponent) {
    super(component);
    this._headerElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.HEADER);
    this._contentElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.CONTENT);
  }

  public setAnimationCompleteListener(listener: () => void): void {
    this._transitionCompleteListener = listener;
    this._contentElement.addEventListener('transitionstart', this._transitionStartListener);
    this._contentElement.addEventListener('transitionend', this._transitionEndListener);
  }

  public addHeaderListener(type: keyof HTMLElementEventMap, listener: EventListener): void {
    this._headerElement.addEventListener(type, listener);
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
}
