export const TableDefaultHtml = () => `
<forge-table></forge-table>
`;

export const TableDefaultTs = () => `
const table = document.querySelector('forge-table');
table.data = [
  { Id: 1, Name: 'First1 Last1', Description: 'Test description 1', Age: '24' },
  { Id: 2, Name: 'First2 Last2', Description: 'Test description 2', Age: '25' },
  { Id: 3, Name: 'First3 Last3', Description: 'Test description 3', Age: '26' }
];
table.columnConfigurations = [
  { property: 'Name', header: 'Name', sortable: true, initialSort: true },
  { property: 'Description', header: 'Description' },
  { property: 'Age', header: 'Age', sortable: true, align: 'right' }
];
`;
