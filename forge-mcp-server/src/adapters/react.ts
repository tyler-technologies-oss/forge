import { GenerateComponentOptions } from '../utils/types.js';

export class ReactAdapter {
  generate(options: GenerateComponentOptions): string {
    const { component, variant, theme, props = {}, slots = {}, events = [], cssOnly } = options;
    
    if (cssOnly) {
      return this.generateCSSOnly(options);
    }

    const componentName = this.pascalCase(component);
    const forgeComponentName = `Forge${componentName}`;
    
    // Complete setup with registration
    let code = `// ============================================\n`;
    code += `// Tyler Forge ${componentName} Component - React\n`;
    code += `// ============================================\n\n`;
    
    code += `// 1. SETUP (add to your app's main file, e.g., App.jsx or index.js)\n`;
    code += `// --------------------------------------------\n`;
    code += `import { define${componentName}Component } from '@tylertech/forge';\n`;
    code += `import '@tylertech/forge/dist/${component}/forge-${component}.css'; // Component styles\n`;
    code += `// Or use global styles: import '@tylertech/forge/dist/forge.css';\n\n`;
    code += `// Call this once at app startup:\n`;
    code += `define${componentName}Component();\n\n`;
    
    // Add icon setup if needed
    if (slots.start?.includes('icon') || slots.end?.includes('icon')) {
      code += `// Icon setup (if using icons)\n`;
      code += `import { IconRegistry } from '@tylertech/forge';\n`;
      code += `import { tylIconHome, tylIconSettings } from '@tylertech/tyler-icons';\n`;
      code += `IconRegistry.define([tylIconHome, tylIconSettings]);\n\n`;
    }
    
    code += `// 2. COMPONENT USAGE\n`;
    code += `// --------------------------------------------\n`;
    code += `import { ${forgeComponentName} } from '@tylertech/forge-react';\n`;
    if (slots.start?.includes('icon') || slots.end?.includes('icon')) {
      code += `import { ForgeIcon } from '@tylertech/forge-react';\n`;
    }

    const propsStr = this.generateReactProps({ variant, theme, ...props });
    const slotsStr = this.generateReactSlots(slots);
    const eventsStr = this.generateReactEvents(events, component);

    code += `\nexport function ${componentName}Example() {\n`;
    if (eventsStr.handlers) {
      code += `  ${eventsStr.handlers}\n\n`;
    }
    code += `  return (\n`;
    code += `    <${forgeComponentName}${propsStr}${eventsStr.attributes}>\n`;
    if (slotsStr) {
      code += `      ${slotsStr}\n`;
    } else {
      code += `      ${componentName} Content\n`;
    }
    code += `    </${forgeComponentName}>\n`;
    code += `  );\n`;
    code += `}\n\n`;
    
    // Add web component alternative
    code += `// 3. ALTERNATIVE: Direct Web Component Usage\n`;
    code += `// --------------------------------------------\n`;
    code += `export function ${componentName}DirectUsage() {\n`;
    code += `  return (\n`;
    code += `    <forge-${component}${this.generateProps({ variant, theme, ...props })}>\n`;
    code += `      ${slotsStr ? this.generateSlots(slots) : 'Content'}\n`;
    code += `    </forge-${component}>\n`;
    code += `  );\n`;
    code += `}`;

    return code;
  }

  private generateCSSOnly(options: GenerateComponentOptions): string {
    const { component, variant, theme, props = {} } = options;
    const componentName = this.pascalCase(component);
    
    const classes = ['forge-' + component];
    if (variant) classes.push(`forge-${component}--${variant}`);
    if (theme) classes.push(`forge-${component}--theme-${theme}`);
    if (props.dense) classes.push(`forge-${component}--dense`);
    if (props.pill) classes.push(`forge-${component}--pill`);

    return `import '@tylertech/forge/${component}/forge-${component}.css';

export function ${componentName}Component() {
  return (
    <button className="${classes.join(' ')}"${props.disabled ? ' disabled' : ''}>
      ${componentName}
    </button>
  );
}`;
  }

  private generateProps(props: Record<string, any>): string {
    const propsArray: string[] = [];
    
    for (const [key, value] of Object.entries(props)) {
      if (value === undefined || value === null) continue;
      
      if (typeof value === 'boolean') {
        if (value) propsArray.push(key);
      } else if (typeof value === 'string') {
        propsArray.push(`${key}="${value}"`);
      } else {
        propsArray.push(`${key}={${JSON.stringify(value)}}`);
      }
    }

    return propsArray.length > 0 ? ' ' + propsArray.join(' ') : '';
  }

  private generateSlots(slots: Record<string, string>): string {
    const slotsArray: string[] = [];
    
    for (const [slot, content] of Object.entries(slots)) {
      if (content.includes('icon')) {
        slotsArray.push(`<forge-icon slot="${slot}" name="home" />`);
      } else {
        slotsArray.push(`<span slot="${slot}">${content}</span>`);
      }
    }

    return slotsArray.join('\n      ');
  }

  private generateReactProps(props: Record<string, any>): string {
    const propsArray: string[] = [];
    
    for (const [key, value] of Object.entries(props)) {
      if (value === undefined || value === null) continue;
      
      if (typeof value === 'boolean') {
        propsArray.push(value ? ` ${key}` : ` ${key}={false}`);
      } else if (typeof value === 'string') {
        propsArray.push(` ${key}="${value}"`);
      } else {
        propsArray.push(` ${key}={${JSON.stringify(value)}}`);
      }
    }

    return propsArray.join('');
  }

  private generateReactSlots(slots: Record<string, string>): string {
    const slotsArray: string[] = [];
    
    for (const [slot, content] of Object.entries(slots)) {
      if (content.includes('icon')) {
        slotsArray.push(`<ForgeIcon slot="${slot}" name="home" />`);
      } else {
        slotsArray.push(`<span slot="${slot}">${content}</span>`);
      }
    }

    return slotsArray.join('\n      ');
  }

  private generateReactEvents(events: string[], component: string): { handlers: string; attributes: string } {
    if (events.length === 0) {
      return { handlers: '', attributes: '' };
    }

    const handlers: string[] = [];
    const attributes: string[] = [];

    events.forEach((event) => {
      const handlerName = `handle${this.pascalCase(event.replace('forge-', '').replace(component + '-', ''))}`;
      const eventType = event.replace(`forge-${component}-`, '');
      
      handlers.push(`const ${handlerName} = (evt) => {\n    console.log('${eventType} event:', evt.detail);\n    // Add your logic here\n  };`);
      
      attributes.push(` on${this.pascalCase(event.replace('forge-', ''))}={${handlerName}}`);
    });

    return {
      handlers: handlers.join('\n  '),
      attributes: attributes.join('')
    };
  }

  private pascalCase(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}