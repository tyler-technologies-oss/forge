import { IconRegistry } from "@tylertech/forge/icon";
import { tylIconClose } from "@tylertech/tyler-icons";
IconRegistry.define([tylIconClose]);
const openButton = document.getElementById("open-dialog-button-css-only");
const dialog = document.getElementById("css-dialog-css-only");
const closeButton = dialog?.querySelector("forge-icon-button");
const dismissButton = dialog?.querySelector('forge-toolbar[slot="footer"] forge-button');
function toggleDialog() {
  if (!dialog) {
    return;
  }
  if (dialog.open) {
    dialog.close();
    return;
  }
  if (dialog.classList.contains("forge-dialog--modal")) {
    dialog.showModal();
  } else {
    dialog.show();
  }
}
openButton?.addEventListener("click", toggleDialog);
closeButton?.addEventListener("click", toggleDialog);
dismissButton?.addEventListener("click", toggleDialog);
