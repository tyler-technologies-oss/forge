import { getShadowElement, removeAllChildren } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/adapters/base-adapter';
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
    const backgroundColor = this._root.style.backgroundColor;
    // doing his before the promise so it doesn't flash a color before loading
    this._root.style.backgroundColor = 'inherit';

    const loadResult = new Promise<boolean>(resolve => {
      const image = new Image();
      image.onload = () => {
        this._root.style.backgroundImage = `url(${image.src})`;
        resolve(true);
      };

      image.onerror = () => {
        this._root.style.backgroundColor = backgroundColor;
        resolve(false);
      };

      image.src = url;
    });

    return loadResult;
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
