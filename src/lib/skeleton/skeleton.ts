import { customElement, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { SKELETON_CONSTANTS } from './skeleton-constants';

import template from './skeleton.html';
import styles from './skeleton.scss';

export interface ISkeletonComponent extends IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-skeleton': ISkeletonComponent;
  }
}

/**
 * @tag forge-skeleton
 *
 * @summary Skeleton is used to provide a placeholder for content that is loading.
 *
 * @attribute {string} form-field - Apply form field styles to the skeleton.
 * @attribute {string} button - Apply button styles to the skeleton.
 * @attribute {string} chip - Apply chip styles to the skeleton.
 * @attribute {string} list-item - Apply list item styles to the skeleton.
 * @attribute {string} text - Apply text styles to the skeleton.
 * @attribute {string} avatar - Apply avatar styles to the skeleton.
 * @attribute {string} stretch - Apply stretch styles to the skeleton.
 *
 * @cssproperty --forge-skeleton-animation-duration - The duration of the skeleton animation.
 * @cssproperty --forge-skeleton-width - The width of the skeleton.
 * @cssproperty --forge-skeleton-height - The height of the skeleton.
 * @cssproperty --forge-skeleton-background - The background color of the skeleton.
 * @cssproperty --forge-skeleton-shape - The shape of the skeleton.
 * @cssproperty --forge-skeleton-margin - The margin of the skeleton.
 * @cssproperty --forge-skeleton-button-height - The height of the button skeleton.
 * @cssproperty --forge-skeleton-button-width - The width of the button skeleton.
 * @cssproperty --forge-skeleton-form-field-height - The height of the form field skeleton.
 * @cssproperty --forge-skeleton-form-field-width - The width of the form field skeleton.
 * @cssproperty --forge-skeleton-chip-height - The height of the chip skeleton.
 * @cssproperty --forge-skeleton-chip-width - The width of the chip skeleton.
 * @cssproperty --forge-skeleton-chip-shape - The shape of the chip skeleton.
 * @cssproperty --forge-skeleton-list-item-height - The height of the list item skeleton.
 * @cssproperty --forge-skeleton-list-item-margin - The margin of the list item skeleton.
 * @cssproperty --forge-skeleton-text-height - The height of the text skeleton.
 * @cssproperty --forge-skeleton-gradient-color - The color of the gradient skeleton.
 * @cssproperty --forge-skeleton-avatar-size - The size of the avatar skeleton.
 * @cssproperty --forge-skeleton-avatar-shape - The shape of the avatar skeleton.
 *
 * @csspart root - The root element of the skeleton.
 *
 * @cssclass forge-skeleton - The skeleton element.
 * @cssclass forge-skeleton--avatar - The avatar skeleton element.
 * @cssclass forge-skeleton--text - The text skeleton element.
 * @cssclass forge-skeleton--list-item - The list item skeleton element.
 * @cssclass forge-skeleton--chip - The chip skeleton element.
 * @cssclass forge-skeleton--button - The button skeleton element.
 * @cssclass forge-skeleton--form-field - The form field skeleton element.
 */
@customElement({
  name: SKELETON_CONSTANTS.elementName
})
export class SkeletonComponent extends BaseComponent implements ISkeletonComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }
}
