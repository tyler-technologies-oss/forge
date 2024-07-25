import { attachShadowTemplate, coerceBoolean, coreProperty, customElement } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core';
import { FocusIndicatorComponent } from '../focus-indicator';
import { StateLayerComponent } from '../state-layer';
import { SkipLinkAdapter } from './skip-link-adapter';
import { SKIP_LINK_CONSTANTS, SkipLinkTheme } from './skip-link-constants';
import { SkipLinkCore } from './skip-link-core';

import template from './skip-link.html';
import style from './skip-link.scss';

export interface ISkipLinkComponent extends IBaseComponent {
  target: string;
  theme: SkipLinkTheme;
  muted: boolean;
  persistent: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-skip-link': ISkipLinkComponent;
  }
}

/**
 * @tag forge-skip-link
 *
 * @summary The Forge Skip Link component is used to provide a way for users to skip repetitive content and navigate directly to a section of the page.
 *
 * @prop {string} [target=''] - The IDREF of the element to which the skip link should navigate.
 * @property {SkipLinkTheme} [theme='default'] - The theme applied to the skip link.
 * @property {boolean} [muted=false] - Whether or not the skip link uses a muted color scheme.
 * @property {boolean} [persistent=false] - Whether or not the skip link should remain visible when not focused.
 *
 * @attribute {string} [target=''] - The IDREF of the element to which the skip link should navigate.
 * @attribute {SkipLinkTheme} [theme='default'] - The theme applied to the skip link.
 * @attribute {boolean} [muted=false] - Whether or not the skip link uses a muted color scheme.
 * @attribute {boolean} [persistent=false] - Whether or not the skip link should remain visible when not focused.
 *
 * @cssproperty --forge-skip-link-background - The background color of the skip link.
 * @cssproperty --forge-skip-link-color - The text color of the skip link.
 * @cssproperty --forge-skip-link-shape - The border radius of the skip link.
 * @cssproperty --forge-skip-link-inset - The skip link's inset from the edge of the viewport.
 * @cssproperty --forge-skip-link-z-index - The z-index of the skip link.
 * @cssproperty --forge-skip-link-elevation - The box shadow of the skip link.
 * @cssproperty --forge-skip-link-padding-block - The interior padding of the skip link along the block axis.
 * @cssproperty --forge-skip-link-padding-inline - The interior padding of the skip link along the inline axis.
 * @cssproperty --forge-skip-link-focus-indicator-color - The color of the focus indicator.
 * @cssproperty --forge-skip-link-transition-duration - The duration of the skip link's animations.
 * @cssproperty --forge-skip-link-transition-timing-function - The timing function of the skip link's animations.
 *
 * @csspart root - The root anchor element.
 * @csspart focus-indicator - The focus indicator element.
 * @csspart state-layer - The state layer element.
 *
 * @slot - The default/unnamed slot for link text.
 */
@customElement({
  name: SKIP_LINK_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent]
})
export class SkipLinkComponent extends BaseComponent implements ISkipLinkComponent {
  public static get observedAttributes(): string[] {
    return Object.values(SKIP_LINK_CONSTANTS.observedAttributes);
  }

  private _core: SkipLinkCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, style);
    this._core = new SkipLinkCore(new SkipLinkAdapter(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SKIP_LINK_CONSTANTS.observedAttributes.TARGET:
        this.target = newValue;
        break;
      case SKIP_LINK_CONSTANTS.observedAttributes.THEME:
        this.theme = newValue as SkipLinkTheme;
        break;
      case SKIP_LINK_CONSTANTS.observedAttributes.MUTED:
        this.muted = coerceBoolean(newValue);
        break;
      case SKIP_LINK_CONSTANTS.observedAttributes.PERSISTENT:
        this.persistent = coerceBoolean(newValue);
        break;
    }
  }

  @coreProperty()
  public declare target: string;

  @coreProperty()
  public declare theme: SkipLinkTheme;

  @coreProperty()
  public declare muted: boolean;

  @coreProperty()
  public declare persistent: boolean;
}
