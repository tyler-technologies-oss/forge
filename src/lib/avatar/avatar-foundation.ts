import { ICustomElementFoundation, isDefined, isString } from '@tylertech/forge-core';
import { IAvatarAdapter } from './avatar-adapter';
import { AVATAR_CONSTANTS } from './avatar-constants';

export interface IAvatarFoundation extends ICustomElementFoundation {
  imageUrl: string;
  text: string;
  letterCount: number;
}

export class AvatarFoundation implements IAvatarFoundation {
  private _imageUrl: string;
  private _text = '';
  private _letterCount = AVATAR_CONSTANTS.numbers.DEFAULT_LETTER_COUNT;
  private _initialized = false;

  constructor(private _adapter: IAvatarAdapter) {}

  public initialize(): void {
    this._render();
    this._initialized = true;
  }

  public disconnect(): void {
    this._initialized = false;
  }

  private _render(): void {
    this._setText();
    this._setBackgroundImageUrl();
  }

  private async _setBackgroundImageUrl(): Promise<void> {
    if (this._imageUrl) {
      if (await this._adapter.setBackgroundImageUrl(this._imageUrl)) {
        this._adapter.clearText();
      }
    } else {
      this._adapter.removeBackgroundImage();
    }
  }

  private _setText(): void {
    const data = this._getTextContent(this._text, this._letterCount);

    if (data) {
      this._adapter.setText(data);
    } else {
      this._adapter.clearText();
    }
  }

  /**
   * Gets the text content to display in the avatar.
   * @param {string} value The text to parse.
   */
  private _getTextContent(value: string, count: number): string {
    if (!value || !isString(value) || count <= 0) {
      return '';
    }

    let text: string;

    if (count === 1) {
      text = value[0].toUpperCase();
    } else {
      const words = value.match(/\S+/g) || [];
      text = words.slice(0, count).reduce((prev, curr) => prev += curr[0].toUpperCase(), '');
    }

    return text;
  }

  /** Gets/sets the text to display. */
  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    if (this._text !== value) {
      this._text = value || '';
      this._adapter.setHostAttribute(AVATAR_CONSTANTS.attributes.TEXT, this._text);
      if (this._initialized) {
        this._render();
      }
    }
  }

  /** Controls the number of letters to display from the text. By default the text is split on spaces and the first character of each word is used. */
  public get letterCount(): number {
    return this._letterCount;
  }
  public set letterCount(value: number) {
    if (this._letterCount !== value) {
      this._letterCount = value;
      this._adapter.setHostAttribute(AVATAR_CONSTANTS.attributes.LETTER_COUNT, isDefined(this._letterCount) ? this._letterCount.toString() : '');
      if (this._initialized) {
        this._render();
      }
    }
  }

  /** Sets the background image URL to use. */
  public get imageUrl(): string {
    return this._imageUrl;
  }
  public set imageUrl(value: string) {
    if (this._imageUrl !== value) {
      this._imageUrl = value;
      if (this._initialized) {
        this._render();
      }
    }
  }
}
