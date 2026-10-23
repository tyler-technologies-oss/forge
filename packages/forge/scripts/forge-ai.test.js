import { readFileSync } from 'node:fs';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

const css = compile('src/lib/forge-ai.scss', { loadPaths: ['node_modules'] }).css;
const compileComponent = path => compile(path, { loadPaths: ['node_modules'] }).css;
const componentStyles = {
  field: 'src/lib/field/field.scss',
  checkbox: 'src/lib/checkbox/checkbox.scss',
  radio: 'src/lib/radio/radio/radio.scss',
  switch: 'src/lib/switch/switch.scss'
};
const componentPattern = Object.keys(componentStyles)
  .sort((a, b) => b.length - a.length)
  .join('|');
const componentTemplates = ['src/lib/field/field.html', 'src/lib/checkbox/checkbox.html', 'src/lib/radio/radio/radio.html', 'src/lib/switch/switch.html'];

const componentTokens = Object.entries(componentStyles).flatMap(([component, path]) =>
  [...compileComponent(path).matchAll(new RegExp(`var\\(--forge-${component}-([a-z-]+)`, 'g'))].map(([, name]) => `${component}-${name}`)
);
const tokens = new Set(componentTokens);
const parts = new Set(componentTemplates.flatMap(path => [...readFileSync(path, 'utf8').matchAll(/part="([^"]+)"/g)].map(([, name]) => name)));

describe('forge-ai stylesheet', () => {
  it('should only set component tokens that exist', () => {
    const used = [...css.matchAll(new RegExp(`--forge-(${componentPattern})-([a-z-]+):`, 'g'))].map(([, component, name]) => ({ component, name }));

    expect(used.length).toBeGreaterThan(0);
    for (const { component, name } of used) {
      expect(tokens.has(`${component}-${name}`), `--forge-${component}-${name} is not a ${component} token`).toBe(true);
    }
  });

  it('should style every component it covers', () => {
    for (const component of Object.keys(componentStyles)) {
      expect(css).toContain(`--forge-${component}-`);
    }
  });

  it('should only target parts that exist', () => {
    const used = [...css.matchAll(/::part\(([a-z-]+)\)/g)].map(([, name]) => name);

    expect(used.length).toBeGreaterThan(0);
    for (const name of used) {
      expect(parts.has(name), `"${name}" is not a component part`).toBe(true);
    }
  });

  it('should be wrapped in a cascade layer so consumers can override it', () => {
    expect(css.trimStart().startsWith('@layer forge-ai {')).toBe(true);
  });
});
