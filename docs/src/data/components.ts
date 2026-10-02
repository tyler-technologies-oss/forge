/**
 * Component API data auto-generated from Custom Elements Manifest (CEM).
 *
 * The CEM is read at build time from @tylertech/forge and transformed
 * into a documentation-friendly format. No manual API data maintenance required.
 */

import forgeCem from "@tylertech/forge/custom-elements.json";

// ============================================================================
// Public API Types (used by documentation components)
// ============================================================================

export interface ComponentAttribute {
  name: string;
  type: string;
  description: string;
  default?: string;
}

export interface ComponentProperty {
  name: string;
  type: string;
  description: string;
  default?: string;
}

/**
 * Merged view of a component's JS property and its matching HTML attribute.
 * Pairing is by kebab↔camel case: `fullWidth` ↔ `full-width`. A property
 * with no matching attribute (e.g. `form`) still appears here with `attribute`
 * undefined — the UI renders those cells as an em-dash.
 */
export interface ComponentPropAttr {
  property?: string;
  attribute?: string;
  type: string;
  description: string;
  default?: string;
}

export interface ComponentEvent {
  name: string;
  type: string;
  description: string;
}

export interface ComponentSlot {
  name: string;
  description: string;
}

export interface ComponentCssPart {
  name: string;
  description: string;
}

export interface ComponentCssProperty {
  name: string;
  description: string;
}

export interface ComponentMethod {
  name: string;
  description: string;
  parameters?: string;
  returnType?: string;
}

export interface ComponentApi {
  tagName: string;
  summary?: string;
  /**
   * The first path segment after `src/lib/` in the CEM module path — the
   * subpath used to side-effect-import the component. `src/lib/button/button.ts`
   * becomes `"button"`, which the docs page combines with the package
   * (`@tylertech/forge`) to render the import snippet.
   */
  importSubpath?: string;
  attributes?: ComponentAttribute[];
  properties?: ComponentProperty[];
  propsAndAttrs?: ComponentPropAttr[];
  events?: ComponentEvent[];
  slots?: ComponentSlot[];
  cssParts?: ComponentCssPart[];
  cssProperties?: ComponentCssProperty[];
  methods?: ComponentMethod[];
}

// ============================================================================
// CEM Types (internal, matches Custom Elements Manifest schema)
// ============================================================================

interface CemMember {
  kind: string;
  name: string;
  type?: { text: string };
  description?: string;
  default?: string;
  privacy?: string;
  return?: { type: { text: string } };
  parameters?: Array<{ name: string; type?: { text: string } }>;
}

interface CemDeclaration {
  kind: string;
  name: string;
  tagName?: string;
  summary?: string;
  members?: CemMember[];
  events?: Array<{ name: string; type?: { text: string }; description?: string }>;
  attributes?: Array<{ name: string; type?: { text: string }; description?: string; default?: string }>;
  slots?: Array<{ name: string; description?: string }>;
  cssParts?: Array<{ name: string; description?: string }>;
  cssProperties?: Array<{ name: string; description?: string }>;
}

interface CustomElementsManifest {
  modules: Array<{
    path: string;
    declarations?: CemDeclaration[];
  }>;
}

// ============================================================================
// CEM Transformation
// ============================================================================

/** Filters out private members (prefixed with # or _, or marked private) */
function isPublicMember(member: CemMember): boolean {
  return (
    member.privacy !== "private" &&
    !member.name.startsWith("#") &&
    !member.name.startsWith("_")
  );
}

