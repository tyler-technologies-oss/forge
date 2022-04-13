import { getShadowElement } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { ISplitViewComponent } from './split-view';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from './split-view-constants';
import { ISplitViewPaneComponent } from '../split-view-pane';

export interface ISplitViewAdapter extends IBaseAdapter {
  setOrientation(value: SplitViewOrientation): void;
  setDisabled(value: boolean): void;
  getSlottedPanes(): NodeListOf<ISplitViewPaneComponent>;
}

export class SplitViewAdapter extends BaseAdapter<ISplitViewComponent> implements ISplitViewAdapter {
  private _root: HTMLElement;

  constructor(component: ISplitViewComponent) {
    super(component);
    this._root = getShadowElement(component, SPLIT_VIEW_CONSTANTS.selectors.ROOT);
  }

  public setOrientation(value: SplitViewOrientation): void {
    this.getSlottedPanes().forEach(pane => {
      // TODO: don't access private members
      (pane as any)._foundation._matchParentProperties();
    });
  }

  public setDisabled(value: boolean): void {
    this.getSlottedPanes().forEach(pane => {
      pane.disabled = value;
    });
  }
  
  public getSlottedPanes(): NodeListOf<ISplitViewPaneComponent> {
    return this._component.querySelectorAll<ISplitViewPaneComponent>(SPLIT_VIEW_CONSTANTS.selectors.PANE);
  }
}
