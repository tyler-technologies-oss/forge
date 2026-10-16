const rewritePackageImports = require('./package-import-rewrite.cjs');

const OLD_PACKAGE = '@tylertech/forge-extended-angular';
const NEW_PACKAGE = '@tylertech/forge-angular';

// Verified against the real generated output of both packages (angular-custom-elements-schematic): every
// `NgModule` drops the `Extended` prefix (`ForgeExtendedXModule` -> `ForgeXModule`); every `Component`,
// `Service`, and `Ref` class keeps its exact name, just moving to the new package.
//
// `ForgeExtendedContentScaffoldModule`/`ContentScaffoldComponent` and `ForgeExtendedThemeToggleModule`/
// `ThemeToggleComponent` are intentionally omitted: those two are hard dependencies of structured-card and
// user-profile respectively, generated into the package but never re-exported from its public API on
// either side, so there's nothing a consumer could have imported to migrate.
//
// `ForgeExtendedConfirmationDialogProxyModule`, `ForgeExtendedBusyIndicatorProxyModule`, and
// `ForgeExtendedModule` (the package-wide catch-all) have no equivalent on `@tylertech/forge-angular` and
// are left unmapped - they fall through to the "unmapped, left untouched" warning below for manual review.
const COMPONENT_MAP = {
  ForgeExtendedAppLauncherModule: 'ForgeAppLauncherModule',
  AppLauncherComponent: 'AppLauncherComponent',

  ForgeExtendedAppLauncherLinkModule: 'ForgeAppLauncherLinkModule',
  AppLauncherLinkComponent: 'AppLauncherLinkComponent',

  ForgeExtendedAppLayoutModule: 'ForgeAppLayoutModule',
  AppLayoutComponent: 'AppLayoutComponent',

  ForgeExtendedBusyIndicatorModule: 'ForgeBusyIndicatorModule',
  BusyIndicatorComponent: 'BusyIndicatorComponent',
  BusyIndicatorRef: 'BusyIndicatorRef',
  BusyIndicatorService: 'BusyIndicatorService',

  ForgeExtendedConfirmationDialogModule: 'ForgeConfirmationDialogModule',
  ConfirmationDialogComponent: 'ConfirmationDialogComponent',
  ConfirmationDialogRef: 'ConfirmationDialogRef',
  ConfirmationDialogService: 'ConfirmationDialogService',

  ForgeExtendedCountCardModule: 'ForgeCountCardModule',
  CountCardComponent: 'CountCardComponent',

  ForgeExtendedFooterModule: 'ForgeFooterModule',
  FooterComponent: 'FooterComponent',

  ForgeExtendedFooterItemModule: 'ForgeFooterItemModule',
  FooterItemComponent: 'FooterItemComponent',

  ForgeExtendedMultiSelectHeaderModule: 'ForgeMultiSelectHeaderModule',
  MultiSelectHeaderComponent: 'MultiSelectHeaderComponent',

  ForgeExtendedProfileLinkModule: 'ForgeProfileLinkModule',
  ProfileLinkComponent: 'ProfileLinkComponent',

  ForgeExtendedQuantityFieldModule: 'ForgeQuantityFieldModule',
  QuantityFieldComponent: 'QuantityFieldComponent',

  ForgeExtendedResponsiveToolbarModule: 'ForgeResponsiveToolbarModule',
  ResponsiveToolbarComponent: 'ResponsiveToolbarComponent',

  ForgeExtendedStructuredCardModule: 'ForgeStructuredCardModule',
  StructuredCardComponent: 'StructuredCardComponent',

  ForgeExtendedUserProfileModule: 'ForgeUserProfileModule',
  UserProfileComponent: 'UserProfileComponent'
};

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
