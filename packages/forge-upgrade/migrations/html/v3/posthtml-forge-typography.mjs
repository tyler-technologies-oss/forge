import matchHelper from 'posthtml-match-helper';
import parseAttrs from 'posthtml-attrs-parser';

export default function transform(tree) {
  tree.match(matchHelper('.forge-typography'), node => {
    const el = node;
    let attrs = parseAttrs(el.attrs);
    attrs.class = attrs.class.filter(a => a !== 'forge-typography');
    node.attrs = attrs.compose();
    return node;
  });
}
