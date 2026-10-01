import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge/app-layout';
import '@tylertech/forge/badge';
import '@tylertech/forge/button';
import '@tylertech/forge/card';
import '@tylertech/forge/date-picker';
import '@tylertech/forge/divider';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/list';
import '@tylertech/forge/select';
import '@tylertech/forge/stack';
import '@tylertech/forge/tabs';
import '@tylertech/forge/text-field';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/tooltip';

const component = 'forge-app-layout';

const meta = {
  title: 'Components/App Layout',
  component,
  render: (args: any) => {
    // Typography classes - change these to update styles throughout
    const TYPOGRAPHY = {
      heading3: 'forge-typography--heading1',
      heading4: 'forge-typography--heading2',
      heading5: 'forge-typography--heading3',
      body1: 'forge-typography--body1',
      label1: 'forge-typography--label1'
    };

    return html`
      <style>
        * {
          box-sizing: border-box !important;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          padding: 0;
          margin: 0;
        }

        forge-app-layout:state(small) {
          .main-content-container {
            grid-template-columns: 1fr;
          }

          .column-2 {
            grid-column: 1;
          }
        }

        body {
          margin: 0 !important;
          padding: 0 !important;
        }

        .secondary-header {
          --forge-toolbar-background: transparent;
        }

        .body {
          height: 100%;
          background-color: var(--forge-theme-surface-dim);
          padding-inline: var(--forge-spacing-medium);
        }

        .tab-container {
          grid-column: 1 / -1;
        }

        .main-content-container {
          display: grid;
          grid-template-columns: 9fr 3fr;
          gap: var(--forge-spacing-medium);
          grid-auto-rows: min-content;
          margin-block-start: var(--forge-spacing-medium);
        }

        .details-card {
          grid-column: 1;
        }

        .column-2 {
          grid-column: 2;
          display: flex;
          flex-direction: column;
          gap: var(--forge-spacing-medium);
        }

        .label-value-grid {
          display: grid;
          grid-template-columns: 180px 1fr;
          column-gap: var(--forge-spacing-medium);
          row-gap: var(--forge-spacing-xsmall);
          align-items: center;
        }

        forge-button[variant='tonal'] {
          --forge-button-tonal-background: #e5e8f7;
        }
      </style>
      <forge-app-layout app-title=${args.appTitle} breakpoint=${args.breakpoint} use-mini-drawer ?mini-hover=${args.miniHover}>
        <forge-list navlist slot="navigation" data-forge-app-layout-close>
          <forge-list-item selected id="tooltip-host-dashboard">
            ${!args.miniHover ? html`<forge-tooltip anchor="tooltip-host-dashboard">Dashboard</forge-tooltip>` : ''}
            <forge-icon slot="leading" name="visibility" external></forge-icon>
            <button type="button">Dashboard</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-analytics">
            ${!args.miniHover ? html`<forge-tooltip anchor="tooltip-host-analytics">Analytics</forge-tooltip>` : ''}
            <forge-icon slot="leading" name="analytics" external></forge-icon>
            <button type="button">Analytics</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-reports">
            ${!args.miniHover ? html`<forge-tooltip anchor="tooltip-host-reports">Reports</forge-tooltip>` : ''}
            <forge-icon slot="leading" name="assessment" external></forge-icon>
            <button type="button">Reports</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-users">
            ${!args.miniHover ? html`<forge-tooltip anchor="tooltip-host-users">Users</forge-tooltip>` : ''}
            <forge-icon slot="leading" name="people" external></forge-icon>
            <button type="button">Users</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-settings">
            ${!args.miniHover ? html`<forge-tooltip anchor="tooltip-host-settings">Settings</forge-tooltip>` : ''}
            <forge-icon slot="leading" name="settings" external></forge-icon>
            <button type="button">Settings</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-help">
            ${!args.miniHover ? html`<forge-tooltip anchor="tooltip-host-help">Help</forge-tooltip>` : ''}
            <forge-icon slot="leading" name="help" external></forge-icon>
            <button type="button">Help</button>
          </forge-list-item>
        </forge-list>

        <main slot="body" class="body">
          <forge-toolbar class="secondary-header" no-divider>
            <!-- Back button - always visible -->
            <forge-stack inline alignment="center" gap="32" slot="before-start">
              <forge-stack alignment="center" inline gap="8">
                <forge-icon-button aria-label="Go back" density="small">
                  <forge-icon name="arrow_back" external></forge-icon>
                </forge-icon-button>
                <h2 class="${TYPOGRAPHY.heading5}">Cory Ander</h2>
              </forge-stack>
              <forge-stack inline alignment="center" gap="8">
                <forge-badge theme="secondary">Interview pending</forge-badge>
                <forge-badge theme="info">Internal</forge-badge>
              </forge-stack>
            </forge-stack>
          </forge-toolbar>
          <div class="tab-container">
            <forge-tab-bar data-aria-label="Demo tabs" active-tab="0" clustered slot="start">
              <forge-tab>Applicant information</forge-tab>
              <forge-tab>Documents</forge-tab>
              <forge-tab>Interviews</forge-tab>
              <forge-tab>Messages</forge-tab>
            </forge-tab-bar>
          </div>

          <div class="main-content-container">
            <forge-card class="details-card">
              <forge-stack gap="24">
                <h3 class="${TYPOGRAPHY.heading4}">Details</h3>
                <div class="label-value-grid">
                  <label slot="label" class="${TYPOGRAPHY.label1}">Applied for</label>
                  <span slot="value" class="${TYPOGRAPHY.body1}">Senior software engineer</span>
                  <label slot="label" class="${TYPOGRAPHY.label1}">Application date</label>
                  <span slot="value" class="${TYPOGRAPHY.body1}">January 1, 2024</span>
                </div>
                <div class="tab-container">
                  <forge-tab-bar data-aria-label="Demo tabs" active-tab="0" clustered slot="start">
                    <forge-tab>Personal information</forge-tab>
                    <forge-tab>Qualifications</forge-tab>
                    <forge-tab>Work history</forge-tab>
                    <forge-tab>References</forge-tab>
                  </forge-tab-bar>
                </div>
                <forge-stack gap="24">
                  <h4 class="${TYPOGRAPHY.heading3}">Education</h4>
                  <forge-stack gap="24">
                    <div class="label-value-grid">
                      <label slot="label" class="${TYPOGRAPHY.label1}">Institution</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Massachusetts Institute of Technology</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Degree</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Masters of Science</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Area 1</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Computer Science</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Area 2</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Mathematics</span>
                    </div>
                    <div class="label-value-grid">
                      <label slot="label" class="${TYPOGRAPHY.label1}">Institution</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">University of California, Berkeley</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Degree</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Bachelors of Science</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Area 1</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Computer Engineering</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Area 2</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Mathematics</span>
                    </div>
                  </forge-stack>
                </forge-stack>
                <forge-divider></forge-divider>

                <forge-stack gap="24">
                  <h4 class="${TYPOGRAPHY.heading3}">Certifications</h4>
                  <forge-stack gap="24">
                    <div class="label-value-grid">
                      <label slot="label" class="${TYPOGRAPHY.label1}">Type</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">AWS Certified Solutions Architect</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Area</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Cloud Computing</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Level</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Professional</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Effective date</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">01/01/2026</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Expiration date</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">01/01/2028</span>
                    </div>
                    <div class="label-value-grid">
                      <label slot="label" class="${TYPOGRAPHY.label1}">Type</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Certified Scrum Master</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Area</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">Agile Methodology</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Effective date</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">01/01/2026</span>
                      <label slot="label" class="${TYPOGRAPHY.label1}">Expiration date</label>
                      <span slot="value" class="${TYPOGRAPHY.body1}">01/01/2028</span>
                    </div>
                  </forge-stack>
                </forge-stack>
              </forge-stack>
            </forge-card>

            <div class="column-2">
              <forge-card>
                <forge-stack gap="16">
                  <h3 class="${TYPOGRAPHY.heading4}">Workflow Status</h3>
                  <forge-select
                    label="Applicant status"
                    aria-label="Label"
                    label-position="block-start"
                    label-alignment="default"
                    variant="outlined"
                    theme="default"
                    shape="default"
                    density="default"
                    value="1"
                    placeholder
                    support-text-inset
                    select-all-label="Select all">
                    <forge-option value="1">Interview</forge-option>
                    <forge-option value="2">Option 2</forge-option>
                    <forge-option value="3">Option 3</forge-option>
                  </forge-select>
                  <forge-stack gap="8">
                    <forge-button variant="filled">
                      <forge-icon name="calendar_today" slot="start" external></forge-icon>
                      <span>Schedule interview</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="send_variant_outline" slot="start" external></forge-icon>
                      <span>Send reference request</span>
                    </forge-button>
                  </forge-stack>
                </forge-stack>
              </forge-card>

              <forge-card class="workflow-status-card">
                <forge-stack gap="16">
                  <h3 class="${TYPOGRAPHY.heading4}">Interview details</h3>
                  <forge-date-picker>
                    <forge-text-field label-position="block-start">
                      <label for="date-picker">Date</label>
                      <input aria-label="Pick a date" type="text" id="date-picker" autocomplete="off" placeholder="mm/dd/yyyy" />
                    </forge-text-field>
                  </forge-date-picker>
                  <forge-stack gap="8">
                    <forge-button variant="tonal">
                      <forge-icon name="question_answer" slot="start" external></forge-icon>
                      <span>Generate questions</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="star_border" slot="start" external></forge-icon>
                      <span>Add evaluation</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="notes" slot="start" external></forge-icon>
                      <span>View notes</span>
                    </forge-button>
                  </forge-stack>
                </forge-stack>
              </forge-card>

              <forge-card class="workflow-status-card">
                <forge-stack gap="16">
                  <h3 class="${TYPOGRAPHY.heading4}">Verification status</h3>
                  <forge-stack gap="8">
                    <div class="label-value-grid">
                      <span class="${TYPOGRAPHY.label1}">Background check</span>
                      <forge-badge theme="info-secondary">Initiated</forge-badge>

                      <span class="${TYPOGRAPHY.label1}">Reference check</span>
                      <forge-badge theme="tertiary">Sent</forge-badge>
                    </div>
                  </forge-stack>
                </forge-stack>
              </forge-card>
            </div>
          </div>
        </main>

        <div slot="footer">
          <div
            style="padding: 16px; background: var(--forge-theme-surface-container); border-top: 1px solid var(--forge-theme-outline-low); text-align: center;">
            Footer Content
          </div>
        </div>
      </forge-app-layout>
    `;
  },
  argTypes: {
    appTitle: {
      control: 'text',
      description: 'The title text to display in the app bar',
      table: {
        category: 'Properties'
      }
    },
    breakpoint: {
      control: 'number',
      description: 'The screen width breakpoint in pixels for responsive behavior',
      table: {
        category: 'Properties'
      }
    },
    miniHover: {
      control: 'boolean',
      description: 'Whether the mini drawer should expand on hover',
      table: {
        category: 'Properties'
      }
    }
  },
  args: {
    appTitle: 'App Layout Mini Drawer',
    breakpoint: 768,
    miniHover: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const MiniDrawer: Story = {};
