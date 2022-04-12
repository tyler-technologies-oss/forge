export const ListTrailingIconCodeHtml = () => {
  return `<forge-list>
  <forge-list-item>
    <span class="forge-list-item__text">List Item</span>
    <i class="tyler-icons" slot="trailing">info</i>
  </forge-list-item>
  <forge-list-item>
    <span class="forge-list-item__text">List Item</span>
    <i class="tyler-icons" slot="trailing">info</i>
  </forge-list-item>
  <forge-list-item>
    <span class="forge-list-item__text">List Item</span>
    <i class="tyler-icons" slot="trailing">info</i>
  </forge-list-item>
</forge-list>`;
};

export const ListTrailingIconCodeBlazor = () => {
  return `<ForgeList>
  <ForgeListItem TrailingIcon="info">
    <span class="forge-list-item__text">List Item</span>
  </ForgeListItem>
  <ForgeListItem TrailingIcon="info">
    <span class="forge-list-item__text">List Item</span>
  </ForgeListItem>
  <ForgeListItem TrailingIcon="info">
    <span class="forge-list-item__text">List Item</span>
  </ForgeListItem>
</ForgeList>`;
};
