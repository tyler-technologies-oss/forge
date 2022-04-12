export const BannerThemedCodeHtml = () => `
<forge-banner theme="danger">
  <div>Minim sunt eu laborum labore minim.</div>
</forge-banner>

<forge-banner theme="warning">
  <div>Minim sunt eu laborum labore minim.</div>
</forge-banner>

<forge-banner theme="success">
  <div>Minim sunt eu laborum labore minim.</div>
</forge-banner>

<forge-banner theme="info-primary">
  <div>Minim sunt eu laborum labore minim.</div>
</forge-banner>

<forge-banner theme="info-secondary">
  <div>Minim sunt eu laborum labore minim.</div>
</forge-banner>
`;

export const BannerThemedCodeBlazor = () => `
<ForgeBanner Theme="@Theme.Danger" Text="Minim sunt eu laborum labore minim." />

<ForgeBanner Theme="@Theme.Warning" Text="Minim sunt eu laborum labore minim." />

<ForgeBanner Theme="@Theme.Success" Text="Minim sunt eu laborum labore minim." />

<ForgeBanner Theme="@Theme.InfoPrimary" Text="Minim sunt eu laborum labore minim." />

<ForgeBanner Theme="@Theme.InfoSecondary" Text="Minim sunt eu laborum labore minim." />
`;