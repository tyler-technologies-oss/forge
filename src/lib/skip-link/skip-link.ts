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
 * @prop {string} [target] - The IDREF of the element to which the skip link should navigate.
 * @property {SkipLinkTheme} [theme] - The theme applied to the skip link.
 * @property {boolean} [muted=false] - Whether or not the skip link uses a muted color scheme.
 * @property {boolean} [persistent=false] - Whether or not the skip link should remain visible when not focused.
 *
 * @attribute {string} [target] - The IDREF of the element to which the skip link should navigate.
 * @attribute {SkipLinkTheme} [theme] - The theme applied to the skip link.
 * @attribute {boolean} [muted=false] - Whether or not the skip link uses a muted color scheme.
 * @attribute {boolean} [persistent=false] - Whether or not the skip link should remain visible when not focused.
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
