module.exports = {
  hooks: {
    beforePacking(pkg) {
      // Remove
      delete pkg.scripts;
      delete pkg.devDependencies;
      delete pkg.overrides;
      delete pkg['lint-staged'];

      // Add
      pkg.publishedAt = new Date().toISOString();

      return pkg;
    }
  }
};
