export const BannerCombinedFullCodeHtml = () => `
<forge-banner>
  <i class="tyler-icons" slot="icon">add_alert</i>
  <div>Minim sunt eu laborum labore minim.</div>
  <forge-button type="outlined" slot="button">
    <button type="button" style="background: #ffffff">Learn more...</button>
  </forge-button>
</forge-banner>
`;

export const BannerCombinedFullCodeBlazor = () => `
<ForgeBanner Icon="add_alert" Text="Minim sunt eu laborum labore minim.">
  <ForgeButton Type="@ButtonType.Outlined" Slot="button">Learn more...</ForgeButton>
</ForgeBanner>
`;
