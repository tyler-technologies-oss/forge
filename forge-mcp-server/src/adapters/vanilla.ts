import { GenerateComponentOptions } from '../utils/types.js';

export class VanillaAdapter {
  generate(options: GenerateComponentOptions): string {
    const { component, variant, theme, props = {}, slots = {}, events = [], cssOnly } = options;
    
    if (cssOnly) {
      return this.generateCSSOnly(options);
    }

    const tagName = `forge-${component}`;
    const varName = this.camelCase(component);
    
    let code = `// Import the component
import '@tylertech/forge/${component}';
`;

    // Add icon imports if needed
    if (Object.values(slots).some(s => s.includes('icon'))) {
      code += `import { IconRegistry } from '@tylertech/forge';
import { tylIconForgeLogo } from '@tylertech/tyler-icons';

// Register icons
IconRegistry.define(tylIconForgeLogo);
`;
    }

    code += `
// Create the element
const ${varName} = document.createElement('${tagName}');
`;

    // Set properties
    for (const [key, value] of Object.entries({ variant, theme, ...props })) {
      if (value !== undefined && value !== null) {
        if (typeof value === 'boolean') {
          code += `${varName}.${key} = ${value};\n`;
        } else {
          code += `${varName}.${key} = '${value}';\n`;
        }
      }
    }

    // Add slots
    for (const [slot, content] of Object.entries(slots)) {
      if (content.includes('icon')) {
        code += `
// Add icon to ${slot} slot
const icon = document.createElement('forge-icon');
icon.name = 'forge_logo';
icon.slot = '${slot}';
${varName}.appendChild(icon);
`;
      } else {
        code += `
// Add content to ${slot} slot
const ${slot}Content = document.createElement('span');
${slot}Content.slot = '${slot}';
${slot}Content.textContent = '${content}';
${varName}.appendChild(${slot}Content);
`;
      }
    }

    // Add text content if no slots
    if (Object.keys(slots).length === 0) {
      code += `${varName}.textContent = '${this.formatName(component)}';\n`;
    }

    // Add event listeners
    for (const event of events) {
      code += `
// Listen for ${event} event
${varName}.addEventListener('${event}', (e) => {
  console.log('${event} event:', e.detail);
});
`;
    }

    code += `
// Add to DOM
document.body.appendChild(${varName});`;

    return code;
  }

  private generateCSSOnly(options: GenerateComponentOptions): string {
    const { component, variant, theme, props = {} } = options;
    
    const classes = ['forge-' + component];
    if (variant) classes.push(`forge-${component}--${variant}`);
    if (theme) classes.push(`forge-${component}--theme-${theme}`);
    if (props.dense) classes.push(`forge-${component}--dense`);
    if (props.pill) classes.push(`forge-${component}--pill`);

    let code = `// Import CSS
import '@tylertech/forge/${component}/forge-${component}.css';

// Create element
const button = document.createElement('button');
button.className = '${classes.join(' ')}';
button.textContent = '${this.formatName(component)}';
`;

    if (props.disabled) {
      code += `button.disabled = true;\n`;
    }

    code += `
// Add to DOM
document.body.appendChild(button);`;

    return code;
  }

  private camelCase(kebabCase: string): string {
    const parts = kebabCase.split('-');
    return parts[0] + parts.slice(1)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  private formatName(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}