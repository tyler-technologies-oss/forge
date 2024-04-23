import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean, coerceNumberArray, coerceNumber } from '@tylertech/forge-core';
import { tylIconFirstPage, tylIconLastPage, tylIconKeyboardArrowRight, tylIconKeyboardArrowLeft } from '@tylertech/tyler-icons/standard';
import { PAGINATOR_CONSTANTS, IPaginatorChangeEventData, PaginatorRangeLabelBuilder } from './paginator-constants';
import { PaginatorFoundation } from './paginator-foundation';
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
 */
@CustomElement({
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

  private _foundation: PaginatorFoundation;

  constructor() {
    super();
    IconRegistry.define([
      tylIconFirstPage,
      tylIconKeyboardArrowLeft,
      tylIconKeyboardArrowRight,
      tylIconLastPage
    ]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new PaginatorFoundation(new PaginatorAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
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

  /** The zero-based page index. Default is 0. */
  @FoundationProperty()
  public declare pageIndex: number;

  /** Number of items to display on a page. By default set to 25. */
  @FoundationProperty()
  public declare pageSize: number;

  /** Sets page index by providing the number of items to skip. The getter for this property returns the number of items to skip. */
  @FoundationProperty()
  public declare offset: number;

  /** The total number of items to be paginated. Default is 0. */
  @FoundationProperty()
  public declare total: number;

  /** The set of provided page size options to display to the user. */
  @FoundationProperty()
  public declare pageSizeOptions: number[];

  /** A label for the paginator. Default is "Rows per page:". */
  @FoundationProperty()
  public declare label: string;

  /** Whether to show the first page and last page buttons. Default is false. */
  @FoundationProperty()
  public declare firstLast: boolean;

  /** Whether to show the first page button. Default is false. */
  @FoundationProperty()
  public declare first: boolean;

  /** Whether the paginator is disabled. Default is false. */
  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare alternative: boolean;

  @FoundationProperty()
  public declare rangeLabelCallback: PaginatorRangeLabelBuilder;

  public override focus(options?: FocusOptions): void {
    this._foundation.focus(options);
  }
}
