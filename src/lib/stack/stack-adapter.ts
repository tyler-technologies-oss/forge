import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IStackComponent } from './stack';
import { STACK_CONSTANTS } from './stack-constants';
import { containsCharacter } from './stack-utils';

export interface IStackAdapter extends IBaseAdapter {
  setGap(gap: string): void;
}

export class StackAdapter extends BaseAdapter<IStackComponent> implements IStackAdapter {
  private _stackContainer: HTMLElement;

  constructor(component: IStackComponent) {
    super(component);
    this._stackContainer = getShadowElement(component, `.${STACK_CONSTANTS.classes.DEFAULT}`);
  }

  public setGap(gap: string): void {
    if (containsCharacter(gap)) {
      this._stackContainer.style.gap = `var(--forge-stack-gap, ${gap})`;
    } else {
      this._stackContainer.style.gap = `var(--forge-stack-gap, ${gap}px)`;
    }
  }
}
