import { findAllChildNodes, setAttr } from '../posthtml-helpers.mjs';

export default function transform(tree) {
  // Update the leading/trailing slot names to start/end
  tree.match({ tag: 'forge-badge' }, node => {
    const leadingElements = findAllChildNodes(node, child => child.attrs?.slot === 'leading');
    if (leadingElements.length) {
      leadingElements.forEach(el => setAttr(el, 'slot', 'start'));
    }

    const trailingElements = findAllChildNodes(node, child => child.attrs?.slot === 'trailing');
    if (trailingElements) {
      trailingElements.forEach(el => setAttr(el, 'slot', 'end'));
    }

    return node;
  });
}
