export const TableDefaultHtml = () => `
<forge-table></forge-table>
`;

export const TableDefaultTs = () => `
const table = document.querySelector('forge-table');
table.data = [
  { id: 1, name: 'First1 Last1', description: 'Test description 1', age: '25' },
  { id: 2, name: 'First2 Last2', description: 'Test description 2', age: '26' },
  { id: 3, name: 'First3 Last3', description: 'Test description 3', age: '27' },
  { id: 4, name: 'First4 Last4', description: 'Test description 4', age: '28' },
  { id: 5, name: 'First5 Last5', description: 'Test description 5', age: '29' },
  { id: 6, name: 'First6 Last6', description: 'Test description 6', age: '30' },
  { id: 7, name: 'First7 Last7', description: 'Test description 7', age: '31' },
  { id: 8, name: 'First8 Last8', description: 'Test description 8', age: '32' },
  { id: 9, name: 'First9 Last9', description: 'Test description 9', age: '33' },
  { id: 10, name: 'First10 Last10', description: 'Test description 10', age: '34' }
];
table.columnConfigurations = [
  {
    property: 'name',
    header: 'Name',
    sortable: true,
    initialSort: true,
    filter: true,
    filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter name...' } })
  },
  {
    property: 'description',
    header: 'Description',
    sortable: true,
    filter: true,
    filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter description...' } })
  },
  {
    property: 'age',
    header: 'Age',
    sortable: true,
    align: CellAlign.Right,
    filter: true,
    filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter age...', type: 'number' } })
  }
];
`;
