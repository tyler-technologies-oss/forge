import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { featureHostStyles } from './core/feature-styles.js';

import './rte-bold.js';
import './rte-italic.js';
import './rte-underline.js';
import './rte-strike.js';
import './rte-bullet-list.js';
import './rte-ordered-list.js';
import './rte-heading.js';
import './rte-align.js';
import './rte-undo-redo.js';
import './rte-divider.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-standard-tools': RteStandardToolsComponent;
  }
}

export const RTE_STANDARD_TOOLS_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-rte-standard-tools';

/**
 * @tag forge-rte-standard-tools
 *
 * @summary
 * A convenience component that bundles common text formatting features into a single toolbar.
 *
 * @description
 * The Standard Tools component provides the most commonly used text formatting features including:
 * - Headings (H1, H2, H3)
 * - Text styling (bold, italic, underline, strikethrough)
 * - Lists (bulleted and numbered)
 * - Text alignment (left, center, right, justify)
 * - Undo/Redo
 *
 * Each feature can be customized by passing properties to this component, which forwards them
 * to the individual feature components.
 *
 * @dependency forge-rte-undo-redo
 * @dependency forge-rte-heading
 * @dependency forge-rte-bold
 * @dependency forge-rte-italic
 * @dependency forge-rte-underline
 * @dependency forge-rte-strike
 * @dependency forge-rte-align
 * @dependency forge-rte-bullet-list
 * @dependency forge-rte-ordered-list
 * @dependency forge-rte-divider
 */
@customElement(RTE_STANDARD_TOOLS_TAG_NAME)
export class RteStandardToolsComponent extends LitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RTE_STANDARD_TOOLS_TAG_NAME;

  public static override styles = featureHostStyles;

  public override render(): TemplateResult {
    return html`
      <forge-rte-heading></forge-rte-heading>
      <forge-rte-divider></forge-rte-divider>
      <forge-rte-bold></forge-rte-bold>
      <forge-rte-italic></forge-rte-italic>
      <forge-rte-underline></forge-rte-underline>
      <forge-rte-strike></forge-rte-strike>
      <forge-rte-divider></forge-rte-divider>
      <forge-rte-bullet-list></forge-rte-bullet-list>
      <forge-rte-ordered-list></forge-rte-ordered-list>
      <forge-rte-divider></forge-rte-divider>
      <forge-rte-align></forge-rte-align>
      <forge-rte-divider></forge-rte-divider>
      <forge-rte-undo-redo></forge-rte-undo-redo>
    `;
  }
}
