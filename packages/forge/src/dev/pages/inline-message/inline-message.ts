import '$src/shared';
import '@tylertech/forge/icon';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/inline-message';
import '@tylertech/forge/inline-message/forge-inline-message.scss';
import { INLINE_MESSAGE_CONSTANTS } from '@tylertech/forge/inline-message';
import type { ISelectComponent } from '@tylertech/forge/select';
import { tylIconInfo } from '@tylertech/tyler-icons';

IconRegistry.define(tylIconInfo);

const themeSelect = document.getElementById('opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail }: CustomEvent<string>) => {
  getAllInlineMessages().forEach(el => el.setAttribute('theme', detail));
});

function getAllInlineMessages(): NodeListOf<HTMLElement> {
  return document.querySelectorAll(INLINE_MESSAGE_CONSTANTS.elementName);
}
