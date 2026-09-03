import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { featureHostStyles } from './core/feature-styles';

import './rte-bold';
import './rte-italic';
import './rte-underline';
import './rte-strike';
import './rte-bullet-list';
import './rte-ordered-list';
import './rte-heading';
import './rte-align';
import './rte-undo-redo';
import './rte-feature-divider';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-standard-tools': RteStandardToolsComponent;
  }
}

export const RteStandardToolsComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-standard-tools';

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
 */
@customElement(RteStandardToolsComponentTagName)
export class RteStandardToolsComponent extends LitElement {
  public static override styles = featureHostStyles;

  public override render(): TemplateResult {
    return html`
      <forge-rte-heading></forge-rte-heading>
      <forge-rte-feature-divider></forge-rte-feature-divider>
      <forge-rte-bold></forge-rte-bold>
      <forge-rte-italic></forge-rte-italic>
      <forge-rte-underline></forge-rte-underline>
      <forge-rte-strike></forge-rte-strike>
      <forge-rte-feature-divider></forge-rte-feature-divider>
      <forge-rte-bullet-list></forge-rte-bullet-list>
      <forge-rte-ordered-list></forge-rte-ordered-list>
      <forge-rte-feature-divider></forge-rte-feature-divider>
      <forge-rte-align></forge-rte-align>
      <forge-rte-feature-divider></forge-rte-feature-divider>
      <forge-rte-undo-redo></forge-rte-undo-redo>
    `;
  }
}
