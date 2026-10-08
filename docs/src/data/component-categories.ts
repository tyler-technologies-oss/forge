/**
 * Component categories, in display order. Used by the content schema, the sidenav,
 * and the components index page. Assign a component to a category via the
 * `category` frontmatter field in its usage.mdx.
 */
export const categories = {
  actions: "Actions",
  forms: "Forms",
  navigation: "Navigation",
  layout: "Layout",
  feedback: "Feedback",
  "data-display": "Data Display",
  utilities: "Utilities",
} as const;

export type Category = keyof typeof categories;

export const categoryIds = Object.keys(categories) as [Category, ...Category[]];

export const categoryIcons: Record<Category, string> = {
  actions: "cursor_default_click",
  forms: "form_textbox",
  navigation: "compass_outline",
  layout: "view_quilt",
  feedback: "message_alert_outline",
  "data-display": "table_large",
  utilities: "toolbox",
};
