import { ForgeAppLayout, ForgeList, ForgeListItem } from '@tylertech/forge-react';

export function AppLayoutDemo(): JSX.Element {
  return (
    <>
      <h2 className="forge-typography--subheading4">App Layout</h2>
      <div style={{ height: '500px', border: '1px solid var(--forge-theme-outline)' }}>
        <ForgeAppLayout appTitle="Demo Application">
          <nav slot="navigation">
            <ForgeList navlist>
              <ForgeListItem>Dashboard</ForgeListItem>
              <ForgeListItem>Reports</ForgeListItem>
              <ForgeListItem>Settings</ForgeListItem>
            </ForgeList>
          </nav>
          <div style={{ padding: '16px' }}>
            <p>Body content goes here.</p>
          </div>
        </ForgeAppLayout>
      </div>
    </>
  );
}
