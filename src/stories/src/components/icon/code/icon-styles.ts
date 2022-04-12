export const IconStylesCodeHtml = () => {
  return '<forge-icon name="face" class="my-custom-icon"></forge-icon>';
};

export const IconStylesCodeScss = () => {
  return `
.my-custom-icon {
  font-size: 48px;
  color: var(--mdc-theme-primary);
}
  `;
};

export const IconStylesCodeTs = () => {
  return `
import { IconRegistry } from '@tylertech/forge';
import { tylIconFace } from '@tylertech/tyler-icons/standard';

IconRegistry.define(tylIconFace);
  `;
};
