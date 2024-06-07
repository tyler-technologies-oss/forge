import { html, render } from 'lit';
import { ArgTypes } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { DialogPreset } from '@tylertech/forge/dialog';
import { tylIconClose } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';
import { customElementStoryRenderer } from '../../utils';

import '@tylertech/forge/icon-button';
import '@tylertech/forge/button';
import '@tylertech/forge/dialog';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/toolbar';

export interface DialogProps {
  preset?: DialogPreset;
}

const closeEventAction = action('forge-dialog-close');
const beforeCloseEventAction = action('forge-dialog-before-close');
const moveStartEventAction = action('forge-dialog-move-start');
const moveEventAction = action('forge-dialog-move');
const moveEndEventAction = action('forge-dialog-move-end');

export const Dialog = (args: ArgTypes) => {
  IconRegistry.define(tylIconClose);
  const container = document.createElement('div');

  const button = document.createElement('forge-button');
  button.variant = 'raised';
  button.innerText = 'Open dialog';
  button.addEventListener('click', () => (dialog.open = true));
  container.appendChild(button);

  const dialog = customElementStoryRenderer('forge-dialog', args);
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  dialog.setAttribute('aria-describedby', 'dialog-message');
  dialog.addEventListener('forge-dialog-close', evt => {
    closeEventAction(evt);
    dialog.open = false;
  });
  dialog.addEventListener('forge-dialog-before-close', beforeCloseEventAction);
  dialog.addEventListener('forge-dialog-move-start', moveStartEventAction);
  dialog.addEventListener('forge-dialog-move', moveEventAction);
  dialog.addEventListener('forge-dialog-move-end', moveEndEventAction);
  container.appendChild(dialog);

  const content = html`
    <forge-scaffold>
      <forge-toolbar slot="header" no-divider>
        <h1 class="forge-typography--heading4" id="dialog-title" slot="start">Title text</h1>
        <forge-icon-button slot="end" aria-label="Close dialog" @click=${() => (dialog.open = false)}>
          <forge-icon name="close"></forge-icon>
        </forge-icon-button>
      </forge-toolbar>
      <p slot="body" id="dialog-message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sed pariatur error repellendus eos! Quas, optio esse ad illum quis blanditiis rerum quia.
        Corrupti, ad hic velit praesentium voluptatum dolores?
      </p>
      <forge-toolbar slot="footer" no-divider>
        <forge-button slot="end" variant="raised" @click=${() => (dialog.open = false)}>Close</forge-button>
      </forge-toolbar>
    </forge-scaffold>
  `;
  render(content, dialog);

  return container;
};
