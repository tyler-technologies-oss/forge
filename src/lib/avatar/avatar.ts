import { CustomElement, attachShadowTemplate, coerceNumber, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';

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
  autoColor: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-avatar': IAvatarComponent;
  }
}

/**
 * The custom element class behind the `<forge-avatar>` element.
 */
@CustomElement({
  name: AVATAR_CONSTANTS.elementName
})
export class AvatarComponent extends BaseComponent implements IAvatarComponent {
  public static get observedAttributes(): string[] {
    return [
      AVATAR_CONSTANTS.attributes.TEXT,
      AVATAR_CONSTANTS.attributes.LETTER_COUNT,
      AVATAR_CONSTANTS.attributes.IMAGE_URL,
      AVATAR_CONSTANTS.attributes.AUTO_COLOR
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
      case AVATAR_CONSTANTS.attributes.AUTO_COLOR:
        this.autoColor = coerceBoolean(newValue);
        break;
    }
  }

  /** Gets/sets the text to display. */
  @FoundationProperty()
  public text: string;

  /** Controls the number of letters to display from the text. By default the text is split on spaces and the first character of each word is used. */
  @FoundationProperty()
  public letterCount: number;

  /** Sets the background image URL to use. */
  @FoundationProperty()
  public imageUrl: string;

  /** Controls whether the background color is set automatically based on the text value. Does not have any effect when an image URL is specified. */
  @FoundationProperty()
  public autoColor: boolean;
}
