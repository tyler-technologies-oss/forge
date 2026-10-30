import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import icons from './icons.json' with { type: 'json' };
import data from './data.json' with { type: 'json' };
import type { AppLauncherOption } from '@tylertech/forge/app-launcher';

import '@tylertech/forge/app-bar';
import '@tylertech/forge/app-launcher';
import '@tylertech/forge/app-launcher/app-launcher-link';

const component = 'forge-app-launcher';

const selectRandomIconForDemo = (): string => {
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex].name;
};

const allApps = data.map(d => ({
  label: d.label,
  iconName: selectRandomIconForDemo(),
  uri: d.uri
})) as AppLauncherOption[];

const relatedApps: AppLauncherOption[] = [
  {
    label: 'Canva',
    iconName: 'payment',
    uri: 'https://google.com',
    target: '_blank'
  },
  {
    label: 'Figma',
    iconName: 'admin_panel_settings',
    uri: 'https://google.com',
    target: '_blank'
  },
  {
    label: 'GitHub',
    iconName: '',
    uri: 'https://google.com',
    target: '_blank'
  },
  {
    label: 'Slack',
    iconName: 'batch_prediction',
    uri: 'https://google.com',
    target: '_blank'
  },
  {
    label: 'Trello',
    iconName: 'settings_system_daydream',
    uri: 'https://google.com',
    target: '_blank'
  }
];

const meta = {
  title: 'Components/App Launcher',
  render: args => {
    // Simulate loading by providing empty arrays when loading is true
    const currentAllApps = args.simulateLoading ? [] : allApps;
    const currentRelatedApps = args.simulateLoading ? [] : args.showRelatedApps ? relatedApps : [];

    return html`
      <forge-app-bar theme-mode="scoped" title-text="App Launcher">
        <forge-app-launcher slot="end" .allApps=${currentAllApps} .relatedApps=${currentRelatedApps} search-placeholder=${args.searchPlaceholder}>
          <span slot="header-title">${args.headerTitle}</span>
          <span slot="related-apps-title">${args.relatedAppsTitle}</span>
          <span slot="all-apps-title">${args.allAppsTitle}</span>
          <span slot="view-all-apps-button-text">${args.viewAllAppsButtonText}</span>
          <span slot="app-launcher-links-title">${args.appLauncherLinksTitle}</span>
          <span slot="empty-state-text">${args.emptyStateText}</span>
          <span slot="loading-text">${args.loadingText}</span>
          ${args.showAppLauncherLinks
            ? html`
                <forge-app-launcher-link slot="app-launcher-link">
                  <a href="http://www.google.com" target="_blank">Design Documentation</a>
                </forge-app-launcher-link>
                <forge-app-launcher-link slot="app-launcher-link">
                  <a href="http://www.google.com" target="_blank">Frequently Asked Questions</a>
                </forge-app-launcher-link>
                <forge-app-launcher-link slot="app-launcher-link">
                  <a href="http://www.google.com" target="_blank">Community Services Directory</a>
                </forge-app-launcher-link>
              `
            : nothing}
        </forge-app-launcher>
      </forge-app-bar>
    `;
  },

  component,
  argTypes: {
    showRelatedApps: { control: 'boolean' },
    showAppLauncherLinks: { control: 'boolean' },
    simulateLoading: {
      control: 'boolean',
      description: 'Simulates loading state by removing all app data'
    },
    headerTitle: { control: 'text' },
    relatedAppsTitle: { control: 'text' },
    allAppsTitle: { control: 'text' },
    viewAllAppsButtonText: { control: 'text' },
    emptyStateText: { control: 'text' },
    loadingText: { control: 'text' },
    searchPlaceholder: { control: 'text' }
  },
  args: {
    showRelatedApps: true,
    showAppLauncherLinks: true,
    simulateLoading: false,
    headerTitle: 'App Launcher',
    relatedAppsTitle: 'Related apps',
    allAppsTitle: 'All apps',
    viewAllAppsButtonText: 'View all apps',
    appLauncherLinksTitle: 'Custom links',
    emptyStateText: 'No applications found',
    loadingText: 'Loading apps',
    searchPlaceholder: 'Search by product or app'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
