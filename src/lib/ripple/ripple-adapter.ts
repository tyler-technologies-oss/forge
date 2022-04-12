import { addClass, removeClass } from '@tylertech/forge-core';

import { IRippleComponent } from './ripple';
import { RIPPLE_CONSTANTS } from './ripple-constants';
import { TylRipple } from './tyl-ripple';

export interface IRippleAdapter {
  initialize(target: string, unbounded: boolean): void;
  destroy(): void;
}

export class RippleAdapter implements IRippleAdapter {
  private _target: HTMLElement | undefined;
  private _ripple: TylRipple | undefined;

  constructor(private _component: IRippleComponent) {}

  private _tryFindTarget(): HTMLElement {
    return this._component.parentElement as HTMLElement;
  }

  public initialize(target: string, unbounded: boolean): void {
    if (target) {
      this._target = (this._component.ownerDocument || document).querySelector(target) as HTMLElement;
    }

    if (!this._target) {
      this._target = this._tryFindTarget();
    }

    if (this._target) {
      this._ripple = new TylRipple(this._target);
      this._ripple.unbounded = unbounded;
      addClass(RIPPLE_CONSTANTS.classes.SURFACE, this._target);
    }
  }

  public destroy(): void {
    if (this._ripple) {
      this._ripple.destroy();
      this._ripple = undefined;
    }

    if (this._target) {
      removeClass(RIPPLE_CONSTANTS.classes.SURFACE, this._target);
    }
    
    this._target = undefined;
  }
}
