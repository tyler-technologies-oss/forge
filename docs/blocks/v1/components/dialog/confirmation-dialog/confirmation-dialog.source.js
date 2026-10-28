import { ToastComponent } from "@tylertech/forge/toast";
const openButton = document.getElementById("open-confirmation-dialog-demo");
const confirmationDialog = document.getElementById("confirmation-dialog-demo");
openButton?.addEventListener("click", () => confirmationDialog.open = true);
confirmationDialog?.addEventListener("forge-confirmation-dialog-action", (event) => {
  const { value } = event.detail;
  ToastComponent.present({ message: value ? "Record deleted." : "Delete canceled." });
});
