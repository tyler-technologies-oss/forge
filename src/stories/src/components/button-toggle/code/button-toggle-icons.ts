export const ButtonToggleTrailingCodeHtml = () => {
  return `
<forge-button-toggle-group>
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
</forge-button-toggle-group>
  `;
};
