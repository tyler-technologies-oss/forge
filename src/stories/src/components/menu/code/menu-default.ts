export const MenuDefaultCodeHtml = () => {
  return `
<forge-menu>
  <forge-button type="raised">
    <button type="button">Show menu</button>
  </forge-button>
</forge-menu>
  `;
};

export const MenuDefaultCodeTs = () => {
  return `
const menu = document.querySelector('forge-menu');
menu.options = [
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
  { value: 'view', label: 'View' }
];
  `;
};
