import { findAllChildNodes, setAttr } from '../posthtml-helpers.mjs';

export default function transform(tree) {
  // Update the slot names for field-aware elements
  tree.match([{ tag: 'forge-text-field' }, { tag: 'forge-select' }], node => {
    const leadingSlotElements = findAllChildNodes(node, child => child.attrs?.slot === 'leading');
    if (leadingSlotElements) {
      leadingSlotElements.forEach(el => setAttr(el, 'slot', 'start'));
    }

    const trailingSlotElements = findAllChildNodes(node, child => child.attrs?.slot === 'trailing');
    if (trailingSlotElements) {
      trailingSlotElements.forEach(el => setAttr(el, 'slot', 'end'));
    }

    const addonEndSlotElements = findAllChildNodes(node, child => child.attrs?.slot === 'addon-end');
    if (addonEndSlotElements) {
      addonEndSlotElements.forEach(el => setAttr(el, 'slot', 'accessory'));
    }

    const helperTextElements = findAllChildNodes(node, child => child.attrs?.slot === 'helper-text');
    if (helperTextElements) {
      helperTextElements.forEach(el => setAttr(el, 'slot', 'support-text'));
    }

    return node;
  });
}
