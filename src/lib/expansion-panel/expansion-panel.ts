import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ExpansionPanelAdapter } from './expansion-panel-adapter';
import { EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';
import { ExpansionPanelFoundation } from './expansion-panel-foundation';

import template from './expansion-panel.html';
import styles from './expansion-panel.scss';

export interface IExpansionPanelComponent extends IBaseComponent {
  open: boolean;
  useAnimations: boolean;
  openCallback: () => void | Promise<void>;
  closeCallback: () => void | Promise<void>;
  orientation: string;
  toggle(): void;
  setOpenImmediate(open: boolean): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-expansion-panel': IExpansionPanelComponent;
  }

  interface HTMLElementEventMap {
    'forge-expansion-panel-toggle': CustomEvent<boolean>;
  }
}

/**
 * A web component that encapsulates the functionality of expanding/collapsing content when clicked.
 */
@CustomElement({
  name: EXPANSION_PANEL_CONSTANTS.elementName
})
export class ExpansionPanelComponent extends BaseComponent implements IExpansionPanelComponent {
  public static get observedAttributes(): string[] {
    return [
      EXPANSION_PANEL_CONSTANTS.attributes.OPEN,
      EXPANSION_PANEL_CONSTANTS.attributes.ORIENTATION,
      EXPANSION_PANEL_CONSTANTS.attributes.USE_ANIMATIONS
    ];
  }

  private _foundation: ExpansionPanelFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ExpansionPanelFoundation(new ExpansionPanelAdapter(this));
  }

  public initializedCallback(): void {
    this._foundation.initialize();
  }

  public connectedCallback(): void {
    this._foundation.connect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case EXPANSION_PANEL_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case EXPANSION_PANEL_CONSTANTS.attributes.ORIENTATION:
        this.orientation = newValue;
        break;
      case EXPANSION_PANEL_CONSTANTS.attributes.USE_ANIMATIONS:
        this.useAnimations = coerceBoolean(newValue);
        break;
    }
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  /** Controls the open state of the panel. */
  @FoundationProperty()
  public open: boolean;

  /**
   * Sets the function to call when the panel wants to open.
   * The function must return a promise which can be resolved to
   * open the panel or rejected which cancels the panel open.
   */
  @FoundationProperty()
  public openCallback: () => void | Promise<void>;

  /**
   * Sets the function to call when the panel wants to close.
   * The function must return a promise which can be resolved to
   * close the panel or rejected which cancels the panel close.
   */
  @FoundationProperty()
  public closeCallback: () => void | Promise<void>;

  /**
   * Sets the orientation of the panel expansion.
   * Valid values are 'vertical' (default) or 'horizontal'.
   */
  @FoundationProperty()
  public orientation: string;

  /** Gets/sets if animations are used in the expand/collapse transition. */
  @FoundationProperty()
  public useAnimations: boolean;

  /** Toggles the collapsed state. */
  public toggle(): void {
    this.open = !this.open;
  }

  /** Forces the expansion panel to expand/collapse without transition animations. */
  public setOpenImmediate(open: boolean): void {
    this._foundation.setOpenImmediate(open);
  }
}
