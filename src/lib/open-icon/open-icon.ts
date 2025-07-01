import { customElement, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { tylIconKeyboardArrowRight, tylIconKeyboardArrowDown } from '@tylertech/tyler-icons';
import { OpenIconOrientation, OpenIconRotation, OPEN_ICON_CONSTANTS } from './open-icon-constants';
import { IconRegistry, IconComponent } from '../icon';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './open-icon.html';
import styles from './open-icon.scss';

export interface IOpenIconComponent extends IBaseComponent {
  open: boolean;
  orientation: OpenIconOrientation;
  rotation: OpenIconRotation;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-open-icon': IOpenIconComponent;
  }
}

/**
 * @tag forge-open-icon
 *
 * @summary Open icons are used to indicate whether a section is open or closed.
 *
 * @property {boolean} [open=false] - Whether the icon is open or closed.
 * @property {OpenIconOrientation} [orientation=vertical] - The orientation of the rotation.
 * @property {OpenIconRotation} [rotation=full] - The rotation amount.
 *
 * @attribute {boolean} [open=false] - Whether the icon is open or closed.
 * @attribute {OpenIconOrientation} [orientation=vertical] - The orientation of the rotation.
 * @attribute {OpenIconRotation} [rotation=full] - The rotation amount.
 *
 * @cssproperty --forge-open-icon-color - The color of the icon.
 * @cssproperty --forge-open-icon-size - The size of the icon.
 * @cssproperty --forge-open-icon-height - The height of the icon. Defaults to `size`.
 * @cssproperty --forge-open-icon-width - The width of the icon. Defaults to `size`.
 * @cssproperty --forge-open-icon-initial-rotation - The initial rotation of the icon.
 * @cssproperty --forge-open-icon-open-rotation - The rotation of the icon when open.
 * @cssproperty --forge-open-icon-animation-duration - The duration of the open animation.
 * @cssproperty --forge-open-icon-half-animation-duration - The duration of the open animation when in a half orientation.
 * @cssproperty --forge-open-icon-animation-timing - The timing function of the open animation.
 *
 * @csspart root - The root element of the icon.
 * @csspart icon - The icon element.
 *
 * @slot - The icon to display when open.
 */
@customElement({
  name: OPEN_ICON_CONSTANTS.elementName,
  dependencies: [IconComponent]
})
export class OpenIconComponent extends BaseComponent implements IOpenIconComponent {
  public static get observedAttributes(): string[] {
    return Object.values(OPEN_ICON_CONSTANTS.observedAttributes);
  }

  private _open = false;
  private _orientation: OpenIconOrientation = OPEN_ICON_CONSTANTS.defaults.ORIENTATION;
  private _rotation: OpenIconRotation = OPEN_ICON_CONSTANTS.defaults.ROTATION;

  constructor() {
    super();
    IconRegistry.define([tylIconKeyboardArrowRight, tylIconKeyboardArrowDown]);
    attachShadowTemplate(this, template, styles);
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case OPEN_ICON_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case OPEN_ICON_CONSTANTS.attributes.ORIENTATION:
        this.orientation = newValue as OpenIconOrientation;
        break;
      case OPEN_ICON_CONSTANTS.attributes.ROTATION:
        this.rotation = newValue as OpenIconRotation;
        break;
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._open = value;
      this.toggleAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN, value);
    }
  }

  public get orientation(): OpenIconOrientation {
    return this._orientation;
  }

  public set orientation(value: OpenIconOrientation) {
    if (this._orientation !== value) {
      this._orientation = value;
      this.setAttribute(OPEN_ICON_CONSTANTS.attributes.ORIENTATION, value);
    }
  }

  public get rotation(): OpenIconRotation {
    return this._rotation;
  }
  public set rotation(value: OpenIconRotation) {
    if (this._rotation !== value) {
      this._rotation = value;
      this.setAttribute(OPEN_ICON_CONSTANTS.attributes.ROTATION, value);
    }
  }
}
