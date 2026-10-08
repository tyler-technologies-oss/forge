/**
 * Docs-only content for the theme color sections on the Color Tokens page: the order the
 * role categories render in, each section's intro, and token descriptions the manifest
 * doesn't carry yet.
 */

export interface ThemeColorSection {
  category: string;
  description: string;
}

export const themeColorSections: ThemeColorSection[] = [
  { category: "surface", description: "The surface colors are used to define the background colors for content areas." },
  { category: "brand", description: "The brand colors are used to define the primary colors of the design system." },
  { category: "primary", description: "Primary colors are the main colors used throughout the design system." },
  {
    category: "secondary",
    description: "Secondary colors complement the primary colors and are used to provide additional visual interest.",
  },
  {
    category: "tertiary",
    description:
      "Tertiary colors are used to provide additional visual interest and are typically used for less prominent elements, but still complement the primary color.",
  },
  { category: "success", description: "Success colors are used to indicate successful actions or states." },
  { category: "error", description: "Error colors are used to indicate errors or failed actions or states." },
  { category: "warning", description: "Warning colors are used to indicate warnings or cautionary actions or states." },
  { category: "info", description: "Info colors are used to indicate informational actions or states." },
  {
    category: "text",
    description: "The text colors are used to define the colors of text elements with varying emphasis levels.",
  },
  {
    category: "outline",
    description:
      "The outline colors are used to define the colors of outline or border of elements with varying emphasis levels.",
  },
];

/**
 * Token descriptions carried over from the hand-written page. Not rendered yet.
 *
 * TODO: Move these into the design token manifest and show them in a Description column.
 */
export const themeColorDescriptions: Record<string, string> = {
  "--forge-theme-surface": "Used for the background color of content areas.",
  "--forge-theme-surface-dim":
    "The background color for content areas that are less prominent and typically used behind surfaces to draw contrast.",
  "--forge-theme-surface-bright": "An alternate surface color typically use for floating surfaces.",
  "--forge-theme-surface-inverse":
    "An inverse surface color typically used for floating surfaces the require more emphasis.",
  "--forge-theme-brand": "The brand identity color, typically used for app bars and other prominent elements.",
  "--forge-theme-text-high": "The high emphasis text color.",
  "--forge-theme-text-high-inverse": "The inverse high emphasis text color.",
  "--forge-theme-text-medium": "The medium emphasis text color.",
  "--forge-theme-text-medium-inverse": "The inverse medium emphasis text color.",
  "--forge-theme-text-low": "The low emphasis text color.",
  "--forge-theme-text-low-inverse": "The inverse low emphasis text color.",
  "--forge-theme-text-lowest": "The lowest emphasis text color.",
  "--forge-theme-text-lowest-inverse": "The inverse lowest emphasis text color.",
  "--forge-theme-outline": "The color of standard emphasis outline elements.",
  "--forge-theme-outline-low": "The color of low emphasis outline elements.",
  "--forge-theme-outline-medium": "The color of medium emphasis outline elements.",
  "--forge-theme-outline-high": "The color of high emphasis outline elements.",
};
