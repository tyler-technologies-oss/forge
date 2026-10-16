import { setAttr, findAllChildNodes } from '../posthtml-helpers.mjs';

export default function transform(tree) {
  // Rename the leading/trailing slots to start/end
  tree.match({ tag: 'forge-button-toggle' }, node => {
    const slottedLeadingElements = findAllChildNodes(node, child => child.attrs?.slot === 'leading');
    if (slottedLeadingElements) {
      slottedLeadingElements.forEach(el => setAttr(el, 'slot', 'start'));
    }

    const slottedTrailingElements = findAllChildNodes(node, child => child.attrs?.slot === 'trailing');
    if (slottedTrailingElements) {
      slottedTrailingElements.forEach(el => setAttr(el, 'slot', 'end'));
    }

    return node;
  });
}
