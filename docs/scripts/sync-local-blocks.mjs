import { execFileSync } from 'node:child_process';
import { cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const BLOCKS_DIST = fileURLToPath(new URL('../../blocks/dist', import.meta.url));
const PUBLIC_BLOCKS = fileURLToPath(new URL('../public/blocks/v1', import.meta.url));

execFileSync('pnpm', ['--filter', 'blocks', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, BASE_HREF: '/blocks/v1/' }
});

await rm(PUBLIC_BLOCKS, { recursive: true, force: true });
await cp(BLOCKS_DIST, PUBLIC_BLOCKS, { recursive: true });
