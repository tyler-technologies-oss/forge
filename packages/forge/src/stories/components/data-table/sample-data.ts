import { ColumnDef, createExpanderColumn } from '@tylertech/forge-table';

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

export const sampleDataColumns: ColumnDef<SampleData>[] = [
  { header: 'ID', property: 'id' },
  { header: 'Name', property: 'name' },
  { header: 'Age', property: 'age' },
  { header: 'Email', property: 'email', width: 256 },
  { header: 'Status', property: 'status' },
  { header: 'Created Date', property: 'createdAt', filterType: 'date' }
];

export const sampleColumns: ColumnDef<SampleData>[] = [...sampleDataColumns, createExpanderColumn()];

export type EmployeeStatus = 'Active' | 'On leave' | 'Terminated';

export interface EmployeeData {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  department: string;
  status: EmployeeStatus;
  salary: number;
  bonusRate: number;
  rating: number;
  utilization: number;
  hireDate: string;
}

export const employeeData: EmployeeData[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-0101',
    website: 'https://johndoe.example.com',
    department: 'Engineering',
    status: 'Active',
    salary: 128500,
    bonusRate: 0.1,
    rating: 4.5,
    utilization: 86,
    hireDate: '2019-03-11'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-0102',
    website: 'https://janesmith.example.com',
    department: 'Design',
    status: 'On leave',
    salary: 112250.5,
    bonusRate: 0.075,
    rating: 3.8,
    utilization: 0,
    hireDate: '2020-07-27'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '555-0103',
    website: 'https://bobjohnson.example.com',
    department: 'Sales',
    status: 'Active',
    salary: 94000,
    bonusRate: 0.15,
    rating: 2.4,
    utilization: 42,
    hireDate: '2017-11-02'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    phone: '555-0104',
    website: 'https://alicebrown.example.com',
    department: 'Engineering',
    status: 'Active',
    salary: 141800,
    bonusRate: 0.12,
    rating: 5,
    utilization: 97,
    hireDate: '2021-01-18'
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    phone: '555-0105',
    website: 'https://charliewilson.example.com',
    department: 'Support',
    status: 'Terminated',
    salary: 67500,
    bonusRate: 0.02,
    rating: 1.2,
    utilization: 18,
    hireDate: '2022-05-09'
  },
  {
    id: 6,
    name: 'Diana Miller',
    email: 'diana.miller@example.com',
    phone: '555-0106',
    website: 'https://dianamiller.example.com',
    department: 'Marketing',
    status: 'Active',
    salary: 88750,
    bonusRate: 0.08,
    rating: 4.1,
    utilization: 71,
    hireDate: '2018-09-24'
  },
  {
    id: 7,
    name: 'Edward Davis',
    email: 'edward.davis@example.com',
    phone: '555-0107',
    website: 'https://edwarddavis.example.com',
    department: 'Sales',
    status: 'On leave',
    salary: 99300,
    bonusRate: 0.11,
    rating: 3,
    utilization: 0,
    hireDate: '2016-04-14'
  },
  {
    id: 8,
    name: 'Fiona Garcia',
    email: 'fiona.garcia@example.com',
    phone: '555-0108',
    website: 'https://fionagarcia.example.com',
    department: 'Design',
    status: 'Active',
    salary: 105600,
    bonusRate: 0.09,
    rating: 4.8,
    utilization: 63,
    hireDate: '2023-02-06'
  }
];
