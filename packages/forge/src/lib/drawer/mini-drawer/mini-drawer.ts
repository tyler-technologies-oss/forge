import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { toggleState } from '../../core/utils/utils.js';
import { BaseDrawerComponent, IBaseDrawerComponent } from '../base/base-drawer.js';
import { MINI_DRAWER_CONSTANTS } from './mini-drawer-constants.js';

import styles from './mini-drawer.scss';

/** @deprecated - This will be removed in the future. Please switch to using MiniDrawerComponent. */
export interface IMiniDrawerComponent extends IBaseDrawerComponent {
  hover: boolean;
}

/**
 * @tag forge-mini-drawer
 *
 * @summary A compact navigation drawer component that displays as a narrow rail and optionally expands on hover to show full content.
 *
 * @cssproperty --forge-mini-drawer-width - The width of the drawer.
 * @cssproperty --forge-mini-drawer-min-width - The minimum width of the drawer. Defaults to match the width.
 * @cssproperty --forge-mini-drawer-hover-width - The width of the drawer when hovered.
 * @cssproperty --forge-mini-drawer-transition-duration - The transition duration of the drawer.
 * @cssproperty --forge-mini-drawer-transition-easing - The transition timing function of the drawer.
 * @cssproperty --forge-mini-drawer-delay - The delay before the drawer closes when the mouse leaves the drawer.
 * @cssproperty --forge-mini-drawer-hover-transition-duration - The transition duration of the drawer when hovered.
 * @cssproperty --forge-mini-drawer-hover-transition-easing - The transition timing function of the drawer when hovered.
 * @cssproperty --forge-mini-drawer-hover-transition-delay - The delay before the drawer closes when the mouse leaves the drawer when hovered.
 * @cssproperty --forge-drawer-width - The width of the drawer.
 * @cssproperty --forge-drawer-background - The background color of the drawer.
 * @cssproperty --forge-drawer-border-color - The border of the drawer.
 * @cssproperty --forge-drawer-border-width - The border width of the drawer.
 * @cssproperty --forge-drawer-transition-duration - The transition duration of the drawer.
 * @cssproperty --forge-drawer-transition-easing - The transition timing function of the drawer.
 * @cssproperty --forge-drawer-duration-close - The duration of the drawer closing animation.
 *
 * @slot - The content to display in the scrollable content container.
 * @slot header - The header content above the main content.
 * @slot footer - The footer content below the main content.
 *
 * @csspart root - The component's root element.
 * @csspart container - The container element around the content.
 * @csspart content - The content container element.
 */
@customElement(MINI_DRAWER_CONSTANTS.elementName)
export class MiniDrawerComponent extends BaseDrawerComponent implements IMiniDrawerComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = MINI_DRAWER_CONSTANTS.elementName;

  // TODO: Remove attribute reflection

  /**
   * Whether the drawer expands on hover.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public hover = false;

  protected override _fixContentWidthWhileAnimating = false;

  public willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('hover')) {
      toggleState(this._internals, 'hover', this.hover);
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="root" part="root">
        <div class="forge-drawer mini" part="container" ${ref(this._drawerElement)}>
          <slot name="header"></slot>
          <div class="content" part="content">
            <slot></slot>
          </div>
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-mini-drawer': IMiniDrawerComponent;
  }
}
