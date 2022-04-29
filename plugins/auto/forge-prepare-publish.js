const path = require('path');
const { promises: { readdir, rename }, existsSync } = require('fs');
const forgeConfig = require('../../forge.json');
const ROOT = path.resolve(__dirname, '../../');
const DIST_PATH = path.join(ROOT, 'dist');

/**
 * This plugin is used to hook into the `auto` pipeline after the `shipit` command has completed.
 * 
 * This hook will allow us to access the new version that was calculated from `auto` and use that
 * to update any necessary references in the project to complete deployment process and ensure
 * that the exact version is used when publishing any subsequent assets.
 */
module.exports = class ForgePreparePublishPlugin {
  constructor() {
    this.name = 'forge-prepare-publish';
  }

  apply(auto) {
    // Tap into the `afterShipIt` hook to access the `newVersion` that was calculated.
    auto.hooks.afterShipIt.tap('ForgePreparePublishPlugin', async ({ context, dryRun, newVersion }) => {
      // We only run this plugin when creating a new "latest" release
      if (context !== 'latest') {
        console.log('Skipping ForgePreparePublishPlugin.');
        return;
      }

      // Build and ensure the deployment path exists
      const deploymentPath = path.join(forgeConfig.build.static.distPath, forgeConfig.packageOrg, forgeConfig.packageName);
      if (!existsSync(path.join(DIST_PATH, deploymentPath))) {
        console.error(`[ForgePreparePublishPlugin] Deployment path doesn't exist: ${deploymentPath}`);
        return;
      }
      
      // Get the version directory name from the CDN build output
      const subdirectories = await getDirectories(path.join(DIST_PATH, deploymentPath));
      const versionDirectoryName = subdirectories[0];

      // Ensure we have only 1 directory in the CDN build output (this will always be true in the CI environment)
      if (!subdirectories.length || subdirectories.length > 1 || !versionDirectoryName) {
        console.error(`[ForgePreparePublishPlugin] Unable to locate version directory in CDN deployment path: ${deploymentPath}`);
        return;
      }

      // Generate the existing version directory path
      const existingPath = path.join(DIST_PATH, deploymentPath, versionDirectoryName);
      
      // Stop early if this is a dry run
      if (dryRun) {
        console.log(`[ForgePreparePublishPlugin] Would have updated version number in CDN deployment path (${deploymentPath}) to ${newVersion}.`);
        return;
      }

      // Rename the version directory name to use the new version from the shipit output to ensure a 1:1 match between CDN and npm package
      const newPath = path.join(DIST_PATH, deploymentPath, newVersion);
      await rename(existingPath, newPath);

      console.log(`[ForgePreparePublishPlugin] Renamed deployment path to: ${newPath}`);
    });
  }
};

/** Gets all directory names in the provided `source` directory. */
async function getDirectories(source) {
  return (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}
