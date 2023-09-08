/// <reference types="./typings" />

/**
 * @license
 * Copyright (c) Tyler Technologies, Inc.
 * License: Apache-2.0
 */

import { defineCustomElements } from '@tylertech/forge-core';
import { AccordionComponent } from './accordion';
import { AutocompleteComponent } from './autocomplete';
import { AvatarComponent } from './avatar';
import { BackdropComponent } from './backdrop';
import { BadgeComponent } from './badge';
import { BannerComponent } from './banner';
import { BottomSheetComponent } from './bottom-sheet';
import { BusyIndicatorComponent } from './busy-indicator';
import { ButtonComponent } from './button';
import { ButtonToggleComponent, ButtonToggleGroupComponent } from './button-toggle';
import { CalendarComponent } from './calendar';
import { CardComponent } from './card';
import { CheckboxComponent } from './checkbox';
import { ChipComponent, ChipSetComponent } from './chips';
import { ChipFieldComponent } from './chip-field';
import { CircularProgressComponent } from './circular-progress';
import { ColorPickerComponent } from './color-picker';
import { DateRangePickerComponent } from './date-range-picker';
import { DatePickerComponent } from './date-picker';
import { DialogComponent } from './dialog';
import { DividerComponent } from './divider';
import { DrawerComponent, MiniDrawerComponent, ModalDrawerComponent } from './drawer';
import { ExpansionPanelComponent } from './expansion-panel';
import { FilePickerComponent } from './file-picker';
import { FloatingActionButton } from './floating-action-button';
import { FocusIndicatorComponent } from './focus-indicator';
import { IconButtonComponent } from './icon-button';
import { InlineMessageComponent } from './inline-message';
import { KeyboardShortcutComponent } from './keyboard-shortcut';
import { LabelValueComponent } from './label-value';
import { LinearProgressComponent } from './linear-progress';
import { ListComponent } from './list';
import { ListItemComponent } from './list/list-item';
import { MenuComponent } from './menu';
import {
  AppBarComponent,
  AppBarHelpButtonComponent,
  AppBarMenuButtonComponent,
  AppBarNotificationButtonComponent,
  AppBarProfileButtonComponent,
  AppBarSearchComponent,
  ProfileCardComponent
} from './app-bar';
import { OpenIconComponent } from './open-icon';
import { OverlayComponent } from './overlay';
import { PageStateComponent } from './page-state';
import { PaginatorComponent } from './paginator';
import { PopupComponent } from './popup';
import { ProductIconComponent } from './product-icon';
import { QuantityFieldComponent } from './quantity-field';
import { RadioComponent } from './radio';
import { RippleComponent } from './ripple';
import { ScaffoldComponent } from './scaffold';
import { OptionComponent, OptionGroupComponent, SelectComponent } from './select';
import { SkeletonComponent } from './skeleton';
import { SliderComponent } from './slider';
import { SplitViewComponent } from './split-view';
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
import { IconComponent } from './icon';
import { SelectDropdownComponent } from './select/select-dropdown';
import { StackComponent } from './stack';
import { ListDropdownComponent } from './exp/list-dropdown';
import { OptionComponentExp, SelectComponentExp } from './exp';

export * from './accordion';
export * from './app-bar';
export * from './autocomplete';
export * from './avatar';
export * from './backdrop';
export * from './badge';
export * from './banner';
export * from './bottom-sheet';
export * from './busy-indicator';
export * from './button';
export * from './button-toggle';
export * from './calendar';
export * from './card';
export * from './checkbox';
export * from './chips';
export * from './chip-field';
export * from './circular-progress';
export * from './color-picker';
export * from './constants';
export * from './core';
export * from './date-range-picker';
export * from './date-picker';
export * from './dialog';
export * from './divider';
export * from './drawer';
export * from './expansion-panel';
export * from './file-picker';
export * from './floating-action-button';
export * from './floating-label';
export * from './focus-indicator';
export * from './icon';
export * from './icon-button';
export * from './inline-message';
export * from './keyboard-shortcut';
export * from './label-value';
export * from './linear-progress';
export * from './list';
export * from './menu';
export * from './open-icon';
export * from './overlay';
export * from './page-state';
export * from './paginator';
export * from './popover';
export * from './popup';
export * from './product-icon';
export * from './quantity-field';
export * from './radio';
export * from './ripple';
export * from './scaffold';
export * from './select';
export * from './skeleton';
export * from './slider';
export * from './split-view';
export * from './state-layer';
export * from './stepper';
export * from './switch';
export * from './table';
export * from './tabs';
export * from './text-field';
export * from './theme';
export * from './time-picker';
export * from './toast';
export * from './toolbar';
export * from './tooltip';
export * from './utils';
export * from './view-switcher';
export * from './stack';
export * from './exp';

const CUSTOM_ELEMENTS = [
  AccordionComponent,
  AvatarComponent,
  BackdropComponent,
  BadgeComponent,
  BannerComponent,
  BottomSheetComponent,
  BusyIndicatorComponent,
  ButtonComponent,
  ButtonToggleComponent,
  ButtonToggleGroupComponent,
  CalendarComponent,
  CardComponent,
  CheckboxComponent,
  ChipComponent,
  ChipSetComponent,
  ChipFieldComponent,
  CircularProgressComponent,
  ColorPickerComponent,
  DatePickerComponent,
  DateRangePickerComponent,
  DialogComponent,
  DividerComponent,
  DrawerComponent,
  MiniDrawerComponent,
  ModalDrawerComponent,
  ExpansionPanelComponent,
  FilePickerComponent,
  FloatingActionButton,
  FocusIndicatorComponent,
  ProductIconComponent,
  IconComponent,
  IconButtonComponent,
  InlineMessageComponent,
  KeyboardShortcutComponent,
  LabelValueComponent,
  LinearProgressComponent,
  ListComponent,
  ListItemComponent,
  MenuComponent,
  AppBarComponent,
  AppBarSearchComponent,
  AppBarMenuButtonComponent,
  AppBarNotificationButtonComponent,
  AppBarHelpButtonComponent,
  AppBarProfileButtonComponent,
  ProfileCardComponent,
  OpenIconComponent,
  OptionComponent,
  OptionGroupComponent,
  OverlayComponent,
  PageStateComponent,
  PaginatorComponent,
  PopupComponent,
  QuantityFieldComponent,
  RadioComponent,
  RippleComponent,
  ScaffoldComponent,
  SelectComponent,
  SelectDropdownComponent,
  SkeletonComponent,
  SliderComponent,
  SplitViewComponent,
  StackComponent,
  StateLayerComponent,
  StepperComponent,
  StepComponent,
  SwitchComponent,
  TabBarComponent,
  TabComponent,
  TableComponent,
  TextFieldComponent,
  TimePickerComponent,
  ToastComponent,
  ToolbarComponent,
  TooltipComponent,
  ViewSwitcherComponent,
  ViewComponent,
  AutocompleteComponent,
  SelectComponentExp,
  ListDropdownComponent,
  OptionComponentExp
];

/**
 * Registers all components in the library with the browser.
 */
export function defineComponents(): void {
  defineCustomElements(CUSTOM_ELEMENTS);
}
