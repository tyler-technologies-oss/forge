import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { customElement, property } from 'lit/decorators.js';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { SKELETON_CONSTANTS } from './skeleton-constants.js';

import styles from './skeleton.scss';

/** @deprecated - This will be removed in the future. Please switch to using SkeletonComponent. */
export interface ISkeletonComponent extends BaseLitElement {
  formField: boolean;
  button: boolean;
  chip: boolean;
  listItem: boolean;
  text: boolean;
  avatar: boolean;
  stretch: boolean;
}

/**
 * @tag forge-skeleton
 *
 * @summary Skeletons are used to provide a placeholder for content that is loading. They have various styles to represent different types of content.
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
@customElement(SKELETON_CONSTANTS.elementName)
export class SkeletonComponent extends BaseLitElement implements ISkeletonComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = SKELETON_CONSTANTS.elementName;

  /**
   * Applies form field styles to the skeleton.
   */
  @property({ type: Boolean, reflect: true, attribute: 'form-field' })
  public formField = false;

  /**
   * Applies button styles to the skeleton.
   */
  @property({ type: Boolean, reflect: true })
  public button = false;

  /**
   * Applies chip styles to the skeleton.
   */
  @property({ type: Boolean, reflect: true })
  public chip = false;

  /**
   * Applies list item styles to the skeleton.
   */
  @property({ type: Boolean, reflect: true, attribute: 'list-item' })
  public listItem = false;

  /**
   * Applies text styles to the skeleton.
   */
  @property({ type: Boolean, reflect: true })
  public text = false;

  /**
   * Applies avatar styles to the skeleton.
   */
  @property({ type: Boolean, reflect: true })
  public avatar = false;

  /**
   * Applies stretch styles to the skeleton.
   */
  @property({ type: Boolean, reflect: true })
  public stretch = false;

  public render(): TemplateResult {
    return html`<div class="forge-skeleton" part="root"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-skeleton': ISkeletonComponent;
  }
}
