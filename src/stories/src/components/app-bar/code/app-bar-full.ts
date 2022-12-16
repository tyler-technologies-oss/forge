export const AppBarFullCodeHtml = () => `
<forge-app-bar title-text="Full">
  <forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>
  <forge-app-bar-search slot="center">
      <input type="text" placeholder="Search" />
  </forge-app-bar-search>
  <forge-app-bar-help-button slot="end"></forge-app-bar-help-button>
  <forge-app-bar-notification-button slot="end"></forge-app-bar-notification-button>
  <forge-app-bar-app-launcher-button slot="end" allow-more="true"></forge-app-bar-app-launcher-button>
  <forge-app-bar-profile-button slot="end" avatar-text="First Last" full-name="First Last" email="first.last@tylertech.com"></forge-app-bar-profile-button>
</forge-app-bar>
`;

export const AppBarFullCodeTs = () => `

`;
