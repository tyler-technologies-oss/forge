import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { ListItemComponent } from '../../list/list-item/index.js';

import '../../list/list-item/list-item.js';

import styles from './profile-link.scss';

declare global {
  interface HTMLElementTagNameMap {
    'forge-profile-link': ProfileLinkComponent;
  }
}

export const PROFILE_LINK_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-profile-link';

/**
 * @tag forge-profile-link
 *
 * @summary A utility component for rendering an accessible, visually consistent link within the `forge-user-profile` popover.
 *
 * @meta extended
 *
 * @dependency forge-list-item
 *
 * @slot icon - The icon to display in the profile link.
 * @slot - The `<a>` element for the link.
 */
@customElement(PROFILE_LINK_TAG_NAME)
export class ProfileLinkComponent extends BaseLitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = PROFILE_LINK_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ListItemComponent];

  public static styles = unsafeCSS(styles);

  public render(): TemplateResult {
    return html`
      <forge-list-item>
        <slot name="icon" slot="start"></slot>
        <slot></slot>
      </forge-list-item>
    `;
  }
}
