import { ICustomElementFoundation, coerceNumber } from '@tylertech/forge-core';

import { COLOR_CONSTANTS } from '../theme';
import { IProductIconAdapter } from './product-icon-adapter';
import { PRODUCT_ICON_CONSTANTS } from './product-icon-constants';

export interface IProductIconFoundation extends ICustomElementFoundation {
  color: string;
  size: number;
  shadow: boolean;
  iterations: number;
}

export class ProductIconFoundation implements IProductIconFoundation {
  private _colorValue = PRODUCT_ICON_CONSTANTS.strings.DEFAULT_COLOR_VALUE;
  private _colorPalette = PRODUCT_ICON_CONSTANTS.strings.DEFAULT_COLOR_PALETTE;
  private _colorShade = PRODUCT_ICON_CONSTANTS.strings.DEFAULT_COLOR_SHADE;
  private _size = PRODUCT_ICON_CONSTANTS.numbers.DEFAULT_SIZE;
  private _shadow = true;
  private _backgroundColor = PRODUCT_ICON_CONSTANTS.strings.DEFAULT_BACKGROUND_COLOR;
  private _shadowColor: string;
  private _iterations = PRODUCT_ICON_CONSTANTS.numbers.DEFAULT_ITERATIONS;
  private _usingCustomIterations = false;

  constructor(private _adapter: IProductIconAdapter) {}

  public initialize(): void {
    this._adapter.setElementSize(this._size);
    this._updateFontSize();
    this._parseColor();
    this._render();
  }

  private _parseColor(): void {
    if (this._colorValue.includes('-')) {
      this._colorPalette = this._colorValue.split('-')[0];
      this._colorShade = coerceNumber(this._colorValue.split('-')[1]);
    } else {
      this._colorPalette = this._colorValue;
      this._colorShade = PRODUCT_ICON_CONSTANTS.strings.DEFAULT_COLOR_SHADE;
    }
  }

  private _updateSize(): void {
    this._adapter.setElementSize(this._size);

    // If not using a custom iteration value, then we need to adjust the shadow length
    if (!this._usingCustomIterations) {
      this._iterations = this._size / 2;
      this._updateShadow();
    }
  }

  private _updateFontSize(): void {
    this._adapter.setFontSize(this._size);
  }

  private _updateShadow(): void {
    if (this._shadow) {
      this._adapter.setTextShadow(this._shadow, this._iterations, this._shadowColor);
    }
  }

  private _render(): void {
    if (!this._colorValue) {
      return;
    }

    const iconColor = this._colorShade <= PRODUCT_ICON_CONSTANTS.numbers.ACCESSIBILITY_COLOR_THRESHOLD ? '#000000' : '#ffffff';
    const shadowIncrement = this._colorShade + 300;

    if (!COLOR_CONSTANTS[`${this._colorPalette}Palette`]) {
      this._colorPalette = PRODUCT_ICON_CONSTANTS.strings.DEFAULT_COLOR_PALETTE;
    }

    this._backgroundColor = COLOR_CONSTANTS[`${this._colorPalette}Palette`][this._colorShade];
    this._shadowColor = COLOR_CONSTANTS[`${this._colorPalette}Palette`][shadowIncrement];

    this._adapter.setBackgroundColor(this._backgroundColor);
    this._adapter.setIconColor(iconColor);
    this._updateShadow();
  }

  public get color(): string {
    return this._colorValue;
  }
  public set color(value: string) {
    if (this._colorValue !== value) {
      this._colorValue = value;
      this._parseColor();
      this._render();
      this._adapter.setHostAttribute(PRODUCT_ICON_CONSTANTS.attributes.COLOR, this._colorValue);
    }
  }

  public get size(): number {
    return this._size;
  }
  public set size(value: number) {
    if (this._size !== value) {
      this._size = value;
      this._updateSize();
      this._updateFontSize();
      this._adapter.setHostAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE, this._size.toString());
    }
  }

  public get shadow(): boolean {
    return this._shadow;
  }
  public set shadow(value: boolean) {
    if (this._shadow !== value) {
      this._shadow = value;
      this._adapter.setTextShadow(this._shadow, this._iterations, this._shadowColor);
      if (this._shadow) {
        this._adapter.setHostAttribute(PRODUCT_ICON_CONSTANTS.attributes.SHADOW, '');
      } else {
        this._adapter.removeIconClass(PRODUCT_ICON_CONSTANTS.attributes.SHADOW);
      }
    }
  }

  public get iterations(): number {
    return this._iterations;
  }
  public set iterations(value: number) {
    if (this._iterations !== value) {
      this._usingCustomIterations = true;
      this._iterations = value;
      this._updateShadow();
      this._adapter.setHostAttribute(PRODUCT_ICON_CONSTANTS.attributes.ITERATIONS, this._iterations.toString());
    }
  }
}
