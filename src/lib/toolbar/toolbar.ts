import { CustomElement, attachShadowTemplate, getShadowElement, coerceBoolean } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import { TOOLBAR_CONSTANTS } from './toolbar-constants';

import template from './toolbar.html';
import styles from './toolbar.scss?inline';

export interface IToolbarComponent extends IBaseComponent {
  inverted: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-toolbar': IToolbarComponent;
  }
}

/**
 * The web component class behind the `<forge-toolbar>` custom element.
 * 
 * @tag forge-toolbar
 */
@CustomElement({
  name: TOOLBAR_CONSTANTS.elementName
})
export class ToolbarComponent extends BaseComponent implements IToolbarComponent {
  public static get observedAttributes(): string[] {
    return [
      TOOLBAR_CONSTANTS.attributes.INVERTED
    ];
  }
  
  private _rootElement: HTMLElement;
  private _inverted = false;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._rootElement = getShadowElement(this, TOOLBAR_CONSTANTS.selectors.TOOLBAR);
  }

  public connectedCallback(): void {
    this._initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TOOLBAR_CONSTANTS.attributes.INVERTED:
        this.inverted = coerceBoolean(newValue);
        break;
    }
  }

  private _initialize(): void {
    this._setInverted(this._inverted);
  }
  
  private _setInverted(isInverted: boolean): void {
    if (isInverted) {
      this._rootElement.classList.add(TOOLBAR_CONSTANTS.classes.INVERTED);
    } else {
      this._rootElement.classList.remove(TOOLBAR_CONSTANTS.classes.INVERTED);
    }
  }

  public get inverted(): boolean {
    return this._inverted;
  }
  public set inverted(value: boolean) {
    this._inverted = value;
    this._setInverted(this._inverted);
  }
}
