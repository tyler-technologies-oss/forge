import { addons } from 'storybook/manager-api';
import { STORY_CHANGED, STORY_ERRORED, STORY_MISSING } from 'storybook/internal/core-events';
import ReactGA from 'react-ga4';

addons.register('storybook/google-analytics', api => {
  // Do not do anything if running in localhost
  if (window.CONFIG_TYPE === 'DEVELOPMENT' || window.location.hostname === 'localhost') {
    console.warn('Google Analytics is disabled during development');
    return;
  }

  ReactGA.initialize('G-BX3LYZ2GHX');

  api.on(STORY_CHANGED, () => {
    const { path: page } = api.getUrlState();
    ReactGA.send({ hitType: 'pageview', page });
  });

  api.on(STORY_ERRORED, ({ description }) => {
    ReactGA.event('exception', {
      description,
      fatal: true
    });
  });

  api.on(STORY_MISSING, id => {
    ReactGA.event('exception', {
      description: `attempted to render ${id}, but it is missing`,
      fatal: false
    });
  });
});
