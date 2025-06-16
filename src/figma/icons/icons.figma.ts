import figma from '@figma/code-connect';

// hack: keep names as string to work with attributes in component examples
figma.connect('<FIGMA_ICONS_BASE>?node-id=2004-637', { example: () => 'texture' });
