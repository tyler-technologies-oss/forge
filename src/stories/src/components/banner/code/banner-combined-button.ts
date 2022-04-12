export const BannerCombinedButtonCodeHtml = () => `
<forge-banner>
  <div>Minim sunt eu laborum labore minim.</div>
  <forge-button type="outlined" slot="button">
    <button type="button" style="background: #ffffff">Learn more...</button>
  </forge-button>
</forge-banner>
`;

export const BannerCombinedButtonCodeBlazor = () => `
<ForgeBanner Text="Minim sunt eu laborum labore minim.">
  <ForgeButton Type="@ButtonType.Outlined" Slot="button">Learn more...</ForgeButton>
</ForgeBanner>
`;
