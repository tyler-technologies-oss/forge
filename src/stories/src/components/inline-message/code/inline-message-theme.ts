export const InlineMessageThemeCodeHtml = () => {
  return `<forge-inline-message theme="danger">
  <div>Message.</div>
</forge-inline-message>

<forge-inline-message theme="warning">
  <div>Message.</div>
</forge-inline-message>

<forge-inline-message theme="success">
  <div>Message.</div>
</forge-inline-message>

<forge-inline-message theme="info-primary">
  <div>Message.</div>
</forge-inline-message>

<forge-inline-message theme="info-secondary">
  <div>Message.</div>
</forge-inline-message>`;
};

export const InlineMessageThemeCodeBlazor = () => {
  return `<forge-inline-message Theme="@InlineMessageTheme.Danger" Message="Message." />

<forge-inline-message Theme="@InlineMessageTheme.Warning" Message="Message." />

<forge-inline-message Theme="@InlineMessageTheme.Success" Message="Message." />

<forge-inline-message Theme="@InlineMessageTheme.InfoPrimary" Message="Message." />

<forge-inline-message Theme="@InlineMessageTheme.InfoSecondary" Message="Message." />`;
};
