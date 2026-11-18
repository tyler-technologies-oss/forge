import matchHelper from 'posthtml-match-helper';
import { findChildNode, removeNode, moveChildren } from '../posthtml-helpers.mjs';

export default function transform(tree) {
  // Remove nested input and move attributes to parent
  tree.match([{ tag: 'forge-checkbox' }, { tag: 'forge-radio' }], node => {
    const nestedInput = node.content?.find(child => child.tag === 'input');
    if (!nestedInput) {
      return node;
    }

    // Copy all attributes from the nested input to the forge checkbox/radio
    if (nestedInput.attrs) {
      node.attrs = {
        ...node.attrs,
        ...nestedInput.attrs
      };
    }

    // Remove the type attribute from the parent
    delete node.attrs.type;

    // Copy all nested children to the parent
    moveChildren(nestedInput, node);

    // Remove the nested input
    removeNode(node, nestedInput);

    return node;
  });

  // Remove nested label and move children to parent
  tree.match([{ tag: 'forge-checkbox' }, { tag: 'forge-radio' }], node => {
    const nestedLabel = findChildNode(node, child => child.tag === 'label');
    if (!nestedLabel) {
      return node;
    }

    // Copy all nested children to the parent
    moveChildren(nestedLabel, node);
    removeNode(node, nestedLabel);

    return node;
  });

  // Rename switch "selected" attribute to "on"
  tree.match(matchHelper('forge-switch[selected]'), node => {
    delete node.attrs.selected;
    node.attrs.on = '';
    return node;
  });
}
