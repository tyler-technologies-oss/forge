export const ListTwoLineCodeHtml = () => {
  return `<forge-list>
  <forge-list-item two-line>
    <span slot="title">List Item</span>
    <span slot="subtitle">Secondary Text</span>
  </forge-list-item>
  <forge-list-item two-line>
    <span slot="title">List Item</span>
    <span slot="subtitle">Secondary Text</span>
  </forge-list-item>
  <forge-list-item two-line>
    <span slot="title">List Item</span>
    <span slot="subtitle">Secondary Text</span>
  </forge-list-item>
</forge-list>`;
};

export const ListTwoLineCodeBlazor = () => {
  return `<ForgeList>
  <ForgeListItem TwoLine="@true">
    <LineOneContent>List Item</LineOneContent>
    <LineTwoContent>Secondary Text</LineTwoContent>
  </ForgeListItem>
  <ForgeListItem TwoLine="@true">
    <LineOneContent>List Item</LineOneContent>
    <LineTwoContent>Secondary Text</LineTwoContent>
  </ForgeListItem>
  <ForgeListItem TwoLine="@true">
    <LineOneContent>List Item</LineOneContent>
    <LineTwoContent>Secondary Text</LineTwoContent>
  </ForgeListItem>
</ForgeList>`;
};