/** `fullWidth` → `full-width` */
function camelToKebab(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Merge a component's properties and attributes into a single row per field.
 *
 * The CEM ships attributes without an explicit fieldName back-reference, so
 * we pair by name: first the kebab conversion of the property (`fullWidth` →
 * `full-width`, covers ~660 of Forge's ~670 pairs), then the raw name as a
 * fallback (covers the ~7 fields like `externalType` whose attribute is
 * literally `externaltype`, all lowercased). Attributes with no matching
 * property (e.g. `aria-label`, `no-padding`) still appear as attribute-only
 * rows so nothing is dropped from the docs.
 *
 * Attribute-level description/type/default wins when both sides have them —
 * the manifest treats attributes as the authoritative surface.
 */
function mergePropsAndAttrs(
  properties: ComponentProperty[] | undefined,
  attributes: ComponentAttribute[] | undefined
): ComponentPropAttr[] {
  const attrByKey = new Map<string, ComponentAttribute>();
  for (const a of attributes ?? []) attrByKey.set(a.name, a);

  const seenAttrs = new Set<string>();
  const rows: ComponentPropAttr[] = [];

  for (const prop of properties ?? []) {
    const kebab = camelToKebab(prop.name);
    const attr = attrByKey.get(kebab) ?? attrByKey.get(prop.name);
    if (attr) seenAttrs.add(attr.name);

    rows.push({
      property: prop.name,
      attribute: attr?.name,
      type: attr?.type ?? prop.type,
      description: attr?.description || prop.description,
      default: attr?.default ?? prop.default,
    });
  }

  for (const attr of attributes ?? []) {
    if (seenAttrs.has(attr.name)) continue;
    rows.push({
      attribute: attr.name,
      type: attr.type,
      description: attr.description,
      default: attr.default,
    });
  }

  return rows;
}

/**
 * Extract the import subpath from a CEM module path.
 * `src/lib/button/button.ts` → `"button"`
 * `src/lib/select/select/select.ts` → `"select"`
 */
function extractImportSubpath(modulePath: string | undefined): string | undefined {
  if (!modulePath) return undefined;
  const match = modulePath.match(/^src\/lib\/([^/]+)\//);
  return match?.[1];
}

/** Transforms a CEM declaration into our ComponentApi format */
function transformCemToApi(
  declaration: CemDeclaration,
  modulePath?: string
): ComponentApi {
  const api: ComponentApi = {
    tagName: declaration.tagName!,
    summary: declaration.summary,
    importSubpath: extractImportSubpath(modulePath),
  };

  if (declaration.attributes?.length) {
    api.attributes = declaration.attributes.map((attr) => ({
      name: attr.name,
      type: attr.type?.text ?? "unknown",
      description: attr.description ?? "",
      default: attr.default,
    }));
  }

  if (declaration.members?.length) {
    const publicFields = declaration.members.filter(
      (m) => m.kind === "field" && isPublicMember(m)
    );
    if (publicFields.length) {
      api.properties = publicFields.map((prop) => ({
        name: prop.name,
        type: prop.type?.text ?? "unknown",
        description: prop.description ?? "",
        default: prop.default,
      }));
    }

    const publicMethods = declaration.members.filter(
      (m) => m.kind === "method" && isPublicMember(m)
    );
    if (publicMethods.length) {
      api.methods = publicMethods.map((method) => ({
        name: method.parameters?.length
          ? `${method.name}(${method.parameters.map((p) => p.name).join(", ")})`
          : `${method.name}()`,
        description: method.description ?? "",
        parameters: method.parameters
          ?.map((p) => `${p.name}: ${p.type?.text ?? "unknown"}`)
          .join(", "),
        returnType: method.return?.type?.text,
      }));
    }
  }

  if (declaration.events?.length) {
    api.events = declaration.events.map((event) => ({
      name: event.name,
      type: event.type?.text ?? "CustomEvent",
      description: event.description ?? "",
    }));
  }

  if (declaration.slots?.length) {
    api.slots = declaration.slots.map((slot) => ({
      name: slot.name || "",
      description: slot.description ?? "",
    }));
  }

  if (declaration.cssParts?.length) {
    api.cssParts = declaration.cssParts.map((part) => ({
      name: part.name,
      description: part.description ?? "",
    }));
  }

  if (declaration.cssProperties?.length) {
    api.cssProperties = declaration.cssProperties.map((prop) => ({
      name: prop.name,
      description: prop.description ?? "",
    }));
  }

  if (api.properties?.length || api.attributes?.length) {
    api.propsAndAttrs = mergePropsAndAttrs(api.properties, api.attributes);
  }

  return api;
}

/** Builds a slug-keyed map of all component APIs from the CEM */
function buildComponentApis(): Record<string, ComponentApi> {
  const apis: Record<string, ComponentApi> = {};
  const cem = forgeCem as CustomElementsManifest;

  for (const module of cem.modules) {
    if (!module.declarations) continue;

    for (const declaration of module.declarations) {
      if (declaration.tagName && declaration.kind === "class") {
        const slug = declaration.tagName.replace("forge-", "");
        apis[slug] = transformCemToApi(declaration, module.path);
      }
    }
  }

  return apis;
}

// Build once at module load (executed at build time in Astro)
const componentApis = buildComponentApis();

// ============================================================================
// Public API
// ============================================================================

export function getComponentApi(slug: string): ComponentApi | undefined {
  return componentApis[slug];
}

export function getAllComponentApis(): Record<string, ComponentApi> {
  return componentApis;
}

export function getComponentTagNames(): string[] {
  return Object.values(componentApis).map((api) => api.tagName);
}

// ============================================================================
// Display Labels
// ============================================================================

export const categories = {
  actions: "Actions",
  forms: "Forms",
  layout: "Layout",
  navigation: "Navigation",
  feedback: "Feedback",
  "data-display": "Data Display",
  utilities: "Utilities",
} as const;

export const sourceLabels = {
  core: "Core",
  block: "Block",
} as const;

export const statusLabels = {
  stable: "Stable",
  beta: "Beta",
  deprecated: "Deprecated",
  planned: "Planned",
} as const;

export type Category = keyof typeof categories;
export type Source = keyof typeof sourceLabels;
export type Status = keyof typeof statusLabels;
