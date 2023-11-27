import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}paginator`;

const classes = {
  LABEL: 'forge-paginator__label',
  PAGE_SIZE_OPTIONS: 'forge-paginator__page-size-options',
  RANGE_LABEL: 'forge-paginator__range-label',
  RANGE_LABEL_ALTERNATIVE: 'forge-paginator__range-label--alternative',
  FIRST_PAGE_BUTTON: 'forge-paginator__first-page',
  PREVIOUS_PAGE_BUTTON: 'forge-paginator__previous-page',
  NEXT_PAGE_BUTTON: 'forge-paginator__next-page',
  LAST_PAGE_BUTTON: 'forge-paginator__last-page',
  ROOT: 'forge-paginator',
  ALTERNATIVE: 'forge-paginator--alternative',
  ALIGNMENT_START: 'forge-paginator--alignment-start',
  ALIGNMENT_SPACE_BETWEEN: 'forge-paginator--alignment-center',
  ALIGNMENT_END: 'forge-paginator--alignment-end'
};

const selectors = {
  LABEL: `.${classes.LABEL}`,
  PAGE_SIZE_SELECT: `.${classes.PAGE_SIZE_OPTIONS}`,
  RANGE_LABEL: `.${classes.RANGE_LABEL}`,
  FIRST_PAGE_BUTTON: `.${classes.FIRST_PAGE_BUTTON} > button`,
  FIRST_PAGE_ICON_BUTTON: `.${classes.FIRST_PAGE_BUTTON}`,
  PREVIOUS_PAGE_BUTTON: `.${classes.PREVIOUS_PAGE_BUTTON} > button`,
  NEXT_PAGE_BUTTON: `.${classes.NEXT_PAGE_BUTTON} > button`,
  LAST_PAGE_BUTTON: `.${classes.LAST_PAGE_BUTTON} > button`,
  LAST_PAGE_ICON_BUTTON: `.${classes.LAST_PAGE_BUTTON}`,
  ROOT: `.${classes.ROOT}`,
  RANGE_LABEL_ALTERNATIVE: `.${classes.RANGE_LABEL_ALTERNATIVE}`
};

const attributes = {
  PAGE_INDEX: 'page-index',
  PAGE_SIZE: 'page-size',
  OFFSET: 'offset',
  PAGE_SIZE_OPTIONS: 'page-size-options',
  TOTAL: 'total',
  LABEL: 'label',
  FIRST_LAST: 'first-last',
  FIRST: 'first',
  DISABLED: 'disabled',
  ALTERNATIVE: 'alternative',
  ALIGNMENT: 'alignment'
};

const events = {
  CHANGE: `${elementName}-change`
};

const numbers = {
  DEFAULT_PAGE_INDEX: 0,
  DEFAULT_TOTAL: 0,
  DEFAULT_PAGE_SIZE: 25,
  DEFAULT_PAGE_SIZE_OPTIONS: [5, 15, 25, 50, 100]
};

const strings = {
  DEFAULT_LABEL: 'Rows per page:',
  RANGE_SEPARATOR_LABEL: 'of',
  FIRST_PAGE: 'first-page',
  PREVIOUS_PAGE: 'previous-page',
  NEXT_PAGE: 'next-page',
  LAST_PAGE: 'last-page',
  PAGE_SIZE: 'page-size'
};

export const PAGINATOR_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  events,
  numbers,
  strings
};

export type PaginatorAlternativeAlignment = 'start' | 'space-between' | 'end';
export interface IPaginatorChangeEvent {
  type: string;
  pageSize: number;
  pageIndex: number;
  offset: number;
}

export interface IPaginatorRangeState {
  pageSize: number;
  pageIndex: number;
  offset: number;
  pageStart: number;
  pageEnd: number;
  total: number;
}

export type PaginatorRangeLabelBuilder = ((state: IPaginatorRangeState) => string) | undefined | null;
