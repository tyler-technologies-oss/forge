import { DesignTokenCategory } from '../../types/index.js';
import { getTemplateEngine } from '../../services/handlebars-template-engine.js';

export const DESIGN_TOKENS_URI = 'forge://design-tokens';

/**
 * Renders design token documentation from the design tokens manifest
 */
export class DesignTokensResource {
  private readonly _templateEngine = getTemplateEngine();

  /**
   * Render the overview of all token categories
   */
  public async getOverview(categories: DesignTokenCategory[]): Promise<string> {
    return this._templateEngine.render('design-tokens/design-tokens.md', {
      categories: categories.map(({ name, description, tokens }) => ({
        name,
        description: escapeTableCell(description),
        tokenCount: tokens.length
      }))
    });
  }

  /**
   * Render token tables for the given categories, optionally as results for a search query
   */
  public async getCategories(categories: DesignTokenCategory[], query?: string): Promise<string> {
    return this._templateEngine.render('design-tokens/token-categories.md', {
      query,
      tokenCount: categories.reduce((count, { tokens }) => count + tokens.length, 0),
      categories: categories.map(({ name, description, tokens }) => ({
        name,
        description,
        themed: tokens.some(token => token.values),
        tokens: tokens.map(token => ({
          name: token.name,
          value: escapeTableCell(token.value),
          light: escapeTableCell(token.values?.light ?? token.value),
          dark: escapeTableCell(token.values?.dark ?? token.value),
          description: escapeTableCell(token.description)
        }))
      }))
    });
  }
}

/**
 * Get the resource URI for a token category
 */
export function getDesignTokenCategoryUri(category: string): string {
  return `${DESIGN_TOKENS_URI}/${category}`;
}

function escapeTableCell(value = ''): string {
  return value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}
