const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root
    .findJSXElements()
    .filter(node => helpers.hasClass(node.value, 'forge-typography'))
    .forEach(node => helpers.removeClass(node.value, 'forge-typography'));
  return root.toSource();
};
