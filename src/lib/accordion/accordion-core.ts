import { ICustomElementCore } from '@tylertech/forge-core';

import { IAccordionAdapter } from './accordion-adapter';
import { EXPANSION_PANEL_CONSTANTS } from '../expansion-panel/expansion-panel-constants';
import { IExpansionPanelComponent } from '../expansion-panel';
import { ACCORDION_CONSTANTS } from './accordion-constants';

export interface IAccordionCore extends ICustomElementCore {
  panelSelector: string;
}

export class AccordionCore implements IAccordionCore {
  private _panelSelector: string;
  private _hostInteractionCallback?: (evt: Event) => void;

  constructor(private _adapter: IAccordionAdapter) {}

  public initialize(): void {
    this._attachListeners();
  }

  public disconnect(): void {
    this._detachListeners();
  }

  private _attachListeners(): void {
    this._hostInteractionCallback = (evt: CustomEvent) => this._hostInteraction(evt);
    this._adapter.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, this._hostInteractionCallback, this._adapter.getHostElement());
  }

  private _detachListeners(): void {
    if (this._hostInteractionCallback) {
      this._adapter.removeEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, this._hostInteractionCallback, this._adapter.getHostElement());
      this._hostInteractionCallback = undefined;
    }
  }

  private _hostInteraction(evt: CustomEvent): void {
    switch (evt.type) {
      case EXPANSION_PANEL_CONSTANTS.events.TOGGLE:
        if (evt.detail) {
          evt.stopPropagation();
          const evtTarget = evt.target as IExpansionPanelComponent;

          if (this._adapter.isNestedPanel(evtTarget)) {
            return;
          }

          this._adapter.getChildPanels(this._panelSelector).forEach(panel => {
            if (evtTarget !== panel && !this._adapter.isNestedPanel(panel)) {
              panel.open = false;
            }
          });
        }
        break;
      default:
        break;
    }
  }

  /** Gets/sets the selector to use for finding the child expansion panels. Defaults to searching the direct children for `<forge-expansion-panel>` elements. */
  public get panelSelector(): string {
    return this._panelSelector;
  }
  public set panelSelector(value: string) {
    if (this._panelSelector !== value) {
      this._panelSelector = value;
      this._adapter.setHostAttribute(ACCORDION_CONSTANTS.attributes.PANEL_SELECTOR, this._panelSelector);
    }
  }
}
