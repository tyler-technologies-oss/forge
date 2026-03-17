import '$src/shared';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/toolbar/forge-toolbar.scss';
import './toolbar.scss';
import { toggleAttribute } from '@tylertech/forge-core';
import { IToolbarComponent } from '@tylertech/forge/toolbar';
import { ISwitchComponent } from '@tylertech/forge/switch';

const toolbar = document.querySelector('#toolbar') as IToolbarComponent;

const invertedToggle = document.querySelector('#toolbar-opt-inverted') as ISwitchComponent;
invertedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (toolbar.inverted = selected));

const showBorderToggle = document.querySelector('#toolbar-opt-border') as ISwitchComponent;
showBorderToggle.addEventListener('forge-switch-change', ({ detail: selected }) => toggleAttribute(toolbar, !selected, 'no-border'));

const hasPaddingToggle = document.querySelector('#toolbar-opt-has-padding') as ISwitchComponent;
hasPaddingToggle.addEventListener('forge-switch-change', ({ detail: selected }) => toggleAttribute(toolbar, !selected, 'no-padding'));

const autoHeightToggle = document.querySelector('#toolbar-opt-auto-height') as ISwitchComponent;
autoHeightToggle.addEventListener('forge-switch-change', ({ detail: selected }) => toggleAttribute(toolbar, selected, 'auto-height'));
