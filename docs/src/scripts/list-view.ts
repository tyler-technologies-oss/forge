export type ListView = "card" | "list";

const VIEW_STORAGE_KEY = "forge-docs-list-view";
const FILTERS_STORAGE_KEY_PREFIX = "forge-docs-list-filters:";

export interface ListFilters {
  query: string;
  categories: string[];
}

const EMPTY_FILTERS: ListFilters = { query: "", categories: [] };

export const getListView = (): ListView => {
  try {
    return localStorage.getItem(VIEW_STORAGE_KEY) === "list" ? "list" : "card";
  } catch {
    return "card";
  }
};

export const setListView = (view: ListView): void => {
  try {
    localStorage.setItem(VIEW_STORAGE_KEY, view);
  } catch {
    // Storage unavailable; the preference just won't persist.
  }
};

export const getListFilters = (page: string): ListFilters => {
  try {
    const stored = sessionStorage.getItem(`${FILTERS_STORAGE_KEY_PREFIX}${page}`);
    return stored ? { ...EMPTY_FILTERS, ...JSON.parse(stored) } : EMPTY_FILTERS;
  } catch {
    return EMPTY_FILTERS;
  }
};

export const setListFilters = (page: string, filters: ListFilters): void => {
  try {
    sessionStorage.setItem(`${FILTERS_STORAGE_KEY_PREFIX}${page}`, JSON.stringify(filters));
  } catch {
    // Storage unavailable; filters just won't be restored.
  }
};
