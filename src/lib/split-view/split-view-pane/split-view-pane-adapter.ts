import { getShadowElement, playKeyframeAnimation, toggleAttribute } from '@tylertech/forge-core';

import {  } from '../../core/utils';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { getCursor, getHandleIcon } from '../core/split-view-core-utils';
import { ISplitViewPaneComponent } from './split-view-pane';
import { SplitViewPaneDirection, SPLIT_VIEW_PANE_CONSTANTS } from './split-view-pane-constants';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from '../split-view/split-view-constants';
import { ISplitViewComponent } from '../split-view/split-view';
import { IIconComponent } from '../../icon';

export interface ISplitViewPaneAdapter extends IBaseAdapter {
  initialize(): void;
  setMousedownListener(listener: (evt: MouseEvent) => void): void;
  removeMousedownListener(listener: (evt: MouseEvent) => void): void;
  setMouseupListener(listener: (evt: MouseEvent) => void): void;
  removeMouseupListener(listener: (evt: MouseEvent) => void): void;
  setMousemoveListener(listener: (evt: MouseEvent) => void): void;
  removeMousemoveListener(listener: (evt: MouseEvent) => void): void;
  setKeydownListener(listener: (evt: KeyboardEvent) => void): void;
  removeKeydownListener(listener: (evt: KeyboardEvent) => void): void;
  getParentProperty(name: string): unknown;
  setLabel(value: string): void;
  setDirection(value: SplitViewPaneDirection): void;
  setOrientation(value: SplitViewOrientation): void;
  setOpen(value: boolean): void;
  setGrabbed(value: boolean, orientation: SplitViewOrientation): void;
  getContentSize(orientation: SplitViewOrientation): number;
  setContentSize(value: number): void;
  getAvailableSpace(orientation: SplitViewOrientation, direction: SplitViewPaneDirection): number;
}

export class SplitViewPaneAdapter extends BaseAdapter<ISplitViewPaneComponent> implements ISplitViewPaneAdapter {
  private _root: HTMLElement;
  private _handle: HTMLElement;
  private _icon: IIconComponent;
  private _content: HTMLElement;
  private _parent?: ISplitViewComponent;

  constructor(component: ISplitViewPaneComponent) {
    super(component);
    this._root = getShadowElement(component, SPLIT_VIEW_PANE_CONSTANTS.selectors.ROOT);
    this._handle = getShadowElement(component, SPLIT_VIEW_PANE_CONSTANTS.selectors.HANDLE);
    this._icon = getShadowElement(component, SPLIT_VIEW_PANE_CONSTANTS.selectors.ICON) as IIconComponent;
    this._content = getShadowElement(component, SPLIT_VIEW_PANE_CONSTANTS.selectors.CONTENT);
  }

  public initialize(): void {
    // Set the parent split view
    const parent = this._component.parentElement;
    if (parent?.tagName.toLowerCase() === SPLIT_VIEW_CONSTANTS.elementName) {
      this._parent = parent as ISplitViewComponent;
    }
  }

  public setMousedownListener(listener: (evt: MouseEvent) => void): void {
    this._handle?.addEventListener('mousedown', listener);
  }

  public removeMousedownListener(listener: (evt: MouseEvent) => void): void {
    this._handle?.removeEventListener('mousedown', listener);
  }

  public setMouseupListener(listener: (evt: MouseEvent) => void): void {
    document.addEventListener('mouseup', listener);
  }

  public removeMouseupListener(listener: (evt: MouseEvent) => void): void {
    document.removeEventListener('mouseup', listener);
  }

  public setMousemoveListener(listener: (evt: MouseEvent) => void): void {
    document.addEventListener('mousemove', listener);
  }

  public removeMousemoveListener(listener: (evt: MouseEvent) => void): void {
    document.removeEventListener('mousemove', listener);
  }

  public setKeydownListener(listener: (evt: KeyboardEvent) => void): void {
    this._handle?.addEventListener('keydown', listener);
  }

  public removeKeydownListener(listener: (evt: KeyboardEvent) => void): void {
    this._handle?.removeEventListener('keydown', listener);
  }

  public getParentProperty(name: string): unknown {
    return this._parent?.[name];
  }

  public setLabel(value: string): void {
    this._handle?.setAttribute('aria-label', value);
  }

  public setDirection(value: SplitViewPaneDirection): void {
    this._root.setAttribute(SPLIT_VIEW_PANE_CONSTANTS.attributes.DIRECTION, value.toString());
    toggleAttribute(this._handle, value !== 'none', 'aria-valuemin', '0');
    toggleAttribute(this._handle, value !== 'none', 'aria-valuemax', '100');

    if (value === 'none') {
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
    this._root.setAttribute(SPLIT_VIEW_PANE_CONSTANTS.attributes.ORIENTATION, value);
    // The divider's orientation is perpendicular to the layout of the component
    this._handle?.setAttribute('aria-orientation', value === 'horizontal' ? 'vertical' : 'horizontal');
    this._icon?.setAttribute('name', getHandleIcon(value));
  }

  public setOpen(value: boolean): void {
    if (value && this._root.classList.contains(SPLIT_VIEW_PANE_CONSTANTS.classes.CLOSED)) {
      this._root.classList.remove(SPLIT_VIEW_PANE_CONSTANTS.classes.CLOSED);
      playKeyframeAnimation(this._root, SPLIT_VIEW_PANE_CONSTANTS.classes.OPENING, true).then(() => {
        // TODO: should this be handle in the foundation via a callback function?
        this.emitHostEvent(SPLIT_VIEW_PANE_CONSTANTS.events.DID_OPEN);
      });
    } else if (!value && !this._root.classList.contains(SPLIT_VIEW_PANE_CONSTANTS.classes.CLOSED)) {
      playKeyframeAnimation(this._root, SPLIT_VIEW_PANE_CONSTANTS.classes.CLOSING, true).then(() => {
        this._root.classList.add(SPLIT_VIEW_PANE_CONSTANTS.classes.CLOSED);
        // TODO: should this be handle in the foundation via a callback function?
        this.emitHostEvent(SPLIT_VIEW_PANE_CONSTANTS.events.DID_CLOSE);
      });
    }
  }

  public setGrabbed(value: boolean, orientation: SplitViewOrientation): void {
    this._root?.classList.toggle(SPLIT_VIEW_PANE_CONSTANTS.classes.GRABBED, value);
    this._handle?.setAttribute('aria-grabbed', value.toString());

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
    // TODO: prompt sibling panes to update their size
    this._component.style.setProperty('--forge-split-view-pane-size', `${value}px`);
    this._handle?.setAttribute('aria-valuenow', value.toString());
  }

  public getAvailableSpace(orientation: SplitViewOrientation, direction: SplitViewPaneDirection): number {
    if (direction === 'none') {
      // Return -1 if the pane is static (i.e. can't be resized)
      return -1;
    }
    const sibling = direction === 'start' ? this._component.nextElementSibling : this._component.previousElementSibling;
    if (sibling) {
      // TODO: subtract min size and handle width of sibling
      const siblingSize = orientation === 'horizontal' ? sibling.clientWidth : sibling.clientHeight;
      return siblingSize + this.getContentSize(orientation);
    } else {
      const parentSize = orientation === 'horizontal' ? this._parent?.clientWidth : this._parent?.clientHeight;
      return parentSize ?? 0;
    }
  }
}
