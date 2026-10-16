/**
 * Gets all content children that have a tag name.
 */
export function contentElements(node) {
  return node.content ? node.content.filter(child => !!child.tag) : [];
}

/**
 * Finds the first child node within the content of another node that matches the predicate.
 */
export function findChildNode(node, predicate) {
  const children = contentElements(node);
  for (const child of children) {
    if (predicate(child)) {
      return child;
    }
    const foundChild = findChildNode(child, predicate);
    if (foundChild) {
      return foundChild;
    }
  }
  return null;
}

/**
 * Finds all child nodes within the content of another node that match the predicate.
 */
export function findAllChildNodes(node, predicate) {
  const children = contentElements(node);
  const matchingChildren = [];
  for (const child of children) {
    if (predicate(child)) {
      matchingChildren.push(child);
    }
    matchingChildren.push(...findAllChildNodes(child, predicate));
  }
  return matchingChildren;
}

/**
 * Removes a node from its parent's content.
 */
export function removeNode(parent, node) {
  const index = parent.content.indexOf(node);
  if (index !== -1) {
    parent.content.splice(index, 1);

    // Remove sequential newlines caused by the node removal
    removeSequentialNewlines(parent);
  }
}

/**
 * Moves all children from one node to another.
 */
export function moveChildren(from, to) {
  if (!from.content) {
    return;
  }
  from.content.forEach(child => to.content.push(child));
}

/**
 * Creates an attribute on a node.
 */
export function setAttr(node, name, value) {
  if (!node.attrs) {
    node.attrs = {};
  }
  node.attrs[name] = value;
}

/**
 * Removes an attribute from a node.
 */
export function removeAttr(node, name) {
  if (node.attrs) {
    delete node.attrs[name];
  }
}

/**
 * Checks if a node has an attribute.
 */
export function hasAttr(node, name) {
  return node.attrs && node.attrs[name] !== undefined;
}

/**
 * Removes all sequential newlines from a node's content to avoid unnecessary
 * whitespace after a delete node operation.
 */
export function removeSequentialNewlines(node) {
  if (!node.content?.length) {
    return;
  }
  node.content = node.content.filter((child, index) => {
    if (index === 0) {
      return true;
    }
    const prevChild = node.content[index - 1];
    return !(typeof prevChild === 'string' && prevChild.trim() === '') || !(typeof child === 'string' && child.trim() === '');
  });
}

export function normalizeIndentation(node) {
  if (!node.content) {
    return;
  }
  node.content.forEach(child => {
    if (typeof child === 'string') {
      return;
    }
    normalizeIndentation(child);
  });
}
