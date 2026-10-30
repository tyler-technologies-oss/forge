import { IAppBarComponent, IconRegistry } from '@tylertech/forge';
import { PropsWithChildren, useEffect } from 'react';
import { ForgeAppBar, ForgeIcon } from '@tylertech/forge-react';
import { tylIconTylerTalkingTLogo } from '@tylertech/tyler-icons';
import { useHistory } from 'react-router-dom';

export interface HeaderProps {
  slot: string;
}

function Header(props: PropsWithChildren<HeaderProps>): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    IconRegistry.define(tylIconTylerTalkingTLogo);
  }, []);

  function handleHref(evt: CustomEvent<void>): void {
    evt.preventDefault();
    history.push((evt.target as IAppBarComponent).href);
  }

  return (
    <ForgeAppBar href="/" on-forge-app-bar-navigate={handleHref} title-text="Tyler Forge™ - React Adapter" {...props}>
      <ForgeIcon slot="logo" name="tyler_talking_t_logo" />
    </ForgeAppBar>
  );
}

export default Header;
