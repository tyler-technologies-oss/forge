/// <reference path="./typings.d.ts" />

/**
 * @license
 * Copyright (c) Tyler Technologies, Inc.
 * License: Apache-2.0
 */

import { defineAccordionComponent } from './accordion/index.js';
import {
  defineAppBarComponent,
  defineAppBarHelpButtonComponent,
  defineAppBarMenuButtonComponent,
  defineAppBarNotificationButtonComponent,
  defineAppBarProfileButtonComponent,
  defineAppBarSearchComponent,
  defineProfileCardComponent
} from './app-bar/index.js';
import { defineAutocompleteComponent } from './autocomplete/index.js';
import { defineAvatarComponent } from './avatar/index.js';
import { defineBackdropComponent } from './backdrop/index.js';
import { defineBadgeComponent } from './badge/index.js';
import { defineBannerComponent } from './banner/index.js';
import { defineBottomSheetComponent } from './bottom-sheet/index.js';
import { defineButtonComponent } from './button/index.js';
import { defineButtonAreaComponent } from './button-area/index.js';
import { defineButtonToggleComponent, defineButtonToggleGroupComponent } from './button-toggle/index.js';
import { defineCalendarComponent } from './calendar/index.js';
import { defineCardComponent } from './card/index.js';
import { defineCheckboxComponent } from './checkbox/index.js';
import { defineChipFieldComponent } from './chip-field/index.js';
import { defineChipComponent, defineChipSetComponent } from './chips/index.js';
import { defineCircularProgressComponent } from './circular-progress/index.js';
import { defineColorPickerComponent } from './color-picker/index.js';
import { defineDatePickerComponent } from './date-picker/index.js';
import { defineDateRangePickerComponent } from './date-range-picker/index.js';
import { defineDialogComponent } from './dialog/index.js';
import { defineDividerComponent } from './divider/index.js';
import { defineDrawerComponent, defineMiniDrawerComponent, defineModalDrawerComponent } from './drawer/index.js';
import { defineExpansionPanelComponent } from './expansion-panel/index.js';
import { defineFieldComponent } from './field/index.js';
import { defineFilePickerComponent } from './file-picker/index.js';
import { defineFloatingActionButtonComponent } from './floating-action-button/index.js';
import { defineFocusIndicatorComponent } from './focus-indicator/index.js';
import { defineIconComponent } from './icon/index.js';
import { defineIconButtonComponent } from './icon-button/index.js';
import { defineInlineMessageComponent } from './inline-message/index.js';
import { defineKeyComponent, defineKeyItemComponent } from './key/index.js';
import { defineKeyboardShortcutComponent } from './keyboard-shortcut/index.js';
import { defineLabelComponent } from './label/index.js';
import { defineLabelValueComponent } from './label-value/index.js';
import { defineLinearProgressComponent } from './linear-progress/index.js';
import { defineListComponent } from './list/index.js';
import { defineListItemComponent } from './list/list-item/index.js';
import { defineMenuComponent } from './menu/index.js';
import { defineMeterComponent, defineMeterGroupComponent } from './meter/index.js';
import { defineOpenIconComponent } from './open-icon/index.js';
import { defineOverlayComponent } from './overlay/index.js';
import { definePageStateComponent } from './page-state/index.js';
import { definePaginatorComponent } from './paginator/index.js';
import { definePopoverComponent } from './popover/index.js';
import { defineRadioComponent, defineRadioGroupComponent } from './radio/index.js';
import { defineScaffoldComponent } from './scaffold/index.js';
import { defineOptionComponent, defineOptionGroupComponent, defineSelectComponent } from './select/index.js';
import { defineSelectDropdownComponent } from './select/select-dropdown/index.js';
import { defineSkeletonComponent } from './skeleton/index.js';
import { defineSkipLinkComponent } from './skip-link/index.js';
import { defineSliderComponent } from './slider/index.js';
import { defineSplitViewComponent } from './split-view/index.js';
import { defineStackComponent } from './stack/index.js';
import { defineStateLayerComponent } from './state-layer/index.js';
import { defineStepComponent, defineStepperComponent } from './stepper/index.js';
import { defineSwitchComponent } from './switch/index.js';
import { defineTableComponent } from './table/index.js';
import { defineTabBarComponent, defineTabComponent } from './tabs/index.js';
import { defineTextFieldComponent } from './text-field/index.js';
import { defineTimePickerComponent } from './time-picker/index.js';
import { defineToastComponent } from './toast/index.js';
import { defineToolbarComponent } from './toolbar/index.js';
import { defineTooltipComponent } from './tooltip/index.js';
import { defineTreeComponent, defineTreeItemComponent } from './tree/index.js';
import { defineViewComponent, defineViewSwitcherComponent } from './view-switcher/index.js';

/**
 * Deprecated imports
 */
import { defineDeprecatedButtonComponent } from './deprecated/button/index.js';
import { defineDeprecatedIconButtonComponent } from './deprecated/icon-button/index.js';

