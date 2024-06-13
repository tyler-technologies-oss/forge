import { BaseAdapter, IBaseAdapter } from '../core/base';
import { EXPANSION_PANEL_CONSTANTS, IExpansionPanelComponent } from '../expansion-panel';
import { IAccordionComponent } from './accordion';
import { elementParents } from '@tylertech/forge-core';

export interface IAccordionAdapter extends IBaseAdapter {
  isNestedPanel(element: HTMLElement): boolean;
  getChildPanels(selector?: string): IExpansionPanelComponent[];
}

export class AccordionAdapter extends BaseAdapter<IAccordionComponent> implements IAccordionAdapter {
  constructor(component: IAccordionComponent) {
    super(component);
  }

  /**
   * Determines if the given expansion panel element is nested within another expansion panel.
   * @param element The expansion panel element to test.
   */
  public isNestedPanel(element: HTMLElement): boolean {
    /* c8 ignore next 3 */
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
}
