import type { Meta, StoryObj } from '@storybook/web-components';
import { DIALOG_CONSTANTS, type IDialogProperties } from '@tylertech/forge/dialog';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconClose } from '@tylertech/tyler-icons/standard';
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { storyStyles } from '../../decorators';
import { generateCustomElementArgTypes } from '../../utils';
import { Dialog } from './Dialog';

import '@tylertech/forge/button';
import '@tylertech/forge/dialog';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/toolbar';

import styles from './Dialog.scss?inline';

IconRegistry.define([tylIconClose]);

const component = 'forge-dialog';

const meta = {
  title: 'Components/Dialog',
  render: Dialog,
  component: 'forge-dialog',
  decorators: [storyStyles(styles)],
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['trigger', 'triggerElement'],
      controls: {
        mode: { control: 'select', options: ['modal', 'inline-modal', 'nonmodal'] },
        type: { control: 'select', options: ['dialog', 'alertdialog'] },
        animationType: { control: 'select', options: ['none', 'zoom', 'fade', 'slide'] },
        preset: { control: 'select', options: ['dialog', 'left-sheet', 'right-sheet', 'top-sheet', 'bottom-sheet'] },
        sizeStrategy: { control: 'select', options: ['content', 'container-inline', 'container-block'] },
        positionStrategy: { control: 'select', options: ['viewport', 'container'] },
        placement: {
          control: 'select',
          options: ['custom', 'center', 'top', 'right', 'bottom', 'left', 'top-right', 'top-left', 'bottom-right', 'bottom-left']
        },
        fullscreenThreshold: { control: 'number' }
      }
    })
  },
  args: {
    open: false,
    persistent: false,
    fullscreen: false,
    fullscreenThreshold: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD,
    moveable: false,
    mode: DIALOG_CONSTANTS.defaults.MODE,
    type: DIALOG_CONSTANTS.defaults.TYPE,
    animationType: DIALOG_CONSTANTS.defaults.ANIMATION_TYPE,
    preset: DIALOG_CONSTANTS.defaults.PRESET,
    sizeStrategy: DIALOG_CONSTANTS.defaults.SIZE_STRATEGY,
    positionStrategy: DIALOG_CONSTANTS.defaults.POSITION_STRATEGY,
    placement: DIALOG_CONSTANTS.defaults.PLACEMENT
  }
} satisfies Meta<Partial<IDialogProperties>>;

export default meta;

type Story = StoryObj<Partial<IDialogProperties>>;

export const Demo: Story = {};

export const RightSheet: Story = {
  args: { preset: 'right-sheet' }
};

export const LeftSheet: Story = {
  args: { preset: 'left-sheet' }
};

export const TopSheet: Story = {
  args: { preset: 'top-sheet' }
};

export const BottomSheet: Story = {
  args: { preset: 'bottom-sheet' }
};

export const Fullscreen: Story = {
  args: { fullscreen: true }
};

export const CSSOnly: Story = {
  parameters: {
    controls: {
      mode: { control: 'select', options: ['modal', 'nonmodal'] },
      placement: {
        control: 'select',
        options: ['center', 'top', 'top-right', 'top-left', 'right', 'left', 'bottom', 'bottom-right', 'bottom-left']
      },
      preset: { control: 'select', options: ['dialog', 'top-sheet', 'bottom-sheet', 'left-sheet', 'right-sheet'] },
      fullscreen: { control: 'boolean' },
      animationType: { control: 'select', options: ['none', 'zoom', 'fade', 'slide'] }
    }
  },
  args: {
    fullscreen: false,
    mode: 'modal',
    placement: 'center',
    preset: 'dialog',
    animationType: 'zoom'
  },
  render: ({ fullscreen, mode, placement, preset, animationType }) => {
    const toggleDialog = () => {
      const dialog = document.getElementById('css-dialog') as HTMLDialogElement;
      if (dialog.open) {
        dialog.close();
        return;
      }
      if (mode === 'modal') {
        dialog.showModal();
      } else {
        dialog.show();
      }
    };
    const classes = classMap({
      'forge-dialog': true,
      'forge-dialog--fullscreen': !!fullscreen,
      [`forge-dialog--${mode}`]: true,
      [`forge-dialog--${placement}`]: true,
      [`forge-dialog--${preset}`]: true,
      [`forge-dialog--${animationType}`]: true
    });
    return html`
      <forge-button variant="raised" @click=${toggleDialog}>Open Dialog</forge-button>
      <dialog id="css-dialog" class=${classes} style="max-inline-size: 480px;">
        <forge-scaffold>
          <forge-toolbar slot="header" no-border>
            <h2 class="forge-typography--heading4">Title</h2>
            <forge-icon-button slot="end" aria-label="Close" @click=${toggleDialog}>
              <forge-icon name="close"></forge-icon>
            </forge-icon-button>
          </forge-toolbar>
          <p slot="body" style="margin: 16px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <forge-toolbar slot="footer" no-border>
            <forge-button slot="end" @click=${toggleDialog}>Close</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </dialog>
    `;
  }
};
