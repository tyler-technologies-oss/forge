import { customElement, attachShadowTemplate, coerceBoolean, coreProperty } from '@tylertech/forge-core';
import { StackAdapter } from './stack-adapter';
import { StackCore } from './stack-core';
import { STACK_CONSTANTS, StackAlignment } from './stack-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './stack.html';
import styles from './stack.scss';

export interface IStackComponent extends IBaseComponent {
  inline: boolean;
  wrap: boolean;
  stretch: boolean;
  gap: string;
  alignment: StackAlignment;
  justify: StackAlignment;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-stack': IStackComponent;
  }
}

/**
 * @tag forge-stack
 *
 * @summary The stack is a utility component that helps manage spacing and alignment of immediate children along a vertical or horizontal axis.
 *
 * @description
 * The stack utility component uses flexbox under the hood, but it is not meant to be an abstraction or replacement for CSS flexbox.
 * Stack is simply a utility component for developer convenience. There are many UI patterns and situations where elements need to be
 * arranged horizontally or vertically with a specific gap inbetween. Instead of having to use an inline style or create a new CSS class for
 * these scenarios, you can reach for the stack. This keeps developers within a template and prevents having to jump around from HTML
 * to CSS. It also helps minimize the number of CSS classes being used for simple situations where basic flexbox is needed.
 *
 * @cssproperty --forge-stack-alignment - Controls the align-items CSS property of the root stack element.
 * @cssproperty --forge-stack-justify - Controls the justify-content CSS property of the root stack element.
 * @cssproperty --forge-stack-gap - Controls the gap between each child element within a stack.
 * @cssproperty --forge-stack-height - Controls the height of the root stack element.
 * @cssproperty --forge-stack-stretch - Controls the flex shorthand property of a child element within the stack.
 *
 * @csspart root - The root container element.
 *
 * @slot - The default/unnamed slot for stack content.
 */
@customElement({
  name: STACK_CONSTANTS.elementName
})
export class StackComponent extends BaseComponent implements IStackComponent {
  public static get observedAttributes(): string[] {
    return Object.values(STACK_CONSTANTS.observedAttributes);
  }

  private readonly _core: StackCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new StackCore(new StackAdapter(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case STACK_CONSTANTS.observedAttributes.INLINE:
        this.inline = coerceBoolean(newValue);
        break;
      case STACK_CONSTANTS.observedAttributes.WRAP:
        this.wrap = coerceBoolean(newValue);
        break;
      case STACK_CONSTANTS.observedAttributes.STRETCH:
        this.stretch = coerceBoolean(newValue);
        break;
      case STACK_CONSTANTS.observedAttributes.GAP:
        this.gap = newValue;
        break;
      case STACK_CONSTANTS.observedAttributes.ALIGNMENT:
        this.alignment = newValue as StackAlignment;
        break;
      case STACK_CONSTANTS.observedAttributes.JUSTIFY:
        this.justify = newValue as StackAlignment;
        break;
    }
  }

  /**
   * Controls the direction of the stack.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare inline: boolean;

  /**
   * Controls if items wrap to a new line in inline mode
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare wrap: boolean;

  /**
   * Controls if items stretch and take up the maximum amount of space
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare stretch: boolean;

  /**
   * Controls the gap between the children within the stack
   * @default 16
   * @attribute
   */
  @coreProperty()
  public declare gap: string;

  /**
   * Controls the align-items property of a row or column
   * @default "start"
   * @attribute
   */
  @coreProperty()
  public declare alignment: StackAlignment;

  /**
   * Controls the justify-content property of a row or column
   * @default "start"
   * @attribute
   */
  @coreProperty()
  public declare justify: StackAlignment;
}
