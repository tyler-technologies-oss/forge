import { noChange } from 'lit';
import type { ElementPart, PartInfo } from 'lit/directive.js';
import { Directive, directive, PartType } from 'lit/directive.js';

class FormatAttributeDirective extends Directive {
  #attributeName?: string;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error('formatAttribute can only be used on an element');
    }
  }

  public render(_attributeName: string | undefined): typeof noChange {
    return noChange;
  }

  public override update(part: ElementPart, [attributeName]: [string | undefined]): typeof noChange {
    if (attributeName === this.#attributeName) {
      return noChange;
    }
    if (this.#attributeName) {
      part.element.removeAttribute(this.#attributeName);
    }
    if (attributeName) {
      part.element.setAttribute(attributeName, '');
    }
    this.#attributeName = attributeName;
    return noChange;
  }
}

export const formatAttribute = directive(FormatAttributeDirective);
