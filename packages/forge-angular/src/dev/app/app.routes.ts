import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent) },
  {
    path: 'component',
    children: [
      { path: 'accordion', loadComponent: () => import('./views/components/accordion/accordion.component').then(m => m.AccordionComponent) },
      { path: 'autocomplete', loadComponent: () => import('./views/components/autocomplete/autocomplete.component').then(m => m.AutocompleteComponent) },
      { path: 'avatar', loadComponent: () => import('./views/components/avatar/avatar.component').then(m => m.AvatarComponent) },
      { path: 'banner', loadComponent: () => import('./views/components/banner/banner.component').then(m => m.BannerComponent) },
      { path: 'bottom-sheet', loadComponent: () => import('./views/components/bottom-sheet/bottom-sheet.component').then(m => m.BottomSheetComponent) },
      { path: 'button', loadComponent: () => import('./views/components/button/button.component').then(m => m.ButtonComponent) },
      { path: 'checkbox', loadComponent: () => import('./views/components/checkbox/checkbox.component').then(m => m.CheckboxComponent) },
      { path: 'chip-field', loadComponent: () => import('./views/components/chip-field/chip-field.component').then(m => m.ChipFieldComponent) },
      { path: 'chips', loadComponent: () => import('./views/components/chips/chips.component').then(m => m.ChipsComponent) },
      {
        path: 'circular-progress',
        loadComponent: () => import('./views/components/circular-progress/circular-progress.component').then(m => m.CircularProgressComponent)
      },
      { path: 'date-picker', loadComponent: () => import('./views/components/date-picker/date-picker.component').then(m => m.DatePickerComponent) },
      {
        path: 'date-range-picker',
        loadComponent: () => import('./views/components/date-range-picker/date-range-picker.component').then(m => m.DateRangePickerComponent)
      },
      { path: 'dialog', loadComponent: () => import('./views/components/dialog/dialog.component').then(m => m.DialogComponent) },
      {
        path: 'expansion-panel',
        loadComponent: () => import('./views/components/expansion-panel/expansion-panel.component').then(m => m.ExpansionPanelComponent)
      },
      {
        path: 'floating-action-button',
        loadComponent: () => import('./views/components/floating-action-button/floating-action-button.component').then(m => m.FloatingActionButtonComponent)
      },
      { path: 'icon', loadComponent: () => import('./views/components/icon/icon.component').then(m => m.IconComponent) },
      { path: 'icon-button', loadComponent: () => import('./views/components/icon-button/icon-button.component').then(m => m.IconButtonComponent) },
      { path: 'inline-message', loadComponent: () => import('./views/components/inline-message/inline-message.component').then(m => m.InlineMessageComponent) },
      {
        path: 'linear-progress',
        loadComponent: () => import('./views/components/linear-progress/linear-progress.component').then(m => m.LinearProgressComponent)
      },
      { path: 'list', loadComponent: () => import('./views/components/list/list.component').then(m => m.ListComponent) },
      { path: 'menu', loadComponent: () => import('./views/components/menu/menu.component').then(m => m.MenuComponent) },
      { path: 'page-state', loadComponent: () => import('./views/components/page-state/page-state.component').then(m => m.PageStateComponent) },
      { path: 'paginator', loadComponent: () => import('./views/components/paginator/paginator.component').then(m => m.PaginatorComponent) },
      { path: 'popover', loadComponent: () => import('./views/components/popover/popover.component').then(m => m.PopoverComponent) },
      { path: 'radio', loadComponent: () => import('./views/components/radio/radio.component').then(m => m.RadioComponent) },
      { path: 'scaffold', loadComponent: () => import('./views/components/scaffold/scaffold.component').then(m => m.ScaffoldComponent) },
      { path: 'select', loadComponent: () => import('./views/components/select/select.component').then(m => m.SelectComponent) },
      { path: 'slider', loadComponent: () => import('./views/components/slider/slider.component').then(m => m.SliderComponent) },
      { path: 'split-view', loadComponent: () => import('./views/components/split-view/split-view.component').then(m => m.SplitViewComponent) },
      { path: 'stepper', loadComponent: () => import('./views/components/stepper/stepper.component').then(m => m.StepperComponent) },
      { path: 'switch', loadComponent: () => import('./views/components/switch/switch.component').then(m => m.SwitchComponent) },
      { path: 'tab-bar', loadComponent: () => import('./views/components/tab-bar/tab-bar.component').then(m => m.TabBarComponent) },
      { path: 'table', loadComponent: () => import('./views/components/table/table.component').then(m => m.TableComponent) },
      { path: 'text-field', loadComponent: () => import('./views/components/text-field/text-field.component').then(m => m.TextFieldComponent) },
      { path: 'time-picker', loadComponent: () => import('./views/components/time-picker/time-picker.component').then(m => m.TimePickerComponent) },
      { path: 'toast', loadComponent: () => import('./views/components/toast/toast.component').then(m => m.ToastComponent) },
      { path: 'tooltip', loadComponent: () => import('./views/components/tooltip/tooltip.component').then(m => m.TooltipComponent) },
      { path: 'view-switcher', loadComponent: () => import('./views/components/view-switcher/view-switcher.component').then(m => m.ViewSwitcherComponent) }
    ]
  },
  {
    path: 'example',
    children: [
      {
        path: 'dialog-service',
        loadComponent: () => import('./views/examples/dialog-service-example/dialog-service-example.component').then(m => m.DialogServiceExampleComponent)
      },
      {
        path: 'expansion-panel',
        loadComponent: () => import('./views/examples/expansion-panel-examples/expansion-panel-examples.component').then(m => m.ExpansionPanelExamplesComponent)
      },
      {
        path: 'reactive-form',
        loadComponent: () => import('./views/examples/reactive-form-example/reactive-form-example.component').then(m => m.ReactiveFormExampleComponent)
      },
      { path: 'table', loadComponent: () => import('./views/examples/table-example/table-example.component').then(m => m.TableExampleComponent) },
      {
        path: 'toolbar-example',
        loadComponent: () => import('./views/examples/toolbar-example/toolbar-example.component').then(m => m.ToolbarExampleComponent)
      },
      { path: 'two-column-grid', loadComponent: () => import('./views/examples/two-column-grid/two-column-grid.component').then(m => m.TwoColumnGridComponent) }
    ]
  }
];
