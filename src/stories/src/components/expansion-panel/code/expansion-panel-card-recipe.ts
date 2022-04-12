export const ExpansionPanelCardRecipeCodeHtml = () => `
<forge-card has-padding="false">
  <forge-expansion-panel>
    <button slot="header" class="forge-flex-container--row forge-expandable__button">
      <div>Panel header</div>
      <forge-open-icon class="forge-flex-item--right"></forge-open-icon>
    </button>
    <div class="forge-expandable__content">Expandable card content</div>
  </forge-expansion-panel>
</forge-card>
`;

export const ExpansionPanelCardRecipeCodeBlazor = () => `
<ForgeCard HasPadding="@false">
  <ForgeExpansionPanel>
    <button slot="header" class="forge-flex-container--row forge-expandable__button">
      <div>Panel header</div>
      <ForgeOpenIcon />
    </button>
    <div class="forge-expandable__content">Expandable card content</div>
  </ForgeExpansionPanel>
</ForgeCard>
`;
