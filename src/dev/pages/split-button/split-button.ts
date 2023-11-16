import '$src/shared';
import '@tylertech/forge/split-button';
import { IconRegistry } from '@tylertech/forge/icon';
import { ButtonTheme } from '@tylertech/forge/button';
import type { ISplitButtonComponent, SplitButtonVariant } from '@tylertech/forge/split-button';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import type { IMenuComponent } from '@tylertech/forge/menu';
import { tylIconArrowDropDown, tylIconScheduleSend, tylIconDeleteOutline, tylIconBookmarkBorder } from '@tylertech/tyler-icons/standard';
import './split-button.scss';

IconRegistry.define([tylIconArrowDropDown, tylIconScheduleSend, tylIconDeleteOutline, tylIconBookmarkBorder]);

const splitMenu = document.querySelector('#split-menu') as IMenuComponent;
splitMenu.options = [
  { label: 'Schedule send', value: 'schedule', leadingIcon: 'schedule_send', leadingIconType: 'component' },
  { label: 'Delete', value: 'delete', leadingIcon: 'delete_outline', leadingIconType: 'component' },
  { label: 'Save draft', value: 'save', leadingIcon: 'bookmark_border', leadingIconType: 'component' }
];

const variantSelect = document.querySelector('#opt-variant') as ISelectComponent;
variantSelect.addEventListener('change', ({ detail: variant }: CustomEvent<SplitButtonVariant>) => {
  getSplitButtons().forEach(splitButton => splitButton.variant = variant);
});

const themeSelect = document.querySelector('#opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail: theme }: CustomEvent<ButtonTheme>) => {
  getSplitButtons().forEach(splitButton => splitButton.theme = theme);
});

const disabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  getSplitButtons().forEach(splitButton => splitButton.disabled = selected);
});

const denseToggle = document.querySelector('#opt-dense') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  getSplitButtons().forEach(splitButton => splitButton.dense = selected);
});

const pillToggle = document.querySelector('#opt-pill') as ISwitchComponent;
pillToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  getSplitButtons().forEach(splitButton => splitButton.pill = selected);
});

function getSplitButtons(): ISplitButtonComponent[] {
  return Array.from(document.querySelectorAll<ISplitButtonComponent>('forge-split-button'));
}
