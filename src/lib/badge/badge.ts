import { attachShadowTemplate, coerceBoolean, customElement } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { BadgeTheme, BADGE_CONSTANTS } from './badge-constants';

import template from './badge.html';
import styles from './badge.scss';

export interface IBadgeComponent extends IBaseComponent {
  dot: boolean;
  theme: BadgeTheme;
  strong: boolean;
  hide: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-badge': IBadgeComponent;
  }
}

/**
 * @tag forge-badge
 * 
 * @summary Badges are non-interactive components used to inform status, counts, or as a descriptive label.
 * 
 * @property {boolean} [dot=false] - Controls whether the badge will be a small dot without any content visible.
 * @property {BadgeTheme} [theme="default"] - The theme of the badge.
 * @property {boolean} [strong=false] - Controls whether the badge will have a stronger visual appearance.
 * @property {boolean} [hide=false] - Controls whether the badge is visible.
 * 
 * @attribute {boolean} [dot=false] - When present, the badge will be a small dot without any content visible.
 * @attribute {BadgeTheme} [theme="default"] - The theme of the badge.
 * @attribute {boolean} [strong=false] - Controls whether the badge will have a stronger visual appearance.
 * @attribute {boolean} [hide=false] - Controls whether the badge is visible.
 * 
 * @cssproperty --forge-badge-background - The background color.
 * @cssproperty --forge-badge-color - The text color.
 * @cssproperty --forge-badge-shape - The shape radius.
 * @cssproperty --forge-badge-padding-inline - The inline padding.
 * @cssproperty --forge-badge-padding-block - The block padding.
 * @cssproperty --forge-badge-border-width - The border width.
 * @cssproperty --forge-badge-border-color - The border color.
 * @cssproperty --forge-badge-border-style - The border style.
 * @cssproperty --forge-badge-gap - The spacing between the content within the badge.
 * 
 * @slot - Default content placed inside the badge.
 * @slot start - Content placed before the default content.
 * @slot end - Content placed after the default content.
 */
@customElement({
  name: BADGE_CONSTANTS.elementName
})
export class BadgeComponent extends BaseComponent implements IBadgeComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public get dot(): boolean {
    return this.hasAttribute(BADGE_CONSTANTS.attributes.DOT);
  }
  public set dot(value: boolean) {
    this.toggleAttribute(BADGE_CONSTANTS.attributes.DOT, value);
  }

  public get theme(): BadgeTheme {
    return this.getAttribute(BADGE_CONSTANTS.attributes.THEME) as BadgeTheme ?? BADGE_CONSTANTS.defaults.THEME;
  }
  public set theme(value: BadgeTheme) {
    this.setAttribute(BADGE_CONSTANTS.attributes.THEME, value);
  }

  public get strong(): boolean {
    return this.hasAttribute(BADGE_CONSTANTS.attributes.STRONG);
  }
  public set strong(value: boolean) {
    this.toggleAttribute(BADGE_CONSTANTS.attributes.STRONG, value);
  }

  public get hide(): boolean {
    return this.hasAttribute(BADGE_CONSTANTS.attributes.HIDE);
  }
  public set hide(value: boolean) {
    if (this.hasAttribute(BADGE_CONSTANTS.attributes.HIDE) !== value) {
      this.toggleAttribute(BADGE_CONSTANTS.attributes.HIDE, value);
    }
  }
}
