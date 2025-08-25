import { DesignToken } from '../utils/types.js';

export class DesignTokensResource {
  private tokens: Map<string, DesignToken[]> = new Map();

  constructor() {
    this.initializeTokens();
  }

  private initializeTokens() {
    // Color tokens
    this.tokens.set('color', [
      { category: 'color', name: 'Primary', value: '#1976d2', cssVariable: '--forge-theme-primary', description: 'Primary brand color' },
      { category: 'color', name: 'Secondary', value: '#424242', cssVariable: '--forge-theme-secondary', description: 'Secondary brand color' },
      { category: 'color', name: 'Tertiary', value: '#7b1fa2', cssVariable: '--forge-theme-tertiary', description: 'Tertiary brand color' },
      { category: 'color', name: 'Success', value: '#2e7d32', cssVariable: '--forge-theme-success', description: 'Success state color' },
      { category: 'color', name: 'Warning', value: '#ed6c02', cssVariable: '--forge-theme-warning', description: 'Warning state color' },
      { category: 'color', name: 'Error', value: '#d32f2f', cssVariable: '--forge-theme-error', description: 'Error state color' },
      { category: 'color', name: 'Info', value: '#0288d1', cssVariable: '--forge-theme-info', description: 'Informational state color' },
      { category: 'color', name: 'Surface', value: '#ffffff', cssVariable: '--forge-surface', description: 'Surface background color' },
      { category: 'color', name: 'Background', value: '#fafafa', cssVariable: '--forge-background', description: 'Page background color' }
    ]);

    // Typography tokens
    this.tokens.set('typography', [
      { category: 'typography', name: 'Font Family', value: 'Roboto, sans-serif', cssVariable: '--forge-font-family', description: 'Primary font family' },
      { category: 'typography', name: 'Display Large', value: '57px', cssVariable: '--forge-display-large-font-size', description: 'Display large text size' },
      { category: 'typography', name: 'Display Medium', value: '45px', cssVariable: '--forge-display-medium-font-size', description: 'Display medium text size' },
      { category: 'typography', name: 'Display Small', value: '36px', cssVariable: '--forge-display-small-font-size', description: 'Display small text size' },
      { category: 'typography', name: 'Headline Large', value: '32px', cssVariable: '--forge-headline-large-font-size', description: 'Headline large text size' },
      { category: 'typography', name: 'Headline Medium', value: '28px', cssVariable: '--forge-headline-medium-font-size', description: 'Headline medium text size' },
      { category: 'typography', name: 'Headline Small', value: '24px', cssVariable: '--forge-headline-small-font-size', description: 'Headline small text size' },
      { category: 'typography', name: 'Title Large', value: '22px', cssVariable: '--forge-title-large-font-size', description: 'Title large text size' },
      { category: 'typography', name: 'Title Medium', value: '16px', cssVariable: '--forge-title-medium-font-size', description: 'Title medium text size' },
      { category: 'typography', name: 'Title Small', value: '14px', cssVariable: '--forge-title-small-font-size', description: 'Title small text size' },
      { category: 'typography', name: 'Body Large', value: '16px', cssVariable: '--forge-body-large-font-size', description: 'Body large text size' },
      { category: 'typography', name: 'Body Medium', value: '14px', cssVariable: '--forge-body-medium-font-size', description: 'Body medium text size' },
      { category: 'typography', name: 'Body Small', value: '12px', cssVariable: '--forge-body-small-font-size', description: 'Body small text size' },
      { category: 'typography', name: 'Label Large', value: '14px', cssVariable: '--forge-label-large-font-size', description: 'Label large text size' },
      { category: 'typography', name: 'Label Medium', value: '12px', cssVariable: '--forge-label-medium-font-size', description: 'Label medium text size' },
      { category: 'typography', name: 'Label Small', value: '11px', cssVariable: '--forge-label-small-font-size', description: 'Label small text size' }
    ]);

    // Spacing tokens
    this.tokens.set('spacing', [
      { category: 'spacing', name: 'Extra Small', value: '4px', cssVariable: '--forge-spacing-xs', description: 'Extra small spacing' },
      { category: 'spacing', name: 'Small', value: '8px', cssVariable: '--forge-spacing-s', description: 'Small spacing' },
      { category: 'spacing', name: 'Medium', value: '16px', cssVariable: '--forge-spacing-m', description: 'Medium spacing' },
      { category: 'spacing', name: 'Large', value: '24px', cssVariable: '--forge-spacing-l', description: 'Large spacing' },
      { category: 'spacing', name: 'Extra Large', value: '32px', cssVariable: '--forge-spacing-xl', description: 'Extra large spacing' },
      { category: 'spacing', name: '2X Large', value: '48px', cssVariable: '--forge-spacing-2xl', description: '2X large spacing' },
      { category: 'spacing', name: '3X Large', value: '64px', cssVariable: '--forge-spacing-3xl', description: '3X large spacing' },
      { category: 'spacing', name: '4X Large', value: '96px', cssVariable: '--forge-spacing-4xl', description: '4X large spacing' }
    ]);

    // Elevation tokens
    this.tokens.set('elevation', [
      { category: 'elevation', name: 'Level 0', value: 'none', cssVariable: '--forge-elevation-0', description: 'No elevation' },
      { category: 'elevation', name: 'Level 1', value: '0px 1px 3px rgba(0,0,0,0.12)', cssVariable: '--forge-elevation-1', description: 'Level 1 elevation' },
      { category: 'elevation', name: 'Level 2', value: '0px 2px 6px rgba(0,0,0,0.12)', cssVariable: '--forge-elevation-2', description: 'Level 2 elevation' },
      { category: 'elevation', name: 'Level 3', value: '0px 3px 8px rgba(0,0,0,0.12)', cssVariable: '--forge-elevation-3', description: 'Level 3 elevation' },
      { category: 'elevation', name: 'Level 4', value: '0px 4px 12px rgba(0,0,0,0.12)', cssVariable: '--forge-elevation-4', description: 'Level 4 elevation' },
      { category: 'elevation', name: 'Level 5', value: '0px 6px 16px rgba(0,0,0,0.12)', cssVariable: '--forge-elevation-5', description: 'Level 5 elevation' }
    ]);

    // Shape tokens
    this.tokens.set('shape', [
      { category: 'shape', name: 'None', value: '0', cssVariable: '--forge-shape-none', description: 'No border radius' },
      { category: 'shape', name: 'Extra Small', value: '4px', cssVariable: '--forge-shape-xs', description: 'Extra small border radius' },
      { category: 'shape', name: 'Small', value: '8px', cssVariable: '--forge-shape-s', description: 'Small border radius' },
      { category: 'shape', name: 'Medium', value: '12px', cssVariable: '--forge-shape-m', description: 'Medium border radius' },
      { category: 'shape', name: 'Large', value: '16px', cssVariable: '--forge-shape-l', description: 'Large border radius' },
      { category: 'shape', name: 'Extra Large', value: '28px', cssVariable: '--forge-shape-xl', description: 'Extra large border radius' },
      { category: 'shape', name: 'Full', value: '50%', cssVariable: '--forge-shape-full', description: 'Full border radius (circular)' }
    ]);

    // Animation tokens
    this.tokens.set('animation', [
      { category: 'animation', name: 'Duration Short', value: '100ms', cssVariable: '--forge-animation-duration-short', description: 'Short animation duration' },
      { category: 'animation', name: 'Duration Medium', value: '250ms', cssVariable: '--forge-animation-duration-medium', description: 'Medium animation duration' },
      { category: 'animation', name: 'Duration Long', value: '500ms', cssVariable: '--forge-animation-duration-long', description: 'Long animation duration' },
      { category: 'animation', name: 'Easing Standard', value: 'cubic-bezier(0.4, 0.0, 0.2, 1)', cssVariable: '--forge-animation-easing-standard', description: 'Standard easing curve' },
      { category: 'animation', name: 'Easing Emphasized', value: 'cubic-bezier(0.2, 0.0, 0, 1)', cssVariable: '--forge-animation-easing-emphasized', description: 'Emphasized easing curve' }
    ]);
  }

  async list(): Promise<any> {
    const allTokens: Record<string, DesignToken[]> = {};
    
    for (const [category, tokens] of this.tokens.entries()) {
      allTokens[category] = tokens;
    }

    return {
      uri: 'forge://design-tokens',
      name: 'Forge Design Tokens',
      description: 'Design system tokens for Tyler Forge',
      mimeType: 'application/json',
      text: JSON.stringify(allTokens, null, 2)
    };
  }

  async getCategory(category: string): Promise<any> {
    const tokens = this.tokens.get(category);
    
    if (!tokens) {
      throw new Error(`Token category ${category} not found`);
    }

    return {
      uri: `forge://design-tokens/${category}`,
      name: `${this.formatCategory(category)} Tokens`,
      description: `Design tokens for ${category}`,
      mimeType: 'application/json',
      text: JSON.stringify(tokens, null, 2)
    };
  }

  private formatCategory(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
}