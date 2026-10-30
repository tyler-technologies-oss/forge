import { ForgeThemeToggle } from '@tylertech/forge-react';

export function ThemeToggleDemo(): JSX.Element {
  return (
    <>
      <h2 className="forge-typography--subheading4">Theme Toggle</h2>
      <p>Persists the selection to local storage and applies it to the whole document.</p>
      <ForgeThemeToggle />
    </>
  );
}
