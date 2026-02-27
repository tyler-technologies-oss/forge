import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconKeyboardArrowDown } from '@tylertech/tyler-icons';
import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { IBaseComponent } from '../core/base/base-component.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/utils/utils.js';
import { IconComponent, IconRegistry } from '../icon/index.js';
import { OPEN_ICON_CONSTANTS, OpenIconOrientation, OpenIconRotation } from './open-icon-constants.js';

import styles from './open-icon.scss';

/** @deprecated - This will be removed in the future. Please switch to using OpenIconComponent. */
export interface IOpenIconComponent extends IBaseComponent {
  open: boolean;
  orientation: OpenIconOrientation;
  rotation: OpenIconRotation;
}

/**
 * @tag forge-open-icon
 *
 * @summary Open icons are icons used to indicate whether a section is open or closed. They provide an animated transition between the two states to enhance the user experience.
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
 *
 * @state open - Applied when the icon is in the open state.
 */
@customElement(OPEN_ICON_CONSTANTS.elementName)
export class OpenIconComponent extends BaseLitElement implements IOpenIconComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = OPEN_ICON_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [IconComponent];

  #internals: ElementInternals;

  // TODO: Remove attribute reflection

  /**
   * Whether the icon is open or closed.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * The orientation of the rotation.
   * @default 'vertical'
   * @attribute
   */
  @property({ reflect: true })
  public orientation: OpenIconOrientation = 'vertical';

  /**
   * The rotation amount.
   * @default 'full'
   * @attribute
   */
  @property({ reflect: true })
  public rotation: OpenIconRotation = 'full';

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('open')) {
      toggleState(this.#internals, 'open', this.open);
    }
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
    IconRegistry.define(tylIconKeyboardArrowDown);
  }

  public render(): TemplateResult {
    const rootClasses = {
      'forge-open-icon': true,
      horizontal: this.orientation === 'horizontal',
      'half-rotation': this.rotation === 'half'
    };
    return html`
      <span class=${classMap(rootClasses)} part="root">
        <slot>
          <forge-icon class="icon" part="icon" name="keyboard_arrow_down"></forge-icon>
        </slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-open-icon': IOpenIconComponent;
  }
}
