import { getGuidanceRulesMd } from './guidance-service.js';
import { getTemplateEngine } from './handlebars-template-engine.js';

/**
 * The MCP server `instructions`: the Forge rules and workflow from the docs site, so every client
 * gets them at connection time. Returns undefined, sending no instructions, if the rules can't be loaded.
 */
export async function getServerInstructions(): Promise<string | undefined> {
  try {
    const rules = await getGuidanceRulesMd();
    return await getTemplateEngine().render('guidance/instructions.md', { rules: rules.trim() });
  } catch {
    return undefined;
  }
}
