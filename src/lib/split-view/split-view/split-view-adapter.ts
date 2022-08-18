import { ForgeResizeObserver, getShadowElement } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { ISplitViewComponent } from './split-view';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from './split-view-constants';
import { ISplitViewPanelComponent, SPLIT_VIEW_PANEL_CONSTANTS } from '../split-view-panel';

export interface ISplitViewAdapter extends IBaseAdapter {
  registerSlotListener(listener: (evt: Event) => void): void;
  registerPanelResizeEndListener(listener: (evt: Event) => void): void;
  registerPanelCloseListener(listener: (evt: Event) => void): void;
  registerPanelOpenListener(listener: (evt: Event) => void): void;
  observeResize(callback: (entry: ResizeObserverEntry) => void): void;
  unobserveResize(): void;
  setOrientation(value: SplitViewOrientation): void;
  setDisabled(value: boolean): void;
  setDisableClose(value: boolean): void;
  setAutoClose(value: boolean): void;
  getSlottedPanels(): NodeListOf<ISplitViewPanelComponent>;
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
   * 
   * @param value 
   */
  public setOrientation(value: SplitViewOrientation): void {
    this.getSlottedPanels().forEach(panel => {
      panel.setOrientation(value);
    });
  }

  /**
   * Sets the disabled state of all child panels.
   * 
   * @param value 
   */
  public setDisabled(value: boolean): void {
    this.getSlottedPanels().forEach(panel => {
      panel.disabled = value;
    });
  }

  /**
   * Sets whether closing is disabled on all child panels.
   * 
   * @param value 
   */
  public setDisableClose(value: boolean): void {
    this.getSlottedPanels().forEach(panel => {
      panel.disableClose = value;
    });
  }

  /**
   * Sets whether auto close is enabled on all child panels.
   * 
   * @param value 
   */
  public setAutoClose(value: boolean): void {
    this.getSlottedPanels().forEach(panel => {
      panel.autoClose = value;
    });
  }
  
  /**
   * Gets all child panels.
   * 
   * @returns 
   */
  public getSlottedPanels(): NodeListOf<ISplitViewPanelComponent> {
    return this._component.querySelectorAll<ISplitViewPanelComponent>(SPLIT_VIEW_CONSTANTS.selectors.PANEL);
  }
}
