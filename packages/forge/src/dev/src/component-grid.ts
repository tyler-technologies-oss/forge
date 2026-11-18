import { defineComponents, ToastComponent } from '@tylertech/forge/index';
import type {
  IAutocompleteComponent,
  IBottomSheetComponent,
  IChipFieldComponent,
  IColumnConfiguration,
  IDialogComponent,
  IMenuComponent,
  IOverlayComponent,
  ITabBarChangeEventData,
  ITableComponent,
  IViewSwitcherComponent
} from '@tylertech/forge/index';
import { IconRegistry } from '@tylertech/forge/icon';
import {
  tylIconAdd,
  tylIconArrowDropDown,
  tylIconChevronRight,
  tylIconDelete,
  tylIconEdit,
  tylIconFavorite,
  tylIconGridView,
  tylIconHelpOutline,
  tylIconInfoOutline,
  tylIconMoreVert,
  tylIconPerson,
  tylIconSearch,
  tylIconSettings,
  tylIconStar,
  tylIconViewList
} from '@tylertech/tyler-icons';
import './component-grid.scss';

defineComponents();

IconRegistry.define([
  tylIconAdd,
  tylIconArrowDropDown,
  tylIconChevronRight,
  tylIconDelete,
  tylIconEdit,
  tylIconFavorite,
  tylIconGridView,
  tylIconHelpOutline,
  tylIconInfoOutline,
  tylIconMoreVert,
  tylIconPerson,
  tylIconSearch,
  tylIconSettings,
  tylIconStar,
  tylIconViewList
]);

const STATES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'];
const ACTION_OPTIONS = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Archive', value: 'archive' }
];

initAutocomplete();
initBottomSheet();
initChipField();
initDialog();
initKeyboardShortcut();
initMenus();
initOverlay();
initTable();
initToast();
initViewSwitcher();

function initAutocomplete(): void {
  const autocomplete = document.getElementById('demo-autocomplete') as IAutocompleteComponent;
  autocomplete.filter = (filterText: string) =>
    STATES.filter(state => state.toLowerCase().includes(filterText.toLowerCase())).map(state => ({ label: state, value: state }));
}

function initBottomSheet(): void {
  const bottomSheet = document.getElementById('demo-bottom-sheet') as IBottomSheetComponent;
  document.getElementById('demo-bottom-sheet-button')?.addEventListener('click', () => (bottomSheet.open = true));
  document.getElementById('demo-bottom-sheet-close')?.addEventListener('click', () => (bottomSheet.open = false));
}

function initChipField(): void {
  const chipField = document.getElementById('demo-chip-field') as IChipFieldComponent;
  const input = chipField.querySelector('input') as HTMLInputElement;
  chipField.addEventListener('forge-chip-field-member-added', ({ detail }: CustomEvent<string>) => {
    const chip = document.createElement('forge-chip');
    chip.slot = 'member';
    chip.type = 'input';
    chip.value = detail;
    chip.textContent = detail;
    chipField.insertBefore(chip, input);
    input.value = '';
  });
  chipField.addEventListener('forge-chip-delete', ({ target }) => (target as HTMLElement).remove());
}

function initDialog(): void {
  const dialog = document.getElementById('demo-dialog') as IDialogComponent;
  dialog.querySelectorAll('.demo-dialog-close').forEach(button => button.addEventListener('click', () => (dialog.open = false)));
}

function initKeyboardShortcut(): void {
  const shortcut = document.getElementById('demo-shortcut') as HTMLElement;
  const countElement = document.getElementById('demo-shortcut-count') as HTMLElement;
  let count = 0;
  shortcut.addEventListener('forge-keyboard-shortcut-activate', () => {
    count++;
    countElement.textContent = `Pressed ${count} ${count === 1 ? 'time' : 'times'}`;
  });
}

function initMenus(): void {
  document.querySelectorAll<IMenuComponent>('#demo-menu, #demo-split-menu').forEach(menu => (menu.options = ACTION_OPTIONS));
}

function initOverlay(): void {
  const overlay = document.getElementById('demo-overlay') as IOverlayComponent;
  document.getElementById('demo-overlay-anchor')?.addEventListener('click', () => (overlay.open = !overlay.open));
}

function initTable(): void {
  const table = document.getElementById('demo-table') as ITableComponent;
  const columns: IColumnConfiguration[] = [
    { header: 'Name', property: 'name' },
    { header: 'Status', property: 'status' }
  ];
  table.columnConfigurations = columns;
  table.data = [
    { name: 'Worker 1', status: 'Active' },
    { name: 'Worker 2', status: 'Paused' },
    { name: 'Worker 3', status: 'Active' }
  ];
}

function initToast(): void {
  document.getElementById('demo-toast-button')?.addEventListener('click', () => ToastComponent.present({ message: 'Record saved' }));
}

function initViewSwitcher(): void {
  const viewSwitcher = document.getElementById('demo-view-switcher') as IViewSwitcherComponent;
  document
    .getElementById('demo-view-tabs')
    ?.addEventListener('forge-tab-bar-change', ({ detail }: CustomEvent<ITabBarChangeEventData>) => (viewSwitcher.index = detail.index));
}
