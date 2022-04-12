export const OpenIconExpansionPanelHtml = () =>
`
<forge-expansion-panel>
  <div slot="header">
    <div>Expansion panel</div>
    <forge-open-icon></forge-open-icon>
  </div>
  <div>Content for panel one.</div>
</forge-expansion-panel>
`;

export const OpenIconExpansionPanelBlazor = () =>
`
<ForgeExpansionPanel>
<div slot="header" class="forge-flex-container--row">
  <div>Expansion panel</div>
  <ForgeOpenIcon />
</div>
<div>Content for panel one.</div>
</ForgeExpansionPanel>
`;
