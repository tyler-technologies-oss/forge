import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}table`;

const classes = {
  TABLE: 'forge-table',
  TABLE_DENSE: 'forge-table--dense',
  TABLE_ROOMY: 'forge-table--roomy',
  TABLE_RESIZABLE: 'forge-table--resizable',
  TABLE_RESIZING: 'forge-table--resizing',
  TABLE_RESIZE_HANDLE: 'forge-table__resize-handle',
  TABLE_NO_WRAP_CONTENT: 'forge-table--no-wrap-content',
  TABLE_LAYOUT_FIXED: 'forge-table--layout-fixed',
  TABLE_FILTER_VISIBLE: 'forge-table--filter-visible',
  TABLE_FIXED: 'forge-table--fixed',
  TABLE_HEAD: 'forge-table-head',
  TABLE_HEAD_ROW: 'forge-table-head__row',
  TABLE_HEAD_ROW_FILTER: 'forge-table-head__row__filter',
  TABLE_HEAD_CELL: 'forge-table-head__cell',
  TABLE_HEAD_CELL_CONTAINER: 'forge-table-head__cell-container',
  TABLE_HEAD_CELL_SORTABLE: 'forge-table-head__cell--sortable',
  TABLE_HEAD_CELL_SORT_ICON: 'forge-table-head__cell-sort-icon',
  TABLE_HEAD_CELL_TEXT: 'forge-table-head__cell-text',
  TABLE_HEAD_CELL_SORT_ICON_ACTIVE: 'forge-table-head__cell-sort-icon--active',
  TABLE_HEAD_CELL_SORTED_ASCENDING: 'forge-table-head__cell--sorted-ascending',
  TABLE_HEAD_CELL_SORTED_DESCENDING: 'forge-table-head__cell--sorted-descending',
  TABLE_HEAD_CELL_SORT_ORDER: 'forge-table-head__cell__sort-order',
  TABLE_HEAD_CELL_SORT_ORDER_HIDDEN: 'forge-table-head__cell__sort-order--hidden',
  TABLE_BODY: 'forge-table-body',
  TABLE_BODY_ROW: 'forge-table-body__row',
  TABLE_BODY_ROW_SELECTED: 'forge-table-body__row--selected',
  TABLE_BODY_ROW_CLICKABLE: 'forge-table-body__row--clickable',
  TABLE_BODY_CELL: 'forge-table-body__cell',
  TABLE_ROW: 'forge-table-row',
  TABLE_ROW_EXPANDED: 'forge-table-row--expanded',
  TABLE_ROW_EXPANDABLE_CONTENT: 'forge-table-row__expandable-content',
  TABLE_ROW_EXPANDABLE_CONTENT_CELL: 'forge-table-row__expandable-content-cell',
  TABLE_CELL: 'forge-table-cell',
  TABLE_CELL_SELECT: 'forge-table-cell__select',
  TABLE_CELL_SELECT_CHECKBOX: 'forge-table-cell__select-checkbox',
  TABLE_CELL_SELECT_CHECKBOX_CONTAINER: 'forge-table-cell__select-checkbox-container',
  TABLE_CELL_SELECT_CHECKBOX_CONTAINER_ALIGN_RIGHT: 'forge-table-cell__select-checkbox-container--align-right',
  TABLE_CELL_SELECT_CHECKBOX_CONTAINER_ALIGN_LEFT: 'forge-table-cell__select-checkbox-container--align-left',
  TABLE_CELL_SELECT_CHECKBOX_CONTAINER_ALIGN_CENTER: 'forge-table-cell__select-checkbox-container--align-center',
  TABLE_CELL_CONTAINER: 'forge-table-cell__container',
  TABLE_CELL_CONTAINER_TEXT: 'forge-table-cell__container-text',
  TABLE_CELL_CENTER: 'forge-table-cell--center',
  TABLE_CELL_RIGHT: 'forge-table-cell--right',
  TABLE_CELL_RESIZABLE: 'forge-table-cell--resizing'
};

const selectors = {
  TABLE: '.forge-table',
  CHECKBOX_INPUT: 'forge-checkbox > input[type=checkbox]:not([forge-ignore])',
  SELECT_ALL_TEMPLATE_CHECKBOX_INPUT: 'input[type=checkbox]:not([forge-ignore])',
  ROW_SELECTED: `.${classes.TABLE_BODY_ROW_SELECTED}`
};

const attributes = {
  // External
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  SELECT_KEY: 'select-key',
  DENSE: 'dense',
  ROOMY: 'roomy',
  FILTER: 'filter',
  FIXED_HEADERS: 'fixed-headers',
  LAYOUT_TYPE: 'layout-type',
  WRAP_CONTENT: 'wrap-content',
  RESIZABLE: 'resizable',
  MIN_RESIZE_WIDTH: 'min-resize-width',
  ALLOW_ROW_CLICK: 'allow-row-click',
  MULTI_COLUMN_SORT: 'multi-column-sort',
  SELECT_CHECKBOX_ALIGNMENT: 'select-checkbox-alignment',
  TOOLTIP_SELECT: 'tooltip-select',
  TOOLTIP_SELECT_ALL: 'tooltip-select-all',

  // Internal
  CHECKBOX_TYPE: 'forge-checkbox-type',
  CUSTOM_CELL_TEMPLATE: 'data-cell-template',
  CUSTOM_CELL_TEMPLATE_STOP_PROPAGATION: 'data-cell-template-stop-propagation'
};

const events = {
  ROW_CLICK: `${elementName}-row-click`,
  SELECT: `${elementName}-select`,
  SELECT_DOUBLE: `${elementName}-select-double`,
  SELECT_ALL: `${elementName}-select-all`,
  SORT: `${elementName}-sort`,
  FILTER: `${elementName}-filter`,
  INITIALIZED: `${elementName}-initialized`,
  COLUMN_RESIZE: `${elementName}-column-resize`
};

const strings = {
  SELECT_ALL: 'select-all',
  SELECT_ROW: 'select-row',
  DEFAULT_LAYOUT_TYPE: 'auto'
};

const icons = {
  SORT_DOWN: 'arrow_downward'
};

const numbers = {
  DEFAULT_FILTER_DEBOUNCE_TIME: 750,
  MIN_RESIZE_WIDTH: 100,
  RESIZE_HOVER_DURATION: 150
};

export const TABLE_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  events,
  strings,
  icons,
  numbers
};
