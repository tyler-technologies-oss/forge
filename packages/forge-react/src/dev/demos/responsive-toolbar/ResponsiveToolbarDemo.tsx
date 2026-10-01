import { useEffect } from 'react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconMoreVert } from '@tylertech/tyler-icons';
import { ForgeButton, ForgeIcon, ForgeIconButton, ForgeMenu, ForgeResponsiveToolbar } from '@tylertech/forge-react';

const overflowMenuOptions = [
  { label: 'Export', value: 'export' },
  { label: 'Filter', value: 'filter' },
  { label: 'Add new', value: 'add-new' }
];

export function ResponsiveToolbarDemo(): JSX.Element {
  useEffect(() => {
    IconRegistry.define(tylIconMoreVert);
  }, []);

  return (
    <>
      <h2 className="forge-typography--subheading4">Responsive Toolbar</h2>
      <p>Resize the browser window to see the actions collapse into an overflow menu in the small-screen layout.</p>
      <ForgeResponsiveToolbar>
        <h3 slot="start" className="forge-typography--subheading2">
          Toolbar title
        </h3>
        <div slot="end-large" style={{ display: 'flex', gap: '8px' }}>
          <ForgeButton variant="outlined">Export</ForgeButton>
          <ForgeButton variant="outlined">Filter</ForgeButton>
          <ForgeButton variant="raised">Add new</ForgeButton>
        </div>
        <ForgeMenu slot="end-small" options={overflowMenuOptions}>
          <ForgeIconButton aria-label="More actions">
            <ForgeIcon name="more_vert" />
          </ForgeIconButton>
        </ForgeMenu>
      </ForgeResponsiveToolbar>
    </>
  );
}
