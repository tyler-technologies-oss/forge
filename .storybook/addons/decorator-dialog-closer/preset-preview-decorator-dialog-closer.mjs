import { addons } from '@storybook/preview-api';
import { DOCS_RENDERED } from '@storybook/core-events';
import { deepQuerySelectorAll } from '@tylertech/forge-core';

addons.getChannel().on(DOCS_RENDERED, () => {
  // This is a workaround for a Storybook issue where <dialog> elements do not close when navigating to the docs page
  // Related: https://github.com/storybookjs/storybook/issues/16949
  const dialogs = deepQuerySelectorAll(document.body, 'dialog[open]');
  dialogs.forEach(dialog => dialog.close());
});
