export const ToastDefaultHtml = () => `
<forge-button>Show toast</forge-button>
`;

export const ToastDefaultTs = () => `
const toast = document.createElement('forge-toast');
toast.message = 'Save successful';
document.body.appendChild(toast);
`;
