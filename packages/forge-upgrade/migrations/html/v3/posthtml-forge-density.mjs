import matchHelper from 'posthtml-match-helper';

export default function transform(tree) {
  // Update `density` attribute values
  tree.match(matchHelper('[density=roomy],[density=default],[density=dense]'), node => {
    if (node.attrs.density === 'roomy') {
      node.attrs.density = 'extra-large';
    } else if (node.attrs.density === 'dense') {
      node.attrs.dense = '';
      delete node.attrs.density;
    } else if (node.attrs.density === 'default') {
      delete node.attrs.density;
    }
    return node;
  });
}
