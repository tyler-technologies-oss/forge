import { NgModule } from '@angular/core';

import { ForgeAccordionModule } from './accordion';
import { ForgeAppBarModule } from './app-bar';
import { ForgeAppBarHelpButtonModule } from './app-bar-help-button';
import { ForgeAppBarMenuButtonModule } from './app-bar-menu-button';
import { ForgeAppBarNotificationButtonModule } from './app-bar-notification-button';
import { ForgeAppBarProfileButtonModule } from './app-bar-profile-button';
import { ForgeAppBarSearchModule } from './app-bar-search';
import { ForgeAutocompleteModule } from './autocomplete';
import { ForgeAvatarModule } from './avatar';
import { ForgeBackdropModule } from './backdrop';
import { ForgeBadgeModule } from './badge';
import { ForgeBannerModule } from './banner';
import { ForgeBottomSheetModule } from './bottom-sheet';
import { ForgeButtonModule } from './button';
import { ForgeButtonAreaModule } from './button-area';
import { ForgeButtonToggleModule } from './button-toggle';
import { ForgeButtonToggleGroupModule } from './button-toggle-group';
import { ForgeCalendarModule } from './calendar';
import { ForgeCardModule } from './card';
import { ForgeCheckboxModule } from './checkbox';
import { ForgeChipModule } from './chip';
import { ForgeChipFieldModule } from './chip-field';
import { ForgeChipSetModule } from './chip-set';
import { ForgeCircularProgressModule } from './circular-progress';
import { ForgeColorPickerModule } from './color-picker';
import { ForgeDatePickerModule } from './date-picker';
import { ForgeDateRangePickerModule } from './date-range-picker';
import { ForgeDeprecatedButtonModule } from './deprecated-button';
import { ForgeDeprecatedIconButtonModule } from './deprecated-icon-button';
import { ForgeDialogModule } from './dialog';
import { ForgeDividerModule } from './divider';
import { ForgeDrawerModule } from './drawer';
import { ForgeExpansionPanelModule } from './expansion-panel';
import { ForgeFloatingActionButtonModule } from './fab';
import { ForgeFieldModule } from './field';
import { ForgeFilePickerModule } from './file-picker';
import { ForgeFocusIndicatorModule } from './focus-indicator';
import { ForgeIconModule } from './icon';
import { ForgeIconButtonModule } from './icon-button';
import { ForgeInlineMessageModule } from './inline-message';
import { ForgeKeyModule } from './key/key.module';
import { ForgeKeyboardShortcutModule } from './keyboard-shortcut';
import { ForgeLabelModule } from './label';
import { ForgeLabelValueModule } from './label-value';
import { ForgeLinearProgressModule } from './linear-progress';
import { ForgeListModule } from './list';
import { ForgeListItemModule } from './list-item';
import { ForgeMenuModule } from './menu';
import { ForgeMeterGroupModule } from './meter-group/meter-group.module';
import { ForgeMiniDrawerModule } from './mini-drawer';
import { ForgeModalDrawerModule } from './modal-drawer';
import { ForgeOpenIconModule } from './open-icon';
import { ForgeOptionModule } from './option';
import { ForgeOptionGroupModule } from './option-group';
import { ForgeOverlayModule } from './overlay';
import { ForgePageStateModule } from './page-state';
import { ForgePaginatorModule } from './paginator';
import { ForgePopoverModule } from './popover';
import { ForgeProfileCardModule } from './profile-card';
import { ForgeRadioModule } from './radio';
import { ForgeRadioGroupModule } from './radio-group';
import { ForgeScaffoldModule } from './scaffold';
import { ForgeSecretModule } from './secret';
import { ForgeSelectModule } from './select';
import { ForgeSelectDropdownModule } from './select-dropdown';
import { ForgeSkeletonModule } from './skeleton';
import { ForgeSkipLinkModule } from './skip-link/skip-link.module';
import { ForgeSliderModule } from './slider';
import { ForgeSplitButtonModule } from './split-button';
import { ForgeSplitViewModule } from './split-view';
import { ForgeSplitViewPanelModule } from './split-view-panel';
import { ForgeStackModule } from './stack';
import { ForgeStateLayerModule } from './state-layer';
import { ForgeStepModule } from './step';
import { ForgeStepperModule } from './stepper';
import { ForgeSwitchModule } from './switch';
import { ForgeTabModule } from './tab';
import { ForgeTabBarModule } from './tab-bar';
import { ForgeTableModule } from './table';
import { ForgeTextFieldModule } from './text-field';
import { ForgeTimePickerModule } from './time-picker';
import { ForgeToastModule } from './toast';
import { ForgeToolbarModule } from './toolbar';
import { ForgeTooltipModule } from './tooltip';
import { ForgeViewModule } from './view';
import { ForgeViewSwitcherModule } from './view-switcher';
import { ForgeTreeModule } from './tree';
import { ForgeTabPanelModule } from './tab-panel/tab-panel.module';
import { ForgeTimelineModule } from './timeline/timeline.module';
import { ForgeTimelineBreakModule } from './timeline-break/timeline-break.module';
import { ForgeTimelineItemModule } from './timeline-item/timeline-item.module';

