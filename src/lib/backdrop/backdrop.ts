import { attachShadowTemplate, CustomElement, toggleAttribute } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { BACKDROP_CONSTANTS } from './backdrop-constants';

import template from './backdrop.html';
import styles from './backdrop.scss';

export interface IBackdropComponent extends IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-backdrop': IBackdropComponent;
  }
}

/**
 * @tag forge-backdrop
 */
@CustomElement({
  name: BACKDROP_CONSTANTS.elementName
})
export class BackdropComponent extends BaseComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public get state(): string | null {
    return this.getAttribute('state');
  }
  public set state(value: string | null) {
    const hasAttr = !!value && ['enter', 'exit'].includes(value);
    toggleAttribute(this, hasAttr, 'state', value as string);
  }
}
