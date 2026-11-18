const rewritePackageImports = require('./package-import-rewrite.cjs');

const OLD_PACKAGE = '@tylertech/forge-extended-react';
const NEW_PACKAGE = '@tylertech/forge-react';

// Verified against the real generated output of both packages: every wrapper component and its prop-type
// interface keeps its exact name across the rename - `@tylertech/forge-extended-react` and
// `@tylertech/forge-react` share the same generator, so this is a pure package-name swap with no
// identifier changes, unlike the Angular wrapper (which drops an `Extended` prefix from module names).
const COMPONENTS = [
  'AppLauncher',
  'AppLauncherLink',
  'AppLayout',
  'BusyIndicator',
  'ConfirmationDialog',
  'ContentScaffold',
  'CountCard',
  'Footer',
  'FooterItem',
  'MultiSelectHeader',
  'ProfileLink',
  'QuantityField',
  'ResponsiveToolbar',
  'StructuredCard',
  'ThemeToggle',
  'UserProfile'
];

const COMPONENT_MAP = {};
COMPONENTS.forEach(name => {
  COMPONENT_MAP[`Forge${name}`] = `Forge${name}`;
  COMPONENT_MAP[`Forge${name}Props`] = `Forge${name}Props`;
});

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  return rewritePackageImports({
    j,
    root,
    file,
    oldPackage: OLD_PACKAGE,
    newPackage: NEW_PACKAGE,
    componentMap: COMPONENT_MAP,
    onUnmapped: names => {
      console.log(
        `[warning] ${file.path}: left import(s) of [${names.join(', ')}] from '${OLD_PACKAGE}' untouched — no verified equivalent in '${NEW_PACKAGE}'. Double-check these still exist before running the app.`
      );
    }
  });
};
