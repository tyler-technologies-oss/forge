module.exports = {
  hooks: {
    beforePacking(pkg) {
      // Remove
      delete pkg.scripts;
      delete pkg.devDependencies;
      delete pkg.overrides;
      delete pkg['lint-staged'];

      // Remove our custom "development" entries from "exports" fields
      if (pkg.exports) {
        for (const key in pkg.exports) {
          if (pkg.exports[key]?.development) {
            delete pkg.exports[key].development;
          }
        }
      }

      // Add
      pkg.publishedAt = new Date().toISOString();

      return pkg;
    }
  }
};
