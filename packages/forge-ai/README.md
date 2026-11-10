# Tyler Forge™ AI

A library of presentational [Tyler Forge™](https://github.com/tyler-technologies-oss/forge) Web Components for building AI chat interfaces, built with [Lit](https://lit.dev/).

The components are UI building blocks (messages, prompts, tool calls, dialogs, and so on). They do not include chat orchestration or agent adapters; compose them with your own chat logic.

## Installation

```bash
npm install @tylertech/forge-ai @tylertech/forge
```

## Usage

Import the component you need. Each component is also available through its own subpath.

```ts
import '@tylertech/forge-ai/ai-prompt';
```

```html
<forge-ai-prompt></forge-ai-prompt>
```

Documentation and examples are in the [Forge Storybook](https://forge.tylerdev.io/forge/v3/?path=/docs/ai-introduction--docs) under **AI/Introduction**.

### Subpaths

Every component folder is a subpath export. Importing a subpath registers its element(s) as a side effect.

| Import                              | Contents                                                                                       |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| `@tylertech/forge-ai`               | Root barrel: every component plus the shared types                                             |
| `@tylertech/forge-ai/<component>`   | One component, for example `/ai-prompt`, `/ai-message-thread`, `/ai-sidebar`                  |
| `@tylertech/forge-ai/ai-tool-call`  | `forge-ai-tool-call`, `createToolRenderer`, tool canvas helpers, `isToolCallSettled`           |
| `@tylertech/forge-ai/tools`         | Tool renderers: `forge-ai-tool-data-table`, `forge-ai-tool-steps`, and `forge-ai-paginator`    |
| `@tylertech/forge-ai/core`          | Overlay, popover, and tooltip components, `DragController`, `ResizeController`                 |
| `@tylertech/forge-ai/types`         | Data shapes for messages, tools, threads, files, and agents (types only)                       |
| `@tylertech/forge-ai/utils`         | Markdown, CSV, storage, and controller utilities (browser only)                                |
| `@tylertech/forge-ai/jsx`           | React 19 JSX typings (types only)                                                              |
| `@tylertech/forge-ai/custom-elements.json` | Custom Elements Manifest                                                                |

## React 19

React 19 supports custom elements natively, so there is no wrapper package. Add the types-only subpath to `tsconfig.json` to get typed `forge-ai-*` JSX tags, props, refs, and events (setting `types` disables automatic inclusion of other `@types/*` packages, so list those too):

```json
{
  "compilerOptions": {
    "types": ["@tylertech/forge-ai/jsx"]
  }
}
```

```tsx
import '@tylertech/forge-ai/ai-prompt';

<forge-ai-prompt placeholder="Ask" sendDisabled={false} onforge-ai-prompt-send={event => console.log(event.detail.value)} />;
```

Event props are `on` plus the event name exactly as dispatched (`onforge-ai-prompt-send`, not `onForgeAiPromptSend`). Prefer camelCase props: TypeScript does not check hyphenated JSX attributes, so a typo in a kebab-case attribute or an `on<event>` name compiles silently. The typings compile under `@types/react` 18, but React 18's runtime does not support these elements correctly (objects are stringified and events are not attached), so use React 19. See the AI/React page in the Forge Storybook.

## Migrating

Upgrading from 0.15 or earlier? Composition components (`forge-ai-chatbot`, launcher, floating and sidebar chat, threads, embedded chat) and `@tylertech/forge-ai-react` are gone. See [MIGRATION.md](./MIGRATION.md).

## Development

```bash
pnpm --filter @tylertech/forge-ai build   # Vite library build and custom elements manifest
pnpm --filter @tylertech/forge-ai test    # Vitest browser mode
pnpm --filter @tylertech/forge-ai lint
```

## License

Apache-2.0
