import { CustomElement, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { INLINE_MESSAGE_CONSTANTS } from './inline-message-constants';

import template from './inline-message.html';
import styles from './inline-message.scss';

export interface IInlineMessageComponent extends IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-inline-message': IInlineMessageComponent;
  }
}

/**
 * The web component class behind the `<forge-inline-message>` custom element.
 * 
 * @tag forge-inline-message
 */
@CustomElement({
  name: INLINE_MESSAGE_CONSTANTS.elementName
})
export class InlineMessageComponent extends BaseComponent implements IInlineMessageComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }
}
