import { IconRegistry } from "@tylertech/forge/icon";
import { tylIconAssignment, tylIconWorkOutline, tylIconWarning, tylIconSettings } from "@tylertech/tyler-icons";
IconRegistry.define([tylIconAssignment, tylIconWorkOutline, tylIconWarning, tylIconSettings]);
function buildListItemElement(text, icon, value) {
  const listItem = document.createElement("forge-list-item");
  listItem.value = value;
  const iconElement = document.createElement("forge-icon");
  iconElement.slot = "leading";
  iconElement.name = icon;
  listItem.appendChild(iconElement);
  const button = document.createElement("button");
  button.type = "button";
  button.innerText = text;
  listItem.appendChild(button);
  return listItem;
}
function profileCardBuilder() {
  const list = document.createElement("forge-list");
  list.addEventListener("forge-list-item-select", (event) => {
    const { detail } = event;
    console.warn("[profile-card] Selected custom item:", detail.value);
  });
  list.style.setProperty("--forge-list-padding", "0");
  list.appendChild(document.createElement("forge-divider"));
  list.appendChild(buildListItemElement("My Reports", "assignment", "reports"));
  list.appendChild(buildListItemElement("My Workflow", "work_outline", "workflow"));
  list.appendChild(buildListItemElement("My Alerts", "warning", "alerts"));
  list.appendChild(buildListItemElement("My Preferences", "settings", "preferences"));
  return list;
}
const profileButton = document.querySelector("forge-app-bar-profile-button");
if (profileButton) {
  profileButton.profileCardBuilder = profileCardBuilder;
}
