import type { ITableComponent, IColumnConfiguration, IPaginatorComponent } from '@tylertech/forge';

interface IOrderData {
  orderId: string;
  customer: string;
  item: string;
  quantity: number;
  status: string;
  total: number;
}

const table = document.getElementById('orders-table') as ITableComponent;
const paginator = document.getElementById('orders-paginator') as IPaginatorComponent;

const allData: IOrderData[] = [
  { orderId: 'ORD-001', customer: 'Sir Galahad', item: 'Longsword', quantity: 2, status: 'Completed', total: 90 },
  { orderId: 'ORD-002', customer: 'Lady Morgana', item: 'Dagger Set', quantity: 6, status: 'In Progress', total: 72 },
  { orderId: 'ORD-003', customer: 'King Arthur', item: 'Excalibur Replica', quantity: 1, status: 'Pending', total: 500 },
  { orderId: 'ORD-004', customer: 'Merlin', item: 'Staff Ferrule', quantity: 3, status: 'Completed', total: 45 },
  { orderId: 'ORD-005', customer: 'Lancelot', item: 'Chain Mail', quantity: 1, status: 'In Progress', total: 150 },
  { orderId: 'ORD-006', customer: 'Guinevere', item: 'Decorative Brooch', quantity: 4, status: 'Completed', total: 120 },
  { orderId: 'ORD-007', customer: 'Percival', item: 'Shield', quantity: 1, status: 'Pending', total: 40 },
  { orderId: 'ORD-008', customer: 'Blacksmith Guild', item: 'Anvil', quantity: 2, status: 'Completed', total: 1000 },
  { orderId: 'ORD-009', customer: 'Village Stable', item: 'Horseshoes', quantity: 24, status: 'In Progress', total: 48 },
  { orderId: 'ORD-010', customer: 'Castle Armory', item: 'Helmets', quantity: 10, status: 'Pending', total: 550 },
  { orderId: 'ORD-011', customer: 'Tristan', item: 'Battle Axe', quantity: 1, status: 'Completed', total: 35 },
  { orderId: 'ORD-012', customer: 'Bedivere', item: 'Gauntlets', quantity: 2, status: 'In Progress', total: 80 }
];

const columnConfigurations: IColumnConfiguration[] = [
  { property: 'orderId', header: 'Order ID' },
  { property: 'customer', header: 'Customer' },
  { property: 'item', header: 'Item' },
  { property: 'quantity', header: 'Qty' },
  { property: 'status', header: 'Status' },
  { property: 'total', header: 'Total (gold)' }
];

table.columnConfigurations = columnConfigurations;

function updateTable(): void {
  const start = paginator.pageIndex * paginator.pageSize;
  const end = start + paginator.pageSize;
  table.data = allData.slice(start, end);
}

paginator.addEventListener('forge-paginator-change', updateTable);
updateTable();
