import { BaseButtonCore, IBaseButtonCore } from '../button/base/base-button-core';
import { IIconButtonAdapter } from './icon-button-adapter';
import { IconButtonDensity, IconButtonShape, IconButtonTheme, IconButtonVariant, ICON_BUTTON_CONSTANTS } from './icon-button-constants';

export interface IIconButtonCore extends IBaseButtonCore {
  toggle: boolean;
  on: boolean;
  variant: IconButtonVariant;
  theme: IconButtonTheme;
  shape: IconButtonShape;
  density: IconButtonDensity;
}

export class IconButtonCore extends BaseButtonCore<IIconButtonAdapter> implements IIconButtonCore {
  private _toggle = false;
  private _on = false;
  private _variant: IconButtonVariant = ICON_BUTTON_CONSTANTS.defaults.DEFAULT_VARIANT;
  private _theme: IconButtonTheme = ICON_BUTTON_CONSTANTS.defaults.DEFAULT_THEME;
  private _shape: IconButtonShape = ICON_BUTTON_CONSTANTS.defaults.DEFAULT_SHAPE;
  private _density: IconButtonDensity = ICON_BUTTON_CONSTANTS.defaults.DEFAULT_DENSITY;

  constructor(adapter: IIconButtonAdapter) {
    super(adapter);
  }

  public override initialize(): void {
    super.initialize();
    this._adapter.tryApplyGlobalConfiguration(['variant', 'shape', 'density']);
  }

  protected override async _onClick(evt: MouseEvent): Promise<void> {
    if (this._toggle) {
      this._onToggle();
    }
    super._onClick(evt);
  }

  private _onToggle(): void {
    // Update internal state first so listeners can access the new state
    const originalOn = this._on;
    this._on = !this._on;

    const cancelled = !this._adapter.emitHostEvent(ICON_BUTTON_CONSTANTS.events.TOGGLE, this.on, true, true);
    this._on = originalOn;

    if (cancelled) {
      return;
    }

    this.on = !originalOn;
  }

  public get toggle(): boolean {
    return this._toggle;
  }
  public set toggle(value: boolean) {
    value = !!value;
    if (this._toggle !== value) {
      this._toggle = value;
      this._adapter.toggleHostAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED, this._toggle, `${this._on}`);
      this._adapter.toggleHostAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE, this._toggle);
    }
  }

  public get on(): boolean {
    return this._on;
  }
  public set on(value: boolean) {
    value = !!value;
    if (this._on !== value) {
      this._on = value;
      
      if (this._toggle) {
        this._adapter.setHostAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED, `${this._on}`);
      } else {
        this._adapter.removeHostAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED);
      }

      this._adapter.toggleHostAttribute(ICON_BUTTON_CONSTANTS.attributes.ON, this._on);
    }
  }

  public get variant(): IconButtonVariant {
    return this._variant;
  }
  public set variant(value: IconButtonVariant) {
    value = value ?? ICON_BUTTON_CONSTANTS.defaults.DEFAULT_VARIANT;
    if (this._variant !== value) {
      this._variant = value;

      if (this._variant !== ICON_BUTTON_CONSTANTS.defaults.DEFAULT_VARIANT) {
        this._adapter.setHostAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT, this._variant);
      } else {
        this._adapter.removeHostAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT);
      }
    }
  }

  public get theme(): IconButtonTheme {
    return this._theme;
  }
  public set theme(value: IconButtonTheme) {
    value = value ?? ICON_BUTTON_CONSTANTS.defaults.DEFAULT_THEME;
    if (this._theme !== value) {
      this._theme = value;

      if (this._theme !== ICON_BUTTON_CONSTANTS.defaults.DEFAULT_THEME) {
        this._adapter.setHostAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME, this._theme);
      } else {
        this._adapter.removeHostAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME);
      }
    }
  }

  public get shape(): IconButtonShape {
    return this._shape;
  }
  public set shape(value: IconButtonShape) {
    value = value ?? ICON_BUTTON_CONSTANTS.defaults.DEFAULT_SHAPE;
    if (this._shape !== value) {
      this._shape = value;

      if (this._shape !== ICON_BUTTON_CONSTANTS.defaults.DEFAULT_SHAPE) {
        this._adapter.setHostAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE, this._shape);
      } else {
        this._adapter.removeHostAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE);
      }
    }
  }

  public get density(): IconButtonDensity {
    return this._density;
  }
  public set density(value: IconButtonDensity) {
    value = value ?? ICON_BUTTON_CONSTANTS.defaults.DEFAULT_DENSITY;
    if (this._density !== value) {
      this._density = value;

      if (this._density !== ICON_BUTTON_CONSTANTS.defaults.DEFAULT_DENSITY) {
        this._adapter.setHostAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY, this._density);
      } else {
        this._adapter.removeHostAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY);
      }
    }
  }
}
