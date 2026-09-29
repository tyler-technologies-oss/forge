import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getCEMLoader } from '../../services/cem-loader.js';
import { getIconSearchService } from '../../services/icon-search-service.js';
import { getBlocksManifest } from '../../services/blocks-manifest-service.js';
import { getTemplateEngine } from '../../services/handlebars-template-engine.js';
import {
  UIPlan,
  RegionSpec,
  PlanValidationResult,
  PlanValidationError,
  PAGE_TYPES,
  HEADING_ROLES,
  BODY_ROLES,
  SPACING_SCALES,
  REGION_NAMES,
} from './plan-types.js';

export interface ValidateUIPlanInput extends ToolInput {
  plan: UIPlan | string;
}

export class ValidateUIPlanTool extends BaseToolHandler<ValidateUIPlanInput> {
  private _cemLoader = getCEMLoader();
  private _iconSearchService = getIconSearchService();
  private _templateEngine = getTemplateEngine();

  constructor() {
    super(
      'validate_ui_plan',
      'Validate a UI plan produced by generate_ui_plan. Checks: page_type enum, region components exist in the CEM, block IDs exist in the block catalogue, typography roles are legal, spacing_scale is tokens-only, icons exist in @tylertech/tyler-icons, and composition rules (no page_title inside card, no hand-rolled tables). Returns pass/fail with per-error hints. Markup must not be written until this returns valid=true.',
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          plan: {
            oneOf: [{ type: 'object' }, { type: 'string' }],
            description:
              'The plan object emitted by generate_ui_plan, either as an object or a JSON string.',
          },
        },
        required: ['plan'],
      },
    };
  }

  public async execute(
    args: ValidateUIPlanInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    this._validateRequired(args, ['plan']);

    const parsed = this._parsePlan(args.plan);
    if ('error' in parsed) {
      return this._createTextResponse(
        await this._renderResult({
          valid: false,
          errors: [
            {
              path: 'plan',
              message: parsed.error,
              hint: 'Pass the plan object emitted by generate_ui_plan directly, or a valid JSON string of it.',
            },
          ],
          summary: 'Plan could not be parsed.',
        }),
      );
    }

    if (!this._cemLoader.isLoaded()) {
      await this._cemLoader.loadCEM();
    }

    const errors: PlanValidationError[] = [];

    this._checkTopLevel(parsed.plan, errors);
    await this._checkRegions(parsed.plan, errors);
    await this._checkBlocks(parsed.plan, errors);
    await this._checkIcons(parsed.plan, errors);
    this._checkComposition(parsed.plan, errors);

    const result: PlanValidationResult = {
      valid: errors.length === 0,
      errors,
      summary:
        errors.length === 0
          ? 'Plan is valid. Proceed to fetch blocks and write markup.'
          : `Plan has ${errors.length} issue${errors.length === 1 ? '' : 's'}. Fix and re-validate before writing markup.`,
    };

    return this._createTextResponse(await this._renderResult(result));
  }

  private _parsePlan(input: unknown): { plan: UIPlan } | { error: string } {
    if (typeof input === 'string') {
      try {
        const parsed = JSON.parse(input);
        if (parsed && typeof parsed === 'object') {
          return { plan: parsed as UIPlan };
        }
        return { error: 'Parsed plan is not an object.' };
      } catch (e) {
        return {
          error: `Plan string is not valid JSON: ${e instanceof Error ? e.message : 'unknown parse error'}`,
        };
      }
    }
    if (input && typeof input === 'object') {
      return { plan: input as UIPlan };
    }
    return { error: 'Plan must be an object or a JSON string.' };
  }

  private _checkTopLevel(plan: UIPlan, errors: PlanValidationError[]): void {
    if (!plan.page_type) {
      errors.push({
        path: 'page_type',
        message: 'page_type is required.',
        hint: `Pick one of: ${PAGE_TYPES.join(', ')}`,
      });
    } else if (!(PAGE_TYPES as readonly string[]).includes(plan.page_type)) {
      errors.push({
        path: 'page_type',
        message: `page_type "${plan.page_type}" is not a legal value.`,
        hint: `Pick one of: ${PAGE_TYPES.join(', ')}`,
      });
    }

    if (!plan.spacing_scale) {
      errors.push({
        path: 'spacing_scale',
        message: 'spacing_scale is required.',
        hint: `Must be one of: ${SPACING_SCALES.join(', ')}`,
      });
    } else if (
      !(SPACING_SCALES as readonly string[]).includes(plan.spacing_scale)
    ) {
      errors.push({
        path: 'spacing_scale',
        message: `spacing_scale "${plan.spacing_scale}" is not allowed. Freehand pixel scales are an anti-pattern.`,
        hint: `Must be: ${SPACING_SCALES.join(', ')}`,
      });
    }

    const typography = plan.typography || {};
    for (const key of ['page_title', 'section_headings'] as const) {
      const val = typography[key];
      if (val === undefined) {
        continue;
      }
      if (!(HEADING_ROLES as readonly string[]).includes(val)) {
        errors.push({
          path: `typography.${key}`,
          message: `"${val}" is not a heading role.`,
          hint: `Pick one of the text-heading{1..8} or text-display{1..8} roles. See references/typography.md.`,
        });
      }
    }
    if (typography.body !== undefined) {
      if (!(BODY_ROLES as readonly string[]).includes(typography.body)) {
        errors.push({
          path: 'typography.body',
          message: `"${typography.body}" is not a body role.`,
          hint: `Pick one of: ${BODY_ROLES.join(', ')}`,
        });
      }
    }
  }

  private async _checkRegions(
    plan: UIPlan,
    errors: PlanValidationError[],
  ): Promise<void> {
    const regions = plan.regions || {};
    const knownTags = new Set(this._cemLoader.getComponentTagNames());

    for (const key of Object.keys(regions)) {
      if (!(REGION_NAMES as readonly string[]).includes(key)) {
        errors.push({
          path: `regions.${key}`,
          message: `"${key}" is not a legal region name.`,
          hint: `Legal region names: ${REGION_NAMES.join(', ')}`,
        });
      }
    }

    for (const [regionName, region] of Object.entries(regions)) {
      if (!region) {
        continue;
      }
      this._walkRegion(region, `regions.${regionName}`, knownTags, errors);
    }
  }

  private _walkRegion(
    region: RegionSpec,
    path: string,
    knownTags: Set<string>,
    errors: PlanValidationError[],
  ): void {
    if (!region.component) {
      errors.push({
        path: `${path}.component`,
        message: 'Region is missing a component tag.',
        hint: 'Every region must name the Forge component that owns it (e.g. forge-app-bar for header).',
      });
    } else if (region.component.startsWith('REPLACE_')) {
      errors.push({
        path: `${path}.component`,
        message: 'Region component is still a placeholder.',
        hint: 'Replace REPLACE_WITH_* placeholders with real Forge tag names before validating.',
      });
    } else if (!knownTags.has(region.component)) {
      errors.push({
        path: `${path}.component`,
        message: `Component "${region.component}" is not in the CEM.`,
        hint: 'Call find_components to look up the real tag name; do not invent one.',
      });
    }

    if (Array.isArray(region.components)) {
      for (let i = 0; i < region.components.length; i++) {
        const tag = region.components[i];
        if (typeof tag !== 'string') {
          continue;
        }
        if (tag.startsWith('LIST OF') || tag.startsWith('REPLACE_')) {
          errors.push({
            path: `${path}.components[${i}]`,
            message: 'Placeholder component in components array.',
            hint: 'Replace placeholders with real Forge tag names.',
          });
          continue;
        }
        if (!knownTags.has(tag)) {
          errors.push({
            path: `${path}.components[${i}]`,
            message: `Component "${tag}" is not in the CEM.`,
            hint: 'Call find_components to look up the real tag name.',
          });
        }
      }
    }

    if (Array.isArray(region.children)) {
      for (let i = 0; i < region.children.length; i++) {
        this._walkRegion(
          region.children[i],
          `${path}.children[${i}]`,
          knownTags,
          errors,
        );
      }
    }
  }

  private async _checkBlocks(
    plan: UIPlan,
    errors: PlanValidationError[],
  ): Promise<void> {
    const blockIds: Array<{ id: string; path: string }> = [];
    if (plan.scaffold_block_id) {
      blockIds.push({ id: plan.scaffold_block_id, path: 'scaffold_block_id' });
    }
    for (const [regionName, region] of Object.entries(plan.regions || {})) {
      if (region?.block_id) {
        blockIds.push({
          id: region.block_id,
          path: `regions.${regionName}.block_id`,
        });
      }
    }

    if (blockIds.length === 0) {
      return;
    }

    // Reject obvious placeholders without needing the network.
    const remaining = blockIds.filter(({ id, path }) => {
      if (id.startsWith('REPLACE_') || id.startsWith('OPTIONAL_')) {
        errors.push({
          path,
          message: `Block ID "${id}" is still a placeholder.`,
          hint: 'Call get_forge_blocks and use a real block ID returned by that tool.',
        });
        return false;
      }
      return true;
    });
    if (remaining.length === 0) {
      return;
    }

    let manifest;
    try {
      manifest = await getBlocksManifest();
    } catch {
      // Fail-open on network issues; note it in the result so the model
      // knows this axis was not verified.
      errors.push({
        path: 'scaffold_block_id',
        message: 'Could not fetch the block manifest to verify block IDs.',
        hint: 'Re-run validate_ui_plan; if the network is unavailable this check will be skipped.',
      });
      return;
    }

    const knownBlockIds = new Set(manifest.blocks.map(b => b.id));
    for (const { id, path } of remaining) {
      if (!knownBlockIds.has(id)) {
        errors.push({
          path,
          message: `Block ID "${id}" is not in the manifest.`,
          hint: 'Call get_forge_blocks(query: ...) or (component: ...) and use one of the returned IDs.',
        });
      }
    }
  }

  private async _checkIcons(
    plan: UIPlan,
    errors: PlanValidationError[],
  ): Promise<void> {
    if (!Array.isArray(plan.icons) || plan.icons.length === 0) {
      return;
    }

    // The icon service exposes searchIcons; use it to confirm each name
    // exists. Empty results = not found.
    for (let i = 0; i < plan.icons.length; i++) {
      const name = plan.icons[i];
      if (
        typeof name !== 'string' ||
        !name ||
        name === 'icon_name_without_prefix'
      ) {
        errors.push({
          path: `icons[${i}]`,
          message: `"${name}" is not a real icon name.`,
          hint: 'Call find_icons to look up a real name; icons use snake_case (e.g. filter_list).',
        });
        continue;
      }
      // Skip verifying if it uses obvious wrong casing (uppercase prefix).
      // The icon service does its own fuzzy search; we accept any exact match.
      try {
        const results = await this._iconSearchService.searchIcons(name, 5);
        const exact = results.find(r => r.name === name);
        if (!exact) {
          errors.push({
            path: `icons[${i}]`,
            message: `Icon "${name}" not found in @tylertech/tyler-icons.`,
            hint: 'Call find_icons for the exact name; icons use snake_case (e.g. filter_list, not filterList).',
          });
        }
      } catch {
        // Icon service unreachable — skip this check silently.
        break;
      }
    }
  }

  private _checkComposition(plan: UIPlan, errors: PlanValidationError[]): void {
    // Rule: page_title role must not be used inside a forge-card region.
    const pageTitle = plan.typography?.page_title;
    if (pageTitle) {
      for (const [regionName, region] of Object.entries(plan.regions || {})) {
        if (!region) {
          continue;
        }
        const uses = this._regionUsesCard(region);
        // If the main region has a card as its outer component and the
        // page_title is also declared inside main (heuristic: main is the
        // most likely place), flag it.
        if (regionName === 'main' && uses) {
          errors.push({
            path: `regions.main`,
            message: `page_title "${pageTitle}" is set but main region is a forge-card. Cards must not host page-level headings.`,
            hint: 'Move the page title to the header region (forge-app-bar or a forge-toolbar), or reduce card headers to text-heading3.',
          });
        }
      }
    }

    // Rule: any component list containing "table" without forge-table.
    for (const [regionName, region] of Object.entries(plan.regions || {})) {
      if (!region) {
        continue;
      }
      const flat = this._flattenComponents(region);
      const mentionsTable = flat.some(c => /(^|-)table$|forge-table/.test(c));
      const hasHandRolled = flat.some(c => c === 'table');
      if (hasHandRolled && !mentionsTable) {
        errors.push({
          path: `regions.${regionName}.components`,
          message: 'Plain <table> in the plan without forge-table.',
          hint: 'Use forge-table + forge-paginator for data tables. See references/tables.md.',
        });
      }
    }
  }

  private _regionUsesCard(region: RegionSpec): boolean {
    if (
      region.component === 'forge-card' ||
      region.component === 'forge-structured-card'
    ) {
      return true;
    }
    if (Array.isArray(region.children)) {
      return region.children.some(c => this._regionUsesCard(c));
    }
    return false;
  }

  private _flattenComponents(region: RegionSpec): string[] {
    const out: string[] = [];
    if (region.component) {
      out.push(region.component);
    }
    if (Array.isArray(region.components)) {
      out.push(...region.components);
    }
    if (Array.isArray(region.children)) {
      for (const c of region.children) {
        out.push(...this._flattenComponents(c));
      }
    }
    return out;
  }

  private async _renderResult(result: PlanValidationResult): Promise<string> {
    return await this._templateEngine.render('plan/validation-result.md', {
      validLabel: result.valid ? '✅ true' : '❌ false',
      summary: result.summary,
      isValid: result.valid,
      errors: result.errors,
      // Emit a machine-readable copy so the hook can key off the phrase.
      resultJson: JSON.stringify(result, null, 2),
    });
  }
}
