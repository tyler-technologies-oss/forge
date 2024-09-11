import { customElement, attachShadowTemplate, coerceNumber, coreProperty } from '@tylertech/forge-core';

import { AvatarAdapter } from './avatar-adapter';
import { AvatarCore } from './avatar-core';
import { AVATAR_CONSTANTS } from './avatar-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './avatar.html';
import styles from './avatar.scss';

export interface IAvatarComponent extends IBaseComponent {
  text: string;
  letterCount: number;
  imageUrl: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-avatar': IAvatarComponent;
  }
}

/**
 * @tag forge-avatar
 *
 * @summary Avatars represent an entity via text or image.
 *
 * @description The avatar component allows you to provide text or images to display that represent an entity. By default, the
 * avatar will display textual content as single characters (character count is configurable), or display an image or
 * icon based on the URL provided to it.
 *
 * @property {string} [text=""] - The text to display in the avatar.
 * @property {number} [letterCount=2] - Controls the number of letters to display from the text. By default the text is split on spaces and the first character of each word is used.
 * @property {string} imageUrl - The background image URL to use.
 *
 * @attribute {string} [text=""] - The text to display in the avatar.
 * @attribute {string} [letter-count=2] - Controls the number of letters to display from the text. By default the text is split on spaces and the first character of each word is used.
 * @attribute {string} image-url - The background image URL to use.
 *
 * @cssproperty {string} --forge-avatar-background - The background color of the avatar.
 * @cssproperty {number} --forge-avatar-shape - The border radius of the avatar, defaults to 50%.
 * @cssproperty {color} --forge-avatar-color - The text color of the avatar.
 * @cssproperty {number} --forge-avatar-size - The height and width of the avatar.
 * @cssproperty {number} --forge-avatar-transition-duration - The transition duration for animations.
 * @cssproperty {string} --forge-avatar-transition-timing - The transition timing function for animations.
 *
 * @csspart root - The root container element.
 *
 * @slot - The default slot for avatar content if not provided via text/imageUrl.
 *
 * @cssclass forge-avatar - The avatar class _(required)_.
 */
@customElement({
  name: AVATAR_CONSTANTS.elementName
})
export class AvatarComponent extends BaseComponent implements IAvatarComponent {
  public static get observedAttributes(): string[] {
    return [AVATAR_CONSTANTS.attributes.TEXT, AVATAR_CONSTANTS.attributes.LETTER_COUNT, AVATAR_CONSTANTS.attributes.IMAGE_URL];
  }

  private _core: AvatarCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new AvatarCore(new AvatarAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
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

  @coreProperty()
  public declare text: string;

  @coreProperty()
  public declare letterCount: number;

  @coreProperty()
  public declare imageUrl: string;
}
