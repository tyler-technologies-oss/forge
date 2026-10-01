const showButton = document.querySelector("forge-button");
const confirmationDialog = document.querySelector("forge-confirmation-dialog");
showButton?.addEventListener("click", () => {
  if (!confirmationDialog) {
    return;
  }
  confirmationDialog.open = true;
});