export * from './accordion/index.js';
export * from './app-bar/index.js';
export * from './autocomplete/index.js';
export * from './avatar/index.js';
export * from './backdrop/index.js';
export * from './badge/index.js';
export * from './banner/index.js';
export * from './bottom-sheet/index.js';
export * from './button/index.js';
export * from './button-area/index.js';
export * from './button-toggle/index.js';
export * from './calendar/index.js';
export * from './card/index.js';
export * from './checkbox/index.js';
export * from './chip-field/index.js';
export * from './chips/index.js';
export * from './circular-progress/index.js';
export * from './color-picker/index.js';
export * from './constants.js';
export * from './core/index.js';
export * from './date-picker/index.js';
export * from './date-range-picker/index.js';
export * from './dialog/index.js';
export * from './divider/index.js';
export * from './drawer/index.js';
export * from './expansion-panel/index.js';
export * from './field/index.js';
export * from './file-picker/index.js';
export * from './floating-action-button/index.js';
export * from './focus-indicator/index.js';
export * from './icon/index.js';
export * from './icon-button/index.js';
export * from './inline-message/index.js';
export * from './key/index.js';
export * from './keyboard-shortcut/index.js';
export * from './label/index.js';
export * from './label-value/index.js';
export * from './linear-progress/index.js';
export * from './list/index.js';
export * from './menu/index.js';
export * from './meter/index.js';
export * from './open-icon/index.js';
export * from './overlay/index.js';
export * from './page-state/index.js';
export * from './paginator/index.js';
export * from './popover/index.js';
export * from './radio/index.js';
export * from './scaffold/index.js';
export * from './select/index.js';
export * from './skeleton/index.js';
export * from './skip-link/index.js';
export * from './slider/index.js';
export * from './split-button/index.js';
export * from './split-view/index.js';
export * from './stack/index.js';
export * from './state-layer/index.js';
export * from './stepper/index.js';
export * from './switch/index.js';
export * from './table/index.js';
export * from './tabs/index.js';
export * from './text-field/index.js';
export * from './time-picker/index.js';
export * from './toast/index.js';
export * from './toolbar/index.js';
export * from './tooltip/index.js';
export * from './tree/index.js';
export * from './utils/index.js';
export * from './view-switcher/index.js';

/**
 * Deprecated exports
 */
export * from './deprecated/button/index.js';
export * from './deprecated/icon-button/index.js';

/**
 * Registers all components in the library with the browser.
 */
export function defineComponents(): void {
  defineAccordionComponent();
  defineAppBarComponent();
  defineAppBarHelpButtonComponent();
  defineAppBarMenuButtonComponent();
  defineAppBarNotificationButtonComponent();
  defineAppBarProfileButtonComponent();
  defineAppBarSearchComponent();
  defineAutocompleteComponent();
  defineAvatarComponent();
  defineBackdropComponent();
  defineBadgeComponent();
  defineBannerComponent();
  defineBottomSheetComponent();
  defineButtonAreaComponent();
  defineButtonComponent();
  defineButtonToggleComponent();
  defineButtonToggleGroupComponent();
  defineCalendarComponent();
  defineCardComponent();
  defineCheckboxComponent();
  defineChipComponent();
  defineChipFieldComponent();
  defineChipSetComponent();
  defineCircularProgressComponent();
  defineColorPickerComponent();
  defineDatePickerComponent();
  defineDateRangePickerComponent();
  defineDialogComponent();
  defineDividerComponent();
  defineDrawerComponent();
  defineExpansionPanelComponent();
  defineFieldComponent();
  defineFilePickerComponent();
  defineFloatingActionButtonComponent();
  defineFocusIndicatorComponent();
  defineIconButtonComponent();
  defineIconComponent();
  defineInlineMessageComponent();
  defineKeyComponent();
  defineKeyboardShortcutComponent();
  defineKeyItemComponent();
  defineLabelComponent();
  defineLabelValueComponent();
  defineLinearProgressComponent();
  defineListComponent();
  defineListItemComponent();
  defineMenuComponent();
  defineMeterComponent();
  defineMeterGroupComponent();
  defineMiniDrawerComponent();
  defineModalDrawerComponent();
  defineOpenIconComponent();
  defineOptionComponent();
  defineOptionGroupComponent();
  defineOverlayComponent();
  definePageStateComponent();
  definePaginatorComponent();
  definePopoverComponent();
  defineProfileCardComponent();
  defineRadioComponent();
  defineRadioGroupComponent();
  defineScaffoldComponent();
  defineSelectComponent();
  defineSelectDropdownComponent();
  defineSkeletonComponent();
  defineSkipLinkComponent();
  defineSliderComponent();
  defineSplitViewComponent();
  defineStackComponent();
  defineStateLayerComponent();
  defineStepComponent();
  defineStepperComponent();
  defineSwitchComponent();
  defineTabBarComponent();
  defineTabComponent();
  defineTableComponent();
  defineTextFieldComponent();
  defineTimePickerComponent();
  defineToastComponent();
  defineToolbarComponent();
  defineTooltipComponent();
  defineTreeComponent();
  defineTreeItemComponent();
  defineViewComponent();
  defineViewSwitcherComponent();
}

/**
 * Deprecated component registration
 */

export function defineDeprecatedComponents(): void {
  defineDeprecatedButtonComponent();
  defineDeprecatedIconButtonComponent();
}
