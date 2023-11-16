export const ButtonDefaultCodeHtml = () => {
  return `
<forge-button>Button</forge-button>
  `;
};

export const ButtonWithIconCodeHtml = () => {
  return `
<forge-button variant="outlined">
  <span>Button</span>
  <forge-icon slot="end" name="open_in_new"></forge-icon>
</forge-button>
  `;
};
