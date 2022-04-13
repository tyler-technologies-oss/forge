import { removeAllChildren, removeElement, matchesSelectors } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { PopupPlacement } from '../popup';
import { ITooltipComponent } from './tooltip';
import { attachTooltip } from './tooltip-utils';

export interface ITooltipAdapter extends IBaseAdapter {
  hasTargetElement(): boolean;
  hasTooltipElement(): boolean;
  isTargetElementConnected(): boolean;
  initializeTargetElement(selector: string): void;
  destroy(identifier: string | null): void;
  initializeAccessibility(identifier: string): void;
  setTextContent(text: string): void;
  addTargetEventListener(type: string, listener: (evt: MouseEvent) => void): void;
  removeTargetEventListener(type: string, listener: (evt: MouseEvent) => void): void;
  showTooltip(position: PopupPlacement, content?: HTMLElement | Text): void;
  getInnerText(): string;
  hideTooltip(): void;
  getTooltipElement(): HTMLElement | null;
}

/**
 * The DOM adapter for the tooltip component.
 */
export class TooltipAdapter extends BaseAdapter<ITooltipComponent> implements ITooltipAdapter {
  private _targetElement: HTMLElement | null;
  private _tooltipElement: HTMLElement | null = null;

  constructor(component: ITooltipComponent) {
    super(component);
  }

  public initializeTargetElement(selector: string): void {
    this._targetElement = this._getTargetElement(selector);
  }

  public initializeAccessibility(identifier: string): void {
    if (this._targetElement && !this._targetElement.hasAttribute('aria-describedby')) {
      this._targetElement.setAttribute('aria-describedby', identifier);
    }
  }

  public hasTargetElement(): boolean {
    return !!this._targetElement;
  }

  public hasTooltipElement(): boolean {
    return !!this._tooltipElement;
  }

  public isTargetElementConnected(): boolean {
    return !!this._targetElement && this._targetElement.isConnected;
  }

  public destroy(identifier: string | null): void {
    if (this._targetElement && this._targetElement.getAttribute('aria-describedby') === identifier) {
      this._targetElement.removeAttribute('aria-describedby');
    }
  }

  /**
   * Sets the text content of the host element to the provided text.
   * @param text The text content.
   */
  public setTextContent(text: string): void {
    removeAllChildren(this._component);
    if (text) {
      this._component.appendChild(document.createTextNode(text));
    }
  }

  /**
   * Adds an event listener to the target element.
   * @param targetElement The target element instance.
   * @param type The event type.
   * @param listener The event listener.
   */
  public addTargetEventListener(type: string, listener: (evt: MouseEvent) => void): void {
    if (this._targetElement) {
      this._targetElement.addEventListener(type, listener);
    }
  }

  /**
   * Removes an event listener from the target element.
   * @param type The event type.
   * @param listener The event listener.
   */
  public removeTargetEventListener(type: string, listener: (evt: MouseEvent) => void): void {
    if (this._targetElement) {
      this._targetElement.removeEventListener(type, listener);
    }
  }

  /**
   * Displays the tooltip around the target element based on the provided configuration.
   * @param position The position.
   * @param content The tooltip content.
   */
  public showTooltip(position: PopupPlacement, content?: HTMLElement | Text): void {
    if (!this._targetElement) {
      return;
    }

    if (!content) {
      const child = this._getTooltipContent();
      content = child.cloneNode(true) as HTMLElement | Text;
    }

    const isEmptyTextNode = content.nodeType === 3 && (!content.textContent || content.textContent.trim().length === 0);
    const isEmptyNode = !content || isEmptyTextNode;
    if (isEmptyNode) {
      return;
    }

    this._tooltipElement = attachTooltip(this._targetElement, position, content);
  }

  public getInnerText(): string {
    return this._component.innerText;
  }

  /**
   * Removes the tooltip from the DOM.
   * @param tooltipElement The target element instance.
   */
  public hideTooltip(): void {
    if (this._tooltipElement) {
      removeElement(this._tooltipElement);
      this._tooltipElement = null;
    }
  }

  public getTooltipElement(): HTMLElement | null {
    return this._tooltipElement;
  }

  /**
   * Gets the target element based on the provided CSS selector.
   * @param {string | undefined} selector The target element selector.
   */
  private _getTargetElement(selector: string | undefined): HTMLElement | null {
    if (selector) {
      if (this._component.parentElement) {
        if (matchesSelectors(this._component.parentElement, selector)) {
          return this._component.parentElement;
        }
        return this._component.parentElement.querySelector(selector);
      }
    } else {
      return (this._component.previousElementSibling || this._component.parentElement) as HTMLElement;
    }
    return null;
  }

  private _getTooltipContent(): Node {
    return this._component.firstElementChild || this._component.firstChild || document.createTextNode('');
  }
}
