import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { SCAFFOLD_CONSTANTS } from './scaffold-constants.js';

import styles from './scaffold.scss';

/** @deprecated - This will be removed in the future. Please switch to using ScaffoldComponent. */
export interface IScaffoldComponent extends BaseLitElement {
  viewport: boolean;
}

/**
 * @tag forge-scaffold
 *
 * @summary The scaffold provides a generic layout structure for your content using common named areas. Use scaffolds for full page layouts or smaller sections within other elements where you want positioned content areas and scrollable body content.
 *
 * @cssproperty --forge-scaffold-height - The `height` of the scaffold.
 * @cssproperty --forge-scaffold-width - The `width` of the scaffold.
 * @cssproperty --forge-scaffold-overflow - The `overflow` of the scaffold.
 * @cssproperty --forge-scaffold-body-position - The `position` of the scaffold body.
 *
 * @csspart root - The root container element.
 * @csspart header - The header of the scaffold.
 * @csspart body - The body of the scaffold.
 *
 * @cssclass forge-scaffold - The scaffold container (required).
 * @cssclass forge-scaffold--viewport - Sizes the scaffold to match the viewport dimensions.
 * @cssclass forge-scaffold__left - The content to display in the "left" area.
 * @cssclass forge-scaffold__header - The content to display in the "header" area.
 * @cssclass forge-scaffold__body - The content to display in the "body" area.
 * @cssclass forge-scaffold__footer - The content to display in the "footer" area.
 *
 * @slot header - Places content in the header.
 * @slot body - Places content in the body.
 * @slot footer - Places content in the footer.
 * @slot left - Places content to the left of all content.
 * @slot right - Places content to the right of all content.
 * @slot body-header - Places content in the header of the body.
 * @slot body-footer - Places content in the footer of the body.
 * @slot body-left - Places content to the left of the body content.
 * @slot body-right - Places content to the right of the body content.
 */
export class ScaffoldComponent extends BaseLitElement implements IScaffoldComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = SCAFFOLD_CONSTANTS.elementName;

  /**
   * Whether the scaffold should be full viewport height.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public viewport = false;

  public render(): TemplateResult {
    return html`
      <div class="forge-scaffold" part="root">
        <slot name="left"></slot>
        <div class="header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="body" part="body">
          <slot name="body-left"></slot>
          <slot name="body-header"></slot>
          <slot name="body"></slot>
          <slot name="body-footer"></slot>
          <slot name="body-right"></slot>
        </div>
        <slot name="footer"></slot>
        <slot name="right"></slot>
      </div>
    `;
  }
}

tryDefine(SCAFFOLD_CONSTANTS.elementName, ScaffoldComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-scaffold': IScaffoldComponent;
  }
}
