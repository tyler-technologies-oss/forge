export const TABLE_TOOLBAR_TAG_NAME = 'forge-data-table-toolbar';

export type TableToolbarFeature = 'columns' | 'export' | 'filter' | 'print' | 'reload' | 'search' | 'select';

export const TABLE_TOOLBAR_FEATURE_ICONS: Record<TableToolbarFeature, string> = {
  columns: 'view_column',
  export: 'export',
  filter: 'filter_list',
  print: 'print',
  reload: 'refresh',
  search: 'search',
  select: 'checkbox_multiple_marked'
};

export const TABLE_TOOLBAR_FEATURE_LABELS: Record<TableToolbarFeature, string> = {
  columns: 'Columns',
  export: 'Export',
  filter: 'Filter',
  reload: 'Reload',
  print: 'Print',
  search: 'Search',
  select: 'Select'
};
