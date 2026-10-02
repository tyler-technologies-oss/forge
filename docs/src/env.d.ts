/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_BLOCKS_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
