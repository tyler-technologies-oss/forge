import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter.js';
import { IStackComponent } from './stack.js';
import { STACK_CONSTANTS } from './stack-constants.js';

export interface IStackAdapter extends IBaseAdapter {
  setGap(gap: string): void;
}

export class StackAdapter extends BaseAdapter<IStackComponent> implements IStackAdapter {
  private _rootElement: HTMLElement;

  constructor(component: IStackComponent) {
    super(component);
    this._rootElement = getShadowElement(component, STACK_CONSTANTS.selectors.ROOT);
  }

  public setGap(gap: string): void {
    const value = /^\d+$/.test(gap) ? `${gap}px` : gap;
    this._rootElement.style.gap = `var(--forge-stack-gap, ${value})`;
  }
}
