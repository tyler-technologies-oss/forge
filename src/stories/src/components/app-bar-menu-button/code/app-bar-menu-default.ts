export const AppBarMenuDefaultCodeHtml = () => `
<forge-app-bar title-text="App Bar">
  <forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>
</forge-app-bar>
`;

export const AppBarMenuDefaultCodeTs = () => `
menuButton.addEventListener('click', () => {
  const toast = document.createElement('forge-toast');
  toast.textContent = 'Menu clicked!';
  document.body.appendChild(toast);
});
`;
