import { CustomElement, attachShadowTemplate, ICustomElement, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { StackAdapter } from './stack-adapter';
import { StackFoundation } from './stack-foundation';
import { STACK_CONSTANTS, StackAlignMode, StackAlignment } from './stack-constants';
import { BaseComponent } from '../core/base/base-component';

import template from './stack.html';
import styles from './stack.scss';

export interface IStackComponent extends ICustomElement {
  inline: boolean;
  wrap: boolean;
  stretch: boolean;
  gap: string;
  alignment: StackAlignMode | StackAlignment;
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
 * It's simply a utility component for developer convenience. There are many UI patterns and situations where elements need to be 
 * arranged horizontally or vertically with a specific gap inbetween. Rather than having to inline a style or create a class for 
 * these scenarios, you can reach for the stack. This keeps developers within the template and prevents jumping around from template 
 * to CSS, and helps minimize the number of CSS classes being used.
 * 
 * @property {boolean} inline - Sets the direction of child items to be horizontal.
 * @property {boolean} wrap - Wrap is used to wrap child elements to a new row when there's not enough space. This only works when inline is set to true.
 * @property {boolean} stretch - Stretch allows each child element to take up as much width as possible until the parent container is filled. You can override this on each individual child element by changing its --forge-stack-stretch CSS custom property.
 * @property {string} gap - Controls the amount of space between child elements within a stack.
 * @property {StackAlignment} alignment - Controls the align-items property of the stack.
 * @property {StackAlignment} justify - Controls the justify-content property of the stack.
 * 
 * @attribute {boolean} inline - Sets the direction of child items to be horizontal.
 * @attribute {boolean} wrap - Wrap is used to wrap child elements to a new row when there's not enough space. This only works when inline is set to true.
 * @attribute {boolean} stretch - Stretch allows each child element to take up as much width as possible until the parent container is filled. You can override this on each individual child element by changing its --forge-stack-stretch CSS custom property.
 * @attribute {string} gap - Controls the amount of space between child elements within a stack.
 * @attribute {StackAlignment} alignment - Controls the align-items property of the stack.
 * @attribute {StackAlignment} justify - Controls the justify-content property of the stack.
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
@CustomElement({
  name: STACK_CONSTANTS.elementName
})
export class StackComponent extends BaseComponent implements IStackComponent {
  public static get observedAttributes(): string[] {
    return [
      STACK_CONSTANTS.attributes.INLINE,
      STACK_CONSTANTS.attributes.WRAP,
      STACK_CONSTANTS.attributes.STRETCH,
      STACK_CONSTANTS.attributes.GAP,
      STACK_CONSTANTS.attributes.ALIGNMENT,
      STACK_CONSTANTS.attributes.JUSTIFY
    ];
  }

  private _foundation: StackFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new StackFoundation(new StackAdapter(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case STACK_CONSTANTS.attributes.INLINE:
        this.inline = coerceBoolean(newValue);
        break;
      case STACK_CONSTANTS.attributes.WRAP:
        this.wrap = coerceBoolean(newValue);
        break;
      case STACK_CONSTANTS.attributes.STRETCH:
        this.stretch = coerceBoolean(newValue);
        break;
      case STACK_CONSTANTS.attributes.GAP:
        this.gap = newValue;
        break;
      case STACK_CONSTANTS.attributes.ALIGNMENT:
        this.alignment = newValue as StackAlignment;
        break;
      case STACK_CONSTANTS.attributes.JUSTIFY:
        this.justify = newValue as StackAlignment;
        break;
    }
  }

  /** Controls the direction of the stack. */
  @FoundationProperty()
  public declare inline: boolean;

  /** Controls if items wrap to a new line in inline mode */
  @FoundationProperty()
  public declare wrap: boolean;

  /** Controls if items stretch and take up the maximum amount of space */
  @FoundationProperty()
  public declare stretch: boolean;

  /** Controls the gap between the children within the stack */
  @FoundationProperty()
  public declare gap: string;

  /** Controls the align-items property of a row or column */
  @FoundationProperty()
  public declare alignment: StackAlignMode | StackAlignment;

  /** Controls the justify-content property of a row or column */
  @FoundationProperty()
  public declare justify: StackAlignment;
}
