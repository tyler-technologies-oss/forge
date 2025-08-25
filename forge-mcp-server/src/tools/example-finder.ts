import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import fs from 'fs/promises';
import path from 'path';
import { STORIES_DIR, DEV_PAGES_DIR } from '../utils/constants.js';

const FindExamplesSchema = z.object({
  component: z.string().describe('Component name to find examples for'),
  variant: z.string().optional().describe('Specific variant to find'),
  useCase: z.string().optional().describe('Specific use case or pattern to find')
});

export class ExampleFinder {
  getSchema() {
    return zodToJsonSchema(FindExamplesSchema) as any;
  }

  async find(input: z.infer<typeof FindExamplesSchema>): Promise<string> {
    const { component, variant, useCase } = input;
    
    const examples: string[] = [];
    
    // Get story examples
    const storyExamples = await this.getStoryExamples(component, variant);
    if (storyExamples) {
      examples.push(storyExamples);
    }
    
    // Get dev page examples
    const devExamples = await this.getDevPageExamples(component);
    if (devExamples) {
      examples.push(devExamples);
    }
    
    // Get specific use case examples if requested
    if (useCase) {
      const useCaseExamples = this.getUseCaseExamples(component, useCase);
      if (useCaseExamples) {
        examples.push(useCaseExamples);
      }
    }
    
    if (examples.length === 0) {
      return `No examples found for ${component}. Try checking the documentation at https://forge.tylerdev.io/`;
    }
    
    return examples.join('\n\n---\n\n');
  }

  private async getStoryExamples(component: string, variant?: string): Promise<string | null> {
    try {
      const storiesPath = path.join(STORIES_DIR, component, `${this.pascalCase(component)}.stories.ts`);
      const content = await fs.readFile(storiesPath, 'utf-8');
      
      let examples = `# ${this.formatName(component)} Examples\n\n`;
      
      // Extract basic example
      const basicExample = content.match(/render:\s*\([^)]*\)\s*=>\s*{([^}]+)}/);
      if (basicExample) {
        examples += `## Basic Usage\n\n\`\`\`javascript\n${this.cleanExample(basicExample[1])}\n\`\`\`\n\n`;
      }
      
      // Extract variant example if requested
      if (variant) {
        const variantRegex = new RegExp(`variant=['"\`]${variant}['"\`]`, 'i');
        if (content.match(variantRegex)) {
          examples += `## ${this.formatName(variant)} Variant\n\n`;
          examples += `\`\`\`html\n<forge-${component} variant="${variant}">${this.formatName(component)}</forge-${component}>\n\`\`\`\n\n`;
        }
      }
      
      // Extract story names for reference
      const storyNames = Array.from(content.matchAll(/export const (\w+):/g)).map(m => m[1]);
      if (storyNames.length > 0) {
        examples += `## Available Story Examples\n\n`;
        examples += storyNames.map(name => `- ${name}`).join('\n');
      }
      
      return examples;
    } catch {
      return null;
    }
  }

  private async getDevPageExamples(component: string): Promise<string | null> {
    try {
      const htmlPath = path.join(DEV_PAGES_DIR, component, `${component}.html`);
      const content = await fs.readFile(htmlPath, 'utf-8');
      
      let examples = `## HTML Implementation Example\n\n`;
      
      // Extract forge component usage
      const componentRegex = new RegExp(`<forge-${component}[^>]*>([\\s\\S]*?)</forge-${component}>`, 'g');
      const matches = Array.from(content.matchAll(componentRegex));
      
      if (matches.length > 0) {
        examples += `\`\`\`html\n${matches[0][0]}\n\`\`\`\n`;
        
        if (matches.length > 1) {
          examples += `\n_Found ${matches.length} examples in dev pages_\n`;
        }
      }
      
      return examples;
    } catch {
      return null;
    }
  }

  private getUseCaseExamples(component: string, useCase: string): string | null {
    const useCaseLower = useCase.toLowerCase();
    let example = `## ${useCase} Example\n\n`;
    
    // Common use case patterns
    if (useCaseLower.includes('form') && component === 'button') {
      example += `\`\`\`html
<form>
  <forge-button type="submit" variant="raised" theme="primary">
    Submit Form
  </forge-button>
  <forge-button type="reset" variant="outlined">
    Reset
  </forge-button>
</form>\`\`\``;
      return example;
    }
    
    if (useCaseLower.includes('icon') && component === 'button') {
      example += `\`\`\`html
<forge-button variant="raised">
  <forge-icon slot="start" name="save"></forge-icon>
  Save Document
</forge-button>\`\`\``;
      return example;
    }
    
    if (useCaseLower.includes('loading') && component === 'button') {
      example += `\`\`\`html
<forge-button variant="raised" disabled>
  Loading...
  <forge-circular-progress slot="end"></forge-circular-progress>
</forge-button>\`\`\``;
      return example;
    }
    
    if (useCaseLower.includes('dialog') && component === 'dialog') {
      example += `\`\`\`javascript
const dialog = document.createElement('forge-dialog');
dialog.innerHTML = \`
  <h2 slot="title">Confirm Action</h2>
  <div>Are you sure you want to proceed?</div>
  <forge-button slot="actions" variant="text">Cancel</forge-button>
  <forge-button slot="actions" variant="raised" theme="primary">Confirm</forge-button>
\`;
document.body.appendChild(dialog);
dialog.open = true;\`\`\``;
      return example;
    }
    
    return null;
  }

  private cleanExample(code: string): string {
    return code
      .trim()
      .replace(/^\s{4,}/gm, '  ')
      .replace(/return html`/, '')
      .replace(/`;$/, '');
  }

  private formatName(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private pascalCase(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}