import { elementFromHTML, getShadowElement, toggleAttribute, walkUpUntil } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { FOCUS_INDICATOR_CONSTANTS, IFocusIndicatorComponent } from '../../focus-indicator';
import { IIconButtonComponent } from '../../icon-button';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer';
import { IChipSetComponent } from '../chip-set/chip-set';
import { CHIP_SET_CONSTANTS } from '../chip-set/chip-set-constants';
import { IChipComponent } from './chip';
import { CHIP_CONSTANTS, IChipState } from './chip-constants';

import checkmarkTemplate from './chip-checkmark.html';
import { replaceElement } from '../../core/utils/utils';

export interface IChipAdapter extends IBaseAdapter {
  readonly removeButtonElement: IIconButtonComponent | undefined;
  readonly isAnchor: boolean;
  clickTrigger(): void;
  addRootListener(type: string, listener: EventListener): void;
  removeRootListener(type: string, listener: EventListener): void;
  setAnchor(value: boolean): void;
  setAnchorProperty<T extends keyof HTMLAnchorElement>(name: T, value: HTMLAnchorElement[T]): void;
  setCheckmarkVisibility(value: boolean): void;
  setDeleteButtonVisibility(value: boolean): void;
  setStartSlotVisibility(value: boolean): void;
  toggleFieldVariant(value: boolean): void;
  getChipSetState(): IChipState | null;
  setDisabled(value: boolean): void;
  setSelected(value: boolean): void;
  focusTrigger(options?: FocusOptions): void;
  tryFocusRemoveButton(): void;
  clickRemoveButton(): void;
  animateStateLayer(): void;
}

export class ChipAdapter extends BaseAdapter<IChipComponent> implements IChipAdapter {
  private _rootElement: HTMLElement;
  private _triggerElement: HTMLButtonElement | HTMLAnchorElement;
  private _removeButtonElement: IIconButtonComponent | undefined;
  private _startSlotElement: HTMLSlotElement;
  private _checkmarkElement: HTMLElement;
  private _focusIndicatorElement: IFocusIndicatorComponent;
  private _stateLayerElement: IStateLayerComponent;

