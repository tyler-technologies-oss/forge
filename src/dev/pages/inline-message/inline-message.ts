import '$src/shared';
import '@tylertech/forge/inline-message';
import '@tylertech/forge/icon';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconCancel, tylIconCheck, tylIconInfo, tylIconNotifications, tylIconWarning } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconNotifications,
  tylIconInfo,
  tylIconWarning,
  tylIconCheck,
  tylIconCancel
]);
