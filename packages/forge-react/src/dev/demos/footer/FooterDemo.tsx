import { ForgeFooter, ForgeFooterItem } from '@tylertech/forge-react';

export function FooterDemo(): JSX.Element {
  return (
    <>
      <h2 className="forge-typography--subheading4">Footer</h2>
      <ForgeFooter>
        <ForgeFooterItem>&copy; {new Date().getFullYear()} Tyler Technologies, Inc.</ForgeFooterItem>
        <ForgeFooterItem>
          <a href="https://www.tylertech.com">Privacy policy</a>
        </ForgeFooterItem>
        <ForgeFooterItem>
          <a href="https://www.tylertech.com">Terms of use</a>
        </ForgeFooterItem>
      </ForgeFooter>
    </>
  );
}
