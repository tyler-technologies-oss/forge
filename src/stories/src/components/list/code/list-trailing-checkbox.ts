export const ListTrailingCheckboxCodeHtml = () => {
  return `<forge-list>
  <forge-list-item>
    <span class="forge-list-item__text">List Item</span>
    <forge-checkbox slot="trailing">
      <input type="checkbox" checked aria-label="Select list item one" />
    </forge-checkbox>
  </forge-list-item>
  <forge-list-item>
    <span class="forge-list-item__text">List Item</span>
    <forge-checkbox slot="trailing">
      <input type="checkbox" aria-label="Select list item two" />
    </forge-checkbox>
  </forge-list-item>
  <forge-list-item>
    <span class="forge-list-item__text">List Item</span>
    <forge-checkbox slot="trailing">
      <input type="checkbox" aria-label="Select list item three" />
    </forge-checkbox>
  </forge-list-item>
</forge-list>`;
};

export const ListTrailingCheckboxCodeBlazor = () => {
  return `<ForgeList>
  <ForgeListItem>
    <span class="forge-list-item__text">List Item</span>
    <ForgeCheckbox Slot="trailing" Checked="@true" />
  </ForgeListItem>
  <ForgeListItem>
    <span class="forge-list-item__text">List Item</span>
    <ForgeCheckbox Slot="trailing" />
  </ForgeListItem>
  <ForgeListItem>
    <span class="forge-list-item__text">List Item</span>
    <ForgeCheckbox Slot="trailing" />
  </ForgeListItem>
</ForgeList>`;
};
