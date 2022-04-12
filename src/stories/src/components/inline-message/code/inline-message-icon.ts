export const InlineMessageIconCodeHtml = () => {
  return `<forge-inline-message>
  <i slot="icon" class="tyler-icons">cake</i>
  <div>Message.</div>
</forge-inline-message>`;
};

export const InlineMessageIconCodeBlazor = () => {
  return `<ForgeInlineMessage Message="Message" Icon="cake" />`;
};
