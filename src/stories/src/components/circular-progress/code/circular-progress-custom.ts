export const CircularProgressCustomHtml = () => `
<forge-circular-progress class="custom-circular-progress"></forge-circular-progress>
`;
export const CircularProgressCustomScss = () => `
.custom-circular-progress {
  --forge-theme-tertiary: var(--forge-theme-success);
  --forge-circular-progress-track-color: var(--mdc-theme-text-disabled-on-background);
  --forge-circular-progress-size: '150px';
  --forge-circular-progress-stroke-width: '1px';
}
`;
