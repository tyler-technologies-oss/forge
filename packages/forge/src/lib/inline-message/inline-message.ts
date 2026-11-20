import { customElement, attachShadowTemplate, toggleAttribute } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component.js';
import { InlineMessageTheme, InlineMessageVariant, INLINE_MESSAGE_CONSTANTS } from './inline-message-constants.js';

import template from './inline-message.html';
import styles from './inline-message.scss';

export interface IInlineMessageComponent extends IBaseComponent {
  theme: InlineMessageTheme;
  variant: InlineMessageVariant;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-inline-message': IInlineMessageComponent;
  }
}

/**
 * @tag forge-inline-message
 *
 * @summary Inline messages are used to provide feedback to the user about a specific action or state. Use inline messages to communicate information such as errors, warnings, or success messages in a way that is contextual to the content on the page.
 *
 * @property {InlineMessageTheme} [theme="info"] - The theme to apply. `default` is neutral; `info`, `success`, `warning`, and `error` (or `critical`) convey meaning. `primary`, `secondary`, `tertiary`, `info-secondary`, and `danger` are deprecated.
 * @property {InlineMessageVariant} [variant="tonal"] - The variant to apply. `tonal` uses a tinted background; `outlined` uses a lighter background with a border.
 *
 * @attribute {InlineMessageTheme} [theme="info"] - The theme to apply. `default` is neutral; `info`, `success`, `warning`, and `error` (or `critical`) convey meaning. `primary`, `secondary`, `tertiary`, `info-secondary`, and `danger` are deprecated.
 * @attribute {InlineMessageVariant} [variant="tonal"] - The variant to apply. `tonal` uses a tinted background; `outlined` uses a lighter background with a border.
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
 * @cssproperty --forge-inline-message-outlined-background - The background color in the outlined variant.
 * @cssproperty --forge-inline-message-outlined-border-width - The width of the inset border ring in the outlined variant.
 * @cssproperty --forge-inline-message-outlined-border-color - The color of the inset border ring in the outlined variant.
 *
 * @csspart root - The root layout element.
 * @csspart container - The container element for the title and message content.
 *
 * @cssclass forge-inline-message - The inline message container element.
 * @cssclass forge-inline-message__title - The title element.
 * @cssclass forge-inline-message__icon - The icon element.
 * @cssclass forge-inline-message--outlined - Applies the outlined variant.
 *
 * @slot - The message text.
 * @slot title - The title of the inline message.
 * @slot icon - The icon to display.
 */
@customElement({
  name: INLINE_MESSAGE_CONSTANTS.elementName
})
export class InlineMessageComponent extends BaseComponent implements IInlineMessageComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public get theme(): InlineMessageTheme {
    return (this.getAttribute(INLINE_MESSAGE_CONSTANTS.attributes.THEME) as InlineMessageTheme) ?? INLINE_MESSAGE_CONSTANTS.defaults.THEME;
  }
  public set theme(value: InlineMessageTheme) {
    toggleAttribute(this, value !== INLINE_MESSAGE_CONSTANTS.defaults.THEME, INLINE_MESSAGE_CONSTANTS.attributes.THEME, value);
  }

  public get variant(): InlineMessageVariant {
    return (this.getAttribute(INLINE_MESSAGE_CONSTANTS.attributes.VARIANT) as InlineMessageVariant) ?? INLINE_MESSAGE_CONSTANTS.defaults.VARIANT;
  }
  public set variant(value: InlineMessageVariant) {
    toggleAttribute(this, value !== INLINE_MESSAGE_CONSTANTS.defaults.VARIANT, INLINE_MESSAGE_CONSTANTS.attributes.VARIANT, value);
  }
}
