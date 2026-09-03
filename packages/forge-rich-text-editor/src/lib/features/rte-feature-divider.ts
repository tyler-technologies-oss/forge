import { defineDividerComponent } from '@tylertech/forge';
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { featureHostStyles } from './core/feature-styles';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-feature-divider': RichTextFeatureDividerComponent;
  }
}

export const RichTextFeatureDividerComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-feature-divider';

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
@customElement(RichTextFeatureDividerComponentTagName)
export class RichTextFeatureDividerComponent extends LitElement {
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
