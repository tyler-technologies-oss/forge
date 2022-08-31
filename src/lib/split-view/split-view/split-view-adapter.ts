import { ForgeResizeObserver, getShadowElement } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { ISplitViewPanelComponent, SPLIT_VIEW_PANEL_CONSTANTS } from '../split-view-panel';
import { ISplitViewComponent } from './split-view';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from './split-view-constants';

export interface ISplitViewAdapter extends IBaseAdapter {
  registerSlotListener(listener: (evt: Event) => void): void;
  observeResize(callback: (entry: ResizeObserverEntry) => void): void;
  unobserveResize(): void;
  setOrientation(value: SplitViewOrientation): void;
  detectSlottedPanels(): void;
  getSlottedPanels(): ISplitViewPanelComponent[];
  setSlottedPanelProperty<T>(name: keyof ISplitViewPanelComponent, value: T): void;
  unsetPanelCursor(panel: ISplitViewPanelComponent): void;
}

export class SplitViewAdapter extends BaseAdapter<ISplitViewComponent> implements ISplitViewAdapter {
  private _root: HTMLElement;
  private _panels: ISplitViewPanelComponent[] = [];

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
   * Sets the orientation of all child panels.
   * @param value `'horizontal'` or `'vertical'`.
   */
  public setOrientation(value: SplitViewOrientation): void {
    this._panels.forEach(panel => {
      panel.setOrientation(value);
    });
  }

  /**
   * Detects and caches all child panels.
   */
  public detectSlottedPanels(): void {
    const nodeList = this._component.querySelectorAll<ISplitViewPanelComponent>(SPLIT_VIEW_CONSTANTS.selectors.PANEL);
    this._panels = Array.from(nodeList);
  }
  
  /**
   * Gets all child panels.
   * @returns All child panels.
   */
  public getSlottedPanels(): ISplitViewPanelComponent[] {
    return this._panels;
  }

  /**
   * Sets a property on all child panels.
   * @param name The property to set.
   * @param value The value the property should take.
   */
  public setSlottedPanelProperty<T>(name: keyof ISplitViewPanelComponent, value: T): void {
    this._panels.forEach(panel => {
      panel[name as string] = value;
    });
  }

  /**
   * Removes the cursor property from a panel.
   * @param panel A panel.
   */
  public unsetPanelCursor(panel: ISplitViewPanelComponent): void {
    const root = panel.shadowRoot?.querySelector(SPLIT_VIEW_PANEL_CONSTANTS.selectors.ROOT) as HTMLElement;
    root.style.removeProperty(SPLIT_VIEW_PANEL_CONSTANTS.customCssProperties.CURSOR);
  }
}
