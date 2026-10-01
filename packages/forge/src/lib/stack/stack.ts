import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/utils/utils.js';
import { StackAlignment, STACK_CONSTANTS } from './stack-constants.js';

import styles from './stack.scss';

const toGapStyle = (gap: string | null): string | undefined => {
  const trimmedGap = gap == null ? undefined : String(gap).trim();
  if (!trimmedGap || trimmedGap === STACK_CONSTANTS.defaults.GAP) {
    return undefined;
  }
  const numericGap = Number(trimmedGap);
  const value = Number.isFinite(numericGap) ? `${numericGap}px` : trimmedGap;
  return `var(--forge-stack-gap, ${value})`;
};

/** @deprecated - This will be removed in the future. Please switch to using StackComponent. */
export interface IStackComponent extends BaseLitElement {
  inline: boolean;
  wrap: boolean;
  stretch: boolean;
  gap: string;
  alignment: StackAlignment;
  justify: StackAlignment;
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
 * @state inline - Applied when the stack renders in the inline (horizontal) direction.
 * @state wrap - Applied when the stack allows its children to wrap.
 * @state stretch - Applied when the stack stretches its children.
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
export class StackComponent extends BaseLitElement implements IStackComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = STACK_CONSTANTS.elementName;

  #internals: ElementInternals;

  /**
   * Controls the direction of the stack.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public inline = false;

  /**
   * Controls if items wrap to a new line in inline mode
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public wrap = false;

  /**
   * Controls if items stretch and take up the maximum amount of space
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public stretch = false;

  /**
   * Controls the gap between the children within the stack
   * @default "16"
   * @attribute
   */
  @property({ reflect: true, useDefault: true })
  public gap = STACK_CONSTANTS.defaults.GAP;

  /**
   * Controls the align-items property of a row or column
   * @default "start"
   * @attribute
   */
  @property({ reflect: true, useDefault: true })
  public alignment: StackAlignment = STACK_CONSTANTS.defaults.ALIGNMENT;

  /**
   * Controls the justify-content property of a row or column
   * @default "start"
   * @attribute
   */
  @property({ reflect: true, useDefault: true })
  public justify: StackAlignment = STACK_CONSTANTS.defaults.ALIGNMENT;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('inline')) {
      toggleState(this.#internals, 'inline', this.inline);
    }
    if (changedProperties.has('wrap')) {
      toggleState(this.#internals, 'wrap', this.wrap);
    }
    if (changedProperties.has('stretch')) {
      toggleState(this.#internals, 'stretch', this.stretch);
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-stack" part="root" style=${styleMap({ gap: toGapStyle(this.gap) })}>
        <slot></slot>
      </div>
    `;
  }
}

tryDefine(STACK_CONSTANTS.elementName, StackComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-stack': IStackComponent;
  }
}
