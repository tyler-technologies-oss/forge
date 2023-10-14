import '$src/shared';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/banner';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import { tylIconAddAlert } from '@tylertech/tyler-icons/standard';
import type { IBannerComponent, ISelectComponent, ISwitchComponent } from '@tylertech/forge';

IconRegistry.define([
  tylIconAddAlert
]);

const banner = document.querySelector('#banner') as IBannerComponent;
const leadingIcon = document.querySelector('#leading-icon') as HTMLElement;
const textEl = document.querySelector('#text') as HTMLElement;

const themeSelect = document.querySelector('#theme-select') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail: theme }) => {
  if (theme) {
    banner.setAttribute('theme', theme);
  } else {
    banner.removeAttribute('theme');
  }
});

const dismissToggle = document.querySelector('#dismissed-toggle') as ISwitchComponent;
dismissToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  banner.dismissed = selected;
});

const showLeadingIconToggle = document.querySelector('#show-leading-icon-toggle') as ISwitchComponent;
showLeadingIconToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  leadingIcon.style.display = selected ? 'block' : 'none';
});

const showDismissToggle = document.querySelector('#show-dismiss-toggle') as ISwitchComponent;
showDismissToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  banner.canDismiss = selected;
});

const useMoreTextToggle = document.querySelector('#use-more-text-toggle') as ISwitchComponent;
useMoreTextToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  textEl.textContent = selected ?
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit explicabo labore soluta ex culpa, consectetur possimus quidem ullam voluptas est facilis quasi enim error doloribus omnis recusandae! Dolore, eaque ipsa!' :
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit.';
});
