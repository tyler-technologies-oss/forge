const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root.findJSXElements('ForgeButton').forEach(node => {
    removeNestedButton(j, node);
    updateSlotNames(j, node);
  });
  root.findJSXElements('forge-button').forEach(node => {
    removeNestedButton(j, node);
    updateSlotNames(j, node);
  });

  root.findJSXElements('ForgeIconButton').forEach(node => {
    removeNestedButton(j, node);
    if (helpers.hasAttribute(node.value, 'toggle')) {
      updateToggleIconButton(j, node.value);
    }
  });
  root.findJSXElements('forge-icon-button').forEach(node => {
    removeNestedButton(j, node);
    if (helpers.hasAttribute(node.value, 'toggle')) {
      updateToggleIconButton(j, node.value);
    }
  });

  root.findJSXElements('ForgeFAB').forEach(node => removeNestedButton(j, node));
  root.findJSXElements('forge-fab').forEach(node => removeNestedButton(j, node));
  return root.toSource();
};

function removeNestedButton(j, forgeElement) {
  // Ensure the button has a single nested button element
  const buttonElement = j(forgeElement).findJSXElements('button');
  if (!buttonElement || buttonElement.size() !== 1) {
    // No nested button element found, return the element as-is
    return forgeElement;
  }

  const forgeNode = forgeElement.value;
  const buttonNode = buttonElement.nodes()[0];

  // Translate the `type` attribute to the `variant` and `dense` attributes
  if (helpers.hasAttribute(forgeNode, 'type')) {
    const typeValue = helpers.getAttribute(forgeNode, 'type');

    if (typeValue.includes('dense')) {
      helpers.setAttribute(j, forgeNode, 'dense', true);
    }

    let variant = typeValue.replace(/-?dense/, '').trim();
    if (variant === 'unelevated') {
      variant = 'filled';
    }

    const validVariants = ['text', 'outlined', 'tonal', 'filled', 'raised', 'link'];
    if (!validVariants.includes(variant)) {
      variant = undefined;
    }

    if (variant) {
      helpers.setAttribute(j, forgeNode, 'variant', variant);
    }

    helpers.removeAttribute(forgeNode, 'type');
  }

  if (helpers.getAttribute(buttonNode, 'type') === 'button') {
    helpers.removeAttribute(buttonNode, 'type');
  }

  // Copy attributes from the nested button element to the forge element
  if (buttonNode.openingElement.attributes.length) {
    forgeNode.openingElement.attributes = [...forgeNode.openingElement.attributes, ...buttonNode.openingElement.attributes];
  }

  // Move all child nodes from the nested button element to the forge element
  helpers.moveChildren(buttonNode, forgeNode);

  // Remove the nested button element
  helpers.removeChild(forgeNode, buttonNode);

  // Return the modified element
  return forgeElement;
}

function updateToggleIconButton(j, forgeIconButton) {
  const jsxChildren = j(forgeIconButton).find(j.JSXElement).nodes();
  const onElements = helpers.findAllChildNodesWithAttribute(jsxChildren, 'forge-icon-button-on');
  if (onElements) {
    onElements.forEach(el => {
      helpers.setAttribute(j, el, 'slot', 'on');
      helpers.removeAttribute(el, 'forge-icon-button-on');
    });
  }

  if (helpers.hasAttribute(forgeIconButton, 'is-on')) {
    helpers.renameAttribute(forgeIconButton, 'is-on', 'on');
  }
}

function updateSlotNames(j, forgeButton) {
  const jsxChildren = j(forgeButton).find(j.JSXElement).nodes();

  const leadingElements = helpers.findAllChildNodesWithAttribute(jsxChildren, 'slot', 'leading');
  if (leadingElements) {
    leadingElements.forEach(el => helpers.setAttribute(j, el, 'slot', 'start'));
  }

  const trailingElements = helpers.findAllChildNodesWithAttribute(jsxChildren, 'slot', 'trailing');
  if (trailingElements) {
    trailingElements.forEach(el => helpers.setAttribute(j, el, 'slot', 'end'));
  }

  return forgeButton;
}
