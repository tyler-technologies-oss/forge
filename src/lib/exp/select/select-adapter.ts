import { BaseAdapter, IBaseAdapter } from '@tylertech/forge/core';
import { ISelectComponentExp } from './select';
import { IListDropdownComponent } from '../list-dropdown';
import { getShadowElement } from '@tylertech/forge-core';

export interface ISelectAdapterExp extends IBaseAdapter {}

export class SelectAdapterExp extends BaseAdapter<ISelectComponentExp> implements ISelectAdapterExp {
  private _listDropdownElement: IListDropdownComponent;

  constructor(component: ISelectComponentExp) {
    super(component);

    const triggerSlotElement = getShadowElement(component, 'slot[name=trigger]') as HTMLSlotElement;
    const target: HTMLElement = triggerSlotElement.assignedElements()[0] as HTMLElement ?? getShadowElement(component, '.forge-field') as HTMLElement;
    const selectEl = getShadowElement(component, '.forge-select') as any;

    console.log('selectEl.ariaActiveDescendantElement', selectEl.ariaActiveDescendantElement);

    this._listDropdownElement = getShadowElement(component, 'forge-list-dropdown') as IListDropdownComponent;
    this._listDropdownElement.targetElement = target;
    this._listDropdownElement.style.setProperty('--forge-overlay-width', '256px');

    this._listDropdownElement.addEventListener('forge-overlay-toggle', (evt: CustomEvent) => {
      selectEl.ariaExpanded = String(evt.detail.open);
      
      if (evt.detail.open) {
        const options = component.querySelectorAll('forge-option-exp');
        selectEl.ariaActiveDescendantElement = options.item(0);
      } else {
        selectEl.ariaActiveDescendantElement = null;
      }
    });
  }
}
