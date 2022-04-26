import { getShadowElement } from '@tylertech/forge-core';
import { ICircularProgressComponent } from './circular-progress';
import { CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';

export interface ICircularProgressAdapter {
  addClass(name: string): void;
  getDeterminateCircleAttribute(name: string): string|null;
  hasClass(name: string): boolean;
  removeClass(name: string): void;
  removeAttribute(name: string): void;
  setAttribute(name: string, value: string): void;
  setDeterminateCircleAttribute(name: string, value: string): void;
}

export class CircularProgressAdapter implements ICircularProgressAdapter {
  private _rootElement: HTMLElement;
  private _determinateCircle: HTMLElement;

  constructor(private _component: ICircularProgressComponent) {
    this._rootElement = getShadowElement(this._component, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);
    this._determinateCircle = getShadowElement(this._component, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_CIRCLE);
  }

  public addClass(name: string): void {
    this._rootElement.classList.add(name);
  }

  public getDeterminateCircleAttribute(name: string): string | null {
    return this._determinateCircle.getAttribute(name);
  }

  public hasClass(name: string): boolean {
    return this._rootElement.classList.contains(name);
  }

  public removeClass(name: string): void {
    this._rootElement.classList.remove(name);
  }

  public removeAttribute(name: string): void {
    this._rootElement.removeAttribute(name);
  }

  public setAttribute(name: string, value: string): void {
    this._rootElement.setAttribute(name, value);
  }

  public setDeterminateCircleAttribute(name: string, value: string): void {
    this._determinateCircle.setAttribute(name, value);
  }
}
