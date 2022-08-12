export const ListExpandableCodeHtml = () => {
  return `
<forge-list>
  <forge-expansion-panel>
    <forge-list-item slot="header">
      <forge-icon slot="leading" name="code"></forge-icon>
      List Item One
      <forge-open-icon slot="trailing"></forge-open-icon>
    </forge-list-item>
    <forge-list>
      <forge-list-item indented>List Item One</forge-list-item>
      <forge-list-item indented>List Item Two</forge-list-item>
      <forge-list-item indented>List Item Three</forge-list-item>
    </forge-list>
  </forge-expansion-panel>
  <forge-expansion-panel>
    <forge-list-item slot="header">
      <forge-icon slot="leading" name="face"></forge-icon>
      List Item Two
      <forge-open-icon slot="trailing"></forge-open-icon>
    </forge-list-item>
    <forge-list>
      <forge-list-item indented>List Item One</forge-list-item>
      <forge-list-item indented>List Item Two</forge-list-item>
      <forge-list-item indented>List Item Three</forge-list-item>
    </forge-list>
  </forge-expansion-panel>
  <forge-list-item>
    <forge-icon slot="leading" name="emoticon_sad_outline"></forge-icon>
    List Item Three
  </forge-list-item>
</forge-list>
  `;
};
