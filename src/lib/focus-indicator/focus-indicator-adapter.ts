import { BaseAdapter, IBaseAdapter } from '../core';
import { IFocusIndicatorComponent } from './focus-indicator';

export interface IFocusIndicatorAdapter extends IBaseAdapter {
  destroy(): void;
  hasTargetElement(): boolean;
  addTargetListener(type: string, listener: EventListener): void;
  removeTargetListener(type: string, listener: EventListener): void;
  getTargetElement(): HTMLElement | null;
  setTargetElement(el: HTMLElement | null): void;
  trySetTarget(value: string | null): void;
  isActive(selector: string): boolean;
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

  /**
   * We use the following heuristic for locating the target element:
   *  - If the `target` attribute is set, we use that value to query the DOM for the target element
   *  - If the `target` attribute is set to `:host`, we use the host element from within a shadow tree (only if the root node is a ShadowRoot instance)
   *  - If the `target` attribute is set but the querySelector returns null, we use the parent element as the target element
   *  - If the `target` attribute is not set, we use the parent element as the target element
   * @param value {string | null} - A selector string to query the DOM for the target element
   */
  public trySetTarget(value: string | null): void {
    if (value) {
      const rootNode = this._component.getRootNode() as Document | ShadowRoot;

      // Special case handling for a `:host` selector to easily target a host element
      // from within a shadow tree, given that this is a very common scenario
      if (value === ':host' && rootNode instanceof ShadowRoot) {
        this._targetElement = rootNode.host as HTMLElement;
        return;
      }

      this._targetElement = rootNode.querySelector(`#${value}`);
    }

    if (!this._targetElement) {
      this.setTargetElement(this._component.parentElement);
    }
  }

  public isActive(selector: string): boolean {
    return !!this._targetElement?.matches(selector);
  }
}
