import { createContext } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ForgeCard } from '@tylertech/forge-react';
import './App.scss';
import Header from './core/header/Header';
import SideNav from './core/sidenav/SideNav';
import routeConfig, { IAppRoute } from './route-config';

export const TestContext = createContext(undefined as any);

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Header slot="header" />
      <SideNav slot="body-left" />
      <main slot="body" className="app-content">
        <TestContext.Provider value={{ value: 'Hello from TestContext!' }}>
          <div>
            <ForgeCard style={{ maxWidth: '960px', margin: '16px' }}>
              <Switch>
                <RouteConfigRenderer config={routeConfig} />
              </Switch>
            </ForgeCard>
          </div>
        </TestContext.Provider>
      </main>
    </BrowserRouter>
  );
}

function RouteConfigRenderer({ config }: { config: IAppRoute[] }): JSX.Element {
  return (
    <>
      {config.map(({ path, component, exact, routes }, i) => {
        if (!routes) {
          return <Route key={i} path={path} component={component} exact={exact} />;
        }

        const childRoutes = routes.map(r => ({ ...r, path: `${path}${r.path}` }));
        return <RouteConfigRenderer key={i} config={childRoutes} />;
      })}
    </>
  );
}

export default App;
