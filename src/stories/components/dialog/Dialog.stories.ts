import type { Meta, StoryObj } from '@storybook/web-components';
import type { DialogProps } from './Dialog';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  render: Dialog,
  argTypes: {
    
  },
  args: {
    
  },
} satisfies Meta<DialogProps>;

export default meta;

type Story = StoryObj<DialogProps>;

export const Default: Story = {};

export const RightSheet: Story = {
  args: {
    preset: 'right-sheet',
  },
};
