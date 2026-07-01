/**
 * Tailwind to Plain CSS Converter
 *
 * Converts block HTML files with Tailwind classes into plain HTML/CSS versions.
 * This enables teams that don't use Tailwind to still use the blocks.
 *
 * For each block, generates:
 *   - <block>_plain.html - HTML with Tailwind classes replaced by generated class names
 *   - <block>.css - CSS file containing the generated styles
 *
 * The plain HTML file includes a link to the CSS file in the <head>.
 */

import { twi } from 'tw-to-css';

/** Result of converting a block to plain HTML/CSS */
export interface ConversionResult {
  plainHtml: string;
  css: string;
}

/** Map of original class string to generated class name */
type ClassMap = Map<string, string>;

/**
 * Extracts all class attribute values from HTML.
 * Returns unique class combinations found in the document.
 */
function extractClassCombinations(html: string): Set<string> {
  const classRegex = /class="([^"]*)"/g;
  const combinations = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = classRegex.exec(html)) !== null) {
    const classValue = match[1].trim();
    if (classValue) {
      combinations.add(classValue);
    }
  }

  return combinations;
}

/**
 * Filters out non-Tailwind classes from a class string.
 * Returns only the Tailwind utility classes.
 */
function filterTailwindClasses(classString: string): { tailwind: string[]; other: string[] } {
  const classes = classString.split(/\s+/).filter(Boolean);
  const tailwind: string[] = [];
  const other: string[] = [];

  for (const cls of classes) {
    // Common patterns that indicate Tailwind classes
    // This is a heuristic - Tailwind classes typically:
    // - Start with known prefixes (bg-, text-, p-, m-, flex, grid, etc.)
    // - Contain responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
    // - Contain state prefixes (hover:, focus:, active:, etc.)
    // - Use the bracket notation for arbitrary values [...]
    if (isTailwindClass(cls)) {
      tailwind.push(cls);
    } else {
      other.push(cls);
    }
  }

  return { tailwind, other };
}

/**
 * Determines if a class name is likely a Tailwind utility class.
 */
function isTailwindClass(cls: string): boolean {
  // Tailwind prefixes and patterns
  const tailwindPatterns = [
    // Layout
    /^(block|inline|flex|grid|hidden|contents)$/,
    /^(flex-|grid-|col-|row-|gap-|place-|items-|justify-|self-)/,
    // Spacing
    /^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|space-)[xyt]?-/,
    // Sizing
    /^(w-|h-|min-w-|min-h-|max-w-|max-h-|size-)/,
    // Typography
    /^(text-|font-|tracking-|leading-|decoration-|underline|line-through|no-underline)/,
    // Backgrounds
    /^(bg-|from-|via-|to-|gradient-)/,
    // Borders
    /^(border|rounded|outline|ring)/,
    // Effects
    /^(shadow|opacity-|blur-|brightness-|contrast-)/,
    // Transforms
    /^(scale-|rotate-|translate-|skew-|origin-|transform)/,
    // Transitions
    /^(transition|duration-|ease-|delay-|animate-)/,
    // Interactivity
    /^(cursor-|pointer-events-|select-|resize|scroll-)/,
    // SVG
    /^(fill-|stroke-)/,
    // Accessibility
    /^(sr-only|not-sr-only)/,
    // Position
    /^(static|fixed|absolute|relative|sticky)$/,
    /^(inset-|top-|right-|bottom-|left-|z-)/,
    // Overflow
    /^(overflow-|truncate|text-ellipsis|text-clip)/,
    // Display
    /^(visible|invisible|collapse)$/,
    // Arbitrary values
    /\[.+\]/,
    // Responsive/state prefixes
    /^(sm:|md:|lg:|xl:|2xl:|hover:|focus:|active:|disabled:|group-|peer-)/,
    // Negative values
    /^-[a-z]/,
    // Common single-word utilities
    /^(antialiased|subpixel-antialiased|italic|not-italic|uppercase|lowercase|capitalize|normal-case)$/,
    /^(ordinal|slashed-zero|lining-nums|oldstyle-nums|proportional-nums|tabular-nums)$/,
    /^(diagonal-fractions|stacked-fractions)$/,
    /^(isolate|isolation-auto)$/,
    /^(object-contain|object-cover|object-fill|object-none|object-scale-down)$/,
    /^(object-bottom|object-center|object-left|object-left-bottom|object-left-top)$/,
    /^(object-right|object-right-bottom|object-right-top|object-top)$/,
    /^(break-normal|break-words|break-all|break-keep)$/,
    /^(aspect-auto|aspect-square|aspect-video)$/,
    /^(container)$/,
    /^(grow|shrink|basis-)/,
    /^(order-)/,
    /^(float-|clear-)/,
    /^(box-border|box-content)$/,
    /^(table|table-)/,
    /^(whitespace-)/,
    /^(align-)/,
    /^(appearance-)/,
    /^(columns-)/,
    /^(list-)/,
    /^(divide-)/,
    /^(overscroll-)/,
    /^(hyphens-)/,
    /^(content-)/,
    /^(will-change-)/,
    /^(backdrop-)/,
    /^(mix-blend-|bg-blend-)/,
    /^(filter|grayscale|invert|saturate|sepia)/,
    /^(drop-shadow)/,
    /^(touch-)/,
    /^(snap-)/,
    /^(accent-|caret-)/
  ];

  return tailwindPatterns.some(pattern => pattern.test(cls));
}

