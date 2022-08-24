import { ForgeResizeObserver, getShadowElement } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { ISplitViewPanelComponent, SPLIT_VIEW_PANEL_CONSTANTS } from '../split-view-panel';
import { ISplitViewComponent } from './split-view';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from './split-view-constants';

export interface ISplitViewAdapter extends IBaseAdapter {
  registerSlotListener(listener: (evt: Event) => void): void;
  registerPanelResizeEndListener(listener: (evt: Event) => void): void;
  registerPanelCloseListener(listener: (evt: Event) => void): void;
  registerPanelOpenListener(listener: (evt: Event) => void): void;
  observeResize(callback: (entry: ResizeObserverEntry) => void): void;
  unobserveResize(): void;
  setOrientation(value: SplitViewOrientation): void;
  getSlottedPanels(): NodeListOf<ISplitViewPanelComponent>;
  setSlottedPanelProperty<T>(name: keyof ISplitViewPanelComponent, value: T): void;
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

  public registerPanelResizeEndListener(listener: (evt: Event) => void): void {
    this._root.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DRAG_END, listener);
  }

  public registerPanelCloseListener(listener: (evt: Event) => void): void {
    this._root.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_CLOSE, listener);
  }

  public registerPanelOpenListener(listener: (evt: Event) => void): void {
    this._root.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_OPEN, listener);
  }

  public observeResize(callback: (entry: ResizeObserverEntry) => void): void {
    ForgeResizeObserver.observe(this._root, callback);
  }
  
  public unobserveResize(): void {
    ForgeResizeObserver.unobserve(this._root);
  }

  /**
   * Sets the orientation of all child panels.
   * @param value 
   */
  public setOrientation(value: SplitViewOrientation): void {
    this.getSlottedPanels().forEach(panel => {
      panel.setOrientation(value);
    });
  }
  
  /**
   * Gets all child panels.
   * @returns All child panels.
   */
  public getSlottedPanels(): NodeListOf<ISplitViewPanelComponent> {
    return this._component.querySelectorAll<ISplitViewPanelComponent>(SPLIT_VIEW_CONSTANTS.selectors.PANEL);
  }

  /**
   * Sets a property on all child panels.
   * @param name The property to set.
   * @param value The value the property should take.
   */
  public setSlottedPanelProperty<T>(name: keyof ISplitViewPanelComponent, value: T): void {
    this.getSlottedPanels().forEach(panel => {
      panel[name as string] = value;
    });
  }
}
