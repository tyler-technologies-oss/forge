export const AppBarSearchCodeHtml = () => `
<forge-app-bar title-text="Search">
  <forge-app-bar-search slot="center">
      <input type="text" aria-label="Search for a record" placeholder="Search" />
  </forge-app-bar-search>
</forge-app-bar>
`;

export const AppBarSearchCodeTs = () => `
appBarSearch.addEventListener('forge-app-bar-search-input', () => {
  const toast = document.createElement('forge-toast');
  toast.textContent = \`Search value: $\{evt.detail.value}\`;
  document.body.appendChild(toast);
};
`;
