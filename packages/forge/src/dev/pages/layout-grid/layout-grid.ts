import '$src/shared';
import '@tylertech/forge/badge';
import '@tylertech/forge/count-card';
import '@tylertech/forge/label-value';
import '@tylertech/forge/layout-grid';
import '@tylertech/forge/layout-grid/forge-layout-grid.scss';
import '@tylertech/forge/tabs';
import { IconRegistry } from '@tylertech/forge/icon';
import type { LayoutGridAlignment, LayoutGridComponent, LayoutGridFlow } from '@tylertech/forge/layout-grid';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ITabBarComponent } from '@tylertech/forge/tabs';
import {
  tylIconAssignment,
  tylIconAttachMoney,
  tylIconCheckCircle,
  tylIconDescription,
  tylIconEmail,
  tylIconNotifications,
  tylIconPerson,
  tylIconSchedule,
  tylIconSettings,
  tylIconTrendingUp,
  tylIconWarning
} from '@tylertech/tyler-icons';
import './layout-grid.scss';

IconRegistry.define([
  tylIconAssignment,
  tylIconAttachMoney,
  tylIconCheckCircle,
  tylIconDescription,
  tylIconEmail,
  tylIconNotifications,
  tylIconPerson,
  tylIconSchedule,
  tylIconSettings,
  tylIconTrendingUp,
  tylIconWarning
]);

const DEFAULT_ITEM_COUNT = 9;
const PLAYGROUND_TAB_NAME = 'playground';

const grid = document.querySelector('#main-demo') as LayoutGridComponent;
const tabBar = document.querySelector('#demo-tabs') as ITabBarComponent;
const columnsInput = document.querySelector('#columns-input') as HTMLInputElement;
const rowsInput = document.querySelector('#rows-input') as HTMLInputElement;
const minColumnWidthInput = document.querySelector('#min-column-width-input') as HTMLInputElement;
const gapInput = document.querySelector('#gap-input') as HTMLInputElement;
const itemCountInput = document.querySelector('#item-count-input') as HTMLInputElement;
const alignItemsSelect = document.querySelector('#align-items-select') as ISelectComponent;
const justifyItemsSelect = document.querySelector('#justify-items-select') as ISelectComponent;
const flowSelect = document.querySelector('#flow-select') as ISelectComponent;

const textFields = [columnsInput, rowsInput, minColumnWidthInput, gapInput, itemCountInput];
const selects = [alignItemsSelect, justifyItemsSelect, flowSelect];

const valueOrUndefined = (input: HTMLInputElement): string | undefined => input.value.trim() || undefined;

const setControlsDisabled = (disabled: boolean): void => {
  textFields.forEach(input => {
    input.disabled = disabled;
    input.closest('forge-text-field')?.toggleAttribute('disabled', disabled);
  });
  selects.forEach(select => {
    select.disabled = disabled;
  });
};

const renderItems = (): void => {
  const count = Number(itemCountInput.value) || DEFAULT_ITEM_COUNT;
  const items = Array.from({ length: count }, (_, index) => {
    const item = document.createElement('div');
    item.className = 'box';
    item.textContent = `${index + 1}`;
    return item;
  });
  grid.replaceChildren(...items);
};

tabBar.addEventListener('forge-tab-bar-change', ({ detail }) => {
  setControlsDisabled(detail.name !== PLAYGROUND_TAB_NAME);
});

columnsInput.addEventListener('input', () => {
  grid.columns = valueOrUndefined(columnsInput);
});

rowsInput.addEventListener('input', () => {
  grid.rows = valueOrUndefined(rowsInput);
});

minColumnWidthInput.addEventListener('input', () => {
  grid.minColumnWidth = valueOrUndefined(minColumnWidthInput);
});

gapInput.addEventListener('input', () => {
  grid.gap = valueOrUndefined(gapInput);
});

itemCountInput.addEventListener('input', renderItems);

alignItemsSelect.addEventListener('change', () => {
  grid.alignItems = alignItemsSelect.value as LayoutGridAlignment;
});

justifyItemsSelect.addEventListener('change', () => {
  grid.justifyItems = justifyItemsSelect.value as LayoutGridAlignment;
});

flowSelect.addEventListener('change', () => {
  grid.flow = flowSelect.value as LayoutGridFlow;
});

renderItems();
