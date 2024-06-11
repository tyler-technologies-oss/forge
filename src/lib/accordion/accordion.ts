import { customElement, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ExpansionPanelComponent } from '../expansion-panel';
import { AccordionAdapter } from './accordion-adapter';
import { ACCORDION_CONSTANTS } from './accordion-constants';
import { AccordionCore } from './accordion-core';

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
@customElement({
  name: ACCORDION_CONSTANTS.elementName,
  dependencies: [ExpansionPanelComponent]
})
export class AccordionComponent extends BaseComponent implements IAccordionComponent {
  public static get observedAttributes(): string[] {
    return [ACCORDION_CONSTANTS.attributes.PANEL_SELECTOR];
  }

  private _core: AccordionCore;

  constructor() {
    super();
    this._core = new AccordionCore(new AccordionAdapter(this));
  }

  public initializedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case ACCORDION_CONSTANTS.attributes.PANEL_SELECTOR:
        this.panelSelector = newValue;
        break;
    }
  }

  /**
   * Gets/sets the selector to use for finding the child expansion panels. Defaults to searching the direct children for `<forge-expansion-panel>` elements.
   * @attribute panel-selector
   */
  @coreProperty()
  public declare panelSelector: string;
}
