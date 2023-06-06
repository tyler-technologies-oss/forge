import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty } from '@tylertech/forge-core';
import { PopoverAdapter } from './popover-adapter';
import { PopoverFoundation } from './popover-foundation';
import { POPOVER_CONSTANTS } from './popover-constants';

import template from './popover.html';
import styles from './popover.scss';
import { OverlayComponent } from '../overlay';
import { BaseComponent } from '../core';

export interface IPopoverComponent extends ICustomElement {
  targetElement: HTMLElement;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-popover': IPopoverComponent;
  }
}

/**
 * The custom element class behind the `<forge-popover>` element.
 * 
 * @tag forge-popover
 */
@CustomElement({
  name: POPOVER_CONSTANTS.elementName,
  dependencies: [OverlayComponent]
})
export class PopoverComponent extends BaseComponent implements IPopoverComponent {
  public static get observedAttributes(): string[] {
    return [];
  }

  private _foundation: PopoverFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new PopoverFoundation(new PopoverAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {

  }

  @FoundationProperty()
  public targetElement: HTMLElement;
}
