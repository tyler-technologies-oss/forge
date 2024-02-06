import { CustomElement, attachShadowTemplate, toggleAttribute } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { InlineMessageTheme, INLINE_MESSAGE_CONSTANTS } from './inline-message-constants';

import template from './inline-message.html';
import styles from './inline-message.scss';

export interface IInlineMessageComponent extends IBaseComponent {
  theme: InlineMessageTheme;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-inline-message': IInlineMessageComponent;
  }
}

/** 
 * @tag forge-inline-message
 * 
 * @summary Inline messages are used to provide feedback to the user about a specific action or state.
 * 
 * @property {InlineMessageTheme} theme - The theme to apply. Defaults to `"info"`.
 * 
 * @attribute {InlineMessageTheme} theme - The theme to apply. Defaults to `"info"`.
 * 
 * @cssproperty --forge-inline-message-background - The background color.
 * @cssproperty --forge-inline-message-color - The text color.
 * @cssproperty --forge-inline-message-shape - The shape (border) radius.
 * @cssproperty --forge-inline-message-padding - The padding around the content.
 * @cssproperty --forge-inline-message-padding-inline - The inline padding around the content.
 * @cssproperty --forge-inline-message-padding-block - The block padding around the content.
 * @cssproperty --forge-inline-message-border-width - The border width.
 * @cssproperty --forge-inline-message-border-style - The border style. Defaults to `none`.
 * @cssproperty --forge-inline-message-border-color - The border color.
 * @cssproperty --forge-inline-message-gap - The gap/space between the content elements.
 * @cssproperty --forge-inline-message-icon-gap - The gap/space between the icon and the content.
 * @cssproperty --forge-inline-message-content-gap - The gap/space between the title and the message.
 * @cssproperty --forge-inline-message-icon-color - The icon color.
 * 
 * @csspart root - The root layout element.
 * @csspart container - The container element for the title and message content.
 * 
 * @slot - The message text.
 * @slot title - The title of the inline message.
 * @slot icon - The icon to display.
 */
@CustomElement({
  name: INLINE_MESSAGE_CONSTANTS.elementName
})
export class InlineMessageComponent extends BaseComponent implements IInlineMessageComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public get theme(): InlineMessageTheme {
    return this.getAttribute(INLINE_MESSAGE_CONSTANTS.attributes.THEME) as InlineMessageTheme ?? INLINE_MESSAGE_CONSTANTS.defaults.THEME;
  }
  public set theme(value: InlineMessageTheme) {
    toggleAttribute(this, value !== INLINE_MESSAGE_CONSTANTS.defaults.THEME, INLINE_MESSAGE_CONSTANTS.attributes.THEME, value);
  }
}
