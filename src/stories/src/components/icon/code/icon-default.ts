
export const IconDefaultCodeHtml = () => {
  return '<forge-icon name="face"></forge-icon>';
};

export const IconDefaultCodeTs = () => {
  return `
import { IconRegistry } from '@tylertech/forge';
import { tylIconFace } from '@tylertech/tyler-icons/standard';

IconRegistry.define(tylIconFace);
  `;
};
