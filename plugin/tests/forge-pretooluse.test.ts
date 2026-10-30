import { describe, it, expect } from 'vitest';
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const hookPath = fileURLToPath(new URL('../hooks/forge-pretooluse.mjs', import.meta.url));

const runHook = (content: string): SpawnSyncReturns<string> =>
  spawnSync('node', [hookPath], {
    // eslint-disable-next-line camelcase
    input: JSON.stringify({ tool_name: 'Write', tool_input: { file_path: 'index.html', content } }),
    encoding: 'utf8'
  });

describe('forge-pretooluse hook inline style rule', () => {
  it('should allow the documented app-shell styles on body', () => {
    const result = runHook('<body style="margin: 0; height: 100%; background-color: #fff;"></body>');

    expect(result.status).toBe(0);
  });

  it('should block other declarations on body', () => {
    const result = runHook('<body style="margin: 0; color: red"></body>');

    expect(result.status).toBe(2);
    expect(result.stderr).toContain('Inline style on <body>');
  });

  it('should block inline styles on other elements', () => {
    const result = runHook('<div style="margin: 0"></div>');

    expect(result.status).toBe(2);
    expect(result.stderr).toContain('Inline style on <div>');
  });

  it('should evaluate pathological body style values quickly', () => {
    const start = Date.now();
    const result = runHook(`<body style="width:${':width:'.repeat(20000)};!"></body>`);

    expect(result.status).toBe(2);
    expect(Date.now() - start).toBeLessThan(5000);
  });
});

describe('forge-pretooluse hook card title style rule', () => {
  const cardWithTitle = (title: string): string =>
    `<forge-card><forge-scaffold><forge-toolbar slot="header">${title}</forge-toolbar></forge-scaffold></forge-card>`;

  it('should allow any heading element when the card title is styled heading3', () => {
    for (const tag of ['h1', 'h2', 'h3', 'h4']) {
      const result = runHook(cardWithTitle(`<${tag} slot="start" class="text-heading3">Orders</${tag}>`));

      expect(result.stderr).not.toContain('[card-title-style]');
    }
  });

  it('should block a card title styled larger than heading3', () => {
    const result = runHook(cardWithTitle('<h3 slot="start" class="text-heading4">Orders</h3>'));

    expect(result.stderr).toContain('[card-title-style]');
  });

  it('should block a larger card title styled with the forge-typography class', () => {
    const result = runHook(cardWithTitle('<h3 slot="start" class="forge-typography--heading5">Orders</h3>'));

    expect(result.stderr).toContain('[card-title-style]');
  });

  it('should not check headings outside the card header toolbar', () => {
    const result = runHook('<forge-card><p class="text-heading6">Big number</p></forge-card>');

    expect(result.stderr).not.toContain('[card-title-style]');
  });
});
