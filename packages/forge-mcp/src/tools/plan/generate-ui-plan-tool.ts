/* eslint-disable camelcase -- plan JSON keys (page_type, spacing_scale, block_id, etc.) are the documented on-wire schema; renaming them would break the plan contract. */
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { PAGE_TYPES, HEADING_ROLES, BODY_ROLES, SPACING_SCALES, REGION_NAMES } from './plan-types.js';

export interface GenerateUIPlanInput extends ToolInput {
  description: string;
  framework?: string;
  page_type_hint?: string;
}

// The tool does not itself compose the plan — the model does. This handler
// returns the schema + guidance the model should use to produce a plan, and
// echoes back an empty template the model fills in. Keeping the composition
// on the model side means the plan reflects the actual generation context.
// See ADR-0001 (docs/adr/0001-generate-ui-plan-model-composes-plan.md).
export class GenerateUIPlanTool extends BaseToolHandler<GenerateUIPlanInput> {
  constructor() {
    super(
      'generate_ui_plan',
      'Emit a machine-checkable UI plan (scaffold block, regions, typography roles, icons) before writing composition-scale Forge markup. Returns the empty plan template and the enums the plan must use. Call validate_ui_plan on the composed plan before writing any <forge-*> markup. See references/ui-plan.md.'
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            description:
              'What the user is asking you to build. A sentence or two is enough; the plan is composed from the description plus the current session context.'
          },
          framework: {
            type: 'string',
            description: 'Framework in use (angular, react, vue, svelte, lit, or plain). Optional — only affects framework-specific plan hints.'
          },
          page_type_hint: {
            type: 'string',
            enum: [...PAGE_TYPES],
            description: 'Optional page type if the caller already knows it. Otherwise leave blank and pick during plan composition.'
          }
        },
        required: ['description']
      }
    };
  }

  public async execute(args: GenerateUIPlanInput): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    this._validateRequired(args, ['description']);
    const { description, framework, page_type_hint } = args;

    const template = {
      page_type: page_type_hint || 'REPLACE_WITH_ONE_OF: ' + PAGE_TYPES.join(' | '),
      scaffold_block_id: 'REPLACE_WITH_BLOCK_ID_FROM_get_forge_blocks (application-layout category for full apps)',
      regions: {
        header: {
          component: 'forge-app-bar',
          children: [{ component: 'forge-app-bar-profile-button' }]
        },
        nav: {
          component: 'forge-drawer',
          children: [{ component: 'forge-list' }]
        },
        main: {
          component: 'REPLACE_WITH_MAIN_CONTAINER_COMPONENT',
          block_id: 'OPTIONAL_BLOCK_ID_FROM_get_forge_blocks (query by feature: forms / tables / cards)',
          components: ['LIST OF EVERY forge-* TAG THAT WILL APPEAR IN main']
        }
      },
      typography: {
        page_title: 'text-heading5',
        section_headings: 'text-heading3',
        body: 'text-body1'
      },
      spacing_scale: 'tokens-only',
      icons: ['icon_name_without_prefix']
    };

    const sections: string[] = [];
    sections.push('# UI Plan Template');
    sections.push('');
    sections.push(`**Request:** ${description}`);
    if (framework) {
      sections.push(`**Framework:** ${framework}`);
    }
    sections.push('');
    sections.push('## What to do next');
    sections.push('');
    sections.push('1. Fill in every REPLACE_WITH_* placeholder using the enums and lookups below.');
    sections.push(
      '2. For any component tag, block ID, or icon name — call the corresponding tool first if you have not seen it this turn. Do NOT invent names.'
    );
    sections.push('3. When the plan is complete, call `validate_ui_plan` with it. Fix any reported errors and re-validate.');
    sections.push('4. Only after the plan validates: call `get_forge_blocks` for the block IDs, then write the markup.');
    sections.push('');
    sections.push('## Plan template (fill in)');
    sections.push('');
    sections.push('```json');
    sections.push(JSON.stringify(template, null, 2));
    sections.push('```');
    sections.push('');
    sections.push('## Allowed values');
    sections.push('');
    sections.push('**`page_type`** — pick one:');
    sections.push('');
    for (const t of PAGE_TYPES) {
      sections.push(`- \`${t}\``);
    }
    sections.push('');
    sections.push('**`regions`** — top-level keys are:');
    sections.push('');
    for (const r of REGION_NAMES) {
      sections.push(`- \`${r}\``);
    }
    sections.push('');
    sections.push('**`typography.page_title` / `section_headings`** — pick one heading role:');
    sections.push('');
    sections.push(HEADING_ROLES.map(r => `\`${r}\``).join(', '));
    sections.push('');
    sections.push('**`typography.body`** — pick one body role:');
    sections.push('');
    sections.push(BODY_ROLES.map(r => `\`${r}\``).join(', '));
    sections.push('');
    sections.push('**`spacing_scale`** — must be:');
    sections.push('');
    for (const s of SPACING_SCALES) {
      sections.push(`- \`${s}\``);
    }
    sections.push('');
    sections.push('## Composition constraints');
    sections.push('');
    sections.push('- `page_title` typography role must NOT be used inside a `forge-card` region — cards use `text-heading3` or lower.');
    sections.push('- If any region uses a `<table>` for data, replace it with `forge-table` + `forge-paginator` in the plan.');
    sections.push(
      '- Subpath-only components (`forge-app-layout`, `forge-structured-card`, `forge-count-card`, `forge-busy-indicator`, `forge-confirmation-dialog`, `forge-user-profile`, `forge-app-launcher`, `forge-multi-select-header`, `forge-quantity-field`, `forge-responsive-toolbar`, `forge-content-scaffold`, `forge-footer`, `forge-theme-toggle`) require a side-effect import from `@tylertech/forge/<name>` in the generated code — note them in `regions.*.components` and remember to import.'
    );
    sections.push('');
    sections.push('## Reference');
    sections.push('');
    sections.push('See [references/ui-plan.md](references/ui-plan.md) for full field docs and failure modes.');

    return this._createTextResponse(sections.join('\n'));
  }
}
