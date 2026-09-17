import { IconRegistry } from "@tylertech/forge/icon";
import { tylIconClose, tylIconSave } from "@tylertech/tyler-icons";
IconRegistry.define([tylIconClose, tylIconSave]);
const dialog = document.querySelector("#content-scaffold-dialog");
const openButton = document.querySelector("#open-dialog-button");
const closeButton = document.querySelector("#close-dialog-button");
const cancelButton = document.querySelector("#cancel-dialog-button");
openButton?.addEventListener("click", () => {
  dialog?.show();
});
closeButton?.addEventListener("click", () => {
  dialog?.hide();
});
cancelButton?.addEventListener("click", () => {
  dialog?.hide();
});
