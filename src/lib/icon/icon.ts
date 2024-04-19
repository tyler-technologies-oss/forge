import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { IconAdapter } from './icon-adapter';
import { IconFoundation } from './icon-foundation';
import { ICON_CONSTANTS, IconUrlBuilder, IconExternalType, IconTheme } from './icon-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './icon.html';
import styles from './icon.scss';

export interface IIconProperties {
  name: string | undefined;
  src: string | undefined;
  lazy: boolean;
  external: boolean;
  externalType: IconExternalType;
  externalUrlBuilder: IconUrlBuilder;
  theme: IconTheme;
  viewbox: string;
}

export interface IIconComponent extends IIconProperties, IBaseComponent {
  layout(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-icon': IIconComponent;
  }
}

/**
 * @tag forge-icon
 * 
 * @summary Icons are used to represent information visually
 * 
 * @property {string} name - The name of the icon to render.
 * @property {string} src - Provides the ability to set the SVG string content directly.
 * @property {boolean} lazy - Controls whether the icon will be loaded dynamically when it comes into view. False by default.
 * @property {boolean} external - Controls whether external network requests are allowed for this icon. Only pertains for icons that aren't already defined in the registry.
 * @property {IconExternalType} externalType - The type of icon to load externally. Possible values: "standard" (default), "extended", "custom".
 * @property {IconUrlBuilder} externalUrlBuilder - A callback that can be provided to generate a URL that will be used to fetch an SVG icon.
 * @property {string} viewbox - A custom value to apply to the `viewBox` attribute on the internal `<svg>` element.
 * @property {IconTheme} theme - The theme to apply to the icon.
 * 
 * @attribute {string} name - The name of the icon to render.
 * @attribute {string} src - Provides the ability to set the SVG string content directly.
 * @attribute {boolean} lazy - Controls whether the icon will be loaded dynamically when it comes into view. False by default.
 * @attribute {boolean} external - Controls whether external network requests are allowed for this icon. Only pertains for icons that aren't already defined in the registry.
 * @attribute {IconExternalType} externalType - The type of icon to load externally. Possible values: "standard" (default), "extended", "custom".
 * @attribute {string} viewbox - A custom value to apply to the `viewBox` attribute on the internal `<svg>` element.
 * @attribute {IconTheme} theme - The theme to apply to the icon.
 * 
 * @method layout - Forces a reload of the icon content.
 * 
 * @cssproperty --forge-icon-color - The color of the icon.
 * @cssproperty --forge-icon-size - The size of the icon. Defaults to the font-size of the context it is placed in.
 * @cssproperty --forge-icon-width - The width of the icon.
 * @cssproperty --forge-icon-height - The height of the icon.
 * @cssproperty --forge-icon-font-size - The font size of the icon.
 * 
 * @csspart svg - The internal SVG element.
 */
@CustomElement({
  name: ICON_CONSTANTS.elementName
})
export class IconComponent extends BaseComponent implements IIconComponent {
  public static get observedAttributes(): string[] {
    return Object.values(ICON_CONSTANTS.observedAttributes);
  }

  private _foundation: IconFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new IconFoundation(new IconAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case ICON_CONSTANTS.observedAttributes.NAME:
        this.name = newValue;
        break;
      case ICON_CONSTANTS.observedAttributes.SRC:
        this.src = newValue;
        break;
      case ICON_CONSTANTS.observedAttributes.LAZY:
        this.lazy = coerceBoolean(newValue);
        break;
      case ICON_CONSTANTS.observedAttributes.EXTERNAL:
        this.external = coerceBoolean(newValue);
        break;
      case ICON_CONSTANTS.observedAttributes.EXTERNAL_TYPE:
        this.externalType = newValue as IconExternalType;
        break;
      case ICON_CONSTANTS.observedAttributes.VIEWBOX:
        this.viewbox = newValue;
        break;
      case ICON_CONSTANTS.observedAttributes.THEME:
        this.theme = newValue as IconTheme;
        break;
    }
  }

  /** The name of the icon within the icon registry to be used. */
  @FoundationProperty()
  public declare name: string | undefined;

  /** Provides the ability to set the SVG string content directly. */
  @FoundationProperty()
  public declare src: string | undefined;

  /** Controls whether the icon will be loaded dynamically when it comes into view. False by default. */
  @FoundationProperty()
  public declare lazy: boolean;

  /** Controls whether external network requests are allowed for this icon. Only pertains for icons that aren't defined in the registry. */
  @FoundationProperty()
  public declare external: boolean;

  /** The type of icon to load externally. Possible values: "standard", "extended", "custom". */
  @FoundationProperty()
  public declare externalType: IconExternalType;

  /** A callback that can be provided to generate a URL that will be used to fetch an SVG icon. */
  @FoundationProperty()
  public declare externalUrlBuilder: IconUrlBuilder;

  /** A custom value to apply to the `viewBox` attribute on the internal `<svg>` element. */
  @FoundationProperty()
  public declare viewbox: string;

  @FoundationProperty()
  public declare theme: IconTheme;

  /** Forces a reload of the icon. */
  public layout(): void {
    this._foundation.layout();
  }
}
