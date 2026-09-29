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
