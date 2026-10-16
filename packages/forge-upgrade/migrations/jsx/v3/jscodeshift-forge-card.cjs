const helpers = require('../jscodeshift-helpers.cjs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root.findJSXElements('ForgeCard').forEach(jsxEl => removeOutlinedAttribute(jsxEl));
  root.findJSXElements('forge-card').forEach(jsxEl => removeOutlinedAttribute(jsxEl));
  return root.toSource();
};

function removeOutlinedAttribute(jsxEl) {
  if (helpers.hasAttribute(jsxEl.value, 'outlined')) {
    helpers.removeAttribute(jsxEl.value, 'outlined');
  }
  return jsxEl;
}
