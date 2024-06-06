import { customElement, attachShadowTemplate, coreProperty, coerceBoolean, coerceNumberArray, coerceNumber } from '@tylertech/forge-core';
import { tylIconFirstPage, tylIconLastPage, tylIconKeyboardArrowRight, tylIconKeyboardArrowLeft } from '@tylertech/tyler-icons/standard';
import { PAGINATOR_CONSTANTS, IPaginatorChangeEventData, PaginatorRangeLabelBuilder } from './paginator-constants';
import { PaginatorCore } from './paginator-core';
import { PaginatorAdapter } from './paginator-adapter';
import { IconButtonComponent } from '../icon-button/icon-button';
import { SelectComponent } from '../select/select';
import { IconRegistry } from '../icon/icon-registry';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { TooltipComponent } from '../tooltip/tooltip';

import template from './paginator.html';
import styles from './paginator.scss';

export interface IPaginatorComponent extends IBaseComponent {
  pageIndex: number;
  pageSize: number;
  offset: number;
  total: number;
  pageSizeOptions: number[];
  label: string;
  firstLast: boolean;
  first: boolean;
  disabled: boolean;
  alternative: boolean;
  rangeLabelCallback: PaginatorRangeLabelBuilder;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-paginator': IPaginatorComponent;
  }

  interface HTMLElementEventMap {
    'forge-paginator-change': CustomEvent<IPaginatorChangeEventData>;
  }
}

/**
 * @tag forge-paginator
 * 
 * @event {CustomEvent<IPaginatorChangeEventData>} forge-paginator-change - Dispatched when the paginator state changes.
 */
@customElement({
  name: PAGINATOR_CONSTANTS.elementName,
  dependencies: [
    IconButtonComponent,
    SelectComponent,
    TooltipComponent
  ]
})
export class PaginatorComponent extends BaseComponent implements IPaginatorComponent {
  public static get observedAttributes(): string[] {
    return Object.values(PAGINATOR_CONSTANTS.observedAttributes);
  }

  private _core: PaginatorCore;

  constructor() {
    super();
    IconRegistry.define([
      tylIconFirstPage,
      tylIconKeyboardArrowLeft,
      tylIconKeyboardArrowRight,
      tylIconLastPage
    ]);
    attachShadowTemplate(this, template, styles);
    this._core = new PaginatorCore(new PaginatorAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case PAGINATOR_CONSTANTS.observedAttributes.PAGE_INDEX:
        this.pageIndex = coerceNumber(newValue) ?? PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX;
        break;
      case PAGINATOR_CONSTANTS.observedAttributes.PAGE_SIZE:
        this.pageSize = coerceNumber(newValue) ?? PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE;
        break;
      case PAGINATOR_CONSTANTS.observedAttributes.OFFSET:
        this.offset = coerceNumber(newValue);
        break;
      case PAGINATOR_CONSTANTS.observedAttributes.TOTAL:
        this.total = coerceNumber(newValue) ?? PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL;
        break;
      case PAGINATOR_CONSTANTS.observedAttributes.PAGE_SIZE_OPTIONS:
        this.pageSizeOptions = coerceNumberArray(newValue) ?? PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS;
        break;
      case PAGINATOR_CONSTANTS.observedAttributes.LABEL:
        this.label = newValue;
        break;
      case PAGINATOR_CONSTANTS.observedAttributes.FIRST_LAST:
        this.firstLast = coerceBoolean(newValue);
        break;
      case PAGINATOR_CONSTANTS.observedAttributes.FIRST:
        this.first = coerceBoolean(newValue);
        break;
      case PAGINATOR_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case PAGINATOR_CONSTANTS.observedAttributes.ALTERNATIVE:
        this.alternative = coerceBoolean(newValue);
        break;
    }
  }

  /**
   * The zero-based page index.
   * @attribute page-index
   * @default 0
   */
  @coreProperty()
  public declare pageIndex: number;

  /**
   * Number of items to display on a page.
   * @attribute page-size
   * @default 25
   */
  @coreProperty()
  public declare pageSize: number;

  /**
   * Sets page index by providing the number of items to skip. The getter for this property returns the number of items to skip.
   * @attribute offset
   * @default 0
   */
  @coreProperty()
  public declare offset: number;

  /**
   * The total number of items to be paginated.
   * @attribute
   * @default 0;
   */
  @coreProperty()
  public declare total: number;

  /**
   * The set of provided page size options to display to the user.
   * @attribute page-size-options
   * @default [5, 15, 25, 50, 100]
   */
  @coreProperty()
  public declare pageSizeOptions: number[];

  /**
   * A label for the paginator.
   * @attribute
   * @default "Rows per page:"
   */
  @coreProperty()
  public declare label: string;

  /**
   * Whether to show the first page and last page buttons.
   * @attribute first-last
   * @default false
   */
  @coreProperty()
  public declare firstLast: boolean;

  /**
   * Whether to show the first page button. Default is false.
   * @attribute
   * @default false
   */
  @coreProperty()
  public declare first: boolean;

  /**
   * Whether the paginator is disabled.
   * @attribute
   * @default false
   */
  @coreProperty()
  public declare disabled: boolean;

  /**
   * Whether to use the alternative range label slot.
   * @attribute
   * @default false
   */
  @coreProperty()
  public declare alternative: boolean;

  /**
   * A callback function to build the range label dynamically.
   */
  @coreProperty()
  public declare rangeLabelCallback: PaginatorRangeLabelBuilder;

  /** Sets focus to the first focusable element within the paginator. */
  public override focus(options?: FocusOptions): void {
    this._core.focus(options);
  }
}
