import matchHelper from 'posthtml-match-helper';
import { findChildNode, removeNode, moveChildren, hasAttr, findAllChildNodes } from '../posthtml-helpers.mjs';

export default function transform(tree) {
  // Toggle icon buttons
  tree.match(matchHelper('forge-icon-button[toggle]'), node => {
    const onElement = findChildNode(node, child => child.attrs && 'forge-icon-button-on' in child.attrs);
    if (onElement) {
      if (!onElement.attrs) {
        onElement.attrs = {};
      }
      onElement.attrs.slot = 'on';
      delete onElement.attrs['forge-icon-button-on'];
    }

    node.attrs.toggle = '';

    if (node.attrs?.['is-on']) {
      node.attrs.on = '';
      delete node.attrs['is-on'];
    }

    if (node.attrs?.['[isOn]']) {
      node.attrs['[on]'] = node.attrs['[isOn]'];
      delete node.attrs['[isOn]'];
    }

    return node;
  });

  // Remove nested <button> elements and move attributes and children to parent
  tree.match([{ tag: 'forge-button' }, { tag: 'forge-icon-button' }, { tag: 'forge-fab' }], node => {
    const nestedButton = findChildNode(node, child => child.tag === 'button');
    if (!nestedButton) {
      return node;
    }

    migrateButtonAttributes(node, nestedButton);

    // Copy all attributes from the nested button to the forge button
    if (nestedButton.attrs) {
      node.attrs = {
        ...node.attrs,
        ...nestedButton.attrs
      };
    }

    // Copy all nested children to the parent
    moveChildren(nestedButton, node);
    removeNode(node, nestedButton);

    return node;
  });

  // Nested anchors
  tree.match([{ tag: 'forge-button' }, { tag: 'forge-icon-button' }, { tag: 'forge-fab' }], node => {
    const nestedAnchor = findChildNode(node, child => child.tag === 'a');
    if (!nestedAnchor) {
      return node;
    }

    migrateButtonAttributes(node, nestedAnchor);

    if (!node.attrs) {
      node.attrs = {};
    }

    return node;
  });

  // Icon button density-level mapping
  tree.match(matchHelper('forge-icon-button[density-level]'), node => {
    if (hasAttr(node, 'density-level')) {
      const DENSITY_MAP = {
        1: 'large',
        2: 'medium',
        3: 'medium',
        4: 'small',
        5: 'small',
        6: 'small'
      };
      const newDensity = DENSITY_MAP[node.attrs['density-level']];
      if (!newDensity || newDensity === 'small') {
        node.attrs.dense = '';
      } else {
        node.attrs.density = newDensity;
      }
      delete node.attrs['density-level'];
    }
    return node;
  });

  // Rename leading and trailing slots to start and end
  tree.match({ tag: 'forge-button' }, node => {
    const slottedLeadingElements = findChildNode(node, child => child.attrs?.slot === 'leading');
    if (slottedLeadingElements) {
      slottedLeadingElements.attrs.slot = 'start';
    }

    const slottedTrailingElements = findChildNode(node, child => child.attrs?.slot === 'trailing');
    if (slottedTrailingElements) {
      slottedTrailingElements.attrs.slot = 'end';
    }

    return node;
  });

  // Move nested tooltips
  const searchContentForButtons = (node, tree) => {
    const children = tree ? Object.values(node).filter(value => !!value.content) : findAllChildNodes(node, child => child);
    children.forEach(child => {
      if (['forge-button', 'forge-icon-button', 'forge-fab'].includes(child.tag)) {
        moveTooltip(node, child);
      } else {
        searchContentForButtons(child);
      }
    });
  };
  const moveTooltip = (parent, button) => {
    const tooltip = findChildNode(button, child => child.tag === 'forge-tooltip');
    if (!tooltip) {
      return;
    }

    removeNode(button, tooltip);
    const index = parent.content?.indexOf(button) ?? parent.indexOf(button);
    parent.content?.splice(index + 1, 0, tooltip) ?? parent.splice(index + 1, 0, tooltip);
  };
  searchContentForButtons(tree, true);
}

function migrateButtonAttributes(node, nested) {
  // Translate the `type` attribute to the `variant` and `dense` attributes
  if (node.attrs?.type) {
    if (node.attrs['type'].includes('dense')) {
      node.attrs.dense = '';
    }

    let variant = node.attrs['type'].replace(/-?dense/, '').trim();
    if (variant === 'unelevated') {
      variant = 'filled';
    } else if (variant === 'dense') {
      variant = undefined;
    }

    const validVariants = ['text', 'outlined', 'tonal', 'filled', 'raised', 'link'];
    if (!validVariants.includes(variant)) {
      variant = undefined;
    }

    if (variant) {
      node.attrs.variant = variant;
    }
    delete node.attrs.type;
  }

  if (node.attrs?.['[type]']) {
    node.attrs['[variant]'] = node.attrs['[type]'];
    delete node.attrs['[type]'];
  }

  // Forge uses type="button" by default so remove the type attribute from the nested button
  if (nested.attrs?.type === 'button') {
    delete nested.attrs.type;
  }
}
