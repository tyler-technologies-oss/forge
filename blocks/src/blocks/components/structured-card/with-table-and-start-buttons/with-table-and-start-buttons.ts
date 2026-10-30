import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconDownload, tylIconRefresh } from '@tylertech/tyler-icons';
import type { ITableComponent } from '@tylertech/forge/table';

IconRegistry.define([tylIconDownload, tylIconRefresh]);

const table = document.querySelector<ITableComponent>('#asset-table');

if (table) {
  table.data = [
    { id: 'AST-001', name: 'Dell Latitude 5520', category: 'Laptop', location: 'Building A', status: 'In Use' },
    { id: 'AST-002', name: 'HP LaserJet Pro', category: 'Printer', location: 'Building B', status: 'Available' },
    { id: 'AST-003', name: 'Cisco IP Phone 8845', category: 'Phone', location: 'Building A', status: 'In Use' },
    { id: 'AST-004', name: 'Samsung 27" Monitor', category: 'Monitor', location: 'Building C', status: 'In Repair' },
    { id: 'AST-005', name: 'Logitech MX Keys', category: 'Keyboard', location: 'Building A', status: 'Available' }
  ];
  table.columnConfigurations = [
    { property: 'id', header: 'Asset ID' },
    { property: 'name', header: 'Asset Name' },
    { property: 'category', header: 'Category' },
    { property: 'location', header: 'Location' },
    { property: 'status', header: 'Status' }
  ];
}
