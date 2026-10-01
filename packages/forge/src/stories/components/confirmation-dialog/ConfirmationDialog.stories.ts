import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { action } from 'storybook/actions';
import { ConfirmationDialogActionEventData, ConfirmationDialogComponent } from '@tylertech/forge/confirmation-dialog';

import '@tylertech/forge/confirmation-dialog';

const component = 'forge-confirmation-dialog';
const actionAction = action('forge-confirmation-dialog-action');

const meta = {
  title: 'Components/Confirmation Dialog',
  render: args => {
    const confirmationDialogRef = createRef<ConfirmationDialogComponent>();

    function toggleDialog(): void {
      const confirmationDialog = confirmationDialogRef.value as ConfirmationDialogComponent;
      confirmationDialog.open = !confirmationDialog.open;
    }

    function handleAction(evt: CustomEvent<ConfirmationDialogActionEventData>): void {
      actionAction(evt);
      if (args.preventDefault) {
        evt.preventDefault();
      }
    }

    return html`
      <forge-button variant="raised" @click=${toggleDialog}>Show Confirmation Dialog</forge-button>
      <forge-confirmation-dialog ${ref(confirmationDialogRef)} @forge-confirmation-dialog-action=${handleAction} .isBusy=${args.isBusy}>
        ${args.title.length ? html`<span slot="title">${args.title}</span>` : ''}
        ${args.message.length ? html`<span slot="message">${args.message}</span>` : ''}
        ${args.secondaryButtonText.length ? html`<span slot="secondary-button-text">${args.secondaryButtonText}</span>` : ''}
        ${args.primaryButtonText.length ? html`<span slot="primary-button-text">${args.primaryButtonText}</span>` : ''}
      </forge-confirmation-dialog>
    `;
  },
  component,
  argTypes: {
    isBusy: { control: 'boolean' },
    title: { control: 'text' },
    message: { control: 'text' },
    secondaryButtonText: { control: 'text' },
    primaryButtonText: { control: 'text' },
    preventDefault: { control: 'boolean' }
  },
  args: {
    isBusy: false,
    title: 'Delete selected images?',
    message: 'Images will be permanently removed from your account and all synced devices.',
    secondaryButtonText: 'No',
    primaryButtonText: 'Yes',
    preventDefault: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
