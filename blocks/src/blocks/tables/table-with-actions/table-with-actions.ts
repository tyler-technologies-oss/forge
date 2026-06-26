import type { ITableComponent, IColumnConfiguration } from '@tylertech/forge';

interface IEmployee {
  name: string;
  department: string;
  title: string;
  email: string;
  status: string;
}

const table = document.getElementById('employee-table') as ITableComponent;

const columnConfigurations: IColumnConfiguration[] = [
  { property: 'name', header: 'Name' },
  { property: 'department', header: 'Department' },
  { property: 'title', header: 'Title' },
  { property: 'email', header: 'Email' },
  { property: 'status', header: 'Status' }
];

const data: IEmployee[] = [
  { name: 'Alice Johnson', department: 'Engineering', title: 'Senior Developer', email: 'alice.johnson@example.com', status: 'Active' },
  { name: 'Bob Smith', department: 'Marketing', title: 'Marketing Manager', email: 'bob.smith@example.com', status: 'Active' },
  { name: 'Carol Williams', department: 'Engineering', title: 'Tech Lead', email: 'carol.williams@example.com', status: 'Active' },
  { name: 'David Brown', department: 'Sales', title: 'Account Executive', email: 'david.brown@example.com', status: 'On Leave' },
  { name: 'Eva Martinez', department: 'HR', title: 'HR Specialist', email: 'eva.martinez@example.com', status: 'Active' },
  { name: 'Frank Lee', department: 'Engineering', title: 'Junior Developer', email: 'frank.lee@example.com', status: 'Active' },
  { name: 'Grace Chen', department: 'Finance', title: 'Financial Analyst', email: 'grace.chen@example.com', status: 'Active' },
  { name: 'Henry Wilson', department: 'Sales', title: 'Sales Director', email: 'henry.wilson@example.com', status: 'Active' }
];

table.columnConfigurations = columnConfigurations;
table.data = data;
