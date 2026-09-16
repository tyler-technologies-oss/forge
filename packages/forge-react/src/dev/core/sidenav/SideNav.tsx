import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IExpansionPanelComponent, IListItemSelectEventData, IconRegistry } from '@tylertech/forge';
import { tylIconHome, tylIconSettingsInputComponent, tylIconSettings } from '@tylertech/tyler-icons';
import { ForgeDrawer, ForgeExpansionPanel, ForgeIcon, ForgeList, ForgeListItem, ForgeOpenIcon } from '@tylertech/forge-react';
import routeConfig, { IAppRoute } from '../../route-config';

interface SideNavProps {
  slot: string;
}

function SideNav(props: PropsWithChildren<SideNavProps>): JSX.Element {
  const history = useHistory();
  const [selectedRoute, setSelectedRoute] = useState(history.location.pathname);

  useEffect(() => {
    IconRegistry.define([tylIconHome, tylIconSettingsInputComponent, tylIconSettings]);
  }, []);

  function onSelect(evt: CustomEvent<IListItemSelectEventData<string>>): void {
    if (evt.detail.value === undefined) {
      return;
    }
    setSelectedRoute(evt.detail.value);
  }

  return (
    <ForgeDrawer slot={props.slot}>
      <aside>
        <ForgeList navlist on-forge-list-item-select={onSelect} selectedValue={selectedRoute}>
          <SideNavRouterRenderer config={routeConfig} selectedRoute={selectedRoute} />
        </ForgeList>
      </aside>
    </ForgeDrawer>
  );
}

function SideNavRouterRenderer({ config, selectedRoute, parentRoute }: { config: IAppRoute[]; selectedRoute: string; parentRoute?: string }): JSX.Element {
  return (
    <>
      {config.map(({ path, icon, text, routes }, i) => {
        if (!routes) {
          const href = `${parentRoute || ''}${path}`;
          return (
            <ForgeListItem key={i} value={href} indented={!!parentRoute}>
              {icon && <ForgeIcon slot="start" name={icon} />}
              <Link to={href} aria-current={selectedRoute === href ? 'page' : undefined}>
                {text}
              </Link>
            </ForgeListItem>
          );
        }
        return <SideNavExpandableItem key={i} route={{ path, icon, text, routes }} selectedRoute={selectedRoute} />;
      })}
    </>
  );
}

function SideNavExpandableItem({ route, selectedRoute }: { route: IAppRoute; selectedRoute: string }): JSX.Element {
  const expPanelRef = useRef<IExpansionPanelComponent>();

  return (
    <ForgeExpansionPanel ref={expPanelRef} open={selectedRoute.startsWith(route.path) ? true : (expPanelRef.current?.open ?? false)}>
      <ForgeListItem slot="header">
        <ForgeIcon name={route.icon} slot="start" />
        <button>{route.text}</button>
        <ForgeOpenIcon slot="end" />
      </ForgeListItem>
      {route.routes && <SideNavRouterRenderer config={route.routes} selectedRoute={selectedRoute} parentRoute={route.path} />}
    </ForgeExpansionPanel>
  );
}

export default SideNav;
