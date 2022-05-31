export const ButtonToggleLeadingCodeHtml = () => {
  return `<forge-button-toggle-group>
  <forge-button-toggle value="email" aria-label="By email">
    <forge-icon slot="leading" name="email"></forge-icon>
    By email
  </forge-button-toggle>
  <forge-button-toggle value="mail" aria-label="By mail">
    By mail
  </forge-button-toggle>
  <forge-button-toggle value="phone" aria-label="By phone">
    <forge-icon slot="leading" name="phone"></forge-icon>
    By phone
  </forge-button-toggle>
</forge-button-toggle-group>`;
};

export const ButtonToggleTrailingCodeHtml = () => {
  return `<forge-button-toggle-group>
  <forge-button-toggle value="email" aria-label="By email">
    By email
    <forge-icon slot="trailing" name="email"></forge-icon>
  </forge-button-toggle>
  <forge-button-toggle value="mail" aria-label="By mail">
    By mail
  </forge-button-toggle>
  <forge-button-toggle value="phone" aria-label="By phone">
    By phone
    <forge-icon slot="trailing" name="phone"></forge-icon>
  </forge-button-toggle>
</forge-button-toggle-group>`;
};
