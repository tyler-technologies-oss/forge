/* eslint-disable camelcase -- TanStack exports its built-in filter functions with underscores */
import {
  filterFn_arrHas as arrHas,
  filterFn_arrIncludes as arrIncludes,
  filterFn_arrIncludesAll as arrIncludesAll,
  filterFn_arrIncludesSome as arrIncludesSome,
  filterFn_between as between,
  filterFn_betweenInclusive as betweenInclusive,
  filterFn_inDateRange as inDateRange,
  filterFn_inNumberRange as inNumberRange,
  filterFn_empty as empty,
  filterFn_notEmpty as notEmpty
} from '@tanstack/lit-table';
import type { FilterFieldConfig } from '../types.js';
import { withDefaultField } from './filter-fn.js';

export {
  constructFilterFn,
  filterFn_endsWith,
  filterFn_equals,
  filterFn_equalsString,
  filterFn_equalsStringSensitive,
  filterFn_greaterThan,
  filterFn_greaterThanOrEqualTo,
  filterFn_includesString,
  filterFn_includesStringSensitive,
  filterFn_lessThan,
  filterFn_lessThanOrEqualTo,
  filterFn_startsWith,
  filterFn_weakEquals
} from '@tanstack/lit-table';

const RANGE_FIELD: FilterFieldConfig = { type: 'range' };
const SELECT_FIELD: FilterFieldConfig = { type: 'select' };
const MULTIPLE_SELECT_FIELD: FilterFieldConfig = { type: 'select', multiple: true };

export const filterFn_between = /* @__PURE__ */ withDefaultField(between, RANGE_FIELD);
export const filterFn_betweenInclusive = /* @__PURE__ */ withDefaultField(betweenInclusive, RANGE_FIELD);
export const filterFn_inDateRange = /* @__PURE__ */ withDefaultField(inDateRange, RANGE_FIELD);
export const filterFn_inNumberRange = /* @__PURE__ */ withDefaultField(inNumberRange, RANGE_FIELD);
export const filterFn_arrHas = /* @__PURE__ */ withDefaultField(arrHas, MULTIPLE_SELECT_FIELD);
export const filterFn_arrIncludes = /* @__PURE__ */ withDefaultField(arrIncludes, MULTIPLE_SELECT_FIELD);
export const filterFn_arrIncludesAll = /* @__PURE__ */ withDefaultField(arrIncludesAll, MULTIPLE_SELECT_FIELD);
export const filterFn_arrIncludesSome = /* @__PURE__ */ withDefaultField(arrIncludesSome, MULTIPLE_SELECT_FIELD);
export const filterFn_empty = /* @__PURE__ */ withDefaultField(empty, {
  ...SELECT_FIELD,
  options: [
    { label: 'Empty', value: 'true' },
    { label: 'Not Empty', value: 'false' }
  ]
});
export const filterFn_notEmpty = /* @__PURE__ */ withDefaultField(notEmpty, {
  ...SELECT_FIELD,
  options: [
    { label: 'Empty', value: 'false' },
    { label: 'Not Empty', value: 'true' }
  ]
});
