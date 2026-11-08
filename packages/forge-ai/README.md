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

> React 19 JSX typings are coming in a future release.

## Development

```bash
pnpm --filter @tylertech/forge-ai build   # Vite library build and custom elements manifest
pnpm --filter @tylertech/forge-ai test    # Vitest browser mode
pnpm --filter @tylertech/forge-ai lint
```

## License

Apache-2.0
