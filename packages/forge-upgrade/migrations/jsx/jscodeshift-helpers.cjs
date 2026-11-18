/** Checks if a node has a specific attribute by name. */
exports.hasAttribute = function (node, name) {
  return node.openingElement.attributes.some(attr => attr.name.name === name);
};

/** Checks if a node has a specific attribute by name and value. */
exports.hasAttributeWithValue = function (node, name, value) {
  return node.openingElement.attributes.some(attr => {
    if (!attr?.name) {
      return false;
    }
    return attr.name.name === name && attr.value.value === value;
  });
};

/** Removes an attribute by name from a node. */
exports.removeAttribute = function (node, name) {
  node.openingElement.attributes = node.openingElement.attributes.filter(attr => attr.name.name !== name);
};

exports.renameAttribute = function (node, oldName, newName) {
  const attribute = node.openingElement.attributes.find(attr => attr.name.name === oldName);
  if (attribute) {
    attribute.name.name = newName;
  }
};

/** Sets an attribute on a node. */
exports.setAttribute = function (j, node, name, value) {
  switch (typeof value) {
    case 'string':
      value = j.stringLiteral(value);
      break;
    case 'boolean':
      value = j.jsxExpressionContainer(j.booleanLiteral(value));
      break;
    case 'number':
      value = j.jsxExpressionContainer(j.numericLiteral(value));
      break;
    case 'object':
      value = j.jsxExpressionContainer(value);
      break;
    default:
      throw new Error(`Unsupported value type: ${typeof value}`);
  }

  const attribute = node.openingElement.attributes.find(attr => attr.name.name === name);
  if (attribute) {
    attribute.value = value;
  } else {
    node.openingElement.attributes.push(j.jsxAttribute(j.jsxIdentifier(name), value));
  }
};

/** Gets the value of an attribute on a node. */
exports.getAttribute = function (node, name) {
  const attribute = node.openingElement.attributes.find(attr => attr.name.name === name);
  return attribute?.value?.value ?? attribute?.value?.expression ?? null;
};

/** Moves all children from a source node to a target node. */
exports.moveChildren = function (sourceNode, targetNode) {
  targetNode.children = [...sourceNode.children];
};

/** Removes a child node from a parent node. */
exports.removeChild = function (parentNode, childNode) {
  parentNode.children = parentNode.children.filter(child => child !== childNode);
};

/** Finds all child nodes that have a matching attribute. */
exports.findAllChildNodesWithAttribute = function (jsxNodes, attrName, attrValue) {
  return jsxNodes.filter(child => {
    const attrs = child.openingElement.attributes;
    if (attrValue !== undefined) {
      return attrs.some(attr => attr.name.name === attrName && attr.value.value === attrValue);
    }
    return attrs.some(attr => attr.name.name === attrName);
  });
};

exports.hasClass = function (node, className) {
  return node.openingElement.attributes.some(attr => {
    return (attr.name.name === 'className' || attr.name.name === 'class') && attr.value.value.includes(className);
  });
};

exports.removeClass = function (node, className) {
  node.openingElement.attributes.forEach(attr => {
    if ((attr.name.name === 'className' || attr.name.name === 'class') && attr.value.value.includes(className)) {
      attr.value.value = attr.value.value.replace(className, '');
      attr.value.value = attr.value.value.replace(/\s+/g, '').trim();
      if (attr.value.value === '') {
        exports.removeAttribute(node, attr.name.name);
      }
    }
  });
};