  constructor(protected _component: IChipComponent) {
    super(_component);
    this._rootElement = getShadowElement(this._component, CHIP_CONSTANTS.selectors.ROOT);
    this._triggerElement = getShadowElement(this._component, CHIP_CONSTANTS.selectors.TRIGGER) as HTMLButtonElement;
    this._startSlotElement = getShadowElement(this._component, 'slot[name=start]') as HTMLSlotElement;
    this._focusIndicatorElement = getShadowElement(this._component, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(this._component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public get removeButtonElement(): IIconButtonComponent | undefined {
    return this._removeButtonElement;
  }

  public get isAnchor(): boolean {
    return this._triggerElement.localName === 'a';
  }

  public clickTrigger(): void {
    this._triggerElement.click();
  }

  public addRootListener(type: string, listener: EventListener): void {
    this._rootElement.addEventListener(type, listener);
  }

  public removeRootListener(type: string, listener: EventListener): void {
    this._rootElement.removeEventListener(type, listener);
  }

  public setAnchor(value: boolean): void {
    if (value) {
      if (this._triggerElement.localName === 'button') {
        const anchor = this._createAnchorElement();
        this._triggerElement = replaceElement(this._triggerElement, anchor);
      }
    } else {
      if (this._triggerElement.localName === 'a') {
        const button = this._createButtonElement();
        this._triggerElement = replaceElement(this._triggerElement, button);
      }
    }

    if (this._stateLayerElement.targetElement !== this._triggerElement) {
      this._stateLayerElement.targetElement = this._triggerElement;
    }
    if (this._focusIndicatorElement.targetElement !== this._triggerElement) {
      this._focusIndicatorElement.targetElement = this._triggerElement;
    }
  }

  public setAnchorProperty<T extends keyof HTMLAnchorElement>(name: T, value: HTMLAnchorElement[T]): void {
    if (!(this._triggerElement.localName === 'a')) {
      return;
    }

    if (this._triggerElement instanceof HTMLAnchorElement) {
      this._triggerElement[name] = value;
    }
  }

  public setCheckmarkVisibility(value: boolean): void {
    if (value) {
      if (!this._checkmarkElement) {
        this._checkmarkElement = elementFromHTML(checkmarkTemplate) as HTMLElement;
      }
      this._rootElement.insertBefore(this._checkmarkElement, this._rootElement.firstChild);
    } else if (this._checkmarkElement && this._checkmarkElement.isConnected) {
      this._checkmarkElement.remove();
    }
  }

  public setDisabled(value: boolean): void {
    if (this._triggerElement instanceof HTMLAnchorElement) {
      if (!this._focusIndicatorElement.isConnected) {
        this._rootElement.append(this._focusIndicatorElement);
      }
      if (!this._stateLayerElement.isConnected) {
        this._rootElement.append(this._stateLayerElement);
      }
      return;
    }

    if (this._removeButtonElement) {
      this._removeButtonElement.disabled = value;
    }

    this._triggerElement.disabled = value;
    this._triggerElement.tabIndex = value ? -1 : 0;

    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }
  }

  public setSelected(value: boolean): void {
    if (this._triggerElement instanceof HTMLAnchorElement) {
      return;
    }
    toggleAttribute(this._triggerElement, value, 'aria-pressed', String(value));
  }

  public toggleFieldVariant(value: boolean): void {
    if (value) {
      if (!this._stateLayerElement.isConnected) {
        this._rootElement.append(this._stateLayerElement);
      }
      if (this._focusIndicatorElement.targetElement !== this._triggerElement) {
        this._focusIndicatorElement.targetElement = this._triggerElement;
      }
    } else {
      this._stateLayerElement.remove();
    }
  }

  public setDeleteButtonVisibility(value: boolean): void {
    if (value) {
      if (!this._removeButtonElement) {
        this._removeButtonElement = this._createRemoveButton();
      }
      this._rootElement.appendChild(this._removeButtonElement);
    } else {
      this._removeButtonElement?.remove();
    }
  }

  public setStartSlotVisibility(value: boolean): void {
    this._startSlotElement.style.display = value ? '' : 'none';
  }

  public getChipSetState(): IChipState | null {
    let state: IChipState | null = null;
    const chipSet = walkUpUntil(this._component, node => node && node.nodeName === CHIP_SET_CONSTANTS.elementName.toUpperCase()) as IChipSetComponent;
    if (chipSet) {
      state = {
        type: chipSet.type,
        disabled: chipSet.disabled,
        dense: chipSet.dense
      };
    }
    return state;
  }

  public focusTrigger(options?: FocusOptions): void {
    this._triggerElement.focus({ preventScroll: true, ...options });
  }

  public tryFocusRemoveButton(): void {
    if (this._removeButtonElement) {
      this._removeButtonElement.focus({ preventScroll: true, focusVisible: true });
    } else {
      this.focusTrigger();
    }
  }

  public clickRemoveButton(): void {
    this._removeButtonElement?.click();
  }

  public animateStateLayer(): void {
    this._stateLayerElement.playAnimation();
  }

  private _createRemoveButton(): IIconButtonComponent {
    const buttonEl = document.createElement('forge-icon-button');
    buttonEl.density = 'small';
    buttonEl.id = 'remove-button';
    buttonEl.classList.add('remove');
    buttonEl.tabIndex = -1;
    buttonEl.setAttribute('aria-label', `Remove ${this._component.innerText}`);
    buttonEl.setAttribute('part', 'remove-button');

    const iconEl = document.createElement('forge-icon');
    iconEl.name = 'close';
    buttonEl.appendChild(iconEl);

    return buttonEl;
  }

  private _createAnchorElement(): HTMLAnchorElement {
    const anchor = document.createElement('a');
    anchor.id = 'trigger';
    anchor.setAttribute('part', 'trigger');
    anchor.classList.add('trigger');

    if (this._component.href) {
      anchor.href = this._component.href;
    }
    if (this._component.target) {
      anchor.target = this._component.target;
    }
    if (this._component.download) {
      anchor.download = this._component.download;
    }
    if (this._component.rel) {
      anchor.rel = this._component.rel;
    }

    return anchor;
  }

  private _createButtonElement(): HTMLButtonElement {
    const buttonEl = document.createElement('button');
    buttonEl.type = 'button';
    buttonEl.id = 'trigger';
    buttonEl.setAttribute('part', 'trigger');
    buttonEl.classList.add('trigger');

    if (this._component.disabled) {
      buttonEl.disabled = true;
    }
    if (this._component.selected) {
      buttonEl.setAttribute('aria-pressed', 'true');
    }

    return buttonEl;
  }
}
