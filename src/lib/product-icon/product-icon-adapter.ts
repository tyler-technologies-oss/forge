import { addClass, generateTextShadow, getShadowElement, Platform, removeClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IProductIconComponent } from './product-icon';
import { PRODUCT_ICON_CONSTANTS } from './product-icon-constants';

export interface IProductIconAdapter extends IBaseAdapter {
  setBackgroundColor(color: string): void;
  setIconColor(color: string): void;
  setElementSize(value: number): void;
  setFontSize(value: number): void;
  setTextShadow(hasShadow: boolean, iterations: number, shadowColor: string): void;
  removeIconClass(classes: string | string[]): void;
}

export class ProductIconAdapter extends BaseAdapter<IProductIconComponent> implements IProductIconAdapter {
  private _backgroundElement: HTMLElement;
  private _iconElement: HTMLElement;
  private _textElement: HTMLElement;

  constructor(component: IProductIconComponent) {
    super(component);
    this._backgroundElement = getShadowElement(component, PRODUCT_ICON_CONSTANTS.selectors.PRODUCT_ICON_BACKGROUND);
    this._iconElement = getShadowElement(component, PRODUCT_ICON_CONSTANTS.selectors.PRODUCT_ICON);
    this._textElement = getShadowElement(component, PRODUCT_ICON_CONSTANTS.selectors.PRODUCT_TEXT);
  }

  public setBackgroundColor(color: string): void {
    this._backgroundElement.style.backgroundColor = color;
  }

  public setIconColor(color: string): void {
    this._iconElement.style.color = color;
    this._textElement.style.color = color;
  }

  public setElementSize(value: number): void {
    this._backgroundElement.style.height = `${value}px`;
    this._backgroundElement.style.width = `${value}px`;
  }

  public setFontSize(value: number): void {
    const textFontSize = value * PRODUCT_ICON_CONSTANTS.numbers.TEXT_FONT_SIZE_MODIFIER;
    const iconFontSize = value * PRODUCT_ICON_CONSTANTS.numbers.ICON_FONT_SIZE_MODIFIER;

    this._iconElement.style.setProperty('--forge-product-icon-font-size', `${iconFontSize}px`);
    this._textElement.style.setProperty('--forge-product-icon-font-size', `${textFontSize}px`);

    this._iconElement.style.fontSize = `var(--forge-product-icon-font-size, ${iconFontSize}px)`;
    this._textElement.style.fontSize = `var(--forge-product-icon-font-size, ${textFontSize}px)`;
  }

  public removeIconClass(classes: string | string[]): void {
    removeClass(classes, this._iconElement);
    removeClass(classes, this._textElement);
  }

  public setTextShadow(hasShadow: boolean, iterations: number, shadowColor: string): void {
    if (hasShadow) {
      const shadow = generateTextShadow(iterations, shadowColor);
      this._iconElement.style.textShadow = shadow;
      this._textElement.style.textShadow = shadow;
    } else {
      this._iconElement.style.removeProperty('text-shadow');
      this._textElement.style.removeProperty('text-shadow');
    }
  }
}
