module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const objectExpressions = root.find(j.ObjectExpression).nodes();

  // Find all dialog options objects that have either an escapeClose or backdropClose property set to false
  const dialogOptionsLikeObjects = objectExpressions.filter(node => {
    return node.properties.some(p => p.key && ['escapeClose', 'backdropClose'].includes(p.key.name) && p.value?.value === false);
  });

  dialogOptionsLikeObjects.forEach(opts => {
    // Add a persistent property to the options object
    opts.properties.push(j.property('init', j.identifier('persistent'), j.literal(true)));
  });

  // Remove any escapeClose or backdropClose properties
  objectExpressions.forEach(node => {
    const properties = node.properties.filter(p => p.key && ['escapeClose', 'backdropClose'].includes(p.key.name));
    if (properties.length > 0) {
      node.properties = node.properties.filter(p => !properties.includes(p));
    }
  });

  return root.toSource();
};