/**
 * Generates a unique class name based on index.
 */
function generateClassName(index: number): string {
  return `fb-${index}`;
}

/**
 * Converts Tailwind classes to CSS using tw-to-css.
 * Returns the CSS for a single class combination.
 */
function convertToCss(tailwindClasses: string, className: string): string {
  if (!tailwindClasses.trim()) {
    return '';
  }

  try {
    // Get inline CSS from tw-to-css
    const inlineCss = twi(tailwindClasses, { minify: false });

    if (!inlineCss.trim()) {
      return '';
    }

    // Convert inline CSS to a class rule
    const properties = inlineCss
      .split(';')
      .map(s => s.trim())
      .filter(Boolean);
    return `.${className} {\n  ${properties.join(';\n  ')};\n}\n`;
  } catch {
    // If conversion fails, return empty string
    console.warn(`Failed to convert Tailwind classes: ${tailwindClasses}`);
    return '';
  }
}

/**
 * Converts a block HTML file with Tailwind classes to plain HTML/CSS.
 *
 * @param html - The original HTML content with Tailwind classes
 * @param cssFileName - The name of the CSS file to reference in the HTML
 * @returns The converted plain HTML and CSS content
 */
export function convertBlockToPlainCss(html: string, cssFileName: string): ConversionResult {
  // Extract all unique class combinations
  const classCombinations = extractClassCombinations(html);

  // Create mapping from original classes to generated class names
  const classMap: ClassMap = new Map();
  const cssRules: string[] = [];
  let classIndex = 0;

  for (const originalClasses of classCombinations) {
    const { tailwind, other } = filterTailwindClasses(originalClasses);

    if (tailwind.length === 0) {
      // No Tailwind classes, keep original
      continue;
    }

    const tailwindString = tailwind.join(' ');

    // Check if we already have a mapping for these Tailwind classes
    let generatedClass: string;
    const existingEntry = [...classMap.entries()].find(
      ([orig]) => filterTailwindClasses(orig).tailwind.join(' ') === tailwindString
    );

    if (existingEntry) {
      // Reuse existing generated class
      const existingOther = filterTailwindClasses(existingEntry[0]).other;
      generatedClass = existingEntry[1].split(' ').find(c => c.startsWith('fb-')) || '';
    } else {
      // Generate new class and CSS
      generatedClass = generateClassName(classIndex++);
      const css = convertToCss(tailwindString, generatedClass);
      if (css) {
        cssRules.push(css);
      }
    }

    // Create new class string: generated class + non-Tailwind classes
    const newClasses = [generatedClass, ...other].filter(Boolean).join(' ');
    classMap.set(originalClasses, newClasses);
  }

  // Replace class attributes in HTML
  let plainHtml = html;
  for (const [original, replacement] of classMap) {
    // Escape special regex characters in the original class string
    const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`class="${escaped}"`, 'g');
    plainHtml = plainHtml.replace(regex, `class="${replacement}"`);
  }

  // Add CSS link to the head
  const cssLink = `<link rel="stylesheet" href="${cssFileName}">`;
  if (plainHtml.includes('</head>')) {
    plainHtml = plainHtml.replace('</head>', `  ${cssLink}\n  </head>`);
  }

  // Combine CSS rules
  const css = `/* Generated CSS from Tailwind classes */\n/* Do not edit - regenerate from source */\n\n${cssRules.join('\n')}`;

  return { plainHtml, css };
}
