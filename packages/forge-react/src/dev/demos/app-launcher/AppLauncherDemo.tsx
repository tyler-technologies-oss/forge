import { ForgeAppLauncher, ForgeAppLauncherLink } from '@tylertech/forge-react';
import type { AppLauncherOption } from '@tylertech/forge/app-launcher';

const relatedApps: AppLauncherOption[] = [
  { label: 'Munis', uri: 'https://www.tylertech.com', iconName: 'application' },
  { label: 'ExecuTime', uri: 'https://www.tylertech.com', iconName: 'application' }
];

const allApps: AppLauncherOption[] = [
  ...relatedApps,
  { label: 'Content Manager', uri: 'https://www.tylertech.com', iconName: 'application' },
  { label: 'Enterprise Asset Management', uri: 'https://www.tylertech.com', iconName: 'application' }
];

export function AppLauncherDemo(): JSX.Element {
  return (
    <>
      <h2 className="forge-typography--subheading4">App Launcher</h2>
      <ForgeAppLauncher relatedApps={relatedApps} allApps={allApps}>
        <ForgeAppLauncherLink slot="app-launcher-link">
          <a href="https://www.tylertech.com" target="_blank" rel="noreferrer">
            Tyler Technologies
          </a>
        </ForgeAppLauncherLink>
      </ForgeAppLauncher>
    </>
  );
}
