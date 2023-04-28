import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IStackComponent } from './stack';
import { STACK_CONSTANTS } from './stack-constants';

export interface IStackAdapter extends IBaseAdapter {
  setGap: (gap: number) => void;
}

export class StackAdapter extends BaseAdapter<IStackComponent> implements IStackAdapter {
  private _stackContainer: HTMLElement;

  constructor(component: IStackComponent) {
    super(component);
    this._stackContainer = getShadowElement(component, `.${STACK_CONSTANTS.classes.DEFAULT}`);
  }

  public setGap(gap: number): void {
    this._stackContainer.style.gap = `var(--forge-stack-gap, ${gap}px)`;
  }
}
