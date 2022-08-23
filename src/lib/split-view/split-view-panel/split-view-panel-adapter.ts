import { getShadowElement, playKeyframeAnimation, toggleAttribute } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { getCursor, getHandleIcon, getSplitViewPanelSibling } from '../core/split-view-core-utils';
import { ISplitViewPanelComponent } from './split-view-panel';
import { SplitViewPanelPosition, SPLIT_VIEW_PANEL_CONSTANTS } from './split-view-panel-constants';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from '../split-view/split-view-constants';
import { ISplitViewComponent } from '../split-view/split-view';
import { IIconComponent } from '../../icon';

export interface ISplitViewPanelAdapter extends IBaseAdapter {
  initialize(): void;
  setPointerdownListener(listener: (evt: PointerEvent) => void): void;
  removePointerdownListener(listener: (evt: PointerEvent) => void): void;
  setPointerupListener(listener: (evt: PointerEvent) => void): void;
  removePointerupListener(listener: (evt: PointerEvent) => void): void;
  setPointermoveListener(listener: (evt: PointerEvent) => void): void;
  removePointermoveListener(listener: (evt: PointerEvent) => void): void;
  setKeydownListener(listener: (evt: KeyboardEvent) => void): void;
  removeKeydownListener(listener: (evt: KeyboardEvent) => void): void;
  setKeyupListener(listener: (evt: KeyboardEvent) => void): void;
  removeKeyupListener(listener: (evt: KeyboardEvent) => void): void;
  getParentProperty(name: string): unknown;
  setLabel(value: string): void;
  setDisabled(value: boolean): void;
  setPosition(value: SplitViewPanelPosition): void;
  setOrientation(value: SplitViewOrientation): void;
  setOpen(value: boolean): void;
  setGrabbed(value: boolean, orientation: SplitViewOrientation): void;
  getContentSize(orientation: SplitViewOrientation): number;
  setContentSize(value: number): void;
  setValue(value: number): void;
  getAvailableSpace(orientation: SplitViewOrientation, position: SplitViewPanelPosition): number;
  getSiblingContentSize(): number;
  setSiblingContentSize(value: number): void;
}

export class SplitViewPanelAdapter extends BaseAdapter<ISplitViewPanelComponent> implements ISplitViewPanelAdapter {
  private _root: HTMLElement;
  private _handle: HTMLElement;
  private _icon: IIconComponent;
  private _content: HTMLElement;
  private _parent?: ISplitViewComponent;

  constructor(component: ISplitViewPanelComponent) {
    super(component);
    this._root = getShadowElement(component, SPLIT_VIEW_PANEL_CONSTANTS.selectors.ROOT);
    this._handle = getShadowElement(component, SPLIT_VIEW_PANEL_CONSTANTS.selectors.HANDLE);
    this._icon = getShadowElement(component, SPLIT_VIEW_PANEL_CONSTANTS.selectors.ICON) as IIconComponent;
    this._content = getShadowElement(component, SPLIT_VIEW_PANEL_CONSTANTS.selectors.CONTENT);
  }

  public initialize(): void {
    // Set the parent split view
    const parent = this._component.parentElement;
    if (parent?.tagName.toLowerCase() === SPLIT_VIEW_CONSTANTS.elementName) {
      this._parent = parent as ISplitViewComponent;
    }
  }

  public setPointerdownListener(listener: (evt: PointerEvent) => void): void {
    this._handle?.addEventListener('pointerdown', listener);
  }

  public removePointerdownListener(listener: (evt: PointerEvent) => void): void {
    this._handle?.removeEventListener('pointerdown', listener);
  }

  public setPointerupListener(listener: (evt: PointerEvent) => void): void {
    document.addEventListener('pointerup', listener);
  }

  public removePointerupListener(listener: (evt: PointerEvent) => void): void {
    document.removeEventListener('pointerup', listener);
  }

  public setPointermoveListener(listener: (evt: PointerEvent) => void): void {
    document.addEventListener('pointermove', listener);
  }

  public removePointermoveListener(listener: (evt: PointerEvent) => void): void {
    document.removeEventListener('pointermove', listener);
  }

  public setKeydownListener(listener: (evt: KeyboardEvent) => void): void {
    this._handle?.addEventListener('keydown', listener);
  }

