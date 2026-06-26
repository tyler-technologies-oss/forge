import type { ITableComponent, IColumnConfiguration } from '@tylertech/forge';

interface ITask {
  task: string;
  assignee: string;
  priority: string;
  dueDate: string;
  status: string;
}

const table = document.getElementById('tasks-table') as ITableComponent;

const columnConfigurations: IColumnConfiguration[] = [
  { property: 'task', header: 'Task' },
  { property: 'assignee', header: 'Assignee' },
  { property: 'priority', header: 'Priority' },
  { property: 'dueDate', header: 'Due Date' },
  { property: 'status', header: 'Status' }
];

const data: ITask[] = [
  { task: 'Design mockups', assignee: 'Alice Johnson', priority: 'High', dueDate: '2024-02-15', status: 'In Progress' },
  { task: 'API integration', assignee: 'Bob Smith', priority: 'High', dueDate: '2024-02-18', status: 'Not Started' },
  { task: 'Write documentation', assignee: 'Carol Williams', priority: 'Medium', dueDate: '2024-02-20', status: 'In Progress' },
  { task: 'Code review', assignee: 'David Brown', priority: 'Medium', dueDate: '2024-02-16', status: 'Completed' },
  { task: 'Unit testing', assignee: 'Eva Martinez', priority: 'High', dueDate: '2024-02-17', status: 'Not Started' },
  { task: 'Performance optimization', assignee: 'Frank Lee', priority: 'Low', dueDate: '2024-02-25', status: 'Not Started' },
  { task: 'Security audit', assignee: 'Grace Chen', priority: 'High', dueDate: '2024-02-22', status: 'In Progress' },
  { task: 'Deploy to staging', assignee: 'Henry Wilson', priority: 'Medium', dueDate: '2024-02-19', status: 'Not Started' }
];

table.columnConfigurations = columnConfigurations;
table.data = data;
