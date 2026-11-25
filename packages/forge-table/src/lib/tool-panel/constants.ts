export const TOOL_PANEL_TAG_NAME = 'forge-data-table-tool-panel';

export type ToolPanelTool = 'columns' | 'filters';

export const TOOL_PANEL_TOOLS: readonly ToolPanelTool[] = ['columns', 'filters'];

export const TOOL_PANEL_TOOL_ICONS: Record<ToolPanelTool, string> = {
  columns: 'view_column',
  filters: 'filter_list'
};

export const TOOL_PANEL_TOOL_LABELS: Record<ToolPanelTool, string> = {
  columns: 'Columns',
  filters: 'Filters'
};
