export const ListTrailingCheckboxCodeHtml = () => {
  return `
<forge-list>
  <forge-list-item>
    <span slot="title>List Item One</span>
    <forge-checkbox slot="trailing">
      <input type="checkbox" checked aria-label="Select list item one" />
    </forge-checkbox>
  </forge-list-item>
  <forge-list-item>
    <span slot="title>List Item Two</span>
    <forge-checkbox slot="trailing">
      <input type="checkbox" aria-label="Select list item two" />
    </forge-checkbox>
  </forge-list-item>
  <forge-list-item>
    <span slot="title>List Item Three</span>
    <forge-checkbox slot="trailing">
      <input type="checkbox" aria-label="Select list item three" />
    </forge-checkbox>
  </forge-list-item>
  <forge-list-item>
    <span slot="title>List Item Four</span>
    <forge-checkbox slot="trailing">
      <input type="checkbox" aria-label="Select list item three" />
    </forge-checkbox>
  </forge-list-item>
</forge-list>
  `;
};
