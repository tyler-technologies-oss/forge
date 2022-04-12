export const AppBarSearchDefaultCodeHtml = () => `
<forge-app-bar title-text="Search">
  <forge-app-bar-search slot="center">
      <input type="text" aria-label="Search for a record" placeholder="Search" />
  </forge-app-bar-search>
</forge-app-bar>
`;

export const AppBarSearchDefaultCodeTs = () => `
appBarSearch.addEventListener('forge-app-bar-search-input', () => {
  const toast = document.createElement('forge-toast');
  toast.message = \`Search value: $\{evt.detail.value}\`;
  document.body.appendChild(toast);
};
`;
