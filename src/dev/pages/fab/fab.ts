import '$src/shared';
import '@tylertech/forge/floating-action-button';
import '@tylertech/forge/floating-action-button/forge-floating-action-button.scss';
import '@tylertech/forge/icon';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconAdd, tylIconDelete, tylIconFavorite } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconFavorite,
  tylIconAdd,
  tylIconDelete
]);
