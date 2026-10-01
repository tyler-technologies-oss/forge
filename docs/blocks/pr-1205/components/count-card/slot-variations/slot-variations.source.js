import { IconRegistry } from "@tylertech/forge/icon";
import { tylIconAttachMoney, tylIconMoreVert, tylIconShoppingCart, tylIconTrendingUp } from "@tylertech/tyler-icons";
IconRegistry.define([tylIconAttachMoney, tylIconMoreVert, tylIconShoppingCart, tylIconTrendingUp]);
const menu = document.querySelector("forge-menu");
if (menu) {
  menu.options = [
    { label: "View details", value: "details" },
    { label: "Export data", value: "export" },
    { label: "Remove card", value: "remove" }
  ];
}
