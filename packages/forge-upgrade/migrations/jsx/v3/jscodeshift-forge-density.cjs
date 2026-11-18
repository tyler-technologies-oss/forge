const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const allJsxElements = root.findJSXElements();

  // Find all JSX elements with a `density="roomy"` attribute and change it to `density="extra-large"`
  allJsxElements
    .filter(node => helpers.hasAttributeWithValue(node.value, 'density', 'roomy'))
    .forEach(node => helpers.setAttribute(j, node.value, 'density', 'extra-large'));

  // Find all JSX elements with a `density="dense"` attribute and change it to `dense={true}`
  allJsxElements
    .filter(node => helpers.hasAttributeWithValue(node.value, 'density', 'dense'))
    .forEach(node => {
      helpers.removeAttribute(node.value, 'density');
      helpers.setAttribute(j, node.value, 'dense', true);
    });

  // Find all JSX elements with a `density="default"` attribute and remove it
  allJsxElements
    .filter(node => helpers.hasAttributeWithValue(node.value, 'density', 'default'))
    .forEach(node => helpers.removeAttribute(node.value, 'density'));

  return root.toSource();
};
