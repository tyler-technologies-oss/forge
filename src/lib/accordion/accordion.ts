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
 * @summary Accordions wrap a collection of expansion panels to ensure that only one panel is expanded at a time.
 *
 * @dependency forge-expansion-panel
 *
 * @fires {CustomEvent<IExpansionPanelComponent>} forge-accordion-toggle - Dispatched when a child expansion panel is toggled. Includes the related expansion panel element in the event detail.
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

  public connectedCallback(): void {
    this._core.initialize();
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
   * Use this if you need to scope this accordion to a specific set of expansion panels, or your expansion panels are not direct children of the accordion.
   * @attribute panel-selector
   */
  @coreProperty()
  declare public panelSelector: string;
}
