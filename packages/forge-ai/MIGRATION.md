# Migrating to @tylertech/forge-ai 0.16

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

TODO

## New subpaths

- `@tylertech/forge-ai/types`: data shapes for messages, tools, threads, files, and agents. Also re-exported from the package root.
- `@tylertech/forge-ai/ai-tool-call`: the `forge-ai-tool-call` element, `createToolRenderer`, the tool canvas helpers, `isToolCallSettled`, and `shouldShowToolRenderer`. Also re-exported from the package root.
- `@tylertech/forge-ai/utils` now exports `generateUniqueId`, `toggleState`, `formatRelativeTime`, and `MarkdownStreamController` in addition to the existing markdown, storage, CSV, and controller utilities.
- `@tylertech/forge-ai/core` now exports the overlay, popover, and tooltip components alongside `DragController` and `ResizeController`.

Removed subpaths: `@tylertech/forge-ai/ai-chatbot`, `/ai-chatbot-launcher`, `/ai-floating-chat`, `/ai-sidebar-chat`, `/ai-threads`, `/ai-embedded-chat`.

Importing `@tylertech/forge-ai/core` registers `forge-ai-overlay`, `forge-ai-popover`, and `forge-ai-tooltip` as a side effect.

## Renamed

Tool call element:

| Before                              | After                        |
| ----------------------------------- | ---------------------------- |
| `<forge-ai-chatbot-tool-call>`      | `<forge-ai-tool-call>`       |
| `AiChatbotToolCallComponent`        | `AiToolCallComponent`        |
| `AiChatbotToolCallComponentTagName` | `AiToolCallComponentTagName` |

Moved symbols:

| Symbol(s)                                                                                                                                                                                                                                                                                                                                   | Before                                  | After                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| `Thread`                                                                                                                                                                                                                                                                                                                                    | `@tylertech/forge-ai/ai-threads`        | `@tylertech/forge-ai/types`                                            |
| `FeatureToggle`                                                                                                                                                                                                                                                                                                                             | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/types`                                            |
| `Suggestion`                                                                                                                                                                                                                                                                                                                                | `@tylertech/forge-ai/ai-suggestions`    | `@tylertech/forge-ai/types` (still re-exported from `/ai-suggestions`) |
| `ForgeAiThreadsSearch*EventData`                                                                                                                                                                                                                                                                                                            | `@tylertech/forge-ai/ai-threads-search` | unchanged (also re-exported from `@tylertech/forge-ai/types`)          |
| `Agent`, `ChatMessage`, `ClientMessage*`, `ContextItem`, `ToolCall`, `ToolDefinition`, `AnyToolDefinition`, `IToolRenderer`, `Tool*`, `ThreadState`, `FileAttachment`, `UploadedFileMetadata`, `FileUploadHandler`, `FeedbackType`, `ResponseFeedback`, `MessageItem`, `AssistantResponse`, `ResponseItem`, `HeadingLevel`, `SlashCommand*` | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/types`                                            |
| `FileUploadEvent`, `FileRemoveEvent`, `FileUploadCallbacks`, `FileRemoveCallbacks`, `HandlerContext`                                                                                                                                                                                                                                        | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/types`                                            |
| `createToolRenderer`, `requestCanvasOpen`, `requestCanvasClose`, `ForgeAiCanvasOpenRequestEventData`, `ForgeAiCanvasCloseRequestEventData`                                                                                                                                                                                                  | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/ai-tool-call`                                     |
| `MarkdownStreamController`                                                                                                                                                                                                                                                                                                                  | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/utils`                                            |
| `renderMarkdown`, `renderInlineMarkdown`                                                                                                                                                                                                                                                                                                    | `@tylertech/forge-ai/ai-chatbot`        | `@tylertech/forge-ai/utils`                                            |

For composition hosts (the new `@ai-foundry/chatbot`), these canvas host helpers are now public from `@tylertech/forge-ai/ai-tool-call`: `toolCanvasHostContext`, `ToolCanvasHostState`, `createToolCanvas`, and the `resolveToolCanvas*` functions.

## Dependency changes

- Removed `@ag-ui/client` and `@ag-ui/core` (the AG-UI adapter is gone).
- Removed `uuid` (only `generateId` used it, and that helper moved out with the composition layer).
