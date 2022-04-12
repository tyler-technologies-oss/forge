export const ListTrailingRadioButtonCodeHtml = () => `
<forge-list role="radiogroup" aria-label="Choose radio option">
  <forge-list-item>
    <span class="forge-list-item__text">List Item</span>
    <forge-radio slot="trailing">
      <input type="radio" name="list-radio" aria-label="Select list item one" />
    </forge-radio>
  </forge-list-item>
  <forge-list-item>
    <span class="forge-list-item__text">List Item</span>
    <forge-radio slot="trailing">
      <input type="radio" name="list-radio" checked aria-label="Select list item two" />
    </forge-radio>
  </forge-list-item>
  <forge-list-item>
    <span class="forge-list-item__text">List Item</span>
    <forge-radio slot="trailing">
      <input type="radio" name="list-radio" aria-label="Select list item three" />
    </forge-radio>
  </forge-list-item>
</forge-list>
`;
