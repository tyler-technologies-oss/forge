import { customElement, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { SCAFFOLD_CONSTANTS } from './scaffold-constants';

import template from './scaffold.html';
import styles from './scaffold.scss';

export interface IScaffoldComponent extends IBaseComponent {
  viewport: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-scaffold': IScaffoldComponent;
  }
}

/**
 * @tag forge-scaffold
 *
 * @summary The scaffold provides a generic layout structure for your content using common named areas. Use scaffolds for full page layouts or smaller sections within other elements where you want positioned content areas and scrollable body content.
 *
 * @property {boolean} [viewport=false] - Whether the scaffold should be full viewport height.
 *
 * @attribute {boolean} [viewport=false] - Whether the scaffold should be full viewport height.
 *
 * @cssproperty --forge-scaffold-height - The `height` of the scaffold.
 * @cssproperty --forge-scaffold-width - The `width` of the scaffold.
 * @cssproperty --forge-scaffold-overflow - The `overflow` of the scaffold.
 * @cssproperty --forge-scaffold-body-position - The `position` of the scaffold body.
 *
 * @csspart root - The root container element.
 * @csspart header - The header of the scaffold.
 * @csspart body - The body of the scaffold.
 *
 * @cssclass forge-scaffold - The scaffold container (required).
 * @cssclass forge-scaffold--viewport - Sizes the scaffold to match the viewport dimensions.
 * @cssclass forge-scaffold__left - The content to display in the "left" area.
 * @cssclass forge-scaffold__header - The content to display in the "header" area.
 * @cssclass forge-scaffold__body - The content to display in the "body" area.
 * @cssclass forge-scaffold__footer - The content to display in the "footer" area.
 *
 * @slot header - Places content in the header.
 * @slot body - Places content in the body.
 * @slot footer - Places content in the footer.
 * @slot left - Places content to the left of all content.
 * @slot right - Places content to the right of all content.
 * @slot body-header - Places content in the header of the body.
 * @slot body-footer - Places content in the footer of the body.
 * @slot body-left - Places content to the left of the body content.
 * @slot body-right - Places content to the right of the body content.
 */
@customElement({
  name: SCAFFOLD_CONSTANTS.elementName
})
export class ScaffoldComponent extends BaseComponent implements IScaffoldComponent {
  public static get observedAttributes(): string[] {
    return Object.values(SCAFFOLD_CONSTANTS.observedAttributes);
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SCAFFOLD_CONSTANTS.observedAttributes.VIEWPORT:
        this.viewport = newValue !== null;
        break;
    }
  }

  public get viewport(): boolean {
    return this.hasAttribute(SCAFFOLD_CONSTANTS.attributes.VIEWPORT);
  }
  public set viewport(value: boolean) {
    this.toggleAttribute(SCAFFOLD_CONSTANTS.attributes.VIEWPORT, Boolean(value));
  }
}
