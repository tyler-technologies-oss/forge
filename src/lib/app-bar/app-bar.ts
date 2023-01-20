import { CustomElement, attachShadowTemplate, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { AppBarAdapter } from './app-bar-adapter';
import { AppBarFoundation } from './app-bar-foundation';
import { APP_BAR_CONSTANTS } from './app-bar-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './app-bar.html';
import styles from './app-bar.scss?inline';

export interface IAppBarComponent extends IBaseComponent {
  titleText: string;
  fixed: boolean;
  raised: boolean;
  theme: string | null | undefined;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar': IAppBarComponent;
  }
}

/**
 * The web component class behind the `<forge-app-bar>` custom element.
 * 
 * @tag forge-app-bar
 */
@CustomElement({
  name: APP_BAR_CONSTANTS.elementName
})
export class AppBarComponent extends BaseComponent implements IAppBarComponent {
  public static get observedAttributes(): string[] {
    return [
      APP_BAR_CONSTANTS.attributes.TITLE_TEXT,
      APP_BAR_CONSTANTS.attributes.FIXED,
      APP_BAR_CONSTANTS.attributes.RAISED
    ];
  }

  private _foundation: AppBarFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new AppBarFoundation(new AppBarAdapter(this));
  }

  public initializedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case APP_BAR_CONSTANTS.attributes.TITLE_TEXT:
        this.titleText = newValue;
        break;
      case APP_BAR_CONSTANTS.attributes.FIXED:
        this.fixed = coerceBoolean(newValue);
        break;
      case APP_BAR_CONSTANTS.attributes.RAISED:
        this.raised = coerceBoolean(newValue);
        break;
    }
  }

  /** Gets/sets the title text. */
  @FoundationProperty()
  public declare titleText: string;

  /** Gets/sets the fixed variant. */
  @FoundationProperty()
  public declare fixed: boolean;

  /** Gets/sets the raised state. */
  @FoundationProperty()
  public declare raised: boolean;

  /** Convenience property to allow for easily getting/setting the theme color from JavaScript. */
  public get theme(): string | null | undefined {
    return this.getAttribute(APP_BAR_CONSTANTS.attributes.THEME) || null;
  }
  public set theme(value: string | null | undefined) {
    if (value) {
      this.setAttribute(APP_BAR_CONSTANTS.attributes.THEME, value);
    } else {
      this.removeAttribute(APP_BAR_CONSTANTS.attributes.THEME);
    }
  }
}
