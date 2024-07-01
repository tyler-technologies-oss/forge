import { IAccordionAdapter } from './accordion-adapter';
import { EXPANSION_PANEL_CONSTANTS } from '../expansion-panel/expansion-panel-constants';
import { IExpansionPanelComponent } from '../expansion-panel';
import { ACCORDION_CONSTANTS } from './accordion-constants';

export interface IAccordionCore {
  panelSelector: string;
}

export class AccordionCore implements IAccordionCore {
  private _panelSelector: string;
  private _hostInteractionCallback: (evt: CustomEvent<boolean>) => void = this._hostInteraction.bind(this);

  constructor(private _adapter: IAccordionAdapter) {}

  public initialize(): void {
    this._attachListeners();
  }

  private _attachListeners(): void {
    this._adapter.addHostListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, this._hostInteractionCallback);
  }

  private _hostInteraction(evt: CustomEvent<boolean>): void {
    if (!evt.detail || (this._panelSelector && !(evt.target as IExpansionPanelComponent).matches(this._panelSelector))) {
      return;
    }

    evt.stopPropagation();

    if (this._adapter.isNestedPanel(evt.target as IExpansionPanelComponent)) {
      return;
    }

    const panels = this._adapter.getChildPanels(this._panelSelector);
    panels.forEach(panel => {
      if (evt.target !== panel && !this._adapter.isNestedPanel(panel)) {
        panel.open = false;
      }
    });
  }

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
