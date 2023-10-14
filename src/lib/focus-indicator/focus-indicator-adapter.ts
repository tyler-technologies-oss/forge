import { BaseAdapter, IBaseAdapter, locateTargetHeuristic } from '../core';
import { IFocusIndicatorComponent } from './focus-indicator';

export interface IFocusIndicatorAdapter extends IBaseAdapter {
  destroy(): void;
  hasTargetElement(): boolean;
  addTargetListener(type: string, listener: EventListener): void;
  removeTargetListener(type: string, listener: EventListener): void;
  getTargetElement(): HTMLElement | null;
  setTargetElement(el: HTMLElement | null): void;
  trySetTarget(value: string | null): void;
  isActive(selector: string, el?: HTMLElement | null): boolean;
}

export class FocusIndicatorAdapter extends BaseAdapter<IFocusIndicatorComponent> implements IFocusIndicatorAdapter {
  private _targetElement: HTMLElement | null = null;

  constructor(component: IFocusIndicatorComponent) {
    super(component);
  }

  public destroy(): void {
    this._targetElement = null;
  }
  
  public hasTargetElement(): boolean {
    return !!this._targetElement;
  }

  public addTargetListener(type: string, listener: EventListener): void {
    this._targetElement?.addEventListener(type, listener);
  }

  public removeTargetListener(type: string, listener: EventListener): void {
    this._targetElement?.removeEventListener(type, listener);
  }

  public getTargetElement(): HTMLElement | null {
    return this._targetElement;
  }

  public setTargetElement(el: HTMLElement | null): void {
    this._targetElement = el;
  }

  public trySetTarget(value: string | null): void {
    this._targetElement = locateTargetHeuristic(this._component, value);
  }

  public isActive(selector: string, el?: HTMLElement | null): boolean {
    const targetedEl = el ?? this._targetElement;
    return !!targetedEl?.matches(selector);
  }
}
