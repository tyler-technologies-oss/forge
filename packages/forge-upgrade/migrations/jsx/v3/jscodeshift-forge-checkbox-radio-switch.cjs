const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root.findJSXElements('ForgeCheckbox').forEach(node => removeNestedInput(j, node));
  root.findJSXElements('forge-checkbox').forEach(node => removeNestedInput(j, node));

  root.findJSXElements('ForgeRadio').forEach(node => removeNestedInput(j, node));
  root.findJSXElements('forge-radio').forEach(node => removeNestedInput(j, node));

  root
    .findJSXElements('ForgeSwitch')
    .filter(node => helpers.hasAttribute(node.value, 'selected'))
    .forEach(node => renameSelectedAttribute(node));
  root
    .findJSXElements('forge-switch')
    .filter(node => helpers.hasAttribute(node.value, 'selected'))
    .forEach(node => renameSelectedAttribute(node));
  return root.toSource();
};

function removeNestedInput(j, forgeElement) {
  const forgeNode = forgeElement.value;

  // Ensure the button has a single nested button element
  const inputElements = j(forgeElement).findJSXElements('input');
  if (inputElements?.size()) {
    const inputNode = inputElements.nodes()[0];

    // Copy attributes from the nested button element to the forge element
    if (inputNode.openingElement.attributes.length) {
      forgeNode.openingElement.attributes = [...forgeNode.openingElement.attributes, ...inputNode.openingElement.attributes];
    }

    // Remove the type attribute from the forge element
    helpers.removeAttribute(forgeNode, 'type');

    // Remove the nested input element
    helpers.removeChild(forgeNode, inputNode);
  }

  // Remove nested label and move children to parent
  const labelElements = j(forgeElement).findJSXElements('label');
  if (labelElements?.size()) {
    const labelNode = labelElements.nodes()[0];

    // Move all children from the nested label to the forge element
    helpers.moveChildren(labelNode, forgeNode);
    helpers.removeChild(forgeNode, labelNode);
  }

  return forgeElement;
}

function renameSelectedAttribute(node) {
  helpers.renameAttribute(node.value, 'selected', 'on');
  return node;
}
