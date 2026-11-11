import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

const compileStylesheet = path => compile(path, { loadPaths: ['node_modules'] }).css;
const light = compileStylesheet('src/lib/forge-radix.scss');
const dark = compileStylesheet('src/lib/forge-radix-dark.scss');
const defaultTheme = compileStylesheet('src/lib/forge.scss');

describe('forge-radix stylesheets', () => {
  it('should set the radix theme tokens on the root element', () => {
    expect(light).toContain(':root {');
    expect(light).toContain('--forge-theme-control-bg:');
    expect(light).toContain('--forge-theme-primary-container-maximum:');
  });

  it('should set the radix typography values that differ from the default typography', () => {
    for (const stylesheet of [light, dark]) {
      expect(stylesheet).toContain('--forge-typography-heading1-font-weight: 600;');
      expect(stylesheet).toContain('--forge-typography-heading1-letter-spacing: 0em;');
      expect(stylesheet).toContain('--forge-typography-code1-font-family: var(--forge-typography-font-family-mono, "Cascadia Code", ui-monospace, monospace);');
    }
  });

  it('should not set typography values that match the default typography', () => {
    expect(light).not.toContain('--forge-typography-body1-font-weight:');
    expect(light).not.toContain('--forge-typography-heading1-font-family:');
  });

  it('should set component tokens for the radix theme', () => {
    expect(light).toContain('--forge-button-tonal-background: var(--forge-theme-secondary-container);');
    expect(light).toContain('--forge-field-background: var(--forge-theme-control-bg);');
  });

  it('should use dark values in the dark stylesheet', () => {
    expect(dark).not.toBe(light);
    expect(dark).toContain('--forge-theme-control-bg:');
    expect(dark).toContain('--forge-theme-brand: oklch(25.21% 0.0058 271.18deg);');
    expect(light).toContain('--forge-theme-brand: #283593;');
  });

  it('should scope surface overrides to elements with low specificity', () => {
    expect(light).toContain(':where(forge-card) {');
    expect(light).toContain(':where(forge-modal-drawer) {');
    expect(dark).toContain(':where(forge-popover) {');
  });

  it('should declare component tokens on both the root and the component elements', () => {
    expect(light).toMatch(/:root \{[^}]*--forge-toolbar-backdrop-filter:/);
    expect(light).toMatch(/:where\(forge-toolbar\) \{[^}]*--forge-toolbar-backdrop-filter:/);
  });

  it('should keep toolbars inside cards, dialogs, and popovers opaque', () => {
    expect(light).toMatch(/:where\(forge-card, forge-dialog\) \{[^}]*--forge-theme-surface-elevated-translucent: var\(--forge-theme-surface-bright\);/);
    expect(light).toMatch(/:where\(forge-popover\) \{[^}]*--forge-theme-surface-elevated-translucent: var\(--forge-theme-surface-elevated\);/);
  });

  it('should leave the toolbar background to the component so nested shadow roots resolve it', () => {
    expect(light).not.toContain('--forge-toolbar-background:');
  });

  it('should not set the card background on the card element so ancestors can override it', () => {
    expect(light).not.toMatch(/:where\(forge-card\) \{[^}]*--forge-card-background:/);
  });

  it('should set the default field outline tokens', () => {
    expect(light).toContain('--forge-field-default-outline-color: var(--forge-theme-outline);');
    expect(light).toContain('--forge-field-default-outline-color-hover: var(--forge-theme-outline-medium);');
  });

  it('should not emit global keyframes', () => {
    expect(light).not.toContain('@keyframes');
  });

  it('should provide the dark overrides without relying on the default dark stylesheet', () => {
    expect(dark).toContain('--forge-popover-border-width:');
    expect(dark).toContain('--forge-toast-action-color:');
    expect(dark).not.toContain('--forge-tooltip-');
  });

  it('should not change the default theme', () => {
    expect(defaultTheme).not.toContain('--forge-theme-control-bg');
    expect(defaultTheme).not.toContain('--forge-theme-secondary-container-highest');
  });
});
