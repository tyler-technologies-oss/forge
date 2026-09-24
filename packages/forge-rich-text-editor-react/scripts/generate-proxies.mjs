import { generateReactAdapter } from '@tylertech/forge-adapter-codegen/react';

const { generated, backfilled, unwrapped } = generateReactAdapter({
  packageName: '@tylertech/forge-rich-text-editor',
  entryPoints: [
    { subpath: '', modulePrefix: 'src/lib/' },
    { subpath: 'features', modulePrefix: 'src/lib/features/' }
  ]
});

console.log(`Generated ${generated} React wrappers (backfilled ${backfilled} attributes, unwrapped ${unwrapped} event types).`);
