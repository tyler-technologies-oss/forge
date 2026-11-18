const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root.findJSXElements('ForgeTooltip').forEach(node => updateAttributes(j, node.value));
  root.findJSXElements('forge-tooltip').forEach(node => updateAttributes(j, node.value));
  return root.toSource();
};

function updateAttributes(j, node) {
  if (helpers.hasAttribute(node, 'target')) {
    helpers.renameAttribute(node, 'target', 'anchor');

    let value = helpers.getAttribute(node, 'anchor');

    if (value) {
      if (typeof value === 'string' && value.startsWith('#')) {
        value = value.substring(1);
      }
      helpers.setAttribute(j, node, 'anchor', value);
    }
  }

  if (helpers.hasAttribute(node, 'position')) {
    helpers.renameAttribute(node, 'position', 'placement');
  }
}
