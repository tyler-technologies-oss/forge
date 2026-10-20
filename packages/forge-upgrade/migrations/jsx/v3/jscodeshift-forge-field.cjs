const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root.findJSXElements('ForgeTextField').forEach(node => updateSlotNames(j, node));
  root.findJSXElements('forge-text-field').forEach(node => updateSlotNames(j, node));
  root.findJSXElements('ForgeSelect').forEach(node => updateSlotNames(j, node));
  root.findJSXElements('forge-select').forEach(node => updateSlotNames(j, node));
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

  const addonEndElements = helpers.findAllChildNodesWithAttribute(jsxChildElements, 'slot', 'addon-end');
  if (addonEndElements) {
    addonEndElements.forEach(el => helpers.setAttribute(j, el, 'slot', 'accessory'));
  }

  const helperTextElements = helpers.findAllChildNodesWithAttribute(jsxChildElements, 'slot', 'helper-text');
  if (helperTextElements) {
    helperTextElements.forEach(el => helpers.setAttribute(j, el, 'slot', 'support-text'));
  }

  return node;
}
