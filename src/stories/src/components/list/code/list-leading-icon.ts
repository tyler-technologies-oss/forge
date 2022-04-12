export const ListLeadingIconCodeHtml = () => {
  return `<forge-list>
  <forge-list-item>
    <i class="tyler-icons" slot="leading">wifi</i>
    <span class="forge-list-item__text">List Item</span>
  </forge-list-item>
  <forge-list-item>
    <i class="tyler-icons" slot="leading">bluetooth</i>
    <span class="forge-list-item__text">List Item</span>
  </forge-list-item>
  <forge-list-item>
    <i class="tyler-icons" slot="leading">data_usage</i>
    <span class="forge-list-item__text">List Item</span>
  </forge-list-item>
</forge-list>`;
};

export const ListLeadingIconCodeBlazor = () => {
  return `<ForgeList>
  <ForgeListItem LeadingIcon="wifi">List Item</ForgeListItem>
  <ForgeListItem LeadingIcon="bluetooth">List Item</ForgeListItem>
  <ForgeListItem LeadingIcon="data_usage">List Item</ForgeListItem>
</ForgeList>`;
};