import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconOpenInNew } from '@tylertech/tyler-icons';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { IconComponent, IconRegistry } from '../../icon/index.js';
import { ListItemComponent } from '../../list/list-item/index.js';

import '../../icon/icon.js';
import '../../list/list-item/list-item.js';

import styles from './app-launcher-link.scss';

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-launcher-link': AppLauncherLinkComponent;
  }
}

export const APP_LAUNCHER_LINK_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-app-launcher-link';

/**
 * @tag forge-app-launcher-link
 *
 * @summary A utility component for displaying custom links within the `forge-app-launcher` component.
 *
 * @meta extended
 *
 * @dependency forge-list-item
 * @dependency forge-icon
 *
 * @slot - The `<a>` element for the link.
 */
@customElement(APP_LAUNCHER_LINK_TAG_NAME)
export class AppLauncherLinkComponent extends BaseLitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = APP_LAUNCHER_LINK_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ListItemComponent, IconComponent];

  static {
    IconRegistry.define([tylIconOpenInNew]);
  }

  public static styles = unsafeCSS(styles);

  public render(): TemplateResult {
    return html`
      <forge-list-item>
        <forge-icon slot="start" name="open_in_new"></forge-icon>
        <slot></slot>
      </forge-list-item>
    `;
  }
}
