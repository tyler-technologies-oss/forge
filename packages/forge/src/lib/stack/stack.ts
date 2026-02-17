import { customElement, attachShadowTemplate, coerceBoolean, coreProperty } from '@tylertech/forge-core';
import { StackAdapter } from './stack-adapter.js';
import { StackCore } from './stack-core.js';
import { STACK_CONSTANTS, StackAlignment } from './stack-constants.js';
import { BaseComponent, IBaseComponent } from '../core/base/base-component.js';

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
 * @summary The stack is a utility component that helps manage spacing and alignment of immediate children along a vertical or horizontal axis. Use stacks sparingly to avoid unnecessary DOM complexity, and prefer CSS flexbox or grid for more complex layouts.
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
 *
 * @cssclass forge-stack - The base stack container class.
 * @cssclass forge-stack--inline - Renders the stack in the inline (horizontal) direction.
 * @cssclass forge-stack--wrap - Allows the stack to wrap to a new line in inline mode.
 * @cssclass forge-stack--stretch - Stretches the children to take up the maximum amount of space.
 * @cssclass forge-stack--align-start - Aligns the children to the start of the stack.
 * @cssclass forge-stack--align-center - Aligns the children to the center of the stack.
 * @cssclass forge-stack--align-end - Aligns the children to the end of the stack.
 * @cssclass forge-stack--justify-start - Justifies the children to the start of the stack.
 * @cssclass forge-stack--justify-center - Justifies the children to the center of the stack.
 * @cssclass forge-stack--justify-end - Justifies the children to the end of the stack.
 * @cssclass forge-stack--justify-space-between - Justifies the children with equal space between them.
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
  declare public inline: boolean;

  /**
   * Controls if items wrap to a new line in inline mode
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public wrap: boolean;

  /**
   * Controls if items stretch and take up the maximum amount of space
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public stretch: boolean;

  /**
   * Controls the gap between the children within the stack
   * @default 16
   * @attribute
   */
  @coreProperty()
  declare public gap: string;

  /**
   * Controls the align-items property of a row or column
   * @default "start"
   * @attribute
   */
  @coreProperty()
  declare public alignment: StackAlignment;

  /**
   * Controls the justify-content property of a row or column
   * @default "start"
   * @attribute
   */
  @coreProperty()
  declare public justify: StackAlignment;
}
