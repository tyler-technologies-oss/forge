import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ForgeRipple } from './forge-ripple';
import { IRippleAdapter } from './ripple-adapter';

export interface IRippleFoundation extends ICustomElementFoundation {
  target: string;
  unbounded: boolean;
  layout(): void;
  activate(): void;
  deactivate(): void;
}

export class RippleFoundation implements IRippleFoundation {
  private _target: string;
  private _unbounded = false;

  constructor(private _adapter: IRippleAdapter) {}

  public initialize(): void {
    this._adapter.initialize(this._target, this._unbounded);
  }

  public disconnect(): void {
    this._adapter.destroy();
  }

  public getRippleInstance(): ForgeRipple | undefined {
    return this._adapter.getRippleInstance();
  }

  public layout(): void {
    this._applyTarget();
  }

  public activate(): void {
    this._adapter.activate();
  }

  public deactivate(): void {
    this._adapter.deactivate();
  }

  private _applyTarget(): void {
    this._adapter.destroy();
    this._adapter.initialize(this._target, this._unbounded);
  }

  public get target(): string {
    return this._target;
  }
  public set target(value: string) {
    if (this._target !== value) {
      this._target = value;
      this._applyTarget();
    }
  }

  public get unbounded(): boolean {
    return this._unbounded;
  }
  public set unbounded(value: boolean) {
    if (this._unbounded !== value) {
      this._unbounded = value;
      this._applyTarget();
    }
  }
}
