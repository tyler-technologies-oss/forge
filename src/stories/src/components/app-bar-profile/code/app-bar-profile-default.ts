export const AppBarProfileButtonDefaultCodeHtml = () => `
<forge-app-bar title-text="Title text">
  <forge-app-bar-profile-button
    slot="end"
    profile-button="true"
    avatar-text="First Last"
    full-name="First Last"
    email="first.last@tylertech.com">
  </forge-app-bar-profile-button>
</forge-app-bar>
`;

export const AppBarProfileButtonDefaultCodeTs = () => `
profileButton.addEventListener('forge-profile-card-sign-out', () => {
  showToast('Sign out button clicked');
});

profileButton.addEventListener('forge-profile-card-profile', () => {
  showToast('Profile button clicked');
});

function showToast(msg: string): void {
  const toast = document.createElement('forge-toast');
  toast.message = msg;
  document.body.appendChild(toast);
}
`;
