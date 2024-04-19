import { CustomElement, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { tylIconKeyboardArrowRight, tylIconKeyboardArrowDown } from '@tylertech/tyler-icons/standard';
import { OpenIconOrientation, OPEN_ICON_CONSTANTS } from './open-icon-constants';
import { IconRegistry, IconComponent, ICON_CONSTANTS } from '../icon';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './open-icon.html';
import styles from './open-icon.scss';

export interface IOpenIconComponent extends IBaseComponent {
  open: boolean;
  orientation: OpenIconOrientation;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-open-icon': IOpenIconComponent;
  }
}

/**
 * @tag forge-open-icon
 */
@CustomElement({
  name: OPEN_ICON_CONSTANTS.elementName,
  dependencies: [IconComponent]
})
export class OpenIconComponent extends BaseComponent implements IOpenIconComponent {
  public static get observedAttributes(): string[] {
    return Object.values(OPEN_ICON_CONSTANTS.observedAttributes);
  }

  private _open = false;
  private _orientation: OpenIconOrientation = OPEN_ICON_CONSTANTS.defaults.ORIENTATION;

  constructor() {
    super();
    IconRegistry.define([
      tylIconKeyboardArrowRight,
      tylIconKeyboardArrowDown
    ]);
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
}
