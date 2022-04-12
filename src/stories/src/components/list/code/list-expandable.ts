export const ListExpandableCodeHtml = () => {
  return `<forge-list>
  <forge-expansion-panel>
    <forge-list-item slot="header">
      <i class="tyler-icons" slot="leading">code</i>
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
      <i class="tyler-icons" slot="leading">face</i>
      List Item Two
      <forge-open-icon slot="trailing"></forge-open-icon>
    </forge-list-item>
    <forge-list>
      <forge-list-item indented>List Item One</forge-list-item>
      <forge-list-item indented>List Item Two</forge-list-item>
      <forge-list-item indented>List Item Three</forge-list-item>
    </forge-list>
  </forge-expansion-panel>
  <forge-list-item>List Item Three</forge-list-item>
</forge-list>`;
};

export const ListExpandableCodeBlazor = () => {
  return `<ForgeList>
  <ForgeExpansionPanel>
    <ForgeListItem Slot="header" LeadingIcon="code">
      List Item One
      <ForgeOpenIcon Slot="trailing" />
    </ForgeListItem>
    <ForgeList>
      <ForgeListItem Indented="@true">List Item One</ForgeListItem>
      <ForgeListItem Indented="@true">List Item Two</ForgeListItem>
      <ForgeListItem Indented="@true">List Item Three</ForgeListItem>
    </ForgeList>
  </ForgeExpansionPanel>
  <ForgeExpansionPanel>
    <ForgeListItem Slot="header" LeadingIcon="face">
      List Item Two
      <ForgeOpenIcon Slot="trailing" />
    </ForgeListItem>
    <ForgeList>
      <ForgeListItem Indented="@true">List Item One</ForgeListItem>
      <ForgeListItem Indented="@true">List Item Two</ForgeListItem>
      <ForgeListItem Indented="@true">List Item Three</ForgeListItem>
    </ForgeList>
  </ForgeExpansionPanel>
  <ForgeListItem>List Item Three</ForgeListItem>
</ForgeList>`;
};
