import { Logger } from 'sass';

export const SASS_OPTIONS = {
  loadPaths: ['node_modules'],
  quietDeps: true,
  silenceDeprecations: ['import', 'global-builtin', 'mixed-decls'],
  logger: Logger.silent
};

/**
 * Flattens compiled CSS into a sorted list of `context | selector | property: value` strings,
 * where context is the chain of enclosing at-rules. Order, whitespace, and comments are ignored.
 */
export const flattenCss = css => {
  const stack = [];
  const out = new Set();
  let buffer = '';
  let quote = null;
  let inComment = false;

  const normalize = text => text.replace(/\s+/g, ' ').trim();

  const emitDeclaration = declaration => {
    const text = normalize(declaration);
    if (!text) {
      return;
    }
    const scope = stack.map(normalize).join(' > ');
    out.add(`${scope} | ${text}`);
  };

  for (let i = 0; i < css.length; i++) {
    const char = css[i];
    const next = css[i + 1];

    if (inComment) {
      if (char === '*' && next === '/') {
        inComment = false;
        i++;
      }
      continue;
    }
    if (quote) {
      buffer += char;
      if (char === '\\') {
        buffer += next ?? '';
        i++;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }
    if (char === '/' && next === '*') {
      inComment = true;
      i++;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      buffer += char;
      continue;
    }
    if (char === '{') {
      stack.push(buffer);
      buffer = '';
      continue;
    }
    if (char === ';') {
      emitDeclaration(buffer);
      buffer = '';
      continue;
    }
    if (char === '}') {
      emitDeclaration(buffer);
      buffer = '';
      stack.pop();
      continue;
    }
    buffer += char;
  }

  return [...out].sort();
};