  public removeKeydownListener(listener: (evt: KeyboardEvent) => void): void {
    this._handle?.removeEventListener('keydown', listener);
  }

  public setKeyupListener(listener: (evt: KeyboardEvent) => void): void {
    this._handle?.addEventListener('keyup', listener);
  }

  public removeKeyupListener(listener: (evt: KeyboardEvent) => void): void {
    this._handle?.removeEventListener('keyup', listener);
  }

  public getParentProperty(name: string): unknown {
    return this._parent?.[name];
  }

  public setLabel(value: string): void {
    this._handle?.setAttribute('aria-label', value);
  }

  public setDisabled(value: boolean): void {
    this._root.classList.toggle(SPLIT_VIEW_PANEL_CONSTANTS.classes.DISABLED, value);
    if (this._handle) {
      this._handle.setAttribute('tabindex', value ? '-1' : '0');
      toggleAttribute(this._handle, value, 'aria-disabled', 'true');
    }
  }

  public setPosition(value: SplitViewPanelPosition): void {
    this._root.setAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.POSITION, value.toString());
    toggleAttribute(this._handle, value !== 'default', 'aria-valuemin', '0');
    toggleAttribute(this._handle, value !== 'default', 'aria-valuemax', '100');

    if (value === 'default') {
      return;
    }

    this._handle?.remove();
    if (value === 'start') {
      // Place the handle after the content
      this._root?.append(this._handle);
    } else {
      // Place the handle before the content
      this._root?.prepend(this._handle);
    }
  }

  public setOrientation(value: SplitViewOrientation): void {
    this._root.setAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.ORIENTATION, value);
    // The divider's orientation is perpendicular to the layout of the component
    this._handle?.setAttribute('aria-orientation', value === 'horizontal' ? 'vertical' : 'horizontal');
    this._icon?.setAttribute('name', getHandleIcon(value));
  }

  public setOpen(value: boolean): void {
    if (value && this._root.classList.contains(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED)) {
      this._parent?.layerSlottedPanels(this._component);
      this._root.classList.remove(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED);
      playKeyframeAnimation(this._root, SPLIT_VIEW_PANEL_CONSTANTS.classes.OPENING, true).then(() => {
        this._parent?.unlayerSlottedPanels();
        this.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_OPEN);
      });
    } else if (!value && !this._root.classList.contains(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED)) {
      this._parent?.layerSlottedPanels(this._component);
      playKeyframeAnimation(this._root, SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSING, true).then(() => {
        this._parent?.unlayerSlottedPanels();
        this._root.classList.add(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED);
        this.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_CLOSE);
      });
    }
  }

  public setGrabbed(value: boolean, orientation: SplitViewOrientation): void {
    this._root.classList.toggle(SPLIT_VIEW_PANEL_CONSTANTS.classes.GRABBED, value);
    this._handle.setAttribute('aria-grabbed', value.toString());

    if (value) {
      document.body.style.setProperty('cursor', getCursor(orientation));
    } else {
      document.body.style.removeProperty('cursor');
    }
  }

  public getContentSize(orientation: SplitViewOrientation): number {
    return orientation === 'horizontal' ? this._content?.clientWidth ?? 0 : this._content?.clientHeight ?? 0;
  }

  public setContentSize(value: number): void {
    this._component.style.setProperty('--forge-split-view-panel-size', `${value}px`);
  }

  public setValue(value: number): void {
    this._handle.setAttribute('aria-valuenow', value.toFixed(2));
  }

  public getAvailableSpace(orientation: SplitViewOrientation, position: SplitViewPanelPosition): number {
    if (position === 'default') {
      // Return -1 if the panel is static (i.e. can't be user resized)
      return -1;
    }
    const sibling = getSplitViewPanelSibling(this._component);
    if (sibling) {
      const siblingSize = sibling.getCollapsibleSize();
      return siblingSize + this.getContentSize(orientation);
    } else {
      const parentSize = orientation === 'horizontal' ? this._parent?.clientWidth : this._parent?.clientHeight;
      return parentSize ?? 0;
    }
  }

  public getSiblingContentSize(): number {
    const sibling = getSplitViewPanelSibling(this._component);
    return sibling?.getContentSize() ?? 0;
  }

  public setSiblingContentSize(value: number): void {
    const sibling = getSplitViewPanelSibling(this._component);
    sibling?.setContentSize(value);
  }
}
