import { useEffect } from 'react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconLink } from '@tylertech/tyler-icons';
import { ForgeIcon, ForgeProfileLink, ForgeUserProfile } from '@tylertech/forge-react';

export function UserProfileDemo(): JSX.Element {
  useEffect(() => {
    IconRegistry.define(tylIconLink);
  }, []);

  return (
    <>
      <h2 className="forge-typography--subheading4">User Profile</h2>
      <ForgeUserProfile fullName="Jane Doe" email="jane.doe@tylertech.com" themeToggle>
        <ForgeProfileLink slot="link">
          <ForgeIcon slot="icon" name="link" />
          <a href="https://www.tylertech.com">My account</a>
        </ForgeProfileLink>
      </ForgeUserProfile>
    </>
  );
}
