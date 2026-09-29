// Shared types + enums for the UI-plan contract.
//
// The plan is the machine-checkable artifact the model must produce and get
// validated BEFORE writing composition-scale Forge markup. Keeping the
// enums in one place lets both tools (generate and validate) agree on what
// is legal.

export const PAGE_TYPES = [
  'dashboard',
  'list-detail',
  'form',
  'settings',
  'wizard',
  'landing',
  'single-feature',
] as const;
export type PageType = (typeof PAGE_TYPES)[number];

export const HEADING_ROLES = [
  'text-heading1',
  'text-heading2',
  'text-heading3',
  'text-heading4',
  'text-heading5',
  'text-heading6',
  'text-heading7',
  'text-heading8',
  'text-display1',
  'text-display2',
  'text-display3',
  'text-display4',
  'text-display5',
  'text-display6',
  'text-display7',
  'text-display8',
] as const;
export type HeadingRole = (typeof HEADING_ROLES)[number];

export const BODY_ROLES = [
  'text-body1',
  'text-body2',
  'text-body3',
  'text-body4',
] as const;
export type BodyRole = (typeof BODY_ROLES)[number];

export const SPACING_SCALES = ['tokens-only'] as const;
export type SpacingScale = (typeof SPACING_SCALES)[number];

export const REGION_NAMES = [
  'header',
  'nav',
  'main',
  'footer',
  'aside',
] as const;
export type RegionName = (typeof REGION_NAMES)[number];

export interface RegionSpec {
  component: string;
  block_id?: string;
  components?: string[];
  children?: RegionSpec[];
}

export interface UIPlan {
  page_type: PageType;
  scaffold_block_id?: string;
  regions: Partial<Record<RegionName, RegionSpec>>;
  typography: {
    page_title?: HeadingRole;
    section_headings?: HeadingRole;
    body?: BodyRole;
  };
  spacing_scale: SpacingScale;
  icons: string[];
}

export interface PlanValidationError {
  path: string;
  message: string;
  hint?: string;
}

export interface PlanValidationResult {
  valid: boolean;
  errors: PlanValidationError[];
  summary: string;
}
