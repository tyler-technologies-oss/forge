export const ButtonToggleDefaultCodeHtml = () => {
  return `<forge-button-toggle-group>
  <forge-button-toggle value="email" aria-label="By email">By email</forge-button-toggle>
  <forge-button-toggle value="mail" aria-label="By mail">By mail</forge-button-toggle>
  <forge-button-toggle value="phone" aria-label="By phone">By phone</forge-button-toggle>
</forge-button-toggle-group>`;
};

export const ButtonToggleDefaultCodeBlazor = () => {
  return `<ForgeButtonToggleGroup>
  <ForgeButtonToggle Value="email" Text="By email" />
  <ForgeButtonToggle Value="mail" Text="By mail" />
  <ForgeButtonToggle Value="phone" Text="By phone" />
</ForgeButtonToggleGroup>`;
};
