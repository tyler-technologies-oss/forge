import { CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ExpansionPanelComponent } from '../expansion-panel';
import { AccordionAdapter } from './accordion-adapter';
import { ACCORDION_CONSTANTS } from './accordion-constants';
import { AccordionFoundation } from './accordion-foundation';

export interface IAccordionComponent extends IBaseComponent {
  panelSelector: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-accordion': IAccordionComponent;
  }
}

/**
 * @tag forge-accordion
 * 
 * @dependency forge-expansion-panel
 */
@CustomElement({
  name: ACCORDION_CONSTANTS.elementName,
  dependencies: [ExpansionPanelComponent]
})
export class AccordionComponent extends BaseComponent implements IAccordionComponent {
  public static get observedAttributes(): string[] {
    return [
      ACCORDION_CONSTANTS.attributes.PANEL_SELECTOR
    ];
  }

  private _foundation: AccordionFoundation;

  constructor() {
    super();
    this._foundation = new AccordionFoundation(new AccordionAdapter(this));
  }

  public initializedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case ACCORDION_CONSTANTS.attributes.PANEL_SELECTOR:
        this.panelSelector = newValue;
        break;
    }
  }

  /** Gets/sets the selector to use for finding the child expansion panels. Defaults to searching the direct children for `<forge-expansion-panel>` elements. */
  @FoundationProperty()
  public declare panelSelector: string;
}
