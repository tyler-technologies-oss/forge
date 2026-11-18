const PACKAGE_RENAMES = [
  ['@tylertech/forge-extended', '@tylertech/forge'],
  ['@tylertech/forge-extended-angular', '@tylertech/forge-angular'],
  ['@tylertech/forge-extended-react', '@tylertech/forge-react']
];
const DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'peerDependencies'];

/**
 * `@tylertech/forge-extended` (and its Angular/React wrapper packages) are being retired in favor of
 * `@tylertech/forge`/`@tylertech/forge-angular`/`@tylertech/forge-react`, which now ship every component
 * that used to live in the extended packages. Swaps each dependency entry in-place so it keeps its
 * position in whichever field it was declared in, rather than appending a new key at the end.
 */
module.exports = function transformPackageJson(pkg, { filePath, logWarn }) {
  let changed = false;

  PACKAGE_RENAMES.forEach(([oldPackage, newPackage]) => {
    DEPENDENCY_FIELDS.forEach(field => {
      const deps = pkg[field];
      if (!deps || !Object.prototype.hasOwnProperty.call(deps, oldPackage)) {
        return;
      }

      const oldVersion = deps[oldPackage];
      changed = true;

      if (Object.prototype.hasOwnProperty.call(deps, newPackage)) {
        delete deps[oldPackage];
        logWarn(
          `${filePath}: removed "${oldPackage}" from "${field}" — "${newPackage}" is already present at "${deps[newPackage]}". Verify that version includes the migrated components.`
        );
        return;
      }

      const rewritten = {};
      Object.keys(deps).forEach(key => {
        if (key === oldPackage) {
          rewritten[newPackage] = oldVersion;
        } else {
          rewritten[key] = deps[key];
        }
      });
      pkg[field] = rewritten;
      logWarn(
        `${filePath}: replaced "${oldPackage}"@"${oldVersion}" with "${newPackage}"@"${oldVersion}" in "${field}". Verify this version of "${newPackage}" includes the migrated components and bump if needed.`
      );
    });
  });

  return changed ? pkg : null;
};
