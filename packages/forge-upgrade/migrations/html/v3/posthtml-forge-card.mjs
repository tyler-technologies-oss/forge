import matchHelper from 'posthtml-match-helper';
import { removeAttr, setAttr } from '../posthtml-helpers.mjs';

export default function transform(tree) {
  // Remove the `outlined` attribute from forge-card
  tree.match(matchHelper('forge-card[outlined]'), node => {
    removeAttr(node, 'outlined');
    return node;
  });

  // Change the `has-padding="false"` attribute to `no-padding`
  tree.match(matchHelper('forge-card[has-padding="false"]'), node => {
    removeAttr(node, 'has-padding');
    setAttr(node, 'no-padding', '');
    return node;
  });
}
