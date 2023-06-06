export const ExpansionPanelCardRecipeCodeHtml = () => `
<forge-card>
  <forge-expansion-panel>
    <button slot="header" id="expansion-panel-button" class="expansion-panel-button" aria-expanded="false" aria-controls="expansion-panel-content">
      <div>Panel header</div>
      <forge-open-icon></forge-open-icon>
    </button>
    <div id="expansion-panel-content" role="group">Expandable card content</div>
  </forge-expansion-panel>
</forge-card>
`;

export const ExpansionPanelCardRecipeCodeCss = () => {
  return `
.expansion-panel-button {
  all: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/*
It's necessary to define interaction styles when customizing a button's appearance.
Usually this is done with a <forge-ripple> component, but a simple outline is used here for demonstration.
*/
.expansion-panel-button:hover,
.expansion-panel-button:focus-visible {
  outline: 1px #3f51b5 solid;
}
  `
};

export const ExpansionPanelCardRecipeCodeTs = () => {
  return `
const expansionPanelButton = document.getElementById('expansion-panel-button');
const expansionPanelContent = document.getElementById('expansion-panel-content');

expansionPanelButton.addEventListener('forge-expansion-panel-toggle', (event: { detail: boolean }) => {
  expansionPanelButton.setAttribute('aria-expanded', detail.toString());
});
  `
}
