import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
import { IconRegistry } from '@tylertech/forge/icon';
import {
  tylIconArrowBack,
  tylIconConstruction,
  tylIconDelete,
  tylIconDownload,
  tylIconEdit,
  tylIconMoreVert,
  tylIconRefresh,
  tylIconSave,
  tylIconShare
} from '@tylertech/tyler-icons';
import type { IMenuOption } from '@tylertech/forge/menu';
import { storyStyles } from '../../decorators.js';
import { standaloneStoryParams } from '../../utils.js';

import '@tylertech/forge/structured-card';
import '@tylertech/forge/button';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';
import '@tylertech/forge/menu';
import '@tylertech/forge/stack';
import '@tylertech/forge/text-field';
import '@tylertech/forge/select';
import '@tylertech/forge/file-picker';
import '@tylertech/forge/badge';
import '@tylertech/forge/table';
import '@tylertech/forge/paginator';

IconRegistry.define([
  tylIconArrowBack,
  tylIconConstruction,
  tylIconDelete,
  tylIconDownload,
  tylIconEdit,
  tylIconMoreVert,
  tylIconRefresh,
  tylIconSave,
  tylIconShare
]);

const component = 'forge-structured-card';

const meta = {
  title: 'Components/Structured Card',
  component,
  render: () => html`
    <forge-structured-card id="storybook-demo">
      <span slot="before-title" class="forge-typography--label1">before-title</span>
      <span slot="title" class="forge-typography--label1">title</span>
      <span slot="header-actions" class="forge-typography--label1">header-actions</span>
      <span slot="after-header-actions" class="forge-typography--label1">after-header-actions</span>
      <span slot="body" class="forge-typography--label1" style="height: 300px;">body</span>
      <span slot="footer-start" class="forge-typography--label1">footer-start</span>
      <span slot="footer-secondary-action" class="forge-typography--label1">footer-secondary-action</span>
      <span slot="footer-primary-action" class="forge-typography--label1">footer-primary-action</span>
    </forge-structured-card>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  decorators: [
    storyStyles(`
      forge-structured-card[id='storybook-demo'] [slot] {
        display: block;
        height: 100%;
        padding: var(--forge-spacing-xxsmall);
        border: 2px dashed;
        border-radius: 4px;
      }

      forge-structured-card[id='storybook-demo'] [slot='header-actions'],
      forge-structured-card[id='storybook-demo'] [slot='after-header-actions'],
      forge-structured-card[id='storybook-demo'] [slot='before-title'],
      forge-structured-card[id='storybook-demo'] [slot='title'] {
        background: var(--forge-theme-primary-container-low);
        border-color: var(--forge-theme-primary);
      }

      forge-structured-card[id='storybook-demo'] [slot='body'] {
        display: grid;
        place-content: center;
        background: var(--forge-theme-success-container-low);
        border-color: var(--forge-theme-success);
      }

      forge-structured-card[id='storybook-demo'] [slot='footer-start'],
      forge-structured-card[id='storybook-demo'] [slot='footer-secondary-action'],
      forge-structured-card[id='storybook-demo'] [slot='footer-primary-action'] {
        background: var(--forge-theme-tertiary-container-low);
        border-color: var(--forge-theme-tertiary);
      }
    `)
  ]
};

export const WithForm: Story = {
  ...standaloneStoryParams,
  decorators: [
    storyStyles(`
      .actions-card-container {
        max-width: 600px;
      }
    `)
  ],
  render: () => html`
    <div class="actions-card-container">
      <forge-structured-card heading-level="2">
        <div slot="title">Project Details</div>

        <forge-badge theme="warning" slot="header-actions">
          <span>In progress</span>
          <forge-icon name="construction" slot="end"></forge-icon>
        </forge-badge>
        <form slot="body">
          <forge-stack>
            <forge-text-field label-position="block-start">
              <label>Project name</label>
              <input type="text" />
            </forge-text-field>
            <forge-text-field label-position="block-start">
              <label>Description</label>
              <textarea></textarea>
            </forge-text-field>
            <forge-select label="Category" label-position="block-start">
              <forge-option value="development">Development</forge-option>
              <forge-option value="design">Design</forge-option>
              <forge-option value="marketing">Marketing</forge-option>
              <forge-option value="research">Research</forge-option>
            </forge-select>
            <forge-text-field label-position="block-start">
              <label>Owner</label>
              <input type="text" />
            </forge-text-field>
            <forge-file-picker accept=".jpg,.png,.pdf">
              <forge-button variant="outlined">Attach files</forge-button>
            </forge-file-picker>
          </forge-stack>
        </form>
        <forge-button variant="text" slot="footer-secondary-action">
          <forge-icon slot="start" name="delete"></forge-icon>
          Cancel
        </forge-button>
        <forge-button variant="tonal" slot="footer-primary-action">
          <forge-icon slot="start" name="save"></forge-icon>
          Save
        </forge-button>
      </forge-structured-card>
    </div>
  `
};

export const HeaderIconButton: Story = {
  ...standaloneStoryParams,
  decorators: [
    storyStyles(`
      .actions-card-container {
        max-width: 600px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `)
  ],
  render: () => {
    const handleMenuSelect = action('forge-menu-select');

    const menuOptions: IMenuOption[] = [
      { label: 'Edit', value: 'edit', leadingIcon: 'edit', leadingIconType: 'component' },
      { label: 'Share', value: 'share', leadingIcon: 'share', leadingIconType: 'component' },
      { label: 'Download', value: 'download', leadingIcon: 'download', leadingIconType: 'component' },
      { label: 'Delete', value: 'delete', leadingIcon: 'delete', leadingIconType: 'component' }
    ];

    return html`
      <div class="actions-card-container">
        <forge-structured-card heading-level="2">
          <div slot="title">Project Details</div>
          <forge-menu slot="after-header-actions" .options=${menuOptions} @forge-menu-select=${handleMenuSelect}>
            <forge-icon-button aria-label="More actions">
              <forge-icon name="more_vert"></forge-icon>
            </forge-icon-button>
          </forge-menu>

          <div slot="body" class="card-content">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          <forge-button variant="text" slot="footer-secondary-action">
            <forge-icon slot="start" name="delete"></forge-icon>
            Cancel
          </forge-button>
          <forge-button variant="filled" slot="footer-primary-action">
            <forge-icon slot="start" name="save"></forge-icon>
            Save
          </forge-button>
        </forge-structured-card>
      </div>
    `;
  }
};

export const WithBeforeTitleSlot: Story = {
  ...standaloneStoryParams,
  decorators: [
    storyStyles(`
      .actions-card-container {
        max-width: 600px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `)
  ],
  render: () => html`
    <div class="actions-card-container">
      <forge-structured-card heading-level="2">
        <forge-icon-button aria-label="Back" slot="before-title">
          <forge-icon name="arrow_back"></forge-icon>
        </forge-icon-button>
        <span slot="title">Project Details</span>
        <div slot="body" class="card-content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <forge-button variant="text" slot="footer-secondary-action">
          <forge-icon slot="start" name="delete"></forge-icon>
          Cancel
        </forge-button>
        <forge-button variant="filled" slot="footer-primary-action">
          <forge-icon slot="start" name="save"></forge-icon>
          Save
        </forge-button>
      </forge-structured-card>
    </div>
  `
};

export const WithTable: Story = {
  ...standaloneStoryParams,
  render: () => {
    const tableData = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
      { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'User' },
      { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', role: 'Manager' },
      { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'User' }
    ];

    const columnConfigurations = [
      { property: 'name', header: 'Name' },
      { property: 'email', header: 'Email' },
      { property: 'role', header: 'Role' }
    ];

    return html`
      <forge-structured-card heading-level="2" body-spacing="none">
        <div slot="title">User Management</div>
        <forge-icon-button aria-label="Refresh data" slot="after-header-actions">
          <forge-icon name="refresh"></forge-icon>
        </forge-icon-button>
        <forge-icon-button aria-label="Download report" slot="after-header-actions">
          <forge-icon name="download"></forge-icon>
        </forge-icon-button>
        <forge-table slot="body" .data=${tableData} .columnConfigurations=${columnConfigurations}></forge-table>
        <forge-paginator slot="footer-primary-action" page-size="5" total="25" page-index="0"></forge-paginator>
      </forge-structured-card>
    `;
  }
};

export const ScrollableBodyContent: Story = {
  ...standaloneStoryParams,
  decorators: [
    storyStyles(`
      * {
        box-sizing: border-box;
      }

      .card-container {
        max-width: 360px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `)
  ],
  render: () => html`
    <div class="card-container">
      <forge-structured-card style="--forge-structured-card-body-height: 200px;">
        <span slot="title">Project Details</span>
        <forge-icon-button aria-label="More actions" slot="after-header-actions">
          <forge-icon name="more_vert"></forge-icon>
        </forge-icon-button>
        <div slot="body">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged.
          </p>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
        <forge-button variant="filled" slot="footer-primary-action">
          <forge-icon slot="start" name="save"></forge-icon>
          Save
        </forge-button>
      </forge-structured-card>
    </div>
  `
};
