import { CustomElement, attachShadowTemplate, coerceNumber, FoundationProperty } from '@tylertech/forge-core';

import { AvatarAdapter } from './avatar-adapter';
import { AvatarFoundation } from './avatar-foundation';
import { AVATAR_CONSTANTS } from './avatar-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './avatar.html';
import styles from './avatar.scss';

export interface IAvatarComponent extends IBaseComponent {
  imageUrl: string;
  text: string;
  letterCount: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-avatar': IAvatarComponent;
  }
}

/**
 * The custom element class behind the `<forge-avatar>` element.
 * 
 * @tag forge-avatar
 * 
 * @property {string} text - The text to display in the avatar.
 * @property {number} letterCount - Controls the number of letters to display from the text. By default the text is split on spaces and the first character of each word is used.
 * @property {string} imageUrl - The background image URL to use.
 * 
 * @attribute {string} text - The text to display in the avatar.
 * @attribute {number} letter-count - Controls the number of letters to display from the text. By default the text is split on spaces and the first character of each word is used.
 * @attribute {string} image-url - The background image URL to use.
 * 
 * @cssproperty --forge-avatar-background - The background color of the avatar.
 * @cssproperty --forge-avatar-border-radius - The border radius of the avatar, defaults to 50%.
 * @cssproperty --forge-avatar-color - The text color of the avatar.
 * @cssproperty --forge-avatar-font-size - The font size of the avatar text.
 * @cssproperty --forge-avatar-font-weight - The font weight of the avatar text.
 * @cssproperty --forge-avatar-size - The height and width of the avatar.
 * @cssproperty --forge-avatar-transition-duration - The transition duration for animations.
 * @cssproperty --forge-avatar-transition-timing - The transition timing function for animations.
 * 
 * @csspart root - The root container element.
 * 
 * @slot - The default/unnamed slot for avatar content if not provided via text/imageUrl.
 */
@CustomElement({
  name: AVATAR_CONSTANTS.elementName
})
export class AvatarComponent extends BaseComponent implements IAvatarComponent {
  public static get observedAttributes(): string[] {
    return [
      AVATAR_CONSTANTS.attributes.TEXT,
      AVATAR_CONSTANTS.attributes.LETTER_COUNT,
      AVATAR_CONSTANTS.attributes.IMAGE_URL
    ];
  }

  private _foundation: AvatarFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new AvatarFoundation(new AvatarAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case AVATAR_CONSTANTS.attributes.TEXT:
        this.text = newValue;
        break;
      case AVATAR_CONSTANTS.attributes.LETTER_COUNT:
        this.letterCount = coerceNumber(newValue);
        break;
      case AVATAR_CONSTANTS.attributes.IMAGE_URL:
        this.imageUrl = newValue;
        break;
    }
  }

  /** The text to display in the avatar. */
  @FoundationProperty()
  public declare text: string;

  /** Controls the number of letters to display from the text. By default the text is split on spaces and the first character of each word is used. */
  @FoundationProperty()
  public declare letterCount: number;

  /** The background image URL to use. */
  @FoundationProperty()
  public declare imageUrl: string;
}
