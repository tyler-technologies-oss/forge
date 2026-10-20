import { setAttr, hasAttr, removeAttr } from '../posthtml-helpers.mjs';

export default function transform(tree) {
  tree.match({ tag: 'forge-tooltip' }, node => {
    // Rename the "target" attribute to "anchor"
    if (hasAttr(node, 'target')) {
      const value = node.attrs['target'].replace(/^#/g, '');
      setAttr(node, 'anchor', value);
      removeAttr(node, 'target');
    }

    // Rename the "position" attribute to "placement"
    if (hasAttr(node, 'position')) {
      setAttr(node, 'placement', node.attrs['position']);
      removeAttr(node, 'position');
    }

    return node;
  });
}
