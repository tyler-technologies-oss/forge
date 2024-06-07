import { ForgeResizeObserver, getShadowElement } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { ISplitViewPanelComponent, SPLIT_VIEW_PANEL_CONSTANTS } from '../split-view-panel';
import { ISplitViewComponent } from './split-view';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from './split-view-constants';

export interface ISplitViewAdapter extends IBaseAdapter {
  registerSlotListener(listener: (evt: Event) => void): void;
  registerDidOpenListener(listener: () => void): void;
  registerDidCloseListener(listener: () => void): void;
  observeResize(callback: (entry: ResizeObserverEntry) => void): void;
  unobserveResize(): void;
  getSlottedPanels(): ISplitViewPanelComponent[];
  refitSlottedPanels(orientation: SplitViewOrientation): void;
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

  public registerDidOpenListener(listener: () => void): void {
    this._root.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_OPEN, listener);
  }

  public registerDidCloseListener(listener: () => void): void {
    this._root.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_CLOSE, listener);
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
    const panelArray = Array.from(nodeList);
    const immediateChildPanels = panelArray.filter(panel => panel.parentElement === this._component);
    return immediateChildPanels;
  }

  public refitSlottedPanels(orientation: SplitViewOrientation): void {
    // Check if the combined panel size is greater than the split view size along the relevant axis
    const size = orientation === 'horizontal' ? this._root.clientWidth : this._root.clientHeight;
    const panels = this.getSlottedPanels();
    const combinedPanelSize = panels
      .map(panel => {
        const panelRoot = panel.shadowRoot?.querySelector(SPLIT_VIEW_PANEL_CONSTANTS.selectors.ROOT);
        const panelSize = orientation === 'horizontal' ? panelRoot?.clientWidth : panelRoot?.clientHeight;
        return panelSize ?? 0;
      })
      .reduce((cur, acc) => cur + acc, 0);

    // Do nothing if all the panels fit
    if (combinedPanelSize <= size) {
      return;
    }

    // Get the size adjustment needed to fit
    let diff = combinedPanelSize - size;

    // Size down the panels as needed in reverse order, adjusting diff accordingly
    panels
      .slice()
      .reverse()
      .forEach(panel => {
        if (diff <= 0) {
          return;
        }

        const panelSize = panel.getContentSize();
        const collapsibleSize = panel.getCollapsibleSize();
        const reduceBy = Math.min(diff, collapsibleSize);
        const newSize = panelSize - reduceBy;

        panel.setContentSize(newSize);

        diff -= reduceBy;
      });

    // If there's still overflow nothing else can be done
  }
}
