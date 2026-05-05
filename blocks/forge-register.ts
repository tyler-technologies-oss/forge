import { defineComponents, IconRegistry } from '@tylertech/forge';
import '@tylertech/forge-extended/app-layout';
import '@tylertech/forge-extended/user-profile';

import {
  tylIconHome,
  tylIconNotifications,
  tylIconSettings,
  tylIconAccountCircle,
  tylIconDashboard,
  tylIconFolder,
  tylIconPeople,
  tylIconCalendarToday,
  tylIconHelp
} from '@tylertech/tyler-icons';

// Register all Forge components
defineComponents();

// Register icons
IconRegistry.define([
  tylIconHome,
  tylIconNotifications,
  tylIconSettings,
  tylIconAccountCircle,
  tylIconDashboard,
  tylIconFolder,
  tylIconPeople,
  tylIconCalendarToday,
  tylIconHelp
]);
