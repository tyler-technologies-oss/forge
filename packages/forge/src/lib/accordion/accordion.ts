import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, elementParents } from '@tylertech/forge-core';
import { customElement, property } from 'lit/decorators.js';
import { IBaseComponent } from '../core/base/base-component.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.js';
import { emulateUserToggle } from '../expansion-panel/expansion-panel-constants.js';

/** @deprecated - This will be removed in the future. Please switch to using AccordionComponent. */
export interface IAccordionComponent extends IBaseComponent {
  panelSelector: string;
}

export const ACCORDION_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-accordion';

/**
 * @tag forge-accordion
 *
 * @summary Accordions wrap a collection of expansion panels to ensure that only one panel is expanded at a time.
 *
 * @dependency forge-expansion-panel
 *
 * @fires {CustomEvent<IExpansionPanelComponent>} forge-accordion-toggle - Dispatched when a child expansion panel is toggled. Includes the related expansion panel element in the event detail.
 */
@customElement(ACCORDION_TAG_NAME)
export class AccordionComponent extends BaseLitElement {
  /** @deprecated - Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = ACCORDION_TAG_NAME;

  /** @deprecated - Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ExpansionPanelComponent];

  // TODO: remove attribute reflection

  /**
   * Gets/sets the selector to use for finding the child expansion panels. Defaults to searching the direct children for `<forge-expansion-panel>` elements.
   * Use this if you need to scope this accordion to a specific set of expansion panels, or your expansion panels are not direct children of the accordion.
   * @attribute panel-selector
   */
  @property({ type: String, attribute: 'panel-selector', reflect: true })
  public panelSelector?: string;

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('forge-expansion-panel-toggle', this.#handleToggle.bind(this));
  }

  public override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  #handleToggle(evt: CustomEvent): void {
    if (!evt.detail || (this.panelSelector && !(evt.target as HTMLElement).matches(this.panelSelector))) {
      return;
    }

    evt.stopPropagation();

    if (this.#isNestedPanel(evt.target as HTMLElement)) {
      return;
    }

    const panels = this.#getChildPanels();
    panels.forEach(panel => {
      if (evt.target !== panel && !this.#isNestedPanel(panel)) {
        if (panel.open) {
          panel[emulateUserToggle](false);
        }
      }
    });

    this.dispatchEvent(new CustomEvent('forge-accordion-toggle', { detail: evt.target, bubbles: true, composed: true }));
  }

  #isNestedPanel(element: HTMLElement): boolean {
    if (!element || !this.contains(element)) {
      return false;
    }
    const parents = elementParents(element, this);
    return parents.some(el => el.tagName.toLocaleLowerCase() === 'forge-expansion-panel');
  }

  #getChildPanels(): ExpansionPanelComponent[] {
    if (this.panelSelector) {
      return Array.from(this.querySelectorAll(this.panelSelector)).filter(
        el => el.tagName.toLocaleLowerCase() === 'forge-expansion-panel'
      ) as ExpansionPanelComponent[];
    }
    const children = Array.from(this.children);
    return children.filter(child => child.tagName.toLocaleLowerCase() === 'forge-expansion-panel') as ExpansionPanelComponent[];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-accordion': AccordionComponent;
  }
}
