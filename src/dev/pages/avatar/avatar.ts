// Components
import '@tylertech/forge/avatar';
import type { AvatarComponent } from '@tylertech/forge/avatar';
import '$src/shared';

function getAvatarElements(): NodeListOf<AvatarComponent> {
  return document.querySelectorAll('.content forge-avatar');
}

const autoColorCheckbox = document.querySelector('#auto-color-checkbox');
autoColorCheckbox.addEventListener('change', ({ target }) => {
  const avatars = getAvatarElements();
  avatars.forEach(avatar => {
    avatar.autoColor = (target as HTMLInputElement).checked;
  });
});
