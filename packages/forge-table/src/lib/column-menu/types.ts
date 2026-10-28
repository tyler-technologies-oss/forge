export type ColumnMenuAction = 'move-left' | 'move-right' | 'sort-ascending' | 'sort-descending' | 'hide' | 'pin' | 'unpin' | 'maximize';

export interface ColumnMenuActionEventDetail {
  columnId: string;
  action: ColumnMenuAction;
}
