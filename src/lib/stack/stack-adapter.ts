import { getShadowElement, toggleClass } from '@tylertech/forge-core';
import { IStackComponent } from './stack';
import { STACK_CONSTANTS } from './stack-constants';

export interface IStackAdapter {
  setStackDirection: (inline: boolean) => void;
  setWrap: (wrap: boolean) => void;
}

export class StackAdapter implements IStackAdapter {
  private _stackContainer: HTMLElement;

  constructor(private _component: IStackComponent) {
    this._stackContainer = getShadowElement(_component, `.${STACK_CONSTANTS.classes.DEFAULT}`);
  }

  public setStackDirection(inline: boolean): void {
    toggleClass(this._stackContainer, inline, STACK_CONSTANTS.classes.INLINE);
  }

  public setWrap(wrap: boolean): void {
    toggleClass(this._stackContainer, wrap, STACK_CONSTANTS.classes.WRAP);
  }
}
