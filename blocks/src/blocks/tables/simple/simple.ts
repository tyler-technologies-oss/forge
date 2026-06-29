import type { ITableComponent, IColumnConfiguration } from '@tylertech/forge';

interface IInventoryItem {
  item: string;
  material: string;
  quantity: number;
  weight: number;
  price: number;
  status: string;
}

const table = document.getElementById('blacksmith-table') as ITableComponent;

const statusThemeMap: Record<string, string> = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Special Order': 'info'
};

const columnConfigurations: IColumnConfiguration[] = [
  { property: 'item', header: 'Item' },
  { property: 'material', header: 'Material' },
  { property: 'quantity', header: 'Quantity' },
  { property: 'weight', header: 'Weight (lbs)' },
  { property: 'price', header: 'Price (gold)' },
  {
    property: 'status',
    header: 'Status',
    template: (_rowIndex, _div, rowData: IInventoryItem) => {
      const badge = document.createElement('forge-badge');
      badge.textContent = rowData.status;
      badge.setAttribute('theme', statusThemeMap[rowData.status] ?? 'default');
      return badge;
    }
  }
];

const data: IInventoryItem[] = [
  { item: 'Longsword', material: 'Steel', quantity: 12, weight: 3.5, price: 45, status: 'In Stock' },
  { item: 'Battle Axe', material: 'Iron', quantity: 8, weight: 6.0, price: 35, status: 'In Stock' },
  { item: 'Horseshoes', material: 'Iron', quantity: 48, weight: 0.5, price: 2, status: 'In Stock' },
  { item: 'Chain Mail', material: 'Steel', quantity: 3, weight: 25.0, price: 150, status: 'Low Stock' },
  { item: 'Dagger', material: 'Steel', quantity: 24, weight: 0.5, price: 12, status: 'In Stock' },
  { item: 'Shield', material: 'Iron', quantity: 6, weight: 8.0, price: 40, status: 'In Stock' },
  { item: 'Helmet', material: 'Steel', quantity: 2, weight: 4.0, price: 55, status: 'Low Stock' },
  { item: 'Nails (box)', material: 'Iron', quantity: 200, weight: 2.0, price: 5, status: 'In Stock' },
  { item: 'Anvil', material: 'Cast Iron', quantity: 1, weight: 150.0, price: 500, status: 'Special Order' },
  { item: 'Tongs', material: 'Iron', quantity: 15, weight: 1.5, price: 8, status: 'In Stock' }
];

table.columnConfigurations = columnConfigurations;
table.data = data;
