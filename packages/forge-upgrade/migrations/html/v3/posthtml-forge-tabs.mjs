import { findAllChildNodes, setAttr } from '../posthtml-helpers.mjs';

export default function transform(tree) {
  // Slot adjustments
  tree.match({ tag: 'forge-tab' }, node => {
    // Rename the "leading" slot to "start"
    const slottedLeadingElements = findAllChildNodes(node, child => child.attrs?.slot === 'leading');
    if (slottedLeadingElements) {
      slottedLeadingElements.forEach(el => setAttr(el, 'slot', 'start'));
    }

    // Rename the "trailing" slot to "end"
    const slottedTrailingElements = findAllChildNodes(node, child => child.attrs?.slot === 'trailing');
    if (slottedTrailingElements) {
      slottedTrailingElements.forEach(el => setAttr(el, 'slot', 'end'));
    }

    return node;
  });
}
