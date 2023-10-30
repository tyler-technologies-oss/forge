import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core';
import { ILabelComponent } from './label';
import { ILabelAware, isLabelAware } from './label-aware';
import { LABEL_CONSTANTS } from './label-constants';

export interface ILabelAdapter extends IBaseAdapter {
  destroy(): void;
  hasTargetElement(): boolean;
  getTargetElement(): HTMLElement | null;
  setTargetElement(el: HTMLElement | null): void;
  trySetTarget(value: string | null): void;
  clickTarget(): void;
  updateTargetLabel(): void;
  addSlotChangeListener(callback: EventListener): void;
  addMutationObserver(callback: MutationCallback): void;
  removeMutationObserver(): void;
}

export class LabelAdapter extends BaseAdapter<ILabelComponent> implements ILabelAdapter {
  private _slotElement: HTMLElement;
  private _targetElement: ILabelAware & HTMLElement | null = null;
  private _mutationObserver?: MutationObserver;

  constructor(component: ILabelComponent) {
    super(component);
    this._slotElement = getShadowElement(component, LABEL_CONSTANTS.selectors.SLOT);
  }

  public destroy(): void {
    this._targetElement?.labelChangedCallback(null);
    this._targetElement = null;
  }

  public hasTargetElement(): boolean {
    return !!this._targetElement;
  }

  public getTargetElement(): HTMLElement | null {
    return this._targetElement;
  }

  public setTargetElement(el: HTMLElement | null): void {
    if (el && this._checkLabelAwareness(el)) {
      this._targetElement = el;
      return;
    }
    this._targetElement = null;
  }

  public trySetTarget(value: string | null): void {
    this._targetElement = this._locateTargetElement(value);
    console.log(this._targetElement);
  }

  /**
   * Calls the target's `labelClickedCallback`.
   */
  public clickTarget(): void {
    this._targetElement?.labelClickedCallback();
  }

  /**
   * Computes the text content of the label then passes it to the target's `labelChangedCallback`.
   */
  public updateTargetLabel(): void {
    const value = this._component.innerText.trim();
    this._targetElement?.labelChangedCallback(value);
  }

  public addSlotChangeListener(callback: EventListener): void {
    this._slotElement.addEventListener('slotchange', callback);
  }

  public addMutationObserver(callback: MutationCallback): void {
    this._mutationObserver = new MutationObserver(callback);
    this._mutationObserver.observe(this._component, {
      subtree: true,
      characterData: true
    });

    // Run the callback once to capture the current state of the label
    callback([], this._mutationObserver);
  };

  public removeMutationObserver(): void {
    this._mutationObserver?.disconnect();
    this._mutationObserver = undefined;
  }

  /**
   * Returns `true` if the provided element is label aware, `false` otherwise. If `false` a warning
   * is logged to the console.
   */
  private _checkLabelAwareness(el: HTMLElement): el is (ILabelAware & HTMLElement) {
    if (!isLabelAware(el)) {
      console.warn('Label target element is not label aware.', el);
      return false;
    }
    return true;
  }

  /**
   * Returns a label aware element queried from the provided id or a child element of the
   * component or `null` if none exists.
   */
  private _locateTargetElement(id: string | null): ILabelAware & HTMLElement | null {
    let targetEl: HTMLElement | null;

    if (id) {
      const rootNode = this._component.getRootNode() as Document | ShadowRoot;
      targetEl = rootNode.querySelector(`#${id}`);
    } else {
      const selector = LABEL_CONSTANTS.labelableChildSelectors.join(',');
      targetEl = this._component.querySelector(selector);
    }

    if (targetEl && !this._checkLabelAwareness(targetEl)) {
      return null;
    }

    return targetEl;
  }
}
