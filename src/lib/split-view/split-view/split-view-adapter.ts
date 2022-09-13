import { ForgeResizeObserver, getShadowElement } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { ISplitViewPanelComponent } from '../split-view-panel';
import { ISplitViewComponent } from './split-view';
import { SPLIT_VIEW_CONSTANTS } from './split-view-constants';

export interface ISplitViewAdapter extends IBaseAdapter {
  registerSlotListener(listener: (evt: Event) => void): void;
  observeResize(callback: (entry: ResizeObserverEntry) => void): void;
  unobserveResize(): void;
  getSlottedPanels(): ISplitViewPanelComponent[];
}

export class SplitViewAdapter extends BaseAdapter<ISplitViewComponent> implements ISplitViewAdapter {
  private _root: HTMLElement;

  constructor(component: ISplitViewComponent) {
    super(component);
    this._root = getShadowElement(component, SPLIT_VIEW_CONSTANTS.selectors.ROOT);
  }

  public registerSlotListener(listener: (evt: Event) => void): void {
    this._root.addEventListener('slotchange', listener);
  }

  public observeResize(callback: (entry: ResizeObserverEntry) => void): void {
    ForgeResizeObserver.observe(this._root, callback);
  }
  
  public unobserveResize(): void {
    ForgeResizeObserver.unobserve(this._root);
  }
  
  /**
   * Gets all child panels.
   * @returns All child panels.
   */
  public getSlottedPanels(): ISplitViewPanelComponent[] {
    const nodeList = this._component.querySelectorAll<ISplitViewPanelComponent>(SPLIT_VIEW_CONSTANTS.selectors.PANEL);
    return Array.from(nodeList);
  }
}
