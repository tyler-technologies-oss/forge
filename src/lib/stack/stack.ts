import { CustomElement, attachShadowTemplate, ICustomElement } from '@tylertech/forge-core';
import { StackAdapter } from './stack-adapter';
import { StackFoundation } from './stack-foundation';
import { STACK_CONSTANTS } from './stack-constants';

import template from './stack.html';
import styles from './stack.scss';

export interface IStackComponent extends ICustomElement {

}

declare global {
  interface HTMLElementTagNameMap {
    'forge-stack': IStackComponent;
  }
}

@CustomElement({
  name: STACK_CONSTANTS.elementName
})
export class StackComponent extends HTMLElement implements IStackComponent {
  public static get observedAttributes(): string[] {
    return [];
  }

  private _foundation: StackFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new StackFoundation(new StackAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {

  }
}
