export const ToastDefaultHtml = () => `
<forge-button>
  <button type="button">Show toast</button>
</forge-button>
`;

export const ToastDefaultTs = () => `
const toast = document.createElement('forge-toast');
toast.message = 'Save successful';
document.body.appendChild(toast);
`;
