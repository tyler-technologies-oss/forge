import { attachShadowTemplate, coerceBoolean, coreProperty, customElement } from '@tylertech/forge-core';

import { setDefaultAria } from '../../constants';
import { BaseComponent } from '../../core/base/base-component';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { TreeAdapter } from './tree-adapter';
import { TREE_CONSTANTS, TreeMode } from './tree-constants';
import { TreeCore } from './tree-core';

import template from './tree.html';
import styles from './tree.scss';

export interface ITreeComponent extends IWithElementInternals, IWithDefaultAria {
  value: unknown[];
  mode: TreeMode;
  selectionFollowsFocus: boolean;
  accordion: boolean;
  indentLines: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tree': ITreeComponent;
  }
}

/**
 * @tag forge-tree
 */
@customElement({
  name: TREE_CONSTANTS.elementName
})
export class TreeComponent extends WithElementInternals(WithDefaultAria(BaseComponent)) implements ITreeComponent {
  public static get observedAttributes(): string[] {
    return Object.values(TREE_CONSTANTS.observedAttributes);
  }

  private _core: TreeCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new TreeCore(new TreeAdapter(this));
  }

  public connectedCallback(): void {
    this[setDefaultAria]({
      role: 'tree'
    });
    this.setAttribute('tabindex', '0');
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TREE_CONSTANTS.observedAttributes.MODE:
        this.mode = newValue as TreeMode;
        break;
      case TREE_CONSTANTS.observedAttributes.SELECTION_FOLLOWS_FOCUS:
        this.selectionFollowsFocus = coerceBoolean(newValue);
        break;
      case TREE_CONSTANTS.observedAttributes.ACCORDION:
        this.accordion = coerceBoolean(newValue);
        break;
      case TREE_CONSTANTS.observedAttributes.INDENT_LINES:
        this.indentLines = coerceBoolean(newValue);
        break;
    }
  }

  @coreProperty()
  public declare value: unknown[];

  @coreProperty()
  public declare mode: TreeMode;

  @coreProperty()
  public declare selectionFollowsFocus: boolean;

  @coreProperty()
  public declare accordion: boolean;

  @coreProperty()
  public declare indentLines: boolean;
}
