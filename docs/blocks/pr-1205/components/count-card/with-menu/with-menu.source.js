import { IconRegistry } from "@tylertech/forge/icon";
import { tylIconAttachMoney, tylIconMoreVert } from "@tylertech/tyler-icons";
IconRegistry.define([tylIconAttachMoney, tylIconMoreVert]);
const menu = document.querySelector("forge-menu");
if (menu) {
  menu.options = [
    { label: "View details", value: "details" },
    { label: "Export data", value: "export" },
    { label: "Remove card", value: "remove" }
  ];
}
