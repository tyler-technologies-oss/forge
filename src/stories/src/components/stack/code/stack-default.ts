export const StackDefaultHtml = () => `
<forge-stack>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</forge-stack>
`;

export const StackDefaultCss = () => `
.box {
  padding: 36px;
  border: 4px dashed var(--mdc-theme-text-secondary-on-background);
  background-color: var(--mdc-theme-text-disabled-on-background);
  border-radius: 8px;
}
`;
