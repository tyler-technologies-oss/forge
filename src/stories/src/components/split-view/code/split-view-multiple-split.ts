export const SplitViewMultipleSplitCodeHtml = () => {
    return `
<forge-split-view>
  <forge-split-view-panel resizable="end">
    <div>Panel 1</div>
  </forge-split-view-panel>
  <forge-split-view-panel>
    <div>Panel 2</div>
  </forge-split-view-panel>
  <forge-split-view-panel resizable="start">
    <div>Panel 3</div>
  </forge-split-view-panel>
</forge-split-view>
    `;
};
