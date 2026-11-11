# @tylertech/forge-ai

## 0.15.2

### Patch Changes

- 2f7433e: fix: return focus to the history button when Escape or light dismiss closes the launcher history popover
- 604755c: feat(sidebar): persist resized width per tab via sessionStorage with a localStorage fallback for new tabs, expose `width` property and `forge-ai-sidebar-resize` / `forge-ai-sidebar-chat-resize` events, retain width across expand/collapse
  
  BREAKING: `resizable` on `forge-ai-sidebar` and `forge-ai-sidebar-chat` is now `'on' | 'off'` (default `'on'`) instead of a boolean, so it can be disabled via attribute. Replace `.resizable=${false}` with `resizable="off"`.

## 0.15.1

### Patch Changes

- 0c70259: fix: history popover a11y, nested popover toggle leak, stale search reset

## 0.15.0

### Minor Changes

- a140e7b: feat(thread-history): make thread selection cancelable and add a failed-load state

### Patch Changes

- df678f4: fix(a11y): resolve chatbot accessibility audit findings
- 9f4bf82: fix(chatbot): stop sending stream event logs in request body
- 4515491: fix: normalize icon button density to medium across chat header

## 0.14.0

### Minor Changes

- 8834b49: feat(launcher): add support for chat history
  
  BREAKING: renamed thread-list API on `forge-ai-chatbot`/`forge-ai-conversations-panel` to match `forge-ai-chatbot-launcher`/`forge-ai-threads-search` vocabulary:
  - `recentThreads` -> `threads`
  - `showConversationRename`/`show-conversation-rename` -> `showThreadRename`/`show-thread-rename`
  - `showConversationDelete`/`show-conversation-delete` -> `showThreadDelete`/`show-thread-delete`
  - events `forge-ai-chatbot-conversation-{select,search,load-more,rename,delete}` -> `forge-ai-chatbot-thread-{select,search,load-more,rename,delete}`
  - types `ForgeAiChatbotConversation*EventData` -> `ForgeAiChatbotThread*EventData`
  
  `conversationsOpen`/`showConversations()`/`hideConversations()`/`toggleConversations()` are unchanged - they refer to the panel itself, not thread data.

## 0.13.13

### Patch Changes

- f82249d: fix(tool-calls): mount renderOnStart renderers before tool completion

## 0.13.12

### Patch Changes

- 5062920: feat(ai-chatbot): add addClientMessage/removeClientMessage API
- 8662d53: fix(thinking-indicator): show thinking indicator during between-step server turns
- 090fd8e: feat(tool-calls): surface error status and friendly names in native disclosure
- 07d435f: feat(conversations-panel): add loading indicator for recent chats
- b04422e: feat(markdown): forbid additional inputs when sanitizing
- e834a24: revert(data-table): stop freezing height at first paint

## 0.13.11

### Patch Changes

- c69ce37: fix(thinking-indicator): ensure thinking indicator is visible when streaming unhandled events
- fe40235: fix(a11y): resolve chatbot accessibility issues

## 0.13.10

### Patch Changes

- 2f6452e: fix(tool-call): fix tool call artifact spacing

## 0.13.9

### Patch Changes

- 5440757: fix(chatbot): remove internal tools cache to support dynamic tools

## 0.13.8

### Patch Changes

- ab84d27: feat(ai-thinking-indicator): update status messages for improved user feedback
- 6b2318d: feat(ai-threads): add selectedThreadId property for managing active thread selection

## 0.13.7

### Patch Changes

- 6f1d5f4: feat(ai-chatbot): add conversation-related event data types to exports
- 2eafa07: feat(ai-chatbot): add selectedThreadId property to manage active conversation thread
- be2b248: fix(ai-chat-header): update condition for rendering dropdown menu separator

## 0.13.6

### Patch Changes

- 6a831f0: feat(chatbot): add new CSS var to control header title color
- 1ad8d51: fix(data-table): render raw <a> text as HTML
- 6a831f0: feat(chatbot): expose clearOption property
- 7f0a6dc: feat(ai-tool-call-indicator): remove description and fix rendering artifacts
- 1ad8d51: fix(markdown): render tables and code blocks as scrollable

## 0.13.5

### Patch Changes

- 351ccd4: fix(ai-message-thread): render user markdown as complete content

## 0.13.4

### Patch Changes

- aa3c5c6: fix(message-thread): improve auto-scroll handling
- 5f12ca9: feat(chatbot): update thread name display logic with conditional rendering
- 8a5577c: fix(chatbot): fix error message content wrapping
- 04a5c34: feat(launcher): increase default font-size
- fc32709: feat(chatbot): add export option control to chatbot components
- a1aa22d: feat(chatbot): remove default empty state logo
- 03056d5: refactor(chatbot): update tool call UX and debug mode integration
- 1439791: feat: expose maxFileSize and acceptedFileTypes for file picker through chatbot base
- 8a5577c: feat(data-table): add CSV export button

## 0.13.2

### Patch Changes

- e375fac: fix(ai-dialog): use fixed positioning to avoid scrolling
- f46a425: fix(chatbot): add markdown table styling
- 0e21447: feat(launcher): allow for showing thread name via configuration
- ab42926: feat: added new threads and threads-search components
- 13e3bf0: feat(chatbot): add support for conversations
- 1ad03fd: refactor(agent-info): update agent info dialog values and layout
- 9f2e513: feat(chatbot): support generic context items
- ab42926: feat(chatbot): added `startNewChat()` method
- 10335c4: feat(sidebar): add resizable support