@NgModule({
  exports: [
    ForgeAccordionModule,
    ForgeAppBarModule,
    ForgeAppBarHelpButtonModule,
    ForgeAppBarMenuButtonModule,
    ForgeAppBarNotificationButtonModule,
    ForgeAppBarProfileButtonModule,
    ForgeAppBarSearchModule,
    ForgeAutocompleteModule,
    ForgeAvatarModule,
    ForgeBackdropModule,
    ForgeBadgeModule,
    ForgeBannerModule,
    ForgeBottomSheetModule,
    ForgeButtonModule,
    ForgeButtonAreaModule,
    ForgeButtonToggleModule,
    ForgeButtonToggleGroupModule,
    ForgeCalendarModule,
    ForgeCardModule,
    ForgeCheckboxModule,
    ForgeChipModule,
    ForgeChipFieldModule,
    ForgeChipSetModule,
    ForgeCircularProgressModule,
    ForgeColorPickerModule,
    ForgeDatePickerModule,
    ForgeDateRangePickerModule,
    ForgeDeprecatedButtonModule,
    ForgeDeprecatedIconButtonModule,
    ForgeDialogModule,
    ForgeDividerModule,
    ForgeDrawerModule,
    ForgeExpansionPanelModule,
    ForgeFloatingActionButtonModule,
    ForgeFieldModule,
    ForgeFilePickerModule,
    ForgeFocusIndicatorModule,
    ForgeIconModule,
    ForgeIconButtonModule,
    ForgeInlineMessageModule,
    ForgeKeyModule,
    ForgeKeyboardShortcutModule,
    ForgeLabelModule,
    ForgeLabelValueModule,
    ForgeLinearProgressModule,
    ForgeListModule,
    ForgeListItemModule,
    ForgeMenuModule,
    ForgeMeterGroupModule,
    ForgeMiniDrawerModule,
    ForgeModalDrawerModule,
    ForgeOpenIconModule,
    ForgeOptionModule,
    ForgeOptionGroupModule,
    ForgeOverlayModule,
    ForgePageStateModule,
    ForgePaginatorModule,
    ForgePopoverModule,
    ForgeProfileCardModule,
    ForgeRadioModule,
    ForgeRadioGroupModule,
    ForgeScaffoldModule,
    ForgeSecretModule,
    ForgeSelectModule,
    ForgeSelectDropdownModule,
    ForgeSkeletonModule,
    ForgeSkipLinkModule,
    ForgeSliderModule,
    ForgeSplitButtonModule,
    ForgeSplitViewModule,
    ForgeSplitViewPanelModule,
    ForgeStackModule,
    ForgeStateLayerModule,
    ForgeStepModule,
    ForgeStepperModule,
    ForgeSwitchModule,
    ForgeTabModule,
    ForgeTabBarModule,
    ForgeTabPanelModule,
    ForgeTableModule,
    ForgeTextFieldModule,
    ForgeTimelineBreakModule,
    ForgeTimelineItemModule,
    ForgeTimelineModule,
    ForgeTimePickerModule,
    ForgeToastModule,
    ForgeToolbarModule,
    ForgeTooltipModule,
    ForgeTreeModule,
    ForgeViewModule,
    ForgeViewSwitcherModule
  ]
})
export class ForgeModule {}
