import '$src/shared';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon/forge-icon.scss';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconActionLauncher } from '@tylertech/tyler-icons/custom';
import { tylIconCode, tylIconFace, tylIconPalette } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconFace,
  tylIconCode,
  tylIconActionLauncher,
  tylIconPalette
]);
