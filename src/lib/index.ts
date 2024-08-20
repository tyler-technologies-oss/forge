/// <reference types="./typings" />

/**
 * @license
 * Copyright (c) Tyler Technologies, Inc.
 * License: Apache-2.0
 */

import { defineCustomElements } from '@tylertech/forge-core';
import { AccordionComponent } from './accordion';
import {
  AppBarComponent,
  AppBarHelpButtonComponent,
  AppBarMenuButtonComponent,
  AppBarNotificationButtonComponent,
  AppBarProfileButtonComponent,
  AppBarSearchComponent,
  ProfileCardComponent
} from './app-bar';
import { AutocompleteComponent } from './autocomplete';
import { AvatarComponent } from './avatar';
import { BackdropComponent } from './backdrop';
import { BadgeComponent } from './badge';
import { BannerComponent } from './banner';
import { BottomSheetComponent } from './bottom-sheet';
import { ButtonComponent } from './button';
import { ButtonAreaComponent } from './button-area';
import { ButtonToggleComponent, ButtonToggleGroupComponent } from './button-toggle';
import { CalendarComponent } from './calendar';
import { CardComponent } from './card';
import { CheckboxComponent } from './checkbox';
import { ChipFieldComponent } from './chip-field';
import { ChipComponent, ChipSetComponent } from './chips';
import { CircularProgressComponent } from './circular-progress';
import { ColorPickerComponent } from './color-picker';
import { DatePickerComponent } from './date-picker';
import { DateRangePickerComponent } from './date-range-picker';
import { DialogComponent } from './dialog';
import { DividerComponent } from './divider';
import { DrawerComponent, MiniDrawerComponent, ModalDrawerComponent } from './drawer';
import { ExpansionPanelComponent } from './expansion-panel';
import { FieldComponent } from './field';
import { FilePickerComponent } from './file-picker';
import { FloatingActionButtonComponent } from './floating-action-button';
import { FocusIndicatorComponent } from './focus-indicator';
import { IconComponent } from './icon';
import { IconButtonComponent } from './icon-button';
import { InlineMessageComponent } from './inline-message';
import { KeyboardShortcutComponent } from './keyboard-shortcut';
import { LabelComponent } from './label';
import { LabelValueComponent } from './label-value';
import { LinearProgressComponent } from './linear-progress';
import { ListComponent } from './list';
import { ListItemComponent } from './list/list-item';
import { MenuComponent } from './menu';
import { OpenIconComponent } from './open-icon';
import { OverlayComponent } from './overlay';
import { PageStateComponent } from './page-state';
import { PaginatorComponent } from './paginator';
import { PopoverComponent } from './popover';
import { RadioComponent, RadioGroupComponent } from './radio';
import { ScaffoldComponent } from './scaffold';
import { OptionComponent, OptionGroupComponent, SelectComponent } from './select';
import { SelectDropdownComponent } from './select/select-dropdown';
import { SkeletonComponent } from './skeleton';
import { SkipLinkComponent } from './skip-link';
import { SliderComponent } from './slider';
import { SplitViewComponent } from './split-view';
import { StackComponent } from './stack';
import { StateLayerComponent } from './state-layer';
import { StepComponent, StepperComponent } from './stepper';
import { SwitchComponent } from './switch';
import { TableComponent } from './table';
import { TabBarComponent, TabComponent } from './tabs';
import { TextFieldComponent } from './text-field';
import { TimePickerComponent } from './time-picker';
import { ToastComponent } from './toast';
import { ToolbarComponent } from './toolbar';
import { TooltipComponent } from './tooltip';
import { ViewComponent, ViewSwitcherComponent } from './view-switcher';

/**
 * Deprecated imports
 */
import { DeprecatedButtonComponent } from './deprecated/button';
import { DeprecatedIconButtonComponent } from './deprecated/icon-button';

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
export * from './icon';
export * from './icon-button';
export * from './inline-message';
export * from './keyboard-shortcut';
export * from './label';
export * from './label-value';
export * from './linear-progress';
export * from './list';
export * from './menu';
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
export * from './utils';
export * from './view-switcher';

/**
 * Deprecated exports
 */
export * from './deprecated/button';
export * from './deprecated/icon-button';

const CUSTOM_ELEMENTS = [
  AccordionComponent,
  AppBarComponent,
  AppBarHelpButtonComponent,
  AppBarMenuButtonComponent,
  AppBarNotificationButtonComponent,
  AppBarProfileButtonComponent,
  AppBarSearchComponent,
  AutocompleteComponent,
  AvatarComponent,
  BackdropComponent,
  BadgeComponent,
  BannerComponent,
  BottomSheetComponent,
  ButtonAreaComponent,
  ButtonComponent,
  ButtonToggleComponent,
  ButtonToggleGroupComponent,
  CalendarComponent,
  CardComponent,
  CheckboxComponent,
  ChipComponent,
  ChipFieldComponent,
  ChipSetComponent,
  CircularProgressComponent,
  ColorPickerComponent,
  DatePickerComponent,
  DateRangePickerComponent,
  DialogComponent,
  DividerComponent,
  DrawerComponent,
  ExpansionPanelComponent,
  FieldComponent,
  FilePickerComponent,
  FloatingActionButtonComponent,
  FocusIndicatorComponent,
  IconButtonComponent,
  IconComponent,
  InlineMessageComponent,
  KeyboardShortcutComponent,
  LabelComponent,
  LabelValueComponent,
  LinearProgressComponent,
  ListComponent,
  ListItemComponent,
  MenuComponent,
  MiniDrawerComponent,
  ModalDrawerComponent,
  OpenIconComponent,
  OptionComponent,
  OptionGroupComponent,
  OverlayComponent,
  PageStateComponent,
  PaginatorComponent,
  PopoverComponent,
  ProfileCardComponent,
  RadioComponent,
  RadioGroupComponent,
  ScaffoldComponent,
  SelectComponent,
  SelectDropdownComponent,
  SkeletonComponent,
  SkipLinkComponent,
  SliderComponent,
  SplitViewComponent,
  StackComponent,
  StateLayerComponent,
  StepComponent,
  StepperComponent,
  SwitchComponent,
  TabBarComponent,
  TabComponent,
  TableComponent,
  TextFieldComponent,
  TimePickerComponent,
  ToastComponent,
  ToolbarComponent,
  TooltipComponent,
  ViewComponent,
  ViewSwitcherComponent
];

/**
 * Registers all components in the library with the browser.
 */
export function defineComponents(): void {
  defineCustomElements(CUSTOM_ELEMENTS);
}

/**
 * Deprecated component registration
 */

const DEPRECATED_CUSTOM_ELEMENTS = [DeprecatedButtonComponent, DeprecatedIconButtonComponent];

export function defineDeprecatedComponents(): void {
  defineCustomElements(DEPRECATED_CUSTOM_ELEMENTS);
}
