import { IconRegistry } from "@tylertech/forge/icon";
import { tylIconHelp } from "@tylertech/tyler-icons";
IconRegistry.define([tylIconHelp]);
const options = [{ label: "Help", value: "help" }];
const helpButton = document.querySelector("forge-app-bar-help-button");
if (helpButton) {
  helpButton.options = options;
}
