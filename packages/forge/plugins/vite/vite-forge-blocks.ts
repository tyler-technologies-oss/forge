import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';

const VIRTUAL_MODULE_ID = 'virtual:forge-blocks';
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;
const FRAME_ROUTE = '/blocks-frame/';
const DEMO_FILE_NAME = 'demo.html';
const BLOCK_NAME_PATTERN = /@block\s+(.+)/;
const BLOCK_DESCRIPTION_PATTERN = /@description\s+(.+)/;
const BLOCK_TAGS_PATTERN = /@tags\s+(.+)/;
const LEADING_COMMENT_PATTERN = /^\s*<!--[\s\S]*?-->\s*/;
const NAME_SUFFIX_PATTERN = /\s+—\s+Demo$/;

export interface IForgeBlockOptions {
  /** Absolute path to the `blocks/src/blocks/components` directory. */
  componentsPath: string;
  /** Absolute path to the docs component content directory, used to look up each component's category. */
  docsComponentsPath: string;
  /** The module that each frame loads to register components, icons, and styles. */
  frameEntry: string;
}

export interface IForgeBlock {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  url: string;
}

interface IBlockSource extends IForgeBlock {
  htmlPath: string;
  scriptPath?: string;
}

const UNCATEGORIZED = 'other';

/** Blocks whose folder name differs from their docs page slug, or that have no docs page yet. */
const CATEGORY_OVERRIDES: Record<string, string> = {
  backdrop: 'feedback',
  'bottom-sheet': 'feedback',
  breadcrumb: 'navigation',
  chips: 'actions',
  'confirmation-dialog': 'feedback',
  'count-card': 'data-display',
  field: 'forms',
  'floating-action-button': 'actions',
  'focus-indicator': 'utilities',
  footer: 'layout',
  listbox: 'forms',
  'multi-select-header': 'data-display',
  'open-icon': 'utilities',
  overlay: 'utilities',
  'process-stepper': 'navigation',
  'quantity-field': 'forms',
  'responsive-toolbar': 'layout',
  'state-layer': 'utilities',
  'theme-toggle': 'actions',
  'user-profile': 'navigation'
};

function findDemoFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return findDemoFiles(path);
    }
    return entry.name === DEMO_FILE_NAME ? [path] : [];
  });
}

function readDocsCategory(docsComponentsPath: string, slug: string): string | undefined {
  const usagePath = join(docsComponentsPath, slug, 'usage.mdx');
  if (!existsSync(usagePath)) {
    return undefined;
  }
  return readFileSync(usagePath, 'utf-8').match(/^category:\s*(\S+)/m)?.[1];
}

function discoverBlocks({ componentsPath, docsComponentsPath }: IForgeBlockOptions): IBlockSource[] {
  return findDemoFiles(componentsPath)
    .map(htmlPath => {
      const source = readFileSync(htmlPath, 'utf-8');
      const segments = relative(componentsPath, htmlPath).split(sep).slice(0, -2);
      const id = segments.join('/');
      const scriptPath = htmlPath.replace(/\.html$/, '.ts');
      const category = segments.map(slug => CATEGORY_OVERRIDES[slug] ?? readDocsCategory(docsComponentsPath, slug)).find(Boolean) ?? UNCATEGORIZED;
      return {
        id,
        name: (source.match(BLOCK_NAME_PATTERN)?.[1] ?? id).trim().replace(NAME_SUFFIX_PATTERN, ''),
        description: source.match(BLOCK_DESCRIPTION_PATTERN)?.[1].trim() ?? '',
        tags: (source.match(BLOCK_TAGS_PATTERN)?.[1] ?? '')
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
        category,
        url: `${FRAME_ROUTE}${id}`,
        htmlPath,
        scriptPath: existsSync(scriptPath) ? scriptPath : undefined
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function renderFrame(block: IBlockSource, frameEntry: string): string {
  const body = readFileSync(block.htmlPath, 'utf-8').replace(LEADING_COMMENT_PATTERN, '');
  const blockScript = block.scriptPath ? `<script type="module" src="/@fs/${block.scriptPath}"></script>` : '';
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${block.name}</title>
    <link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
    <script type="module" src="${frameEntry}"></script>
    ${blockScript}
  </head>
  <body>
    ${body}
  </body>
</html>`;
}

/**
 * Serves each component demo block from the `blocks` package as a standalone document that the
 * dev site embeds in an iframe, and exposes the list of blocks as the `virtual:forge-blocks` module.
 *
 * Each block renders in its own document because block scripts query the whole document and some
 * blocks share element ids or render open overlays, which would collide on a single page.
 */
export default function ViteForgeBlocks(options: IForgeBlockOptions): Plugin {
  const componentsPath = resolve(options.componentsPath);
  const findBlock = (id: string): IBlockSource | undefined => discoverBlocks(options).find(block => block.id === id);

  return {
    name: 'forge:blocks',
    resolveId(id) {
      return id === VIRTUAL_MODULE_ID ? RESOLVED_VIRTUAL_MODULE_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) {
        return undefined;
      }
      const blocks: IForgeBlock[] = discoverBlocks(options).map(({ htmlPath: _htmlPath, scriptPath: _scriptPath, ...block }) => block);
      return `export default ${JSON.stringify(blocks)};`;
    },
    configureServer(server: ViteDevServer) {
      server.watcher.add(componentsPath);
      server.watcher.on('all', (_event, path) => {
        if (!path.startsWith(componentsPath) || !path.endsWith(DEMO_FILE_NAME)) {
          return;
        }
        const module = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
        if (module) {
          server.moduleGraph.invalidateModule(module);
        }
        server.ws.send({ type: 'full-reload' });
      });

      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split('?')[0];
        if (!pathname?.startsWith(FRAME_ROUTE)) {
          next();
          return;
        }
        const block = findBlock(decodeURIComponent(pathname.slice(FRAME_ROUTE.length)).replace(/\/$/, ''));
        if (!block) {
          res.statusCode = 404;
          res.end('Block not found');
          return;
        }
        const html = await server.transformIndexHtml(req.url ?? pathname, renderFrame(block, options.frameEntry));
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
      });
    }
  };
}
