import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { removeDefaultAttribute } from '../core/utils/lit-utils.js';
import { InlineMessageTheme, INLINE_MESSAGE_CONSTANTS } from './inline-message-constants.js';

import styles from './inline-message.scss';

const DEFAULT_THEME = INLINE_MESSAGE_CONSTANTS.defaults.THEME as InlineMessageTheme;

/** @deprecated - This will be removed in the future. Please switch to using InlineMessageComponent. */
export interface IInlineMessageComponent extends BaseLitElement {
  theme: InlineMessageTheme;
}

/**
 * @tag forge-inline-message
 *
 * @summary Inline messages are used to provide feedback to the user about a specific action or state. Use inline messages to communicate information such as errors, warnings, or success messages in a way that is contextual to the content on the page.
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
 * @cssclass forge-inline-message - The inline message container element.
 * @cssclass forge-inline-message__title - The title element.
 * @cssclass forge-inline-message__icon - The icon element.
 *
 * @slot - The message text.
 * @slot title - The title of the inline message.
 * @slot icon - The icon to display.
 */
export class InlineMessageComponent extends BaseLitElement implements IInlineMessageComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = INLINE_MESSAGE_CONSTANTS.elementName;

  /**
   * The theme to apply.
   * @default 'info'
   * @attribute
   */
  @property({
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => (value ?? DEFAULT_THEME) as InlineMessageTheme,
      toAttribute: (value: InlineMessageTheme) => removeDefaultAttribute(value, DEFAULT_THEME)
    }
  })
  public theme: InlineMessageTheme = DEFAULT_THEME;

  public render(): TemplateResult {
    return html`
      <div class="forge-inline-message" part="root">
        <slot name="icon"></slot>
        <div class="container" part="container">
          <slot name="title"></slot>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

tryDefine(INLINE_MESSAGE_CONSTANTS.elementName, InlineMessageComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-inline-message': IInlineMessageComponent;
  }
}
