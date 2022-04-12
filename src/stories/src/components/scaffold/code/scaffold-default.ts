export const ScaffoldDefaultScss = () =>
  `
.forge-scaffold-example {
    div[slot] {
        border: 1px dashed #e0e0e0;
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        padding: 8px;
        margin: 8px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
}
`;

export const ScaffoldDefaultHtml = () =>
  `
<forge-scaffold class="forge-scaffold-example" style="--forge-scaffold-height: 500px; --forge-scaffold-width: 100%;">
  <div slot="left">left</div>
  <div slot="header">header</div>
  <div slot="body-header">body-header</div>
  <div slot="body-left">body-left</div>
  <div slot="body">
    <div>body</div>
  </div>
  <div slot="body-right">body-right</div>
  <div slot="body-footer">body-footer</div>
  <div slot="footer">footer</div>
  <div slot="right">right</div>
</forge-scaffold>
`;

export const ScaffoldDefaultBlazor = () =>
  `
<ForgeScaffold class="forge-scaffold-example" style="--forge-scaffold-height: 500px; --forge-scaffold-width: 100%;">
  <div slot="left">left</div>
  <div slot="header">header</div>
  <div slot="body-header">body-header</div>
  <div slot="body-left">body-left</div>
  <div slot="body">
    <div>body</div>
  </div>
  <div slot="body-right">body-right</div>
  <div slot="body-footer">body-footer</div>
  <div slot="footer">footer</div>
  <div slot="right">right</div>
</ForgeScaffold>
`;
