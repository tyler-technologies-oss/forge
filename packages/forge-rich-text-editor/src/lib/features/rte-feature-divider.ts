import { defineDividerComponent } from '@tylertech/forge';
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { featureHostStyles } from './core/feature-styles.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-feature-divider': RteFeatureDividerComponent;
  }
}

export const RTE_FEATURE_DIVIDER_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-rte-feature-divider';

/**
 * @tag forge-rte-feature-divider
 *
 * @summary
 * A vertical divider for separating groups of buttons in the rich text editor toolbar.
 *
 * @description
 * The divider component provides visual separation between groups of related toolbar buttons.
 * It renders a vertical line 24px tall. Use this component to organize the toolbar into logical
 * sections (e.g., separating text formatting from paragraph formatting).
 */
@customElement(RTE_FEATURE_DIVIDER_TAG_NAME)
export class RteFeatureDividerComponent extends LitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RTE_FEATURE_DIVIDER_TAG_NAME;

  static {
    defineDividerComponent();
  }

  public static override styles = [
    featureHostStyles,
    css`
      forge-divider {
        height: 24px;
      }
    `
  ];

  public override render(): TemplateResult {
    return html`<forge-divider vertical part="forge-divider" exportparts="root:forge-divider-root"></forge-divider>`;
  }
}
