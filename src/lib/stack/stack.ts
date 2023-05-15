import { CustomElement, attachShadowTemplate, ICustomElement, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { StackAdapter } from './stack-adapter';
import { StackFoundation } from './stack-foundation';
import { STACK_CONSTANTS, StackAlignMode } from './stack-constants';
import { BaseComponent } from '../core/base/base-component';

import template from './stack.html';
import styles from './stack.scss';

export interface IStackComponent extends ICustomElement {
  inline: boolean;
  wrap: boolean;
  stretch: boolean;
  gap: string;
  alignment: StackAlignMode;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-stack': IStackComponent;
  }
}

/**
 * The custom element class behind the `<forge-stack>` component.
 * 
 * @tag forge-stack
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
      STACK_CONSTANTS.attributes.ALIGNMENT
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
        this.alignment = newValue as StackAlignMode;
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

  /** Controls if stack items are at the end of the row or column */
  @FoundationProperty()
  public declare alignment: StackAlignMode;
}
