import { IconRegistry } from "@tylertech/forge/icon";
import { tylIconAutoFixHigh, tylIconSpellcheck, tylIconReceiptLong, tylIconArrowCollapse, tylIconSchoolOutline, tylIconMood } from "@tylertech/tyler-icons";
IconRegistry.define([tylIconAutoFixHigh, tylIconSpellcheck, tylIconReceiptLong, tylIconArrowCollapse, tylIconSchoolOutline, tylIconMood]);
const options = [
  { label: "Check grammar", value: "grammar", leadingIcon: "spellcheck", leadingIconType: "component" },
  { label: "Elaborate", value: "elaborate", leadingIcon: "receipt_long", leadingIconType: "component" },
  { label: "Make more concise", value: "concise", leadingIcon: "arrow_collapse", leadingIconType: "component" },
  { label: "Make more formal", value: "formal", leadingIcon: "school_outline", leadingIconType: "component" },
  { label: "Make more casual", value: "casual", leadingIcon: "mood", leadingIconType: "component" }
];
const bindMenu = (menuId, fieldSelector) => {
  const menu = document.getElementById(menuId);
  const field = document.querySelector(fieldSelector);
  if (!menu || !field) {
    return;
  }
  menu.options = options;
  menu.addEventListener("forge-menu-select", ({ detail }) => {
    console.log(`Apply "${detail.value}" to:`, field.value);
    field.focus();
  });
};
bindMenu("assist-menu-textarea", "#assist-textarea");
bindMenu("assist-menu-input", "#assist-input");
