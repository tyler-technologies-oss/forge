function previewAnnotations(entry = []) {
  return [...entry, require.resolve('./preset-preview-decorator-dialog-closer.mjs')];
}

module.exports = { previewAnnotations };
