/**
 * Function of a tool call whose parameter stays bivariant, so a `ToolDefinition<MyArgs>` can be stored in a
 * `ToolDefinition[]` alongside untyped tools without casts.
 */
export type ToolCallMapper<TReturn, TArgs = Record<string, unknown>, TResult = unknown> = {
  bivarianceHack(toolCall: ToolCall<TArgs, TResult>): TReturn;
}['bivarianceHack'];

/** A static value, or one derived from the tool call. */
export type ToolCallValue<TValue, TArgs = Record<string, unknown>, TResult = unknown> = TValue | ToolCallMapper<TValue, TArgs, TResult>;

/** Host-provided context passed to a tool renderer's `render` function. */
export interface ToolRenderContext {
  presentation: ToolPresentation;
  /** Controls captured when `render` runs; element renderers receive a reactive `canvas` property instead. */
  canvas: ToolCanvas;
}

/**
 * Bivariant like `ToolCallMapper`. `context` is optional so existing `render(toolCall)` implementations and
 * callers keep compiling; hosts always pass it.
 */
export type ToolRenderFunction<TArgs = Record<string, unknown>, TResult = unknown> = {
  bivarianceHack(toolCall: ToolCall<TArgs, TResult>, context?: ToolRenderContext): HTMLElement | DocumentFragment;
}['bivarianceHack'];

// `any` defaults keep `ToolRenderer` assignable on any `ToolDefinition<TArgs>`, as it was before it became generic.
export interface ToolRenderer<TArgs = any, TResult = any> {
  elementTag?: string;
  render?: ToolRenderFunction<TArgs, TResult>;
}

/**
 * Where a tool renderer instance is displayed. Set by the host on the elements it creates.
 * - `inline`: in the message thread with no canvas available
 * - `inline-expandable`: in the message thread; a canvas is available and the renderer may request it
 * - `canvas`: inside the canvas panel
 */
export type ToolPresentation = 'inline' | 'inline-expandable' | 'canvas';

/** Artifact card icon: an `<svg>` element, or SVG markup reduced to static shape elements and attributes. */
export type ToolCanvasIcon = SVGElement | string;

/** Artifact card labels for each state; shown as the tooltip and read by assistive technology. */
export interface ToolCanvasActionLabel {
  /** Label while the artifact is not in the canvas, e.g. "Open report". */
  open: string;
  /** Label while the artifact is in the canvas, e.g. "Collapse report". */
  collapse: string;
}

/**
 * Opts a tool into the canvas panel of hosts that provide one.
 * Hosts without a canvas ignore this and render the tool inline as usual. Every mapper receives the
 * `ToolCall`, so values can come from the agent's `args` or the handler's `result`.
 */
export interface ToolCanvasConfig<TArgs = Record<string, unknown>, TResult = unknown> {
  /**
   * When the canvas opens. `auto`: as soon as the tool call renders (hosts that can open it automatically; others treat it as
   * `on-request`). `on-request` (default): only when the renderer or artifact card asks for it.
   */
  open?: 'auto' | 'on-request';
  /**
   * What the thread shows for the tool call. `renderer`: the inline renderer. `card`: an artifact card that
   * opens the canvas. `card-while-open`: the renderer, swapped for the card while this call is in the canvas.
   * Defaults to `card` when `open` is `auto`, otherwise `renderer`.
   */
  inline?: ToolCanvasInline;
  /** Renderer used inside the canvas. Defaults to the tool's `renderer`. */
  renderer?: ToolRenderer<TArgs, TResult>;
  /** Canvas and artifact card title. Defaults to `displayName`, then `name`. */
  title?: ToolCallValue<string, TArgs, TResult>;
  /** Artifact card subtitle, e.g. a row count. */
  subtitle?: ToolCallValue<string, TArgs, TResult>;
  /** Artifact card icon. Defaults to a generic artifact glyph. */
  icon?: ToolCallValue<ToolCanvasIcon, TArgs, TResult>;
  /** Artifact card action labels. Defaults to "Open in canvas" / "Collapse canvas". */
  actionLabel?: ToolCallValue<ToolCanvasActionLabel, TArgs, TResult>;
}

export type ToolCanvasInline = 'renderer' | 'card' | 'card-while-open';

/**
 * Canvas controls the host injects into a tool renderer as `canvas`. A new object is assigned whenever
 * `available` or `isOpen` changes, so declaring `canvas` as a reactive property re-renders the renderer.
 * Hosts without a canvas inject one with `available: false` whose methods return `false`.
 */
