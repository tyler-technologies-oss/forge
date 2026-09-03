import { ForgeContentScaffold } from '@tylertech/forge-react';

export function ContentScaffoldDemo(): JSX.Element {
  return (
    <>
      <h2 className="forge-typography--subheading4">Content Scaffold</h2>
      <ForgeContentScaffold style={{ border: '1px solid var(--forge-theme-outline)', height: '320px' }}>
        <h3 slot="header-start" className="forge-typography--subheading2">
          Section title
        </h3>
        <div slot="body" style={{ padding: '16px' }}>
          <p>Body content that expands to fill the available space.</p>
        </div>
        <span slot="footer-start">Footer content</span>
      </ForgeContentScaffold>
    </>
  );
}
