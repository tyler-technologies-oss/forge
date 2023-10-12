export const ButtonAreaDefaultCodeHtml = () => {
  return `
<forge-card>
  <forge-button-area>
    <button slot="button" type="button">Go to detail</button>
    <div class="content">
      <div>
        <span>Heading</span>
        <span>Content</span>
      </div>
      <forge-icon-button>
        <button type="button" aria-label="Favorite">
          <forge-icon name="favorite"></forge-icon>
        </button>
        <forge-tooltip>Favorite</forge-tooltip>
      </forge-icon-button>
      <forge-icon name="chevron_right"></forge-icon>
    </div>
  <forge-button-area>
</forge-card>
  `;
};

export const ButtonAreaDefaultCodeCss = () => {
  return `
forge-card {
  --forge-card-padding: 0;

  width: 320px;
  max-width: 100%;
}

.content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
}

.content::first-child() {
  margin-inline-end: auto;
}
  `;
};

export const ButtonAreaInExpansionPanelCodeHtml = () => {
  return `
<forge-card>
  <forge-expansion-panel id="expansion-panel">
    <forge-button-area>
      <button slot="button" type="button" id="button" aria-controls="expandable-content" aria-expanded="false">Toggle panel</button>
      <div class="header-content">
        <div>
          <span>Heading</span>
          <span>Content</span>
        </div>
        <forge-icon-button>
          <button type="button" aria-label="Favorite">
            <forge-icon name="favorite"></forge-icon>
          </button>
          <forge-tooltip>Favorite</forge-tooltip>
        </forge-icon-button>
        <forge-open-icon></forge-open-icon>
      </div>
    <forge-button-area>
    <div role="group" id="expandable-content" class="content" aria-label="Expandable content">Content</div>
  </forge-expansion-panel>
</forge-card>
  `;
};

export const ButtonAreaInExpansionPanelCodeCss = () => {
  return `
forge-card {
  --forge-card-padding: 0;

  width: 320px;
  max-width: 100%;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
}

.header-content::first-child() {
  margin-inline-end: auto;
}

.content {
  margin: 16px;
}
  `;
};

export const ButtonAreaInExpansionPanelCodeTs = () => {
  return `
const expansionPanel = document.getElementById('expansion-panel');
const button = document.getElementById('button');

expansionPanel.addEventListener('forge-expansion-panel-toggle', ({ detail: boolean }) => {
  button.setAttribute('aria-expanded', detail.toString());
});
  `;
};