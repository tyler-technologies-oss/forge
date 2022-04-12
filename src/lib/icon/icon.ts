import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { IconAdapter } from './icon-adapter';
import { IconFoundation } from './icon-foundation';
import { ICON_CONSTANTS, IconUrlBuilder, IconExternalType } from './icon-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './icon.html';
import styles from './icon.scss';

export interface IIconComponent extends IBaseComponent {
  name: string | undefined;
  src: string | undefined;
  lazy: boolean;
  external: boolean;
  externalType: IconExternalType;
  externalUrlBuilder: IconUrlBuilder;
  viewbox: string;
  layout(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-icon': IIconComponent;
  }
}

@CustomElement({
  name: ICON_CONSTANTS.elementName
})
export class IconComponent extends BaseComponent implements IIconComponent {
  public static get observedAttributes(): string[] {
    return [
      ICON_CONSTANTS.attributes.NAME,
      ICON_CONSTANTS.attributes.SRC,
      ICON_CONSTANTS.attributes.LAZY,
      ICON_CONSTANTS.attributes.EXTERNAL,
      ICON_CONSTANTS.attributes.EXTERNAL_TYPE,
      ICON_CONSTANTS.attributes.VIEWBOX
    ];
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
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case ICON_CONSTANTS.attributes.NAME:
        this.name = newValue;
        break;
      case ICON_CONSTANTS.attributes.SRC:
        this.src = newValue;
        break;
      case ICON_CONSTANTS.attributes.LAZY:
        this.lazy = coerceBoolean(newValue);
        break;
      case ICON_CONSTANTS.attributes.EXTERNAL:
        this.external = coerceBoolean(newValue);
        break;
      case ICON_CONSTANTS.attributes.EXTERNAL_TYPE:
        this.externalType = newValue as IconExternalType;
        break;
      case ICON_CONSTANTS.attributes.VIEWBOX:
        this.viewbox = newValue;
        break;
    }
  }

  /** The name of the icon within the icon registry to be used. */
  @FoundationProperty()
  public name: string | undefined;

  /** Provides the ability to set the SVG string content directly. */
  @FoundationProperty()
  public src: string | undefined;

  /** Controls whether the icon will be loaded dynamically when it comes into view. False by default. */
  @FoundationProperty()
  public lazy: boolean;

  /** Controls whether external network requests are allowed for this icon. Only pertains for icons that aren't defined in the registry. */
  @FoundationProperty()
  public external: boolean;

  /** The type of icon to load externally. Possible values: "standard", "extended", "custom". */
  @FoundationProperty()
  public externalType: IconExternalType;

  /** A callback that can be provided to generate a URL that will be used to fetch an SVG icon. */
  @FoundationProperty()
  public externalUrlBuilder: IconUrlBuilder;

  /** A custom value to apply to the `viewBox` attribute on the internal `<svg>` element. */
  @FoundationProperty()
  public viewbox: string;

  /** Forces a reload of the icon. */
  public layout(): void {
    this._foundation.layout();
  }
}
