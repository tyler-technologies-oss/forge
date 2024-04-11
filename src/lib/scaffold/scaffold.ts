import { CustomElement, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { SCAFFOLD_CONSTANTS } from './scaffold-constants';

import template from './scaffold.html';
import styles from './scaffold.scss';

export interface IScaffoldComponent extends IBaseComponent {
  viewport: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-scaffold': IScaffoldComponent;
  }
}

/**
 * @tag forge-scaffold
 */
@CustomElement({
  name: SCAFFOLD_CONSTANTS.elementName
})
export class ScaffoldComponent extends BaseComponent implements IScaffoldComponent {
  public static get observedAttributes(): string[] {
    return Object.values(SCAFFOLD_CONSTANTS.observedAttributes);
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SCAFFOLD_CONSTANTS.observedAttributes.VIEWPORT:
        this.viewport = newValue !== null;
        break;
    }
  }

  public get viewport(): boolean {
    return this.hasAttribute(SCAFFOLD_CONSTANTS.attributes.VIEWPORT);
  }
  public set viewport(value: boolean) {
    this.toggleAttribute(SCAFFOLD_CONSTANTS.attributes.VIEWPORT, Boolean(value));
  }
}
