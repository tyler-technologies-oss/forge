import { CustomElement, attachShadowTemplate, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { TabAdapter } from './tab-adapter';
import { TabFoundation } from './tab-foundation';
import { TAB_CONSTANTS, ITabDimensions } from './tab-constants';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import template from './tab.html';
import styles from './tab.scss';

export interface ITabComponent extends IBaseComponent {
  disabled: boolean;
  active: boolean;
  stretch: boolean;
  activate(previousIndicatorClientRect?: DOMRect): void;
  deactivate(): void;
  computeIndicatorBounds(): DOMRect | undefined;
  computeDimensions(): ITabDimensions;
  setTabIndex(value: number): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tab': ITabComponent;
  }

  interface HTMLElementEventMap {
    'forge-tab-interacted': CustomEvent<void>;
  }
}

/**
 * The web component class behind the `<forge-tab>` custom element.
 * 
 * @tag forge-tab
 */
@CustomElement({
  name: TAB_CONSTANTS.elementName
})
export class TabComponent extends BaseComponent implements ITabComponent {
  public static get observedAttributes(): string[] {
    return [
      TAB_CONSTANTS.attributes.DISABLED,
      TAB_CONSTANTS.attributes.ACTIVE,
      TAB_CONSTANTS.attributes.STRETCH
    ];
  }

  private _foundation: TabFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new TabFoundation(new TabAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TAB_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case TAB_CONSTANTS.attributes.ACTIVE:
        this.active = coerceBoolean(newValue);
        break;
      case TAB_CONSTANTS.attributes.STRETCH:
        this.stretch = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public disabled: boolean;
  
  @FoundationProperty()
  public active: boolean;
  
  @FoundationProperty()
  public stretch: boolean;

  public activate(previousIndicatorClientRect?: DOMRect): void {
    this._foundation.activate(previousIndicatorClientRect);
  }

  public deactivate(): void {
    this._foundation.deactivate();
  }
  
  public computeIndicatorBounds(): DOMRect | undefined {
    return this._foundation.computeIndicatorBounds();
  }

  public computeDimensions(): ITabDimensions {
    return this._foundation.computeDimensions();
  }

  public override focus(): void {
    this._foundation.focus();
  }

  public setTabIndex(value: number): void {
    this._foundation.setTabIndex(value);
  }
}
