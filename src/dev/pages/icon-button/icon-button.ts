import '$src/shared';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon-button/forge-icon-button.scss';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconCode, tylIconFavorite, tylIconFavoriteBorder } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconFavorite,
  tylIconFavoriteBorder,
  tylIconCode
]);
