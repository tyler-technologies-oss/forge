export const BLOCK_HEIGHT_MESSAGE = 'forge-block-frame-height';
export const BLOCK_THEME_MESSAGE = 'forge-block-frame-theme';

export type BlockTheme = 'light' | 'dark';

export type BlockFrameMessage = { type: typeof BLOCK_HEIGHT_MESSAGE; height: number } | { type: typeof BLOCK_THEME_MESSAGE; theme: BlockTheme };
