import matchHelper from 'posthtml-match-helper';
import { removeAttr, setAttr } from '../posthtml-helpers.mjs';

export default function transform(tree) {
  // Remove the label-value "dense" attribute in favor of "inline"
  tree.match(matchHelper('forge-label-value[dense]'), node => {
    setAttr(node, 'inline', '');
    removeAttr(node, 'dense');
    return node;
  });
}
