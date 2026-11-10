import type {} from '@tylertech/forge-ai/jsx';
import type { AiPromptComponent } from '@tylertech/forge-ai/ai-prompt';
import type { MessageItem } from '@tylertech/forge-ai/types';
import { useRef, type ReactElement } from 'react';

const messages: MessageItem[] = [{ type: 'message', data: { id: '1', role: 'user', content: 'Hello', timestamp: Date.now(), status: 'complete' } }];

export function ValidUsage(): ReactElement {
  const promptRef = useRef<AiPromptComponent>(null);

  return (
    <div>
      <forge-ai-prompt
        ref={promptRef}
        id="prompt"
        class="prompt"
        key="prompt"
        style={{ color: 'red' }}
        aria-label="Prompt"
        placeholder="Ask"
        variant="inline"
        send-disabled={false}
        sendDisabled={false}
        onforge-ai-prompt-send={event => {
          const value: string = event.detail.value;
          return void value;
        }}
        onforge-ai-prompt-cancel={() => undefined}>
        <span slot="actions-end">Actions</span>
      </forge-ai-prompt>
      <forge-ai-message-thread messageItems={messages} enableReactions onforge-ai-message-thread-copy={event => void event.detail} />
      <forge-ai-sidebar
        open
        onforge-ai-sidebar-close={event => void event.type}
        onforge-ai-sidebar-resize={event => void (event.detail.width satisfies number)}
      />
      <forge-ai-chat-header onforge-ai-chat-header-agent-change={event => void event.detail.previousAgentId} />
      <forge-ai-paginator onforge-ai-paginator-page-change={event => void (event.detail.currentPage satisfies number)} />
    </div>
  );
}

export function RefCallback(): ReactElement {
  return <forge-ai-prompt ref={(el: AiPromptComponent | null) => void el?.focus()} />;
}

/**
 * Hyphenated JSX attributes (kebab-case attributes and `on<event-name>` handlers) are not checked by TypeScript for
 * misspellings or types, so there are no negative cases for them.
 */
export function InvalidUsage(): ReactElement {
  return (
    <div>
      {/* @ts-expect-error wrong prop type */}
      <forge-ai-prompt placeholder={42} />
      {/* @ts-expect-error unknown tag */}
      <forge-ai-nope />
      {/* @ts-expect-error wrong message items type */}
      <forge-ai-message-thread messageItems="not an array" />
      {/* @ts-expect-error handler detail has no such property */}
      <forge-ai-prompt onforge-ai-prompt-send={event => event.detail.nope} />
      {/* @ts-expect-error sidebar resize detail has no such property */}
      <forge-ai-sidebar onforge-ai-sidebar-resize={event => event.detail.nope} />
      {/* @ts-expect-error PascalCase handler name is not a real event prop */}
      <forge-ai-prompt onForgeAiPromptSend={() => undefined} />
      {/* @ts-expect-error readonly property cannot be set */}
      <forge-ai-dialog isFullscreen />
      {/* @ts-expect-error camelCase boolean property has the wrong type */}
      <forge-ai-prompt sendDisabled="yes" />
      {/* @ts-expect-error ref must be typed to the element class */}
      <forge-ai-prompt ref={useRef<HTMLDivElement>(null)} />
    </div>
  );
}
