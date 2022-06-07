export const ButtonDefaultCodeHtml = () => {
  return `
<forge-button>
  <button type="button">Button</button>
</forge-button>
  `;
};

export const ButtonWithIconCodeHtml = () => {
  return `
<forge-button type="outlined">
  <button type="button">
    <span>Button</span>
    <forge-icon name="open_in_new"></forge-icon>
  </button>
</forge-button>
  `;
};
