import type { CollectionEntry } from "astro:content";
import { categories, categoryIds } from "../data/component-categories";

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  children?: NavItem[];
}

export interface NavSection {
  id: string;
  items: NavItem[];
}

export function buildNavigation(
  components: CollectionEntry<"components">[],
): NavSection[] {
  return [
    // Section 1: Home
    {
      id: "main",
      items: [
        {
          id: "home",
          label: "Home",
          icon: "home",
          href: "/",
        },
      ],
    },
    // Section 2: Guides & Resources
    {
      id: "guides",
      items: [
        {
          id: "designing",
          label: "Designing",
          icon: "hammer_screwdriver",
          children: [
            {
              id: "design-getting-started",
              label: "Getting Started",
              href: "/designing/getting-started/",
            },
            {
              id: "design-color",
              label: "Color System",
              href: "/designing/color/",
            },
            {
              id: "design-typography",
              label: "Typography",
              href: "/designing/typography/",
            },
            {
              id: "design-spacing",
              label: "Spacing",
              href: "/designing/spacing/",
            },
            {
              id: "design-iconography",
              label: "Iconography",
              href: "/designing/iconography/",
            },
          ],
        },
        {
          id: "developing",
          label: "Developing",
          icon: "code",
          children: [
            {
              id: "dev-installation",
              label: "Installation",
              href: "/developing/installation/",
            },
            { id: "dev-usage", label: "Usage", href: "/developing/usage/" },
            {
              id: "dev-theming",
              label: "Theming",
              href: "/developing/theming/",
            },
            {
              id: "dev-typography",
              label: "Typography",
              href: "/developing/typography/",
            },
            { id: "dev-forms", label: "Forms", href: "/developing/forms/" },
            { id: "dev-icons", label: "Icons", href: "/developing/icons/" },
            {
              id: "dev-illustrations",
              label: "Illustrations",
              href: "/developing/illustrations/",
            },
            {
              id: "dev-accessibility",
              label: "Accessibility",
              href: "/developing/accessibility/",
            },
            {
              id: "dev-customization",
              label: "Customization",
              href: "/developing/customization/",
            },
            {
              id: "dev-global-configuration",
              label: "Global Configuration",
              href: "/developing/global-configuration/",
            },
            {
              id: "dev-css-only-components",
              label: "CSS-Only Components",
              href: "/developing/css-only-components/",
            },
            {
              id: "dev-sass-library",
              label: "Sass Library",
              href: "/developing/sass-library/",
            },
            {
              id: "dev-tailwind",
              label: "Tailwind CSS",
              href: "/developing/tailwind/",
            },
            {
              id: "dev-mcp-server",
              label: "Forge MCP Server",
              href: "/developing/mcp-server/",
            },
            {
              id: "dev-frameworks",
              label: "Frameworks",
              children: [
                {
                  id: "dev-frameworks-angular",
                  label: "Angular",
                  href: "/developing/frameworks/angular/",
                },
                {
                  id: "dev-frameworks-blazor",
                  label: "Blazor",
                  href: "/developing/frameworks/blazor/",
                },
                {
                  id: "dev-frameworks-react",
                  label: "React",
                  href: "/developing/frameworks/react/",
                },
                {
                  id: "dev-frameworks-svelte",
                  label: "Svelte",
                  href: "/developing/frameworks/svelte/",
                },
                {
                  id: "dev-frameworks-vue",
                  label: "Vue",
                  href: "/developing/frameworks/vue/",
                },
              ],
            },
          ],
        },
        {
          id: "faq",
          label: "FAQ",
          icon: "help_circle_outline",
          children: [
            {
              id: "faq-dropdown-options",
              label: "Dropdown Options",
              href: "/faq/dropdown-options/",
            },
            {
              id: "faq-focus-indicator-clipping",
              label: "Focus Indicator Clipping",
              href: "/faq/focus-indicator-clipping/",
            },
          ],
        },
      ],
    },
    // Section 3: Reference
    {
      id: "reference",
      items: [
        {
          id: "components",
          label: "Components",
          icon: "view_dashboard_outline",
          children: [
            {
              id: "components-overview",
              label: "All components",
              href: "/components/",
            },
            ...buildComponentGroups(components),
          ],
        },
        {
          id: "tokens",
          label: "Tokens",
          icon: "text_shadow",
          children: [
            {
              id: "tokens-introduction",
              label: "Introduction",
              href: "/tokens/",
            },
            { id: "tokens-color", label: "Color", href: "/tokens/color/" },
            {
              id: "tokens-typography",
              label: "Typography",
              href: "/tokens/typography/",
            },
            {
              id: "tokens-spacing",
              label: "Spacing",
              href: "/tokens/spacing/",
            },
            { id: "tokens-shape", label: "Shape", href: "/tokens/shape/" },
            { id: "tokens-border", label: "Border", href: "/tokens/border/" },
            {
              id: "tokens-elevation",
              label: "Elevation",
              href: "/tokens/elevation/",
            },
            {
              id: "tokens-layering",
              label: "Layering",
              href: "/tokens/layering/",
            },
            {
              id: "tokens-animation",
              label: "Animation",
              href: "/tokens/animation/",
            },
          ],
        },
        {
          id: "icons",
          label: "Icons",
          icon: "palette",
          children: [
            {
              id: "icons-usage",
              label: "Usage",
              href: "/icons/usage/",
            },
            {
              id: "icons-library",
              label: "Icon Library",
              href: "/icons/library/",
            },
          ],
        },
        {
          id: "blocks",
          label: "Blocks",
          icon: "widgets",
          href: "/blocks/",
        },
      ],
    },

    {
      id: "about",
      items: [
        {
          id: "about",
          label: "About",
          icon: "info_outline",
          children: [
            { id: "about-roadmap", label: "Roadmap", href: "/about/roadmap/" },
            {
              id: "about-changelog",
              label: "Changelog",
              href: "/about/changelog/",
            },
          ],
        },
      ],
    },
  ];
}

function buildComponentGroups(
  components: CollectionEntry<"components">[],
): NavItem[] {
  return categoryIds
    .map((category) => ({
      id: `components-${category}`,
      label: categories[category],
      children: components
        .filter((c) => c.data.category === category)
        .sort((a, b) => a.data.title.localeCompare(b.data.title))
        .map((c) => ({
          id: `component-${c.id}`,
          label: c.data.title,
          href: `/components/${c.id}/usage/`,
        })),
    }))
    .filter((group) => group.children.length > 0);
}
