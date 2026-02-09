import { getShadowElement } from '@tylertech/forge-core';
import { replaceElement } from '../../core/utils/utils.js';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter.js';
import { IAppBarComponent } from './app-bar.js';
import { APP_BAR_CONSTANTS } from './app-bar-constants.js';
import { STATE_LAYER_CONSTANTS } from '../../state-layer/index.js';
import { FOCUS_INDICATOR_TAG_NAME } from '../../focus-indicator/index.js';

export interface IAppBarAdapter extends IBaseAdapter {
  initialize(): void;
  setTitleText(value: string): void;
  setHref(value: string, listener: EventListener): void;
  setTarget(value: string): void;
  addCenterSlotListener(listener: (evt: Event) => void): void;
  setCenterSlotVisibility(): void;
}

export class AppBarAdapter extends BaseAdapter<IAppBarComponent> implements IAppBarAdapter {
  private _rootElement: HTMLElement;
  private _titleElement: HTMLElement | undefined;
  private _logoTitleContainerElement: HTMLElement | HTMLAnchorElement;
  private _centerSectionElement: HTMLElement;
  private _centerSlotElement: HTMLSlotElement;

  constructor(component: IAppBarComponent) {
    super(component);
    this._rootElement = getShadowElement(component, APP_BAR_CONSTANTS.selectors.ROOT);
    this._logoTitleContainerElement = getShadowElement(component, APP_BAR_CONSTANTS.selectors.LOGO_TITLE_CONTAINER);
    this._centerSectionElement = getShadowElement(component, APP_BAR_CONSTANTS.selectors.CENTER_SECTION);
    this._centerSlotElement = getShadowElement(component, APP_BAR_CONSTANTS.selectors.CENTER_SLOT) as HTMLSlotElement;
  }

  public initialize(): void {
    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'banner');
    }
  }

  public setTitleText(value: string): void {
    if (value?.trim().length) {
      if (!this._titleElement) {
        this._titleElement = this._createTitleElement();
        const titleSlot = this._logoTitleContainerElement.querySelector('slot[name=title]');
        titleSlot?.append(this._titleElement);
      }
      this._titleElement.textContent = value;
    } else {
      this._titleElement?.remove();
      this._titleElement = undefined;
    }
  }

  public setHref(value: string, listener: EventListener): void {
    const isAnchor = this._logoTitleContainerElement.tagName === 'A';
    if (value) {
      if (!isAnchor) {
        this._createAnchorElement();
      }
      (this._logoTitleContainerElement as HTMLAnchorElement).href = value;
      this._logoTitleContainerElement.addEventListener('click', listener, { capture: true });
    } else if (isAnchor) {
      this._logoTitleContainerElement.removeEventListener('click', listener, { capture: true });
      this._logoTitleContainerElement = replaceElement(this._logoTitleContainerElement, document.createElement('div'));
      this._logoTitleContainerElement.classList.add(APP_BAR_CONSTANTS.classes.LOGO_TITLE_CONTAINER);
      this._logoTitleContainerElement.querySelector(STATE_LAYER_CONSTANTS.elementName)?.remove();
      this._logoTitleContainerElement.querySelector(FOCUS_INDICATOR_TAG_NAME)?.remove();
    }
  }

  public setTarget(value: string): void {
    if (this._logoTitleContainerElement.tagName === 'A') {
      (this._logoTitleContainerElement as HTMLAnchorElement).target = value;
    }
  }

  public addCenterSlotListener(listener: (evt: Event) => void): void {
    this._centerSlotElement.addEventListener('slotchange', listener);
  }

  public setCenterSlotVisibility(): void {
    if (this._centerSlotElement.assignedNodes().length) {
      this._centerSectionElement.style.removeProperty('display');
      this._rootElement.classList.remove(APP_BAR_CONSTANTS.classes.NO_CENTER);
    } else {
      this._centerSectionElement.style.display = 'none';
      this._rootElement.classList.add(APP_BAR_CONSTANTS.classes.NO_CENTER);
    }
  }

  private _createAnchorElement(): void {
    this._logoTitleContainerElement = replaceElement(this._logoTitleContainerElement, document.createElement('a'));
    this._logoTitleContainerElement.classList.add(APP_BAR_CONSTANTS.classes.LOGO_TITLE_CONTAINER);

    const stateLayer = document.createElement('forge-state-layer');
    const focusIndicator = document.createElement('forge-focus-indicator');
    focusIndicator.inward = true;

    this._logoTitleContainerElement.append(stateLayer, focusIndicator);
  }

  private _createTitleElement(): HTMLElement {
    const el = document.createElement('h1');
    el.classList.add(APP_BAR_CONSTANTS.classes.TITLE);
    el.setAttribute('part', 'title');
    return el;
  }
}
