import { CustomElement, attachShadowTemplate, ICustomElement, coerceBoolean, FoundationProperty, coerceNumber } from '@tylertech/forge-core';
import { StackAdapter } from './stack-adapter';
import { StackFoundation } from './stack-foundation';
import { STACK_CONSTANTS, StackAlignMode } from './stack-constants';

import template from './stack.html';
import styles from './stack.scss';
import { BaseComponent } from '../core';

export interface IStackComponent extends ICustomElement {
  inline: boolean;
  wrap: boolean;
  stretch: boolean;
  gap: number;
  align: StackAlignMode;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-stack': IStackComponent;
  }
}

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
      STACK_CONSTANTS.attributes.ALIGN
    ];
  }

  private _foundation: StackFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new StackFoundation(new StackAdapter(this));
  }
  

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
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
        this.gap = coerceNumber(newValue);
        break;
      case STACK_CONSTANTS.attributes.ALIGN:
        this.align = newValue as StackAlignMode;
        break;
    }
  }

  /** Controls the direction of the stack. */
  @FoundationProperty()
  public declare inline: boolean;

  /** Controls if items wrap to a new line in inline mode */
  @FoundationProperty()
  public declare wrap: boolean;

  /** Controls if items wrap to a new line in inline mode */
  @FoundationProperty()
  public declare stretch: boolean;

  /** Controls if items wrap to a new line in inline mode */
  @FoundationProperty()
  public declare gap: number;

  /** Controls if stack items are at the end of the row or column */
  @FoundationProperty()
  public declare align: StackAlignMode;
}
