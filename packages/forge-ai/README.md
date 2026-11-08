# Tyler Forge™ AI

A library of presentational [Tyler Forge™](https://github.com/tyler-technologies-oss/forge) Web Components for building AI chat interfaces, built with [Lit](https://lit.dev/).

This package contains UI primitives only (messages, prompts, tool calls, dialogs, and so on). Chat orchestration and agent adapters live in `@ai-foundry/chatbot`.

## Installation

```bash
npm install @tylertech/forge-ai
```

## Usage

Import the component you need. Each component is also available through its own subpath.

```ts
import '@tylertech/forge-ai/ai-prompt';
```

```html
<forge-ai-prompt></forge-ai-prompt>
```

Documentation and examples are available in the [Forge Storybook](https://forge.tylerdev.io/).

## React 19

React 19 supports custom elements natively, so there is no wrapper package. Add a types-only import once to get typed `forge-ai-*` JSX tags, props, refs, and events:

```ts
import type {} from '@tylertech/forge-ai/jsx';
```

```tsx
import '@tylertech/forge-ai/ai-prompt';

<forge-ai-prompt placeholder="Ask" sendDisabled={false} onforge-ai-prompt-send={event => console.log(event.detail.value)} />;
```

Event props are `on` plus the event name exactly as dispatched (`onforge-ai-prompt-send`, not `onForgeAiPromptSend`). Prefer camelCase props: TypeScript does not check hyphenated JSX attributes, so a typo in a kebab-case attribute or an `on<event>` name compiles silently. The typings compile under `@types/react` 18, but React 18's runtime does not support these elements correctly (objects are stringified and events are not attached), so use React 19. See the AI/React page in the Forge Storybook.

## Development

```bash
pnpm --filter @tylertech/forge-ai build   # Vite library build and custom elements manifest
pnpm --filter @tylertech/forge-ai test    # Vitest browser mode
pnpm --filter @tylertech/forge-ai lint
```

## License

Apache-2.0
