import { IconRegistry } from "@tylertech/forge/icon";
import { tylIconDrafts, tylIconInbox, tylIconMenu, tylIconSend } from "@tylertech/tyler-icons";
IconRegistry.define([tylIconDrafts, tylIconInbox, tylIconMenu, tylIconSend]);
const menuButton = document.getElementById("menu-button");
const drawer = document.getElementById("drawer");
menuButton?.addEventListener("click", () => {
  drawer.open = !drawer.open;
});
