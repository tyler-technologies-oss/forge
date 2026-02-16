import { matchesSelectors } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/index.js';
import { IKeyboardShortcutComponent } from './keyboard-shortcut.js';
import { KEYBOARD_SHORTCUT_CONSTANTS } from './keyboard-shortcut-constants.js';

export interface IKeyboardShortcutAdapter extends IBaseAdapter {
  hasTargetElement(): boolean;
  destroy(): void;
  addTargetEventListener(type: string, listener: (evt: KeyboardEvent) => void, capture?: boolean): void;
  removeTargetEventListener(type: string, listener: (evt: KeyboardEvent) => void, capture?: boolean): void;
  setHostStyles(): void;
  setTargetElement(target: string | undefined, global: boolean): void;
}

export class KeyboardShortcutAdapter extends BaseAdapter<IKeyboardShortcutComponent> implements IKeyboardShortcutAdapter {
  private _targetElement: HTMLElement | null;

  constructor(public component: IKeyboardShortcutComponent) {
    super(component);
  }

  public hasTargetElement(): boolean {
    return !!this._targetElement;
  }

  public destroy(): void {
    this._targetElement = null;
  }

  /**
   * Adds an event listener to the target element.
   * @param type The event type.
   * @param listener The event listener.
   */
  public addTargetEventListener(type: string, listener: (evt: KeyboardEvent) => void, capture?: boolean): void {
    this._targetElement?.addEventListener(type, listener, { capture });
  }

  /**
   * Removes an event listener from the target element.
   * @param type The event type.
   * @param listener The event listener.
   */
  public removeTargetEventListener(type: string, listener: (evt: KeyboardEvent) => void, capture?: boolean): void {
    this._targetElement?.removeEventListener(type, listener, { capture });
  }

  /**
   * Sets the host element's display to none
   */
  public setHostStyles(): void {
    this.component.style.display = 'none';
  }

  /**
   * Sets the target element based on the provided CSS selector.
   * @param {string | undefined} selector The target element selector.
   * @param {boolean} global Whether to target the document element.
   */
  public setTargetElement(selector: string | undefined, global: boolean): void {
    if (global) {
      const doc = this._component.ownerDocument || document;
      this._targetElement = doc.documentElement;
      return;
    }

    if (selector) {
      if (this._component.parentElement) {
        if (matchesSelectors(this._component.parentElement, selector)) {
          this._targetElement = this._component.parentElement;
          return;
        }
        this._targetElement = this._component.parentElement.querySelector(selector);
        return;
      }
    } else {
      let sibling = this._component.previousElementSibling;
      while (sibling) {
        // Ignore <forge-tooltip> elements
        if (!matchesSelectors(sibling, KEYBOARD_SHORTCUT_CONSTANTS.selectors.TOOLTIP)) {
          this._targetElement = sibling as HTMLElement;
          return;
        }
        sibling = sibling.previousElementSibling;
      }
      this._targetElement = this._component.parentElement as HTMLElement;
      return;
    }
  }
}
