export const TabBarDefaultHtml = () => `
<forge-tab-bar underline>
  <forge-tab>Tab one</forge-tab>
  <forge-tab>Tab two</forge-tab>
  <forge-tab>Tab three</forge-tab>
</forge-tab-bar>
`;

export const TabBarDefaultTs = () => `
const tabBar = document.querySelector('forge-tab-bar');
tabBar.activateTab(0);
`;
