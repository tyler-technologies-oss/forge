import { defineComponents, IconRegistry } from '@tylertech/forge';
import { defineAppLayoutComponent, defineUserProfileComponent } from '@tylertech/forge-extended';
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

// Register extended components
defineAppLayoutComponent();
defineUserProfileComponent();

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
