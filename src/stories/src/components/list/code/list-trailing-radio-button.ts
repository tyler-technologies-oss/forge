export const ListTrailingRadioButtonCodeHtml = () => `
<forge-list role="radiogroup" aria-label="Choose radio option">
  <forge-list-item>
    <span slot="title">List Item One</span>
    <forge-radio slot="trailing">
      <input type="radio" name="list-radio" aria-label="Select list item one" />
    </forge-radio>
  </forge-list-item>
  <forge-list-item>
    <span slot="title">List Item Two</span>
    <forge-radio slot="trailing">
      <input type="radio" name="list-radio" checked aria-label="Select list item two" />
    </forge-radio>
  </forge-list-item>
  <forge-list-item>
    <span slot="title">List Item Three</span>
    <forge-radio slot="trailing">
      <input type="radio" name="list-radio" aria-label="Select list item three" />
    </forge-radio>
  </forge-list-item>
  <forge-list-item>
    <span slot="title">List Item Four</span>
    <forge-radio slot="trailing">
      <input type="radio" name="list-radio" aria-label="Select list item three" />
    </forge-radio>
  </forge-list-item>
</forge-list>
`;
