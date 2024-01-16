import { getShadowElement, removeAllChildren } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IAvatarComponent } from './avatar';
import { AVATAR_CONSTANTS } from './avatar-constants';

export interface IAvatarAdapter extends IBaseAdapter {
  setBackgroundColor(color: string): void;
  setBackgroundImageUrl(url: string): Promise<boolean>;
  removeBackgroundImage(): void;
  setText(value: string): void;
  clearText(): void;
}

/**
 * The DOM adapter behind the `<forge-avatar>` element.
 */
export class AvatarAdapter extends BaseAdapter<IAvatarComponent> implements IAvatarAdapter {
  private _root: HTMLElement;
  private _defaultSlot: HTMLSlotElement;
  private _pendingLoadResult: Promise<boolean> | undefined;

  constructor(component: IAvatarComponent) {
    super(component);
    this._root = getShadowElement(this._component, AVATAR_CONSTANTS.selectors.ROOT);
    this._defaultSlot = getShadowElement(this._component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
  }

  /**
   * Sets the `backgroundColor` style on the content element.
   * @param {string} value The background color.
   */
  public setBackgroundColor(value: string): void {
    this._root.style.backgroundColor = `var(${AVATAR_CONSTANTS.strings.BACKGROUND_VARNAME}, ${value})`;
  }

  /**
   * Sets the background image URL.
   * @param url The URL.
   */
  public setBackgroundImageUrl(url: string): Promise<boolean> {
    // Prevent race condition where this is invoked from setting both imageUrl and text, causing background to get stuck on "inherit" if URL is invalid
    if (!this._pendingLoadResult) {
      const backgroundColor = this._root.style.backgroundColor;
      // doing his before the promise so it doesn't flash a color before loading
      this._root.style.backgroundColor = 'inherit';
      this._pendingLoadResult = new Promise<boolean>(resolve => {
        const image = new Image();
        image.onload = () => {
          this._root.style.backgroundImage = `url(${image.src})`;
          this._pendingLoadResult = undefined;
          resolve(true);
        };

        image.onerror = () => {
          this._root.style.backgroundColor = backgroundColor;
          this._pendingLoadResult = undefined;
          resolve(false);
        };

        image.src = url;
      });
    }

    return this._pendingLoadResult;
  }

  /**
   * Removes the background image URL.
   */
  public removeBackgroundImage(): void {
    this._root.style.removeProperty('background-image');
  }

  /**
   * Sets the avatar text content.
   * @param value The text value.
   */
  public setText(value: string): void {
    this._defaultSlot.textContent = value;
  }

  public clearText(): void {
    removeAllChildren(this._defaultSlot);
  }
}
