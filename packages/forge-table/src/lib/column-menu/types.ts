export type ColumnMenuAction = 'move-left' | 'move-right' | 'sort-ascending' | 'sort-descending' | 'hide' | 'pin' | 'unpin' | 'maximize' | 'rename';

export interface ColumnMenuActionEventDetail {
  columnId: string;
  action: ColumnMenuAction;
}
