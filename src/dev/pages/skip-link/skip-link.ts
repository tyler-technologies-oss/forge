import '$src/shared';
import '@tylertech/forge/skip-link';
import '@tylertech/forge/skip-link/forge-skip-link.scss';
import './skip-link.scss';

import { SelectComponent } from '@tylertech/forge/select';
import { SkipLinkComponent } from '@tylertech/forge/skip-link';
import { SwitchComponent } from '@tylertech/forge/switch';

const skipLink = document.getElementById('skip-link') as SkipLinkComponent;
const persistentSwitch = document.getElementById('opt-persistent') as SwitchComponent;
const themeSelect = document.getElementById('opt-theme') as SelectComponent;
const mutedSwitch = document.getElementById('opt-muted') as SwitchComponent;
const skipUrlChangeSwitch = document.getElementById('opt-skip-url-change') as SwitchComponent;

persistentSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  skipLink.persistent = detail;
});

themeSelect.addEventListener('change', ({ detail }) => {
  skipLink.theme = detail;
});

mutedSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  skipLink.muted = detail;
});

skipUrlChangeSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  skipLink.skipUrlChange = detail;
});
