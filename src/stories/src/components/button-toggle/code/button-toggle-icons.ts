export const ButtonToggleLeadingCodeHtml = () => {
  return `<forge-button-toggle-group>
  <forge-button-toggle value="email" aria-label="By email">
    <i class="tyler-icons" slot="leading" aria-hidden="true">email</i>
    By email
  </forge-button-toggle>
  <forge-button-toggle value="mail" aria-label="By mail">
    By mail
  </forge-button-toggle>
  <forge-button-toggle value="phone" aria-label="By phone">
    <i class="tyler-icons" slot="leading" aria-hidden="true">phone</i>
    By phone
  </forge-button-toggle>
</forge-button-toggle-group>`;
};

export const ButtonToggleTrailingCodeHtml = () => {
  return `<forge-button-toggle-group>
  <forge-button-toggle value="email" aria-label="By email">
    By email
    <i class="tyler-icons" slot="trailing" aria-hidden="true">email</i>
  </forge-button-toggle>
  <forge-button-toggle value="mail" aria-label="By mail">
    By mail
  </forge-button-toggle>
  <forge-button-toggle value="phone" aria-label="By phone">
    By phone
    <i class="tyler-icons" slot="trailing" aria-hidden="true">phone</i>
  </forge-button-toggle>
</forge-button-toggle-group>`;
};

export const ButtonToggleLeadingCodeBlazor = () => {
  return `<ForgeButtonToggleGroup>
  <ForgeButtonToggle LeadingIcon="email" Value="email" Text="By email" />
  <ForgeButtonToggle Value="mail" Text="By mail" />
  <ForgeButtonToggle LeadingIcon="phone" Value="phone" Text="By phone" />
</ForgeButtonToggleGroup>`;
};

export const ButtonToggleTrailingCodeBlazor = () => {
  return `<ForgeButtonToggleGroup>
  <ForgeButtonToggle TrailingIcon="email" Value="email" Text="By email" />
  <ForgeButtonToggle Value="mail" Text="By mail" />
  <ForgeButtonToggle TrailingIcon="phone" Value="phone" Text="By phone" />
</ForgeButtonToggleGroup>`;
};
