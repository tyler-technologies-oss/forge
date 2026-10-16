const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root.findJSXElements('ForgeButtonToggle').forEach(node => updateLeadingTrailingSlots(j, node));
  root.findJSXElements('forge-button-toggle').forEach(node => updateLeadingTrailingSlots(j, node));
  return root.toSource();
};

function updateLeadingTrailingSlots(j, node) {
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
