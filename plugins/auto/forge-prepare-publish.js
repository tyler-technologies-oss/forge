const fs = require('fs');
const path = require('path');
const forgeConfig = require('../../forge.json');
const ROOT = path.resolve(__dirname, '../../');
const DIST_PATH = path.join(ROOT, 'dist');

/**
 * This plugin is used to hook into the `auto` pipeline after the `shipit` command has completed.
 * 
 * This hook will allow us to access the new version that was calculated from `Auto` and use that
 * to update any necessary references in the project to complete deployment process, such as
 * ensuring that the exact version is used when publishing any subsequent assets for example.
 */
module.exports = class ForgePreparePublishPlugin {
  constructor() {
    this.name = 'forge-prepare-publish';
  }

  apply(auto) {
    // Tap into the `afterShipIt` hook to access the `newVersion` that was calculated.
    auto.hooks.afterShipIt.tap('ForgePreparePublishPlugin', opts => this.appendVersionNumber(auto, opts));
  }

  /**
   * Appends the new release version from Auto shipit to the CDN deployment directory
   */
  async appendVersionNumber(auto, { context, dryRun, newVersion }) {
    // We only run this plugin when creating a new "latest" release
    if (context !== 'latest') {
      auto.logger.log.info(`Skipping ${this.name}.`);
      return;
    }

    // Ensure the deployment path exists
    const deploymentPath = path.join(forgeConfig.build.static.distPath, forgeConfig.packageOrg, forgeConfig.packageName);
    if (!fs.existsSync(path.join(DIST_PATH, deploymentPath))) {
      auto.logger.log.error(`[${this.name}] Deployment path doesn't exist: ${deploymentPath}`);
      return process.exit(1);
    }
  
    // Concatenate the new version number to the existing deployment path
    // For example, this will update a path like "dist/path/to/package" to this "dist/path/to/package@1.0.0"
    const versionNumber = newVersion.replace(/^v?/, ''); // Remove leading "v" if exists
    const versionPath = `${deploymentPath.replace(/\/?$/, '')}@${versionNumber}`;

    // Stop early if this is a dry run
    if (dryRun) {
      auto.logger.log.info(`Would have updated CDN deployment path to: ${versionPath}`);
      return;
    }

    // Rename the deployment directory to the new path with the version suffix
    const currentDeploymentPath = path.join(DIST_PATH, deploymentPath);
    const newDeploymentPath = path.join(DIST_PATH, versionPath);
    fs.rename(currentDeploymentPath, newDeploymentPath, () => {
      if (err) {
        throw new Error('Unable to rename deployment path');
      }
    });

    auto.logger.log.success(`Renamed deployment path to: ${versionPath}`);
  }
};
