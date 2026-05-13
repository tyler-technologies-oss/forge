import { ColumnDef, createExpanderColumn } from '@tylertech/forge/data-table';

export const sampleData = [
  { id: 1, name: 'John Doe', age: 32, email: 'john.doe@example.com', status: 'Active', createdAt: '2023-01-15' },
  { id: 2, name: 'Jane Smith', age: 28, email: 'jane.smith@example.com', status: 'Inactive', createdAt: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', age: 45, email: 'bob.johnson@example.com', status: 'Active', createdAt: '2023-03-10' },
  { id: 4, name: 'Alice Brown', age: 24, email: 'alice.brown@example.com', status: 'Pending', createdAt: '2023-04-05' },
  {
    id: 5,
    name: 'Charlie Wilson',
    age: 38,
    email: 'charlie.wilson@example.com',
    status: 'Active',
    createdAt: '2023-05-12'
  },
  {
    id: 6,
    name: 'Diana Miller',
    age: 41,
    email: 'diana.miller@example.com',
    status: 'Inactive',
    createdAt: '2023-06-18'
  },
  {
    id: 7,
    name: 'Edward Davis',
    age: 29,
    email: 'edward.davis@example.com',
    status: 'Active',
    createdAt: '2023-07-22'
  },
  {
    id: 8,
    name: 'Fiona Garcia',
    age: 35,
    email: 'fiona.garcia@example.com',
    status: 'Pending',
    createdAt: '2023-08-30'
  },
  { id: 9, name: 'George Lee', age: 31, email: 'george.lee@example.com', status: 'Active', createdAt: '2023-09-05' },
  { id: 10, name: 'Hannah Kim', age: 27, email: 'hannah.kim@example.com', status: 'Active', createdAt: '2023-09-12' },
  { id: 11, name: 'Ian Carter', age: 44, email: 'ian.carter@example.com', status: 'Inactive', createdAt: '2023-09-18' },
  {
    id: 12,
    name: 'Julia Martinez',
    age: 33,
    email: 'julia.martinez@example.com',
    status: 'Pending',
    createdAt: '2023-09-25'
  },
  { id: 13, name: 'Kevin Patel', age: 37, email: 'kevin.patel@example.com', status: 'Active', createdAt: '2023-10-01' },
  {
    id: 14,
    name: 'Leila Washington',
    age: 29,
    email: 'leila.washington@example.com',
    status: 'Active',
    createdAt: '2023-10-08'
  },
  {
    id: 15,
    name: 'Miguel Rodriguez',
    age: 39,
    email: 'miguel.rodriguez@example.com',
    status: 'Pending',
    createdAt: '2023-10-15'
  }
];

export const generateLargeDataset = (count = 100): SampleData[] => {
  const result = [];
  const statuses = ['Active', 'Inactive', 'Pending'];

  for (let i = 0; i < count; i++) {
    result.push({
      id: i + 1,
      name: `User ${i + 1}`,
      age: Math.floor(Math.random() * 50) + 18,
      email: `user${i + 1}@example.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString().split('T')[0]
    });
  }

  return result;
};

type SampleData = (typeof sampleData)[number];

export const sampleColumns: ColumnDef<SampleData>[] = [
  { header: 'ID', property: 'id' },
  { header: 'Name', property: 'name' },
  { header: 'Age', property: 'age' },
  { header: 'Email', property: 'email', width: 256 },
  { header: 'Status', property: 'status' },
  { header: 'Created Date', property: 'createdAt', filterType: 'date' },
  createExpanderColumn()
];
