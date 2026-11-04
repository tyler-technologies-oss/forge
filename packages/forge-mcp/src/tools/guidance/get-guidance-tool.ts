import { CallToolResult, Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { GuidanceManifest, GuidancePage, getGuidanceManifest, getGuidancePage, getGuidanceRulesMd, getGuidanceUrl } from '../../services/guidance-service.js';
import { getTemplateEngine } from '../../services/handlebars-template-engine.js';
import { getCEMLoader } from '../../services/cem-loader.js';

export interface GetGuidanceInput extends ToolInput {
  topic?: string;
}

const RULES_TOPIC = 'rules';

const SECTIONS = [
  { key: 'guides', title: 'Guides' },
  { key: 'components', title: 'Components' },
  { key: 'design', title: 'Design' },
  { key: 'development', title: 'Development' }
] as const;

interface IndexedPage extends GuidancePage {
  topic: string;
  isComponent: boolean;
}

const toTopic = (docsPath: string): string => docsPath.replace(/\.md$/, '');

/** `components/card`, `../design/typography.md`, `references/ui-plan.md#purpose` → `design/typography`, `ui-plan`, … */
export function normalizeTopic(topic: string): string {
  return topic
    .trim()
    .replace(/[#?].*$/, '')
    .replace(/^(\.{1,2}\/)+/, '')
    .replace(/^references\//, '')
    .replace(/\.md$/, '')
    .replace(/\/+$/, '')
    .toLowerCase();
}

export class GetGuidanceTool extends BaseToolHandler<GetGuidanceInput> {
  private _templateEngine = getTemplateEngine();

  constructor() {
    super(
      'get_forge_guidance',
      'Get Forge design system guidance generated from the docs site: component usage rules, design guides (layout, typography, color, spacing), and developer guides (installation, frameworks, theming). Call with no topic for the index of every page, then with a topic such as "components/card" or "design/typography" to read one. Use it for usage rules and design decisions; markup comes from get_forge_blocks and the API from get_component_docs.'
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description:
              'Page to read, as listed in the index: "rules", "anti-patterns", "ui-plan", "components/<name>", "design/<name>", or "development/<name>" (e.g. "development/frameworks/react"). A bare name such as "card" also works when it is unambiguous. Omit to list every page.'
          }
        },
        required: []
      }
    };
  }

  public async execute(args: GetGuidanceInput): Promise<CallToolResult> {
    const topic = args.topic ? normalizeTopic(args.topic) : '';

    try {
      if (topic === RULES_TOPIC) {
        return this._createTextResponse(await getGuidanceRulesMd());
      }
      const manifest = await getGuidanceManifest();
      return topic ? await this._getPage(manifest, topic) : await this._getIndex(manifest);
    } catch (error) {
      throw new Error(`Failed to fetch Forge guidance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private _indexPages(manifest: GuidanceManifest): IndexedPage[] {
    return SECTIONS.flatMap(({ key }) => (manifest[key] ?? []).map(page => ({ ...page, topic: toTopic(page.docsPath), isComponent: key === 'components' })));
  }

  private async _getIndex(manifest: GuidanceManifest): Promise<CallToolResult> {
    const sections = SECTIONS.map(({ key, title }) => ({
      title,
      pages: [...(manifest[key] ?? [])]
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(page => ({
          topic: toTopic(page.docsPath),
          title: page.title,
          description: page.description.replace(/[\\|]/g, '\\$&'),
          experimental: page.status === 'experimental'
        }))
    })).filter(section => section.pages.length);

    return this._createTextResponse(await this._templateEngine.render('guidance/guidance-index.md', { sections }));
  }

  private async _getPage(manifest: GuidanceManifest, topic: string): Promise<CallToolResult> {
    const pages = this._indexPages(manifest);
    const name = topic.replace(/^forge-/, '');
    const exact = pages.find(p => p.topic === topic);
    const byName = pages.filter(p => p.name === name);
    const page = exact ?? (byName.length === 1 ? byName[0] : undefined);

    if (!page) {
      const hint = byName.length > 1 ? `"${topic}" matches more than one page: ${byName.map(p => `"${p.topic}"`).join(', ')}.` : `No guidance page "${topic}".`;
      throw new Error(`${hint} Call get_forge_guidance with no topic to list every page.`);
    }

    const content = await getGuidancePage(page.docsPath);
    const tagName = `forge-${page.name}`;
    const rendered = await this._templateEngine.render('guidance/guidance-page.md', {
      content: content.trim(),
      url: getGuidanceUrl(`references/${page.docsPath}`),
      isComponent: page.isComponent,
      tagName: page.isComponent && (await this._isKnownTag(tagName)) ? tagName : undefined,
      title: page.title
    });
    return this._createTextResponse(rendered);
  }

  /** Doc pages are named after their main element, except a few (e.g. `tabs` → `forge-tab-bar`). */
  private async _isKnownTag(tagName: string): Promise<boolean> {
    try {
      const cemLoader = getCEMLoader();
      if (!cemLoader.isLoaded()) {
        await cemLoader.loadCEM();
      }
      return cemLoader.getComponentTagNames().includes(tagName);
    } catch {
      return false;
    }
  }
}
