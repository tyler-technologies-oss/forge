const OLD_PACKAGE = '@tylertech/forge-extended';

// Verified against `@tylertech/forge-extended`'s real exports and the (unreleased) migration of every
// extended component into `@tylertech/forge` (tyler-technologies-oss/forge#1217): all 16 entries below are
// 1:1 renames with no API changes — same class/tag/type names, just a new subpath-only home on
// `@tylertech/forge`. `isDefineFn` means the import is a `defineXComponent()` function whose call sites
// should be removed (side-effect imports register the element automatically on `@tylertech/forge`).
const COMPONENT_MAP = {
  // busy-indicator
  BusyIndicatorComponent: { path: '@tylertech/forge/busy-indicator' },
  BusyIndicatorComponentTagName: { path: '@tylertech/forge/busy-indicator' },
  BusyIndicatorMode: { path: '@tylertech/forge/busy-indicator' },
  BusyIndicatorVariant: { path: '@tylertech/forge/busy-indicator' },
  BusyIndicatorFocusMode: { path: '@tylertech/forge/busy-indicator' },
  defineBusyIndicatorComponent: { path: '@tylertech/forge/busy-indicator', isDefineFn: true },

  // footer
  FooterComponent: { path: '@tylertech/forge/footer' },
  FooterComponentTagName: { path: '@tylertech/forge/footer' },
  FooterLayout: { path: '@tylertech/forge/footer' },
  defineFooterComponent: { path: '@tylertech/forge/footer', isDefineFn: true },

  // footer/footer-item
  FooterItemComponent: { path: '@tylertech/forge/footer/footer-item' },
  FooterItemComponentTagName: { path: '@tylertech/forge/footer/footer-item' },
  defineFooterItemComponent: { path: '@tylertech/forge/footer/footer-item', isDefineFn: true },

  // app-layout
  AppLayoutComponent: { path: '@tylertech/forge/app-layout' },
  AppLayoutComponentTagName: { path: '@tylertech/forge/app-layout' },
  AppLayoutBreakpoint: { path: '@tylertech/forge/app-layout' },
  AppLayoutBreakpointChangeEventData: { path: '@tylertech/forge/app-layout' },
  AppLayoutDrawerChangeEventData: { path: '@tylertech/forge/app-layout' },
  APP_LAYOUT_CLOSE_ATTRIBUTE: { path: '@tylertech/forge/app-layout' },
  defineAppLayoutComponent: { path: '@tylertech/forge/app-layout', isDefineFn: true },

  // app-launcher
  AppLauncherComponent: { path: '@tylertech/forge/app-launcher' },
  AppLauncherComponentTagName: { path: '@tylertech/forge/app-launcher' },
  AppLauncherOption: { path: '@tylertech/forge/app-launcher' },
  AppView: { path: '@tylertech/forge/app-launcher' },
  defineAppLauncherComponent: { path: '@tylertech/forge/app-launcher', isDefineFn: true },

  // app-launcher/app-launcher-link
  AppLauncherLinkComponent: { path: '@tylertech/forge/app-launcher/app-launcher-link' },
  AppLauncherLinkComponentTagName: { path: '@tylertech/forge/app-launcher/app-launcher-link' },
  AppLauncherLink: { path: '@tylertech/forge/app-launcher/app-launcher-link' },
  defineAppLauncherLinkComponent: { path: '@tylertech/forge/app-launcher/app-launcher-link', isDefineFn: true },

  // confirmation-dialog
  ConfirmationDialogComponent: { path: '@tylertech/forge/confirmation-dialog' },
  ConfirmationDialogComponentTagName: { path: '@tylertech/forge/confirmation-dialog' },
  ConfirmationDialogActionEventReason: { path: '@tylertech/forge/confirmation-dialog' },
  ConfirmationDialogActionEventData: { path: '@tylertech/forge/confirmation-dialog' },
  ConfirmationDialogProperties: { path: '@tylertech/forge/confirmation-dialog' },
  defineConfirmationDialogComponent: { path: '@tylertech/forge/confirmation-dialog', isDefineFn: true },

  // count-card
  CountCardComponent: { path: '@tylertech/forge/count-card' },
  CountCardComponentTagName: { path: '@tylertech/forge/count-card' },
  CountCardTheme: { path: '@tylertech/forge/count-card' },
  defineCountCardComponent: { path: '@tylertech/forge/count-card', isDefineFn: true },

  // multi-select-header
  MultiSelectHeaderComponent: { path: '@tylertech/forge/multi-select-header' },
  MultiSelectHeaderComponentTagName: { path: '@tylertech/forge/multi-select-header' },
  defineMultiSelectHeaderComponent: { path: '@tylertech/forge/multi-select-header', isDefineFn: true },

  // quantity-field
  QuantityFieldComponent: { path: '@tylertech/forge/quantity-field' },
  QuantityFieldComponentTagName: { path: '@tylertech/forge/quantity-field' },
  defineQuantityFieldComponent: { path: '@tylertech/forge/quantity-field', isDefineFn: true },

  // responsive-toolbar
  ResponsiveToolbarComponent: { path: '@tylertech/forge/responsive-toolbar' },
  ResponsiveToolbarComponentTagName: { path: '@tylertech/forge/responsive-toolbar' },
  ResponsiveToolbarState: { path: '@tylertech/forge/responsive-toolbar' },
  ResponsiveToolbarUpdateEventData: { path: '@tylertech/forge/responsive-toolbar' },
  defineResponsiveToolbarComponent: { path: '@tylertech/forge/responsive-toolbar', isDefineFn: true },

  // structured-card
  StructuredCardComponent: { path: '@tylertech/forge/structured-card' },
  StructuredCardComponentTagName: { path: '@tylertech/forge/structured-card' },
  defineStructuredCardComponent: { path: '@tylertech/forge/structured-card', isDefineFn: true },

  // content-scaffold (structured-card's hard dependency)
  ContentScaffoldComponent: { path: '@tylertech/forge/content-scaffold' },
  ContentScaffoldComponentTagName: { path: '@tylertech/forge/content-scaffold' },
  defineContentScaffoldComponent: { path: '@tylertech/forge/content-scaffold', isDefineFn: true },

  // user-profile
  UserProfileComponent: { path: '@tylertech/forge/user-profile' },
  UserProfileComponentTagName: { path: '@tylertech/forge/user-profile' },
  defineUserProfileComponent: { path: '@tylertech/forge/user-profile', isDefineFn: true },

  // user-profile/profile-link
  ProfileLinkComponent: { path: '@tylertech/forge/user-profile/profile-link' },
  ProfileLinkComponentTagName: { path: '@tylertech/forge/user-profile/profile-link' },
  defineProfileLinkComponent: { path: '@tylertech/forge/user-profile/profile-link', isDefineFn: true },

  // theme-toggle (user-profile's hard dependency)
  ThemeToggleComponent: { path: '@tylertech/forge/theme-toggle' },
  ThemeToggleComponentTagName: { path: '@tylertech/forge/theme-toggle' },
  ThemeToggleTheme: { path: '@tylertech/forge/theme-toggle' },
  ThemeToggleUpdateEventData: { path: '@tylertech/forge/theme-toggle' },
  defineThemeToggleComponent: { path: '@tylertech/forge/theme-toggle', isDefineFn: true }
};

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const extendedImports = root.find(j.ImportDeclaration).filter(p => p.node.source.value === OLD_PACKAGE);
  if (extendedImports.size() === 0) {
    return file.source;
  }

  let changed = false;
  const unmappedNames = new Set();
  // path -> Map<importedName, localName>: class/type/interface names that must still be imported by
  // name (they're referenced as values or types elsewhere in the file, unlike defineXComponent() calls,
  // which only exist to trigger side-effect registration and can be dropped entirely).
  const namedSpecifiersByPath = new Map();
  // paths where nothing but a defineXComponent() import was found - these get a bare side-effect import.
  const sideEffectOnlyPaths = new Set();
  const importPlans = [];

  extendedImports.forEach(path => {
    const node = path.node;

    if (!node.specifiers || node.specifiers.length === 0) {
      console.log(
        `[warning] ${file.path}: found a side-effect import of '${OLD_PACKAGE}'. This must be split manually into the appropriate '@tylertech/forge/<component>' imports.`
      );
      return;
    }

    const remainingSpecifiers = [];

    node.specifiers.forEach(specifier => {
      const importedName = specifier.imported?.name ?? specifier.local.name;
      const mapping = COMPONENT_MAP[importedName];

      if (!mapping) {
        remainingSpecifiers.push(specifier);
        unmappedNames.add(importedName);
        return;
      }

      if (mapping.isDefineFn) {
        removeDefineFunctionCalls(j, root, specifier.local.name);
        if (!namedSpecifiersByPath.has(mapping.path)) {
          sideEffectOnlyPaths.add(mapping.path);
        }
        return;
      }

      sideEffectOnlyPaths.delete(mapping.path);
      if (!namedSpecifiersByPath.has(mapping.path)) {
        namedSpecifiersByPath.set(mapping.path, new Map());
      }
      namedSpecifiersByPath.get(mapping.path).set(importedName, specifier.local.name);
    });

    importPlans.push({ path, remainingSpecifiers, originalCount: node.specifiers.length });
  });

  if (unmappedNames.size) {
    console.log(
      `[warning] ${file.path}: left import(s) of [${[...unmappedNames].join(', ')}] from '${OLD_PACKAGE}' untouched — no verified equivalent in '@tylertech/forge'. Double-check these still exist before running the app.`
    );
  }

  if (namedSpecifiersByPath.size || sideEffectOnlyPaths.size) {
    const anchorPath = extendedImports.paths()[0];
    const allPaths = new Set([...namedSpecifiersByPath.keys(), ...sideEffectOnlyPaths]);

    [...allPaths].sort().forEach(importPath => {
      const names = namedSpecifiersByPath.get(importPath);
      if (names) {
        const specifiers = [...names.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([importedName, localName]) => j.importSpecifier(j.identifier(importedName), importedName === localName ? null : j.identifier(localName)));
        anchorPath.insertBefore(j.importDeclaration(specifiers, j.stringLiteral(importPath)));
      } else {
        anchorPath.insertBefore(j.importDeclaration([], j.stringLiteral(importPath)));
      }
    });
    changed = true;
  }

  importPlans.forEach(({ path, remainingSpecifiers, originalCount }) => {
    if (remainingSpecifiers.length === 0) {
      j(path).remove();
      changed = true;
    } else if (remainingSpecifiers.length !== originalCount) {
      path.node.specifiers = remainingSpecifiers;
      changed = true;
    }
  });

  return changed ? root.toSource() : file.source;
};

function removeDefineFunctionCalls(j, root, localName) {
  root.find(j.CallExpression, { callee: { name: localName } }).forEach(callPath => {
    const statementPath = j(callPath).closest(j.ExpressionStatement);
    if (statementPath.size()) {
      statementPath.remove();
    }
  });
}
