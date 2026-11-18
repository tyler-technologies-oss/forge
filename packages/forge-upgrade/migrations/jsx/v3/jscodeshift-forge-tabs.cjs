const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.findJSXElements('ForgeTab').forEach(node => updateSlotNames(j, node));
  root.findJSXElements('forge-tab').forEach(node => updateSlotNames(j, node));

  return root.toSource();
};

function updateSlotNames(j, node) {
  const jsxChildElements = j(node).findJSXElements().nodes();

  const leadingElements = helpers.findAllChildNodesWithAttribute(jsxChildElements, 'slot', 'leading');
  if (leadingElements) {
    leadingElements.forEach(el => helpers.setAttribute(j, el, 'slot', 'start'));
  }

  const trailingElements = helpers.findAllChildNodesWithAttribute(jsxChildElements, 'slot', 'trailing');
  if (trailingElements) {
    trailingElements.forEach(el => helpers.setAttribute(j, el, 'slot', 'end'));
  }

  return node;
}
