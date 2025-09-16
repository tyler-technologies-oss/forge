import { GenerateComponentOptions } from '../utils/types.js';

export class AngularAdapter {
  generate(options: GenerateComponentOptions): string {
    const { component, variant, theme, props = {}, slots = {}, events = [], cssOnly } = options;
    
    if (cssOnly) {
      return this.generateCSSOnly(options);
    }

    const componentName = this.pascalCase(component);
    const tagName = `forge-${component}`;
    
    const template = this.generateTemplate(tagName, { variant, theme, ...props }, slots, events);
    const componentClass = this.generateComponent(componentName, events, component);

    return `${componentClass}

// Template:
${template}

// Module imports needed:
// import { ${componentName}Module } from '@tylertech/forge-angular/${component}';
// Add to imports array: ${componentName}Module`;
  }

  private generateCSSOnly(options: GenerateComponentOptions): string {
    const { component, variant, theme, props = {} } = options;
    const componentName = this.pascalCase(component);
    
    const classes = ['forge-' + component];
    if (variant) classes.push(`forge-${component}--${variant}`);
    if (theme) classes.push(`forge-${component}--theme-${theme}`);
    if (props.dense) classes.push(`forge-${component}--dense`);
    if (props.pill) classes.push(`forge-${component}--pill`);

    const template = `<button class="${classes.join(' ')}"${props.disabled ? ' [disabled]="isDisabled"' : ''}>
  ${componentName}
</button>`;

    return `import { Component } from '@angular/core';

@Component({
  selector: 'app-${component}',
  template: \`${template}\`,
  styles: [\`@import '@tylertech/forge/${component}/forge-${component}.css';\`]
})
export class ${componentName}Component {
  isDisabled = ${props.disabled || false};
}`;
  }

  private generateTemplate(
    tagName: string, 
    props: Record<string, any>, 
    slots: Record<string, string>,
    events: string[]
  ): string {
    const propsStr = this.generateProps(props);
    const eventsStr = this.generateEventBindings(events);
    const slotsStr = this.generateSlots(slots);

    return `<${tagName}${propsStr}${eventsStr}>
  ${slotsStr || 'Content'}
</${tagName}>`;
  }

  private generateComponent(componentName: string, events: string[], componentType: string): string {
    const eventHandlers = events.map(event => {
      const handlerName = `on${this.pascalCase(event)}`;
      return `  ${handlerName}(event: CustomEvent): void {
    console.log('${event} event:', event.detail);
  }`;
    }).join('\n\n');

    return `import { Component } from '@angular/core';
import '@tylertech/forge/${componentType}';

@Component({
  selector: 'app-${componentType}',
  templateUrl: './${componentType}.component.html',
  styleUrls: ['./${componentType}.component.scss']
})
export class ${componentName}Component {
${eventHandlers}
}`;
  }

  private generateProps(props: Record<string, any>): string {
    const propsArray: string[] = [];
    
    for (const [key, value] of Object.entries(props)) {
      if (value === undefined || value === null) continue;
      
      if (typeof value === 'boolean') {
        propsArray.push(`[${key}]="${value}"`);
      } else if (typeof value === 'string') {
        propsArray.push(`${key}="${value}"`);
      } else {
        propsArray.push(`[${key}]="${JSON.stringify(value).replace(/"/g, "'")}"`);
      }
    }

    return propsArray.length > 0 ? ' ' + propsArray.join(' ') : '';
  }

  private generateEventBindings(events: string[]): string {
    return events
      .map(event => ` (${event})="on${this.pascalCase(event)}($event)"`)
      .join('');
  }

  private generateSlots(slots: Record<string, string>): string {
    const slotsArray: string[] = [];
    
    for (const [slot, content] of Object.entries(slots)) {
      if (content.includes('icon')) {
        slotsArray.push(`  <forge-icon slot="${slot}" name="forge_logo"></forge-icon>`);
      } else {
        slotsArray.push(`  <span slot="${slot}">${content}</span>`);
      }
    }

    return slotsArray.join('\n');
  }

  private pascalCase(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}