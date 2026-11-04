import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconDownload, tylIconRefresh } from '@tylertech/tyler-icons';
import type { ITableComponent } from '@tylertech/forge/table';

IconRegistry.define([tylIconDownload, tylIconRefresh]);

const table = document.querySelector<ITableComponent>('#structured-card-table');

if (table) {
  table.data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'User' },
    { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', role: 'Manager' },
    { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'User' }
  ];
  table.columnConfigurations = [
    { property: 'name', header: 'Name' },
    { property: 'email', header: 'Email' },
    { property: 'role', header: 'Role' }
  ];
}
