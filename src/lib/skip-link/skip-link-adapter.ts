import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core';
import { ISkipLinkComponent } from './skip-link';
import { SKIP_LINK_CONSTANTS } from './skip-link-constants';

export interface ISkipLinkAdapter extends IBaseAdapter {
  setHref(value: string): void;
}

export class SkipLinkAdapter extends BaseAdapter<ISkipLinkComponent> implements ISkipLinkAdapter {
  private _anchorElement: HTMLAnchorElement;

  constructor(component: ISkipLinkComponent) {
    super(component);
    this._anchorElement = getShadowElement(this._component, SKIP_LINK_CONSTANTS.selectors.ANCHOR) as HTMLAnchorElement;
  }

  public setHref(value: string): void {
    this._anchorElement.href = value;
  }
}
