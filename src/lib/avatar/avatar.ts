import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { AVATAR_CONSTANTS } from './avatar-constants';

import styles from './avatar.scss';

export interface IAvatarComponent extends LitElement {
  text: string;
  letterCount: number;
  imageUrl: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-avatar': IAvatarComponent;
  }
}

const charsByLetterCount = (text: string, count: number): string => {
  if (!text?.trim()) {
    return '';
  }
  if (count === 1) {
    return text[0].toUpperCase();
  } else {
    const words = text.match(/\S+/g) ?? [];
    return words.slice(0, count).reduce((prev, curr) => (prev += curr[0].toUpperCase()), '');
  }
};

export const AVATAR_TAG_NAME = 'forge-avatar';

/**
 * @tag forge-avatar
 *
 * @summary Avatars represent an entity via text or image.
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
@customElement(AVATAR_TAG_NAME)
export class AvatarComponent extends LitElement implements IAvatarComponent {
  public static styles = unsafeCSS(styles);

  /**
   * The text to display in the avatar.
   * @default ''
   * @attribute
   */
  @property() public text = '';

  /**
   * Controls the number of letters to display from the text. By default the text is split on spaces and the first character of each word is used.
   * @default 2
   * @attribute letter-count
   */
  @property({ type: Number, attribute: 'letter-count' })
  public letterCount: number = AVATAR_CONSTANTS.numbers.DEFAULT_LETTER_COUNT;

  /**
   * The background image URL to use.
   * @default ''
   * @attribute image-url
   */
  @property({ type: String, attribute: 'image-url' }) public imageUrl = '';

  @state() private _image: HTMLImageElement | undefined;

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('imageUrl')) {
      this._tryLoadImage();
    }
  }

  public render(): TemplateResult {
    return html`
      <div
        aria-hidden="true"
        part="root"
        class=${classMap({ 'forge-avatar': true, 'forge-avatar--image': !!this._image })}
        style=${this._image ? styleMap({ backgroundImage: `url(${this._image.src})` }) : nothing}>
        <slot>${this._image ? nothing : charsByLetterCount(this.text, this.letterCount ?? AVATAR_CONSTANTS.numbers.DEFAULT_LETTER_COUNT)}</slot>
      </div>
    `;
  }

  private async _tryLoadImage(): Promise<void> {
    if (this.imageUrl) {
      const image = new Image();
      image.onload = () => (this._image = image);
      image.onerror = () => (this._image = undefined);
      image.src = this.imageUrl;
    } else {
      this._image = undefined;
    }
  }
}
