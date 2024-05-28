import type { Meta, StoryObj } from '@storybook/web-components';
import { Dialog } from './Dialog';
import { generateCustomElementArgTypes } from '../../utils';
import { DIALOG_CONSTANTS, type IDialogProperties } from '@tylertech/forge/dialog';

import '@tylertech/forge/icon-button';
import '@tylertech/forge/button';
import '@tylertech/forge/dialog';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/toolbar';

import './Dialog.scss';

const component = 'forge-dialog';

const meta = {
  title: 'Components/Dialog',
  render: Dialog,
  component: 'forge-dialog',
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
        placement: { control: 'select', options: ['custom', 'center', 'top', 'right', 'bottom', 'left', 'top-right', 'top-left', 'bottom-right', 'bottom-left'] },
      }
    })
  },
  args: {
    open: false,
    persistent: false,
    fullscreen: false,
    moveable: false,
    mode: DIALOG_CONSTANTS.defaults.MODE,
    type: DIALOG_CONSTANTS.defaults.TYPE,
    animationType: DIALOG_CONSTANTS.defaults.ANIMATION_TYPE,
    preset: DIALOG_CONSTANTS.defaults.PRESET,
    sizeStrategy: DIALOG_CONSTANTS.defaults.SIZE_STRATEGY,
    positionStrategy: DIALOG_CONSTANTS.defaults.POSITION_STRATEGY,
    placement: DIALOG_CONSTANTS.defaults.PLACEMENT,
  }
} satisfies Meta<Partial<IDialogProperties>>;

export default meta;

type Story = StoryObj<Partial<IDialogProperties>>;

export const Demo: Story = {};

export const RightSheet: Story = {
  args: { preset: 'right-sheet' },
};

export const LeftSheet: Story = {
  args: { preset: 'left-sheet' },
};

export const TopSheet: Story = {
  args: { preset: 'top-sheet' },
};

export const BottomSheet: Story = {
  args: { preset: 'bottom-sheet' },
};

export const Fullscreen: Story = {
  args: { fullscreen: true },
};
