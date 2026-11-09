# Migrating to @tylertech/forge-ai 0.16

## TL;DR

- `@tylertech/forge-ai` is now presentational primitives only and lives in the Forge monorepo (`packages/forge-ai`). The package name is unchanged.
- The chat composition layer (chatbot, adapters, runner, floating/sidebar/launcher form factors) is removed. Use `@ai-foundry/chatbot`.
- `forge-ai-threads` and `forge-ai-embedded-chat` are removed.
- `forge-ai-chatbot-tool-call` is now `forge-ai-tool-call`, and `forge-prompt-button` is now `forge-ai-prompt-button`. The paginator event `page-change` is now `forge-ai-paginator-page-change`, and the `toggle` event on `forge-ai-reasoning-header` is now `forge-ai-reasoning-header-toggle` (fixing reasoning headers closing parent dialogs).
- New subpaths: `/types`, `/ai-tool-call`, and `/jsx`. Many types moved to `/types`.
- `@ag-ui/client`, `@ag-ui/core`, and `uuid` are no longer dependencies.
- `@tylertech/forge-ai-react` is discontinued. Use React 19 with the `/jsx` typings.
- Some default accessible labels changed to neutral wording (see [Changed defaults](#changed-defaults)).

## Package moved

The source for `@tylertech/forge-ai` now lives in the [tyler-technologies-oss/forge](https://github.com/tyler-technologies-oss/forge) monorepo under `packages/forge-ai`. The npm package name is unchanged. The previous `tyler-technologies-oss/forge-ai` repository is archived.

## Removed: composition components

The chat composition layer (engine, adapters, runner, form-factor shells) is no longer part of this package. Use `@ai-foundry/chatbot`, which composes the primitives that remain here.

| Removed tag                 | Removed class                                                     |
| --------------------------- | ----------------------------------------------------------------- |
| `forge-ai-chatbot`          | `AiChatbotComponent`, `AiChatbotComponentTagName`                 |
| `forge-ai-chatbot-launcher` | `AiChatbotLauncherComponent`, `AiChatbotLauncherComponentTagName` |
| `forge-ai-floating-chat`    | `AiFloatingChatComponent`, `AiFloatingChatComponentTagName`       |
| `forge-ai-sidebar-chat`     | `AiSidebarChatComponent`, `AiSidebarChatComponentTagName`         |

Removed non-element symbols (previously exported from `@tylertech/forge-ai/ai-chatbot` and `@tylertech/forge-ai/core`):

- Base and engine: `AiChatbotBase`, `ChatbotCoreController` (+ `ChatbotCoreCallbacks`, `ChatbotCoreControllerConfig`), `CanvasController` (+ `CanvasControllerConfig`, `CanvasContent`, `CanvasOpenEventData`, `OpenCanvasOptions`), `MessageStateController`, `FileUploadManager`
- Adapters: `AgentAdapter` and all its event types (`MessageStartEvent`, `MessageDeltaEvent`, `MessageEndEvent`, `ToolCallEvent`, `ToolCallStartEvent`, `ToolCallArgsEvent`, `ToolCallEndEvent`, `AdapterState`, `ErrorEvent`, `CustomAgentEvent`, `RawAgentEvent`, `RunStartedAgentEvent`, `StepStartedAgentEvent`, `StepFinishedAgentEvent`, `StateSnapshotAgentEvent`, `StateDeltaAgentEvent`, `ActivitySnapshotAgentEvent`, `ActivityDeltaAgentEvent`), `AgentRunner` (+ `AgentRunnerConfig`, `AgentRunnerResult`), `AgUiAdapter`, `HttpAgentWithCredentials`
- Events: `EventEmitter`, `SubscriptionManager`, `Subscription`
- Serialization: `toRequestMessages`, `toRequestToolCall`, `RequestMessage`, `RequestToolCall`
- Helpers: `generateId`, `downloadFile`, `fileAttachmentsToContextItems`, `formatToolCallForExport`, `formatChatTranscript`, `createChatExportFilename`, `forwardCancelableEvent`
- Tool definitions: `displayDataTableTool`, `displayStepsTool` (the `forge-ai-tool-data-table` and `forge-ai-tool-steps` elements remain)
- Composition event data types: `ForgeAiChatbotMessageEventData`, `ForgeAiChatbotToolCallEventData`, `ForgeAiChatbotErrorEventData`, `ForgeAiChatbotResponseFeedbackEventData`, `ForgeAiChatbotAgentChangeEventData`, `ForgeAiChatbotFileSelectEventData`, `ForgeAiChatbotFileRemoveEventData`, `ForgeAiChatbotContextRemoveEventData`, `ForgeAiChatbotThreadSelectEventData`, `ForgeAiChatbotThreadSearchEventData`, `ForgeAiChatbotThreadLoadMoreEventData`, `ForgeAiChatbotThreadRenameEventData`, `ForgeAiChatbotThreadDeleteEventData`

Also removed: `LauncherViewState`, `ForgeAiSidebarChatResizeEventData`, `AgUiAdapterConfig`, `MessageStateControllerConfig`, `FileUploadManagerConfig`.

`@tylertech/forge-ai/tools` no longer exports `displayDataTableTool` or `displayStepsTool`.

The `forge-ai-chatbot-*` DOM events fired by those elements no longer exist here.

## Removed: threads and embedded form factors

| Removed tag              | Removed class                                                                 |
| ------------------------ | ----------------------------------------------------------------------------- |
| `forge-ai-threads`       | `AiThreadsComponent`, `AiThreadsComponentTagName`, `ForgeAiThreads*EventData` |
| `forge-ai-embedded-chat` | `AiEmbeddedChatComponent`, `AiEmbeddedChatComponentTagName`                   |

`forge-ai-threads-search`, `forge-ai-conversations-panel`, `forge-ai-edit-thread`, and `forge-ai-thread-actions-menu` remain. `forge-ai-threads-search` no longer documents slotting into `forge-ai-threads`. Its `ForgeAiThreadsSearch*EventData` types are unchanged.

## Removed: @tylertech/forge-ai-react

The `@tylertech/forge-ai-react` wrapper package is not carried forward and will be deprecated on npm. React 19 supports custom elements natively, so `@tylertech/forge-ai` now ships JSX typings instead. The typings compile under `@types/react` 18, but React 18's runtime does not support these elements correctly, so use React 19.

1. Remove `@tylertech/forge-ai-react`.
2. Add a types-only import once in your app (for example `src/forge-ai.d.ts`):

```ts
import type {} from '@tylertech/forge-ai/jsx';
```

3. Register elements with side-effect imports and use the tags directly. Event props are `on` plus the event name exactly as dispatched (React 19 calls `addEventListener` with the name after `on`, no case conversion).

Before:

```tsx
import { ForgeAiPrompt } from '@tylertech/forge-ai-react';

<ForgeAiPrompt placeholder="Ask" onForgeAiPromptSend={event => send(event.detail.value)} />;
```

After:

```tsx
import '@tylertech/forge-ai/ai-prompt';

<forge-ai-prompt placeholder="Ask" onforge-ai-prompt-send={event => send(event.detail.value)} />;
```

Notes: rich values (arrays, objects) are passed as properties by React 19, so `messageItems={items}` works. Use the camelCase property form for booleans (`sendDisabled`); it is type-checked, and booleans that default to `true` (`cancelOnEscape`, `removable`, ...) can only be turned off through it (`cancelOnEscape={false}`). Hyphenated attributes and `on<event>` names are not checked by TypeScript, so watch for typos. Refs are typed to the element class (`useRef<AiPromptComponent>(null)`).

## New subpaths

- `@tylertech/forge-ai/types`: data shapes for messages, tools, threads, files, and agents. Also re-exported from the package root.
- `@tylertech/forge-ai/ai-tool-call`: the `forge-ai-tool-call` element, `createToolRenderer`, the tool canvas helpers, `isToolCallSettled`, and `shouldShowToolRenderer`. Also re-exported from the package root.
- `@tylertech/forge-ai/jsx`: types-only React 19 JSX typings (see [Removed: @tylertech/forge-ai-react](#removed-tylertechforge-ai-react)).
- `@tylertech/forge-ai/utils` now exports `generateUniqueId`, `toggleState`, `formatRelativeTime`, and `MarkdownStreamController` in addition to the existing markdown, storage, CSV, and controller utilities.
- `@tylertech/forge-ai/core` now exports the overlay, popover, and tooltip components alongside `DragController` and `ResizeController`.

Removed subpaths: `@tylertech/forge-ai/ai-chatbot`, `/ai-chatbot-launcher`, `/ai-floating-chat`, `/ai-sidebar-chat`, `/ai-threads`, `/ai-embedded-chat`.

Importing `@tylertech/forge-ai/core` registers `forge-ai-overlay`, `forge-ai-popover`, and `forge-ai-tooltip` as a side effect.

## Renamed

Elements, classes, and events:

| Before                                          | After                              |
| ----------------------------------------------- | ---------------------------------- |
| `<forge-ai-chatbot-tool-call>`                  | `<forge-ai-tool-call>`             |
| `AiChatbotToolCallComponent`                    | `AiToolCallComponent`              |
| `AiChatbotToolCallComponentTagName`             | `AiToolCallComponentTagName`       |
| `<forge-prompt-button>`                         | `<forge-ai-prompt-button>`         |
| `page-change` event on `<forge-ai-paginator>`   | `forge-ai-paginator-page-change`   |
| `toggle` event on `<forge-ai-reasoning-header>` | `forge-ai-reasoning-header-toggle` |

The `toggle` event on `forge-ai-reasoning-header` used the name of the native popover `toggle` event; it bubbled to ancestor popovers and closed them (see [Fixed](#fixed)). Its detail is unchanged (`{ expanded }`, now typed as `ForgeAiReasoningHeaderToggleEventData`). Update `@toggle` listeners on the header to `@forge-ai-reasoning-header-toggle`. `forge-ai-reasoning` and `forge-ai-chain-of-thought` already listen for the new name.

The paginator event detail is unchanged (`{ currentPage, previousPage }`) and is now typed as `ForgeAiPaginatorPageChangeEventData`. Update `@page-change` listeners to `@forge-ai-paginator-page-change`. `forge-ai-prompt-button` is registered by importing `@tylertech/forge-ai/ai-prompt` (it is also still available at `@tylertech/forge-ai/ai-prompt/prompt-button`).

Moved symbols:

| Symbol(s)                                                                                                                                                                                                                                                                                                                                   | Before                                  | After                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| `Thread`                                                                                                                                                                                                                                                                                                                                    | `@tylertech/forge-ai/ai-threads`        | `@tylertech/forge-ai/types`                                            |
| `FeatureToggle`                                                                                                                                                                                                                                                                                                                             | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/types`                                            |
| `Suggestion`                                                                                                                                                                                                                                                                                                                                | `@tylertech/forge-ai/ai-suggestions`    | `@tylertech/forge-ai/types` (still re-exported from `/ai-suggestions`) |
| `ForgeAiThreadsSearch*EventData`                                                                                                                                                                                                                                                                                                            | `@tylertech/forge-ai/ai-threads-search` | unchanged (also re-exported from `@tylertech/forge-ai/types`)          |
| `Agent`, `ChatMessage`, `ClientMessage*`, `ContextItem`, `ToolCall`, `ToolDefinition`, `AnyToolDefinition`, `IToolRenderer`, `Tool*`, `ThreadState`, `FileAttachment`, `UploadedFileMetadata`, `FileUploadHandler`, `FeedbackType`, `ResponseFeedback`, `MessageItem`, `AssistantResponse`, `ResponseItem`, `HeadingLevel`, `SlashCommand*` | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/types`                                            |
| `FileUploadEvent`, `FileRemoveEvent`, `FileUploadCallbacks`, `FileRemoveCallbacks`, `HandlerContext`                                                                                                                                                                                                                                        | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/types`                                            |
| `createToolRenderer`, `CreateToolRendererConfig`, `CreateToolRendererElementConfig`, `CreateToolRendererFunctionConfig`, `requestCanvasOpen`, `requestCanvasClose`, `ForgeAiCanvasOpenRequestEventData`, `ForgeAiCanvasCloseRequestEventData`                                                                                               | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/ai-tool-call`                                     |
| `MarkdownStreamController`                                                                                                                                                                                                                                                                                                                  | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/utils`                                            |
| `renderMarkdown`, `renderInlineMarkdown`                                                                                                                                                                                                                                                                                                    | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/utils`                                            |

For composition hosts (the new `@ai-foundry/chatbot`), these canvas host helpers are now public from `@tylertech/forge-ai/ai-tool-call`: `toolCanvasHostContext`, `ToolCanvasHostState`, `createToolCanvas`, and the `resolveToolCanvas*` functions.

## Changed defaults

User-facing strings that referred to a "chatbot" now use neutral wording, because these primitives are no longer chatbot-specific. Override them if you need the old text.

| Element                    | Before                                                                    | After                                           |
| -------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
| `forge-ai-fab`             | `label` default `Launch chatbot`                                          | `Open AI assistant`                             |
| `forge-ai-dialog`          | drag handle label `Move chatbot`                                          | `Move dialog`                                   |
| `forge-ai-sidebar`         | resize handle label `Resize chatbot panel, use left and right arrow keys` | `Resize sidebar, use left and right arrow keys` |
| `forge-ai-tool-data-table` | CSV filename fallback `chatbot-data-table.csv`                            | `data-table.csv`                                |

## Public API and typing changes

- `forge-ai-tool-data-table` and `forge-ai-tool-steps` are no longer marked `@internal`. They are part of the public `@tylertech/forge-ai/tools` surface and appear in the Custom Elements Manifest and JSX typings.
- `forge-ai-paginator` is documented (`@tag`) and exported from `@tylertech/forge-ai/tools`.
- `forge-ai-context-items` is now tagged (`@tag`) in the manifest, and its `forge-ai-context-items-remove` event is typed, so it appears in the JSX typings with a typed handler.
- `DropdownMenuSelectionMode` and `DropdownChangeEventDetail` are now exported from `@tylertech/forge-ai/ai-dropdown-menu`. `ForgeAiContextItemsRemoveEventData` and `ForgeAiPromptContextRemoveEventData` are new named types for events that previously had an inline detail type.
- Event JSDoc now carries detail types for `forge-ai-sidebar-*`, `forge-ai-chat-header-*`, `forge-ai-agent-selector-change`, `forge-ai-prompt-command`, `forge-ai-prompt-context-remove`, `forge-ai-file-picker-error`, `forge-ai-dropdown-menu-*`, and `forge-ai-context-items-remove`, so their JSX handlers are typed instead of a bare `CustomEvent`. There is no runtime change.

## Fixed

- `forge-ai-prompt` dispatched two `input` events per keystroke (the native textarea `input` crossing the shadow boundary, plus a synthetic copy). It now dispatches one: the native, composed `InputEvent` (with `inputType` and `data`), whose `target` is the host. For bubble-phase listeners `value` is already updated when it fires. Capture-phase listeners on the host run before the inner textarea handler and still see the previous `value`; read `(event.composedPath()[0] as HTMLTextAreaElement).value` there, or listen in the bubble phase. A host `input` listener that counted keystrokes or ran side effects per event now runs once per keystroke instead of twice.
- Clicking a `forge-ai-reasoning-header` (or any descendant that dispatched a bubbling `toggle` event) inside an open `forge-ai-dialog` or `forge-ai-overlay` (and therefore popovers, tooltips and dropdown menus) closed the dialog or overlay. The header event is renamed (see above), and `forge-ai-dialog` and `forge-ai-overlay` now ignore native `toggle` events that did not originate from their own popover element.

## Dependency changes

- `marked` `^18.1.1`, `dompurify` `^3.4.17`, `remend` `^1.4.0`. These are all within the same major as before. Sanitization and rendering (scroll-region wrappers, forced `target="_blank"`/`rel` on anchors, removal of scripts, `javascript:` URLs, event handlers, iframes, `<style>` and forms) are covered by `utils/markdown.test.ts`.
- Removed `@ag-ui/client` and `@ag-ui/core` (the AG-UI adapter is gone).
- Removed `uuid` (only `generateId` used it, and that helper moved out with the composition layer).
- Added `@types/react` `^19` as an optional peer dependency, used only by the `/jsx` typings. Nothing changes if you do not use React.

## Build and styling

- Component SCSS now imports design tokens from `@tylertech/forge-tokens/sass/*` instead of `@tylertech/forge/sass/core/styles/*`. The generated CSS and the `--forge-*` custom properties it consumes are unchanged, so consumers are not affected. This only matters if you compiled this package's SCSS sources yourself, which was never supported (only `dist/` is published).
- Relative imports inside the package use explicit `.js` extensions and the build targets NodeNext resolution. This has no consumer impact; the published `.d.ts` files now resolve under `node16`/`nodenext` as well as `bundler`.
- `forge-ai-icon` has a new `--forge-ai-icon-color` custom property. `--forge-ai-chatbot-icon-color` still works as a fallback but is deprecated; switch to `--forge-ai-icon-color`.
- `@tylertech/forge` and `@tylertech/forge-core` are not peer dependencies. Forge is used at build time only, so consumers need no Forge JavaScript to use these components.
