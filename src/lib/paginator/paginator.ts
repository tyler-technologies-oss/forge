import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { tylIconFirstPage, tylIconLastPage, tylIconKeyboardArrowRight, tylIconKeyboardArrowLeft } from '@tylertech/tyler-icons/standard';
import { PaginatorAlternativeAlignment, PAGINATOR_CONSTANTS, IPaginatorChangeEvent, PaginatorRangeLabelBuilder } from './paginator-constants';
import { PaginatorFoundation } from './paginator-foundation';
import { PaginatorAdapter } from './paginator-adapter';
import { IconButtonComponent } from '../icon-button';
import { SelectComponent } from '../select';
import { IconComponent, IconRegistry } from '../icon';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { TooltipComponent } from '../tooltip';

import template from './paginator.html';
import styles from './paginator.scss';

export interface IPaginatorComponent extends IBaseComponent {
  pageIndex: number;
  pageSize: number;
  offset: number;
  total: number;
  pageSizeOptions: number[] | boolean;
  label: string;
  firstLast: boolean;
  first: boolean;
  disabled: boolean;
  alternative: boolean;
  alignment: PaginatorAlternativeAlignment;
  rangeLabelCallback: PaginatorRangeLabelBuilder;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-paginator': IPaginatorComponent;
  }

  interface HTMLElementEventMap {
    'forge-paginator-change': CustomEvent<IPaginatorChangeEvent>;
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
    IconComponent,
    TooltipComponent
  ]
})
export class PaginatorComponent extends BaseComponent implements IPaginatorComponent {
  public static get observedAttributes(): string[] {
    return [
      PAGINATOR_CONSTANTS.attributes.PAGE_INDEX,
      PAGINATOR_CONSTANTS.attributes.PAGE_SIZE,
      PAGINATOR_CONSTANTS.attributes.OFFSET,
      PAGINATOR_CONSTANTS.attributes.TOTAL,
      PAGINATOR_CONSTANTS.attributes.PAGE_SIZE_OPTIONS,
      PAGINATOR_CONSTANTS.attributes.LABEL,
      PAGINATOR_CONSTANTS.attributes.FIRST_LAST,
      PAGINATOR_CONSTANTS.attributes.FIRST,
      PAGINATOR_CONSTANTS.attributes.DISABLED,
      PAGINATOR_CONSTANTS.attributes.ALTERNATIVE,
      PAGINATOR_CONSTANTS.attributes.ALIGNMENT
    ];
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

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case PAGINATOR_CONSTANTS.attributes.PAGE_INDEX:
        this.pageIndex = Number(newValue) || PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX;
        break;
      case PAGINATOR_CONSTANTS.attributes.PAGE_SIZE:
        this.pageSize = Number(newValue) || PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE;
        break;
      case PAGINATOR_CONSTANTS.attributes.OFFSET:
        this.offset = Number(newValue);
        break;
      case PAGINATOR_CONSTANTS.attributes.TOTAL:
        this.total = Number(newValue) || PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL;
        break;
      case PAGINATOR_CONSTANTS.attributes.PAGE_SIZE_OPTIONS:
        this.pageSizeOptions = newValue as any;
        break;
      case PAGINATOR_CONSTANTS.attributes.LABEL:
        this.label = newValue;
        break;
      case PAGINATOR_CONSTANTS.attributes.FIRST_LAST:
        this.firstLast = coerceBoolean(newValue);
        break;
      case PAGINATOR_CONSTANTS.attributes.FIRST:
        this.first = coerceBoolean(newValue);
        break;
      case PAGINATOR_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case PAGINATOR_CONSTANTS.attributes.ALTERNATIVE:
        this.alternative = coerceBoolean(newValue);
        break;
      case PAGINATOR_CONSTANTS.attributes.ALIGNMENT:
        this.alignment = newValue as PaginatorAlternativeAlignment;
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
  public declare pageSizeOptions: number[] | boolean;

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
  public declare alignment: PaginatorAlternativeAlignment;

  @FoundationProperty()
  public declare rangeLabelCallback: PaginatorRangeLabelBuilder;

  public override focus(options?: FocusOptions): void {
    this._foundation.focus(options);
  }
}
