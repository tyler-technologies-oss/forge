/// <reference types="./typings" />

/**
 * @license
 * Copyright (c) Tyler Technologies, Inc.
 * License: Apache-2.0
 */

import { defineAccordionComponent } from './accordion';
import {
  defineAppBarComponent,
  defineAppBarHelpButtonComponent,
  defineAppBarMenuButtonComponent,
  defineAppBarNotificationButtonComponent,
  defineAppBarProfileButtonComponent,
  defineAppBarSearchComponent,
  defineProfileCardComponent
} from './app-bar';
import { defineAutocompleteComponent } from './autocomplete';
import { defineAvatarComponent } from './avatar';
import { defineBackdropComponent } from './backdrop';
import { defineBadgeComponent } from './badge';
import { defineBannerComponent } from './banner';
import { defineBottomSheetComponent } from './bottom-sheet';
import { defineButtonComponent } from './button';
import { defineButtonAreaComponent } from './button-area';
import { defineButtonToggleComponent, defineButtonToggleGroupComponent } from './button-toggle';
import { defineCalendarComponent } from './calendar';
import { defineCardComponent } from './card';
import { defineCheckboxComponent } from './checkbox';
import { defineChipFieldComponent } from './chip-field';
import { defineChipComponent, defineChipSetComponent } from './chips';
import { defineCircularProgressComponent } from './circular-progress';
import { defineColorPickerComponent } from './color-picker';
import { defineDatePickerComponent } from './date-picker';
import { defineDateRangePickerComponent } from './date-range-picker';
import { defineDialogComponent } from './dialog';
import { defineDividerComponent } from './divider';
import { defineDrawerComponent, defineMiniDrawerComponent, defineModalDrawerComponent } from './drawer';
import { defineExpansionPanelComponent } from './expansion-panel';
import { defineFieldComponent } from './field';
import { defineFilePickerComponent } from './file-picker';
import { defineFloatingActionButtonComponent } from './floating-action-button';
import { defineFocusIndicatorComponent } from './focus-indicator';
import { defineFocusGroupComponent } from './focus-group';
import { defineIconComponent } from './icon';
import { defineIconButtonComponent } from './icon-button';
import { defineInlineMessageComponent } from './inline-message';
import { defineKeyComponent, defineKeyItemComponent } from './key';
import { defineKeyboardShortcutComponent } from './keyboard-shortcut';
import { defineLabelComponent } from './label';
import { defineLabelValueComponent } from './label-value';
import { defineLinearProgressComponent } from './linear-progress';
import { defineListComponent } from './list';
import { defineListItemComponent } from './list/list-item';
import { defineMenuComponent } from './menu';
import { defineMeterComponent, defineMeterGroupComponent } from './meter';
import { defineOpenIconComponent } from './open-icon';
import { defineOverlayComponent } from './overlay';
import { definePageStateComponent } from './page-state';
import { definePaginatorComponent } from './paginator';
import { definePopoverComponent } from './popover';
import { defineRadioComponent, defineRadioGroupComponent } from './radio';
import { defineScaffoldComponent } from './scaffold';
import { defineOptionComponent, defineOptionGroupComponent, defineSelectComponent } from './select';
import { defineSelectDropdownComponent } from './select/select-dropdown';
import { defineSkeletonComponent } from './skeleton';
import { defineSkipLinkComponent } from './skip-link';
import { defineSliderComponent } from './slider';
import { defineSplitViewComponent } from './split-view';
import { defineStackComponent } from './stack';
import { defineStateLayerComponent } from './state-layer';
import { defineStepComponent, defineStepperComponent } from './stepper';
import { defineSwitchComponent } from './switch';
import { defineTableComponent } from './table';
import { defineTabBarComponent, defineTabComponent } from './tabs';
import { defineTextFieldComponent } from './text-field';
import { defineTimePickerComponent } from './time-picker';
import { defineToastComponent } from './toast';
import { defineToolbarComponent } from './toolbar';
import { defineTooltipComponent } from './tooltip';
import { defineTreeComponent, defineTreeItemComponent } from './tree';
import { defineViewComponent, defineViewSwitcherComponent } from './view-switcher';

/**
 * Deprecated imports
 */
import { defineDeprecatedButtonComponent } from './deprecated/button';
import { defineDeprecatedIconButtonComponent } from './deprecated/icon-button';

export * from './accordion';
export * from './app-bar';
export * from './autocomplete';
export * from './avatar';
export * from './backdrop';
export * from './badge';
export * from './banner';
export * from './bottom-sheet';
export * from './button';
export * from './button-area';
export * from './button-toggle';
export * from './calendar';
export * from './card';
export * from './checkbox';
export * from './chip-field';
export * from './chips';
export * from './circular-progress';
export * from './color-picker';
export * from './constants';
export * from './core';
export * from './date-picker';
export * from './date-range-picker';
export * from './dialog';
export * from './divider';
export * from './drawer';
export * from './expansion-panel';
export * from './field';
export * from './file-picker';
export * from './floating-action-button';
export * from './focus-indicator';
export * from './focus-group';
export * from './icon';
export * from './icon-button';
export * from './inline-message';
export * from './key';
export * from './keyboard-shortcut';
export * from './label';
export * from './label-value';
export * from './linear-progress';
export * from './list';
export * from './menu';
export * from './meter';
export * from './open-icon';
export * from './overlay';
export * from './page-state';
export * from './paginator';
export * from './popover';
export * from './radio';
export * from './scaffold';
export * from './select';
export * from './skeleton';
export * from './skip-link';
export * from './slider';
export * from './split-button';
export * from './split-view';
export * from './stack';
export * from './state-layer';
export * from './stepper';
export * from './switch';
export * from './table';
export * from './tabs';
export * from './text-field';
export * from './time-picker';
export * from './toast';
export * from './toolbar';
export * from './tooltip';
export * from './tree';
export * from './utils';
export * from './view-switcher';

/**
 * Deprecated exports
 */
export * from './deprecated/button';
export * from './deprecated/icon-button';

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
  defineFocusGroupComponent();
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
