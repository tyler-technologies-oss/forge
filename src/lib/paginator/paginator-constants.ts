import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}paginator`;

const observedAttributes = {
  PAGE_INDEX: 'page-index',
  PAGE_SIZE: 'page-size',
  OFFSET: 'offset',
  TOTAL: 'total',
  PAGE_SIZE_OPTIONS: 'page-size-options',
  LABEL: 'label',
  FIRST_LAST: 'first-last',
  FIRST: 'first',
  DISABLED: 'disabled',
  ALTERNATIVE: 'alternative'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  LABEL: '.label > slot[name=label]',
  PAGE_SIZE_SELECT: '.page-size-options',
  RANGE_LABEL: '.range-label > slot[name=range-label]',
  FIRST_PAGE_BUTTON: '.first-page',
  FIRST_PAGE_CONTAINER: '#first-page-container',
  PREVIOUS_PAGE_BUTTON: '.previous-page',
  PREVIOUS_PAGE_CONTAINER: '#previous-page-container',
  NEXT_PAGE_BUTTON: '.next-page',
  NEXT_PAGE_CONTAINER: '#next-page-container',
  LAST_PAGE_BUTTON: '.last-page',
  LAST_PAGE_CONTAINER: '#last-page-container',
  RANGE_LABEL_ALTERNATIVE: '.alternative-range-label > slot[name=alternative-range-label]'
};

const events = {
  CHANGE: `${elementName}-change`
} as const;

const numbers = {
  DEFAULT_PAGE_INDEX: 0,
  DEFAULT_TOTAL: 0,
  DEFAULT_PAGE_SIZE: 25,
  DEFAULT_PAGE_SIZE_OPTIONS: [5, 15, 25, 50, 100]
};

const strings = {
  DEFAULT_LABEL: 'Rows per page:',
  RANGE_SEPARATOR_LABEL: 'of'
};

export const PAGINATOR_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events,
  numbers,
  strings
};

export interface IPaginatorChangeEventData {
  type: 'previous-page' | 'next-page' | 'first-page' | 'last-page' | 'page-size';
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

export interface IPaginatorPageInfo {
  pageIndex: number;
  pageSize: number;
  total: number;
  offset: number;
  pageStart: number;
  pageEnd: number;
  totalPages: number;
}
