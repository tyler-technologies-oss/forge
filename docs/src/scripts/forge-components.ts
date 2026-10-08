// Forge components
import "@tylertech/forge/accordion";
import "@tylertech/forge/app-bar";
import "@tylertech/forge/app-launcher";
import "@tylertech/forge/app-launcher/app-launcher-link";
import "@tylertech/forge/app-layout";
import "@tylertech/forge/autocomplete";
import "@tylertech/forge/avatar";
import "@tylertech/forge/badge";
import "@tylertech/forge/banner";
import "@tylertech/forge/bottom-sheet";
import "@tylertech/forge/busy-indicator";
import "@tylertech/forge/button";
import "@tylertech/forge/button-area";
import "@tylertech/forge/button-toggle";
import "@tylertech/forge/calendar";
import "@tylertech/forge/card";
import "@tylertech/forge/checkbox";
import "@tylertech/forge/chip-field";
import "@tylertech/forge/chips";
import "@tylertech/forge/circular-progress";
import "@tylertech/forge/color-picker";
import "@tylertech/forge/confirmation-dialog";
import "@tylertech/forge/date-picker";
import "@tylertech/forge/date-range-picker";
import "@tylertech/forge/dialog";
import "@tylertech/forge/divider";
import "@tylertech/forge/drawer";
import "@tylertech/forge/expansion-panel";
import "@tylertech/forge/file-picker";
import "@tylertech/forge/floating-action-button";
import "@tylertech/forge/icon";
import "@tylertech/forge/icon-button";
import "@tylertech/forge/inline-message";
import "@tylertech/forge/key";
import "@tylertech/forge/keyboard-shortcut";
import "@tylertech/forge/label";
import "@tylertech/forge/label-value";
import "@tylertech/forge/linear-progress";
import "@tylertech/forge/list";
import "@tylertech/forge/menu";
import "@tylertech/forge/meter";
import "@tylertech/forge/open-icon";
import "@tylertech/forge/page-state";
import "@tylertech/forge/paginator";
import "@tylertech/forge/popover";
import "@tylertech/forge/radio";
import "@tylertech/forge/scaffold";
import "@tylertech/forge/select";
import "@tylertech/forge/skeleton";
import "@tylertech/forge/slider";
import "@tylertech/forge/split-button";
import "@tylertech/forge/split-view";
import "@tylertech/forge/stack";
import "@tylertech/forge/stepper";
import "@tylertech/forge/structured-card";
import "@tylertech/forge/switch";
import "@tylertech/forge/tabs";
import "@tylertech/forge/text-field";
import "@tylertech/forge/time-picker";
import "@tylertech/forge/timeline";
import "@tylertech/forge/timestamp";
import "@tylertech/forge/toast";
import "@tylertech/forge/toolbar";
import "@tylertech/forge/tooltip";
import "@tylertech/forge/tree";
import "@tylertech/forge/user-profile";
import "@tylertech/forge/view-switcher";

// Tyler Icons
import {
  tylIconAdd,
  tylIconAlert,
  tylIconApps,
  tylIconArrowBack,
  tylIconArrowForward,
  tylIconBell,
  tylIconBrightness3,
  tylIconBrightness7,
  tylIconBug,
  tylIconCategory,
  tylIconCheck,
  tylIconCheckCircle,
  tylIconClockOutline,
  tylIconClose,
  tylIconCloseCircle,
  tylIconCode,
  tylIconCompassOutline,
  tylIconContentCopy,
  tylIconCursorDefaultClick,
  tylIconDashboard,
  tylIconDateRange,
  tylIconDescription,
  tylIconDrafts,
  tylIconEmail,
  tylIconError,
  tylIconFavorite,
  tylIconFavoriteBorder,
  tylIconFileDocument,
  tylIconFlag,
  tylIconFlask,
  tylIconFolder,
  tylIconFolderOutline,
  tylIconForgeLogo,
  tylIconFormatBold,
  tylIconFormatItalic,
  tylIconFormatLetterCase,
  tylIconFormatListBulleted,
  tylIconFormTextbox,
  tylIconFullscreen,
  tylIconHammerScrewdriver,
  tylIconHelp,
  tylIconHelpCircleOutline,
  tylIconHome,
  tylIconInbox,
  tylIconInfo,
  tylIconInfoOutline,
  tylIconInsertInvitation,
  tylIconLightbulbOutline,
  tylIconMail,
  tylIconMenu,
  tylIconMessageAlertOutline,
  tylIconMonitor,
  tylIconMoreVert,
  tylIconNotifications,
  tylIconOpenInNew,
  tylIconPackage,
  tylIconPalette,
  tylIconPaletteSwatchVariant,
  tylIconPerson,
  tylIconPhone,
  tylIconPreview,
  tylIconRefresh,
  tylIconRocket,
  tylIconRuler,
  tylIconSearch,
  tylIconSend,
  tylIconSettings,
  tylIconSmartphone,
  tylIconSpeed,
  tylIconStar,
  tylIconTableLarge,
  tylIconTablet,
  tylIconTextShadow,
  tylIconToolbox,
  tylIconViewCarousel,
  tylIconViewDashboardOutline,
  tylIconViewQuilt,
  tylIconWarning,
  tylIconWidgets,
} from "@tylertech/tyler-icons";
import { IconRegistry } from "@tylertech/forge/icon";

// Register icons
IconRegistry.define([
  tylIconAdd,
  tylIconAlert,
  tylIconApps,
  tylIconArrowBack,
  tylIconArrowForward,
  tylIconBell,
  tylIconBrightness3,
  tylIconBrightness7,
  tylIconBug,
  tylIconCategory,
  tylIconCheck,
  tylIconCheckCircle,
  tylIconClockOutline,
  tylIconClose,
  tylIconCloseCircle,
  tylIconCode,
  tylIconCompassOutline,
  tylIconContentCopy,
  tylIconCursorDefaultClick,
  tylIconDashboard,
  tylIconDateRange,
  tylIconDescription,
  tylIconDrafts,
  tylIconEmail,
  tylIconError,
  tylIconFavorite,
  tylIconFavoriteBorder,
  tylIconFileDocument,
  tylIconFlag,
  tylIconFlask,
  tylIconFolder,
  tylIconFolderOutline,
  tylIconForgeLogo,
  tylIconFormatBold,
  tylIconFormatItalic,
  tylIconFormatLetterCase,
  tylIconFormatListBulleted,
  tylIconFormTextbox,
  tylIconFullscreen,
  tylIconHammerScrewdriver,
  tylIconHelp,
  tylIconHelpCircleOutline,
  tylIconHome,
  tylIconInbox,
  tylIconInfo,
  tylIconInfoOutline,
  tylIconInsertInvitation,
  tylIconLightbulbOutline,
  tylIconMail,
  tylIconMenu,
  tylIconMessageAlertOutline,
  tylIconMonitor,
  tylIconMoreVert,
  tylIconNotifications,
  tylIconOpenInNew,
  tylIconPackage,
  tylIconPalette,
  tylIconPaletteSwatchVariant,
  tylIconPerson,
  tylIconPhone,
  tylIconPreview,
  tylIconRefresh,
  tylIconRocket,
  tylIconRuler,
  tylIconSearch,
  tylIconSend,
  tylIconSettings,
  tylIconSmartphone,
  tylIconSpeed,
  tylIconStar,
  tylIconTableLarge,
  tylIconTablet,
  tylIconTextShadow,
  tylIconToolbox,
  tylIconViewCarousel,
  tylIconViewDashboardOutline,
  tylIconViewQuilt,
  tylIconWarning,
  tylIconWidgets,
]);
