import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { defineComponents } from '@tylertech/forge';

// Subpath-only components (excluded from the main barrel to avoid tag collisions with @tylertech/forge-extended).
import '@tylertech/forge/app-launcher';
import '@tylertech/forge/app-layout';
import '@tylertech/forge/busy-indicator';
import '@tylertech/forge/confirmation-dialog';
import '@tylertech/forge/content-scaffold';
import '@tylertech/forge/count-card';
import '@tylertech/forge/footer';
import '@tylertech/forge/multi-select-header';
import '@tylertech/forge/quantity-field';
import '@tylertech/forge/responsive-toolbar';
import '@tylertech/forge/structured-card';
import '@tylertech/forge/theme-toggle';
import '@tylertech/forge/user-profile';

defineComponents();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
