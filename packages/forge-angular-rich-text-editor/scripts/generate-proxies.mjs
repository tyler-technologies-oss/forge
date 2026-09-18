import { generateAngularAdapter } from '@tylertech/forge-adapter-codegen/angular';

const { generated, passes } = generateAngularAdapter({
  packageName: '@tylertech/forge-rich-text-editor',
  project: 'forge-angular-rich-text-editor',
  entryPoints: [
    { subpath: '', modulePrefix: 'src/lib/' },
    { subpath: 'features', modulePrefix: 'src/lib/features/' }
  ],
  aggregateModule: { className: 'ForgeRteModule', fileName: 'rte.module.ts' }
});

console.log(`Generated ${generated} Angular proxies across ${passes} schematic passes.`);
