import { getShadowElement, removeAllChildren } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IAvatarComponent } from './avatar';
import { AVATAR_CONSTANTS } from './avatar-constants';

export interface IAvatarAdapter extends IBaseAdapter {
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
   * Sets the background image URL.
   * @param url The URL.
   */
  public async setBackgroundImageUrl(url: string): Promise<boolean> {
    // Set before loading image to prevent a flash of background color
    this._root.classList.add('forge-avatar--image');
    return new Promise<boolean>(resolve => {
      const image = new Image();
      image.onload = () => {
        this._root.style.backgroundImage = `url(${image.src})`;
        resolve(true);
      };

      image.onerror = () => {
        this._root.classList.remove('forge-avatar--image');
        resolve(false);
      };

      image.src = url;
    });
  }

  /**
   * Removes the background image URL.
   */
  public removeBackgroundImage(): void {
    this._root.style.removeProperty('background-image');
    this._root.classList.remove('forge-avatar--image');
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
