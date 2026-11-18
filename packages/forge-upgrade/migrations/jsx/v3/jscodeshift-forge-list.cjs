const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root.findJSXElements('ForgeList').forEach(node => updateAttributes(node.value));
  root.findJSXElements('forge-list').forEach(node => updateAttributes(node.value));

  root.findJSXElements('ForgeListItem').forEach(node => updateSlotNames(j, node));
  root.findJSXElements('forge-list-item').forEach(node => updateSlotNames(j, node));

  root.findJSXElements('ForgeDrawer').forEach(node => addNavlistAttribute(j, node));
  root.findJSXElements('forge-drawer').forEach(node => addNavlistAttribute(j, node));
  root.findJSXElements('ForgeMiniDrawer').forEach(node => addNavlistAttribute(j, node));
  root.findJSXElements('forge-mini-drawer').forEach(node => addNavlistAttribute(j, node));
  root.findJSXElements('ForgeModalDrawer').forEach(node => addNavlistAttribute(j, node));
  root.findJSXElements('forge-modal-drawer').forEach(node => addNavlistAttribute(j, node));

  return root.toSource();
};

function updateAttributes(node) {
  if (helpers.hasAttribute(node, 'static')) {
    helpers.removeAttribute(node, 'static');
  }
  return node;
}

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

  const titleElements = helpers.findAllChildNodesWithAttribute(jsxChildElements, 'slot', 'title');
  if (titleElements) {
    titleElements.forEach(el => helpers.removeAttribute(el, 'slot'));
  }

  const subtitleElements = helpers.findAllChildNodesWithAttribute(jsxChildElements, 'slot', 'subtitle');
  if (subtitleElements) {
    subtitleElements.forEach(el => helpers.setAttribute(j, el, 'slot', 'secondary-text'));
  }

  const tertiaryTitleElements = helpers.findAllChildNodesWithAttribute(jsxChildElements, 'slot', 'tertiary-title');
  if (tertiaryTitleElements) {
    tertiaryTitleElements.forEach(el => helpers.setAttribute(j, el, 'slot', 'tertiary-text'));
  }

  const avatarElements = helpers.findAllChildNodesWithAttribute(jsxChildElements, 'slot', 'avatar');
  if (avatarElements) {
    avatarElements.forEach(el => helpers.setAttribute(j, el, 'slot', 'leading'));
  }

  return node;
}

function addNavlistAttribute(j, node) {
  const jsxElements = j(node).findJSXElements().nodes();
  const listElements = jsxElements.filter(child => child.openingElement.name.name === 'ForgeList' || child.openingElement.name.name === 'forge-list');
  if (listElements) {
    listElements
      .filter(el => !helpers.hasAttribute(el, 'navlist'))
      .forEach(el => helpers.setAttribute(j, el, 'navlist', el.openingElement.name.name === 'ForgeList' ? true : ''));
  }
}
