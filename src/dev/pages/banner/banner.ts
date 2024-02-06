import '$src/shared';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/banner';
import '@tylertech/forge/button';
import { tylIconAddAlert } from '@tylertech/tyler-icons/standard';
import { BANNER_CONSTANTS, IBannerComponent, ISelectComponent, ISwitchComponent } from '@tylertech/forge';

IconRegistry.define([
  tylIconAddAlert
]);

const banner = document.querySelector('#banner') as IBannerComponent;
const leadingIcon = document.querySelector('#leading-icon') as HTMLElement;
const textEl = document.querySelector('#text') as HTMLElement;

banner.addEventListener(BANNER_CONSTANTS.events.DISMISSED, evt => {
  console.log(evt);
  dismissedToggle.on = true;
});

const themeSelect = document.querySelector('#opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail: theme }) => banner.theme = theme);

const dismissedToggle = document.querySelector('#opt-dismissed') as ISwitchComponent;
dismissedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => banner.dismissed = selected);

const showIconToggle = document.querySelector('#opt-show-icon') as ISwitchComponent;
showIconToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    banner.appendChild(leadingIcon);
  } else {
    leadingIcon.remove();
  }
});

const persistentToggle = document.querySelector('#opt-persistent') as ISwitchComponent;
persistentToggle.addEventListener('forge-switch-change', ({ detail: selected }) => banner.persistent = selected);

const useMoreTextToggle = document.querySelector('#opt-more-text') as ISwitchComponent;
useMoreTextToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  textEl.textContent = selected ?
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit explicabo labore soluta ex culpa, consectetur possimus quidem ullam voluptas est facilis quasi enim error doloribus omnis recusandae! Dolore, eaque ipsa!' :
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit.';
});
