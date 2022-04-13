import { BaseAdapter, IBaseAdapter } from '../core/base';
import { EXPANSION_PANEL_CONSTANTS, IExpansionPanelComponent } from '../expansion-panel';
import { IAccordionComponent } from './accordion';
import { elementParents } from '@tylertech/forge-core';

export interface IAccordionAdapter extends IBaseAdapter {
  getHostElement(): IAccordionComponent;
  isNestedPanel(element: HTMLElement): boolean;
  getChildPanels(selector?: string): IExpansionPanelComponent[];
  addEventListener(event: string, callback: (event: Event) => void, element: Element, bubbles?: boolean): void;
  removeEventListener(event: string, callback: (event: Event) => void, element: Element, bubbles?: boolean): void;
}

export class AccordionAdapter extends BaseAdapter<IAccordionComponent> implements IAccordionAdapter {
  constructor(component: IAccordionComponent) {
    super(component);
  }

  /**
   * Gets the `<forge-accordion>` host element.
   * @returns An instance of the `AccordionComponent`.
   */
  public getHostElement(): IAccordionComponent {
    return this._component;
  }

  /**
   * Determines if the given expansion panel element is nested within another expansion panel.
   * @param element The expansion panel element to test.
   */
  public isNestedPanel(element: HTMLElement): boolean {
    if (!element || !this._component.contains(element)) {
      return false;
    }
    const parents = elementParents(element, this._component);
    return parents.some(el => el.tagName.toLocaleLowerCase() === EXPANSION_PANEL_CONSTANTS.elementName);
  }

  /**
   * Finds all child `<forge-expansion-panel>` components within the host element.
   * @returns An array of `ExpansionPanelComponent` child instances.
   */
  public getChildPanels(selector?: string): IExpansionPanelComponent[] {
    if (selector) {
      return Array.from(this._component.querySelectorAll(selector));
    } else {
      const children = Array.from(this._component.children);
      return children.filter(child => child.tagName.toLocaleLowerCase() === EXPANSION_PANEL_CONSTANTS.elementName) as IExpansionPanelComponent[];
    }
  }

  /**
   * Adds an event listener to the provided element.
   * @param event The event name.
   * @param callback The event callback.
   * @param element The element to emit the event from.
   * @param [bubbles] Whether the event bubbles or not.
   */
  public addEventListener(event: string, callback: (event: Event) => void, element: Element, bubbles?: boolean): void {
    element.addEventListener(event, callback, bubbles || false);
  }

  /**
   * Removes an event listener from the provided element.
   * @param event The event name.
   * @param callback The event callback.
   * @param element The event to remove the event from.
   */
  public removeEventListener(event: string, callback: (event: Event) => void, element: Element): void {
    element.removeEventListener(event, callback);
  }
}
