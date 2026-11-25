import type { TemplateFn } from '../types.js';

export type LinkCellType = 'url' | 'email' | 'phone' | 'data' | 'blob';

export interface LinkCellOptions {
  text?: string | ((value: string) => string);
  type?: LinkCellType;
  target?: string;
  rel?: string;
  referrerPolicy?: string;
  download?: boolean | string;
}

interface TrustedTypePolicyLike {
  createScriptURL(input: string): { toString(): string };
}

interface TrustedTypesLike {
  createPolicy(name: string, rules: { createScriptURL: (input: string) => string }): TrustedTypePolicyLike;
}

const TRUSTED_TYPES_POLICY_NAME = 'forge-link-cell';
const UNSAFE_URL_PROTOCOL = /^\s*(?:javascript|vbscript):/i;
const SAFE_URL = 'about:blank';

const URL_PREFIXES: Record<LinkCellType, string> = {
  url: '',
  email: 'mailto:',
  phone: 'tel:',
  data: '',
  blob: ''
};

let trustedTypesPolicy: TrustedTypePolicyLike | undefined;

const sanitizeUrl = (url: string): string => (UNSAFE_URL_PROTOCOL.test(url) ? SAFE_URL : url);

const getTrustedTypesPolicy = (): TrustedTypePolicyLike | undefined => {
  if (trustedTypesPolicy) {
    return trustedTypesPolicy;
  }
  const trustedTypes = (globalThis as { trustedTypes?: TrustedTypesLike }).trustedTypes;
  if (!trustedTypes) {
    return undefined;
  }
  trustedTypesPolicy = trustedTypes.createPolicy(TRUSTED_TYPES_POLICY_NAME, { createScriptURL: sanitizeUrl });
  return trustedTypesPolicy;
};

const createSafeUrl = (url: string): string => {
  const policy = getTrustedTypesPolicy();
  return policy ? policy.createScriptURL(url).toString() : sanitizeUrl(url);
};

/**
 * Creates a column `template` that renders the cell value as an anchor element.
 *
 * @example
 * ```ts
 * { header: 'Email', property: 'email', template: linkCell({ type: 'email' }) }
 * ```
 */
export function linkCell(options: LinkCellOptions = {}): TemplateFn {
  const { text, type = 'url', target, rel, referrerPolicy, download } = options;

  return ({ cell }) => {
    const rawValue = cell.getValue();
    const value = rawValue == null ? '' : String(rawValue);

    const anchor = document.createElement('a');
    anchor.classList.add('forge-anchor');
    anchor.href = createSafeUrl(`${URL_PREFIXES[type]}${value}`);
    anchor.textContent = typeof text === 'function' ? text(value) : (text ?? value);

    if (target) {
      anchor.target = target;
    }
    if (rel) {
      anchor.rel = rel;
    }
    if (referrerPolicy) {
      anchor.referrerPolicy = referrerPolicy;
    }
    if (download) {
      anchor.download = typeof download === 'string' ? download : '';
    }

    return anchor;
  };
}
