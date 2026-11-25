export const TOOLBAR_TAG_NAME = 'forge-data-table-toolbar';

export type ToolbarFeature = 'columns' | 'export' | 'filter' | 'print' | 'reload' | 'search' | 'select' | 'tools';

export const TOOLBAR_FEATURE_ICONS: Record<ToolbarFeature, string> = {
  columns: 'view_column',
  export: 'export',
  filter: 'filter_list',
  print: 'print',
  reload: 'refresh',
  search: 'search',
  select: 'checkbox_multiple_marked',
  tools: 'tools'
};

export const TOOLBAR_FEATURE_LABELS: Record<ToolbarFeature, string> = {
  columns: 'Columns',
  export: 'Export',
  filter: 'Filter',
  reload: 'Reload',
  print: 'Print',
  search: 'Search',
  select: 'Select',
  tools: 'Tools'
};