export interface ToolCanvas {
  /** Whether the host can show this tool call in a canvas. */
  readonly available: boolean;
  /** Whether this tool call is the one currently shown in the canvas. */
  readonly isOpen: boolean;
  /** Shows this tool call in the canvas. Returns false when unavailable or the host declined. */
  open(options?: { title?: string }): boolean;
  /** Closes the canvas if it is showing this tool call. Returns false when it was not or the host declined. */
  close(): boolean;
  /** Closes the canvas when this tool call is open, otherwise opens it. */
  toggle(): boolean;
}

/**
 * Interface that tool renderer components should implement for type-safe tool call handling.
 * @template TArgs - Type of the tool call arguments
 * @template TResult - Type returned by the tool's handler
 */
export interface IToolRenderer<TArgs = Record<string, unknown>, TResult = unknown> {
  toolCall: ToolCall<TArgs, TResult>;
  /** Assigned by the host to tell the renderer where it is displayed. */
  presentation?: ToolPresentation;
  /** Assigned by the host to let the renderer open and close the canvas. */
  canvas?: ToolCanvas;
}

/**
 * Context provided to tool handlers when they are invoked.
 * @template TArgs - Type of the tool call arguments
 */
export interface HandlerContext<TArgs = Record<string, unknown>> {
  /** Tool call arguments */
  args: TArgs;
  /** Unique identifier for this tool call */
  toolCallId: string;
  /** Name of the tool being called */
  toolName: string;
  /** Optional abort signal for cancellation support */
  signal?: AbortSignal;
}

/**
 * Context provided to onStart callback when tool call begins.
 */
export interface ToolStartContext {
  toolCallId: string;
  toolName: string;
}

/**
 * Context provided to onDelta callback during streaming.
 * @template TArgs - Type of the tool call arguments
 */
export interface ToolDeltaContext<TArgs = Record<string, unknown>> {
  argsBuffer: string;
  partialArgs: Partial<TArgs>;
  toolCallId: string;
  toolName: string;
}

/**
 * Context provided to onEnd callback when args are complete.
 * @template TArgs - Type of the tool call arguments
 */
export interface ToolEndContext<TArgs = Record<string, unknown>> {
  args: TArgs;
  toolCallId: string;
  toolName: string;
}

export type ToolType = 'client' | 'agent';

/**
 * Tool definition with optional type-safe handler.
 * @template TArgs - Type of the tool call arguments, typed through the handler, renderer, and canvas mappers
 * @template TResult - Type returned by `handler`, available as `toolCall.result`
 */
export interface ToolDefinition<TArgs = Record<string, unknown>, TResult = string | Record<string, unknown>> {
  name: string;
  displayName?: string;
  description?: string;
  parameters?: {
    type: 'object';
    properties?: Record<string, unknown>;
    required?: string[];
  };
  /**
   * Optional renderer for displaying tool call results within the chat UI. Deliberately untyped (`any`
   * arguments) so renderers written before `ToolDefinition` had a `TResult`, including `render` callbacks
   * annotated with plain `ToolCall`, keep compiling on any `ToolDefinition<TArgs>`.
   */
  renderer?: ToolRenderer;
  /** If true, renderer shows immediately on tool call start (default: false). */
  renderOnStart?: boolean;
  /** Canvas behavior for hosts that provide a canvas panel. Requires `renderer`. */
  canvas?: ToolCanvasConfig<TArgs, TResult>;
  /** Called when tool call starts (before args stream). */
  onStart?(context: ToolStartContext): void;
  /** Called during streaming with partial args. */
  onDelta?(context: ToolDeltaContext<TArgs>): void;
  /** Called when args are complete (before handler execution). */
  onEnd?(context: ToolEndContext<TArgs>): void;
  /**
   * Optional handler function invoked when tool is called.
   * Strings and objects are used directly as the tool result; `void` yields a generic success message.
   */
  handler?(context: HandlerContext<TArgs>): Promise<TResult | void> | TResult | void;
}

/**
 * Type-erased tool definition for collections that mix tools with different argument types, e.g. the
 * `tools` passed to an adapter. Any `ToolDefinition<TArgs, TResult>` is assignable to it.
 */
export type AnyToolDefinition = ToolDefinition<object, any>;

export interface ToolCall<TArgs = Record<string, unknown>, TResult = unknown> {
  id: string;
  messageId: string;
  name: string;
  args: TArgs;
  argsBuffer?: string;
  /** Handler return value once the call completes; an `{ error }` object if the handler threw. */
  result?: TResult;
  status: 'pending' | 'parsing' | 'executing' | 'complete' | 'error';
  type: ToolType;
  startTimestamp?: number;
  endTimestamp?: number;
}
