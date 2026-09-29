import { generateReactAdapter } from '@tylertech/forge-adapter-codegen/react';

const { generated, backfilled, unwrapped } = generateReactAdapter({
  packageName: '@tylertech/forge-rich-text-editor',
  entryPoints: [
    { subpath: '', modulePrefix: 'src/lib/' },
    { subpath: 'features', modulePrefix: 'src/lib/features/' }
  ],
  // `content` accepts an HTML string or a ProseMirror document. React sets attribute-backed props
  // as attributes, which would stringify a document, so it has to be assigned as a property.
  propertyProps: {
    'forge-rich-text-editor': ['content'],
    'forge-rich-text-context': ['content']
  }
});

console.log(`Generated ${generated} React wrappers (backfilled ${backfilled} attributes, unwrapped ${unwrapped} event types).`);
