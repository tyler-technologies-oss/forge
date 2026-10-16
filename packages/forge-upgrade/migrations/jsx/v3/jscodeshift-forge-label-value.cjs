const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root.findJSXElements('ForgeLabelValue').forEach(node => updateAttributes(node.value));
  root.findJSXElements('forge-label-value').forEach(node => updateAttributes(node.value));
  return root.toSource();
};

function updateAttributes(node) {
  // Rename "dense" attribute in favor of "inline"
  if (helpers.hasAttribute(node, 'dense')) {
    helpers.renameAttribute(node, 'dense', 'inline');
  }
}
