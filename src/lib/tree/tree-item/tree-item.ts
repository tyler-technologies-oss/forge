import { attachShadowTemplate, coerceBoolean, coreProperty, customElement } from '@tylertech/forge-core';
import { tylIconCheckBox, tylIconCheckBoxOutlineBlank, tylIconIndeterminateCheckBox } from '@tylertech/tyler-icons/standard';

import { setDefaultAria } from '../../constants';
import { BaseComponent } from '../../core/base/base-component';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { FocusIndicatorComponent } from '../../focus-indicator';
import { IconComponent, IconRegistry } from '../../icon';
import { OpenIconComponent } from '../../open-icon';
import { StateLayerComponent } from '../../state-layer';
import { TreeItemAdapter } from './tree-item-adapter';
import { setIndeterminate, setOpen, setSelected, TREE_ITEM_CONSTANTS } from './tree-item-constants';
import { TreeItemCore } from './tree-item-core';

import template from './tree-item.html';
import styles from './tree-item.scss';

export interface ITreeItemComponent extends IWithElementInternals, IWithDefaultAria {
  selected: boolean;
  value: unknown;
  open: boolean;
  readonly leaf: boolean;
  readonly level: number;
  readonly indeterminate: boolean;
  readonly childItems: ITreeItemComponent[];
  [setIndeterminate](value: boolean): void;
  [setOpen](value: boolean): void;
  [setSelected](value: boolean): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tree-item': ITreeItemComponent;
  }

  interface HTMLElementEventMap {
    'forge-tree-item-open': CustomEvent<void>;
  }
}

/**
 * @tag forge-tree-item
 */
@customElement({
  name: TREE_ITEM_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, IconComponent, OpenIconComponent, StateLayerComponent]
})
export class TreeItemComponent extends WithElementInternals(WithDefaultAria(BaseComponent)) implements ITreeItemComponent {
  public static get observedAttributes(): string[] {
    return Object.values(TREE_ITEM_CONSTANTS.observedAttributes);
  }

  private _core: TreeItemCore;

  constructor() {
    super();
    IconRegistry.define([tylIconCheckBox, tylIconIndeterminateCheckBox, tylIconCheckBoxOutlineBlank]);
    attachShadowTemplate(this, template, styles);
    this._core = new TreeItemCore(new TreeItemAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
    this[setDefaultAria]({
      role: 'treeitem',
      ariaExpanded: this.leaf ? null : this.open ? 'true' : 'false',
      ariaSelected: this.selected ? 'true' : 'false'
    });
    this.tabIndex = -1;
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TREE_ITEM_CONSTANTS.observedAttributes.VALUE:
        this.value = newValue.toString();
        break;
      case TREE_ITEM_CONSTANTS.observedAttributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        break;
      case TREE_ITEM_CONSTANTS.observedAttributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
    }
  }

  @coreProperty()
  public declare selected: boolean;

  @coreProperty()
  public declare value: unknown;

  @coreProperty()
  public declare open: boolean;

  @coreProperty({ set: false })
  public declare leaf: boolean;

  @coreProperty({ set: false })
  public declare level: number;

  @coreProperty({ set: false })
  public declare indeterminate: boolean;

  @coreProperty({ set: false })
  public declare childItems: ITreeItemComponent[];

  /**
   * Sets whether the item is marked as indeterminate.
   */
  public [setIndeterminate](value: boolean): void {
    this._core.setIndeterminate(value);
  }

  /**
   * Sets the open state without emitting an event. Use this for programmatic open to distinguish from user open.
   */
  public [setOpen](value: boolean): void {
    this._core.setOpen(value);
  }

  /**
   * Sets the selected state without emitting an event. Use this for programmatic selections to distinguish from user actions.
   */
  public [setSelected](value: boolean): void {
    this._core.setSelected(value);
  }
}
