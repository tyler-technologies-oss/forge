export const InlineMessageIconTitleCodeHtml = () => {
  return `<forge-inline-message>
  <i slot="icon" class="tyler-icons">cake</i>
  <div slot="title">Example</div>
  <div>Message.</div>
</forge-inline-message>`;
};

export const InlineMessageIconTitleCodeBlazor = () => {
  return `<ForgeInlineMessage Title="Example" Message="Message." Icon="cake" />`;
};
