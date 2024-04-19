import '$src/shared';
import '@tylertech/forge/open-icon';
import { IOpenIconComponent, OpenIconOrientation } from '@tylertech/forge/open-icon';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import type { ISelectComponent } from '@tylertech/forge/select';

const openIcon = document.getElementById('open-icon') as IOpenIconComponent;

const customIcon = document.createElement('forge-icon');
customIcon.name = 'forge_logo';

const orientationSelect = document.getElementById('opt-orientation') as ISelectComponent;
orientationSelect.addEventListener('change', () => openIcon.orientation = orientationSelect.value as OpenIconOrientation);

const openToggle = document.getElementById('opt-open') as ISwitchComponent;
openToggle.addEventListener('forge-switch-change', () => openIcon.open = !openIcon.open);

const useCustomIcon = document.getElementById('opt-use-custom-icon') as ISwitchComponent;
useCustomIcon.addEventListener('forge-switch-change', () => {
  if (useCustomIcon.on) {
    openIcon.appendChild(customIcon);
  } else {
    customIcon.remove();
  }
});
