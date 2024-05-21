import { html, nothing } from 'lit';
import { live } from 'lit/directives/live.js';
import { DialogPreset } from '@tylertech/forge/dialog';
import { tylIconClose } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/icon-button';
import '@tylertech/forge/button';
import '@tylertech/forge/dialog';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/toolbar';

import './Dialog.scss';

export interface DialogProps {
  preset?: DialogPreset;
}

export const Dialog = ({
  preset
}: DialogProps) => {
  IconRegistry.define(tylIconClose);
  let isOpen = false;

  return html`
    <forge-button variant="raised" @click=${() => isOpen = !isOpen}>Open dialog</forge-button>

    <forge-dialog .open=${live(isOpen)} preset=${preset ?? nothing} aria-labelledby="dialog-title" aria-describedby="dialog-message">
      <forge-scaffold class="dialog">
        <forge-toolbar slot="header" no-divider>
          <h1 id="dialog-title" slot="start">Title text</h1>
          <forge-icon-button slot="end" aria-label="Close dialog">
            <forge-icon name="close"></forge-icon>
          </forge-icon-button>
        </forge-toolbar>
        <p slot="body" id="dialog-message">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sed pariatur error repellendus eos! Quas,
          optio esse ad illum quis blanditiis rerum quia. Corrupti, ad hic velit praesentium voluptatum dolores?
        </p>
        <forge-toolbar slot="footer" no-divider>
          <forge-button slot="end" variant="raised">Close</forge-button>
        </forge-toolbar>
      </forge-scaffold>
    </forge-dialog>
  `;
};
