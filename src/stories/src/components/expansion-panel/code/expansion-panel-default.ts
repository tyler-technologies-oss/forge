export const ExpansionPanelDefaultCodeHtml = () => {
  return `
<forge-expansion-panel>
  <button slot="header" id="expansion-panel-button" class="expansion-panel-button" aria-expanded="false" aria-controls="expansion-panel-content">Click me</button>
  <div id="expansion-panel-content" role="group">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure
    corporis veritatis ut quod quo libero ea repellendus, consequuntur porro explicabo
    exercitationem minus pariatur debitis nihil at labore!
  </div>
</forge-expansion-panel>
  `;
};

export const ExpansionPanelDefaultCodeCss = () => {
  return `
.expansion-panel-button {
  all: unset;
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

export const ExpansionPanelDefaultCodeTs = () => {
  return `
const expansionPanelButton = document.getElementById('expansion-panel-button');
const expansionPanelContent = document.getElementById('expansion-panel-content');

expansionPanelButton.addEventListener('forge-expansion-panel-toggle', (event: { detail: boolean }) => {
  expansionPanelButton.setAttribute('aria-expanded', detail.toString());
});
  `
}
