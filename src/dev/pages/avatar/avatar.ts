// Components
import '@tylertech/forge/avatar';
import type { AvatarComponent } from '@tylertech/forge/avatar';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import '$src/shared';

function getAvatarElements(): NodeListOf<AvatarComponent> {
  return document.querySelectorAll('.content forge-avatar');
}

const autoColorToggle = document.querySelector('#auto-color-checkbox') as ISwitchComponent;
autoColorToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  const avatars = getAvatarElements();
  avatars.forEach(avatar => avatar.autoColor = selected);
});
