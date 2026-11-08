import { createContext } from '@lit/context';
import type { ToolCall, ToolCanvas, ToolCallValue, ToolCanvasActionLabel, ToolCanvasInline, AnyToolDefinition, ToolPresentation } from '../types/index.js';

export interface ForgeAiCanvasOpenRequestEventData {
  toolCallId: string;
  toolName: string;
  title?: string;
  /** Set to true by the host once the tool call is showing in the canvas. */
  handled?: boolean;
}

export interface ForgeAiCanvasCloseRequestEventData {
  toolCallId: string;
  /** Set to true by the host once the canvas has closed. */
  handled?: boolean;
}

declare global {
  interface HTMLElementEventMap {
    'forge-ai-canvas-open-request': CustomEvent<ForgeAiCanvasOpenRequestEventData>;
    'forge-ai-canvas-close-request': CustomEvent<ForgeAiCanvasCloseRequestEventData>;
  }
}

/** State a canvas host shares with the tool calls rendered in its thread. */
export interface ToolCanvasHostState {
  /** Presentation assigned to inline renderers of canvas-enabled tools. */
  presentation: ToolPresentation;
  /** Tool call currently shown in the canvas, if any. */
  openToolCallId?: string;
}

/**
 * Provided by hosts that render tool calls next to a canvas panel. Without a provider, inline
 * renderers get `inline`.
 */
export const toolCanvasHostContext = createContext<ToolCanvasHostState>(Symbol('forge-ai-tool-canvas-host'));

/**
 * Asks the nearest canvas host to show the given tool call. Hosts without a canvas leave the event
 * unhandled. Returns whether the tool call is now showing.
 */
export function requestCanvasOpen(target: EventTarget, detail: ForgeAiCanvasOpenRequestEventData): boolean {
  const request = { ...detail, handled: false };
  target.dispatchEvent(
    new CustomEvent<ForgeAiCanvasOpenRequestEventData>('forge-ai-canvas-open-request', {
      detail: request,
      bubbles: true,
      composed: true
    })
  );
  return request.handled;
}

/** Asks the nearest canvas host to close the canvas if it is showing the given tool call. Returns whether it closed. */
export function requestCanvasClose(target: EventTarget, detail: ForgeAiCanvasCloseRequestEventData): boolean {
  const request = { ...detail, handled: false };
  target.dispatchEvent(
    new CustomEvent<ForgeAiCanvasCloseRequestEventData>('forge-ai-canvas-close-request', {
      detail: request,
      bubbles: true,
      composed: true
    })
  );
  return request.handled;
}

export interface CreateToolCanvasConfig {
  available: boolean;
  /** Read live by `toggle()`; `isOpen` on the result is a snapshot taken when the controls are built. */
  isOpen: () => boolean;
  open: (options?: { title?: string }) => boolean;
  close: () => boolean;
}

/** Builds the `canvas` controls a host injects into a tool renderer. */
export function createToolCanvas({ available, isOpen, open, close }: CreateToolCanvasConfig): ToolCanvas {
  return {
    available,
    isOpen: isOpen(),
    open: options => available && open(options),
    close: () => available && close(),
    toggle: () => available && (isOpen() ? close() : open())
  };
}

const DEFAULT_ACTION_LABEL: ToolCanvasActionLabel = { open: 'Open in canvas', collapse: 'Collapse canvas' };

function resolveToolCallValue<TValue>(value: ToolCallValue<TValue> | undefined, toolCall: ToolCall): TValue | undefined {
  if (typeof value === 'function') {
    return (value as (toolCall: ToolCall) => TValue)(toolCall);
  }
  return value;
}

export function resolveToolCanvasTitle(toolCall: ToolCall, toolDefinition: AnyToolDefinition): string {
  return resolveToolCallValue(toolDefinition.canvas?.title, toolCall) ?? toolDefinition.displayName ?? toolDefinition.name;
}

export function resolveToolCanvasSubtitle(toolCall: ToolCall, toolDefinition: AnyToolDefinition): string | undefined {
  return resolveToolCallValue(toolDefinition.canvas?.subtitle, toolCall);
}

export function resolveToolCanvasActionLabel(toolCall: ToolCall, toolDefinition: AnyToolDefinition, active: boolean): string {
  const labels = resolveToolCallValue(toolDefinition.canvas?.actionLabel, toolCall) ?? DEFAULT_ACTION_LABEL;
  return active ? labels.collapse : labels.open;
}

/**
 * Resolves the artifact card icon to a fresh `<svg>` element, or undefined for the card's default glyph.
 * Markup strings are parsed and reduced to an allowlist of shape elements and presentation attributes.
 */
export function resolveToolCanvasIcon(toolCall: ToolCall, toolDefinition: AnyToolDefinition): SVGElement | undefined {
  const icon = resolveToolCallValue(toolDefinition.canvas?.icon, toolCall);
  if (!icon) {
    return undefined;
  }
  if (typeof icon !== 'string') {
    return icon.cloneNode(true) as SVGElement;
  }
  const template = document.createElement('template');
  template.innerHTML = icon;
  const svg = template.content.querySelector('svg');
  if (!svg) {
    return undefined;
  }
  sanitizeSvg(svg);
  return svg;
}

const SVG_ICON_ELEMENTS = new Set(['svg', 'g', 'path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon']);
const SVG_ICON_ATTRIBUTES = new Set([
  'xmlns',
  'viewBox',
  'width',
  'height',
  'd',
  'fill',
  'fill-rule',
  'clip-rule',
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'opacity',
  'transform',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'x',
  'y',
  'x1',
  'y1',
  'x2',
  'y2',
  'points',
  'aria-hidden'
]);

// Allowlist rather than blocklist: icons only need static shapes, and anything else (scripts, SMIL,
// styles, references, event handlers) is dropped without needing to enumerate every vector.
function sanitizeSvg(svg: SVGElement): void {
  for (const element of [svg, ...svg.querySelectorAll('*')]) {
    if (!SVG_ICON_ELEMENTS.has(element.localName)) {
      element.remove();
      continue;
    }
    for (const attribute of [...element.attributes]) {
      if (!SVG_ICON_ATTRIBUTES.has(attribute.name)) {
        element.removeAttribute(attribute.name);
      }
    }
  }
}

export function resolveToolCanvasInline(toolDefinition: AnyToolDefinition): ToolCanvasInline {
  const canvas = toolDefinition.canvas;
  if (canvas?.inline) {
    return canvas.inline;
  }
  return canvas?.open === 'auto' ? 'card' : 'renderer';
}
