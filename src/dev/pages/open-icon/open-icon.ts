import '$src/shared';
import '@tylertech/forge/open-icon';
import { IOpenIconComponent } from '@tylertech/forge/open-icon';

const openIcon = document.getElementById('open-icon') as IOpenIconComponent;
openIcon.addEventListener('click', () => openIcon.open = !openIcon.open);
