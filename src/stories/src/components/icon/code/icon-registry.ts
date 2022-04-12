export const IconRegistryCodeHtml = () => {
  return `
<forge-icon name="face"></forge-icon>
<forge-icon name="account_circle_outline"></forge-icon>
<forge-icon name="action_launcher"></forge-icon>
  `;
};

export const IconRegistryCodeTs = () => {
  return `
import { IconRegistry } from '@tylertech/forge';
import { tylIconFace } from '@tylertech/tyler-icons/standard';
import { tylIconAccountCircleOutline } from '@tylertech/tyler-icons/extended';
import { tylIconActionLauncher } from '@tylertech/tyler-icons/custom';

// This defines your desired icons with the global Forge icon registry
IconRegistry.define([tylIconFace, tylIconAccountCircleOutline, tylIconActionLauncher]);
  `;
};