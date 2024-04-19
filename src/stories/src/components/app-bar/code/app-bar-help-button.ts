export const AppBarHelpButtonCodeHtml = () => `
<forge-app-bar title-text="Title text">
  <forge-app-bar-help-button slot="end"></forge-app-bar-help-button>
</forge-app-bar>
`;

export const AppBarHelpButtonCodeTs = () => `
appBarHelpButton.addEventListener('forge-menu-select', evt => {
  const toast = document.createElement('forge-toast');
  toast.textContent = \`Selected option: $\{evt.detail.value}\`;
  document.body.appendChild(toast);
});
`;
