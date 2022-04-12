export const ListDrawerCodeHtml = () => {
  return `<forge-drawer>
  <forge-list>
    <forge-list-item>List Item One</forge-list-item>
    <forge-list-item selected>List Item Two</forge-list-item>
    <forge-list-item>List Item Three</forge-list-item>
  </forge-list>
</forge-drawer>`;
};

export const ListDrawerCodeBlazor = () => {
  return `<ForgeDrawer>
  <ForgeList>
    <ForgeListItem>List Item One</ForgeListItem>
    <ForgeListItem selected>List Item Two</ForgeListItem>
    <ForgeListItem>List Item Three</ForgeListItem>
  </ForgeList>
</ForgeDrawer>`;
};
