import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-conversations-panel';
import type { Thread } from '@tylertech/forge-ai/types';
import type {
  AiConversationsPanelComponent,
  ForgeAiConversationsPanelSearchEventData,
  ForgeAiConversationsPanelLoadMoreEventData
} from '@tylertech/forge-ai/ai-conversations-panel';

const component = 'forge-ai-conversations-panel';

const storyStyles = html`<style>
  .conversations-panel-story-host {
    inline-size: 400px;
    block-size: 600px;
    border: 1px solid var(--forge-theme-outline);
  }
  .conversations-panel-story-notes {
    margin-block-start: var(--forge-spacing-medium);
  }
  .conversations-panel-story-notes-narrow {
    margin-block-start: var(--forge-spacing-medium);
    max-inline-size: 400px;
  }
</style>`;

const generateThreads = (count: number, startIndex = 0): Thread[] => {
  const topics = ['TypeScript', 'Web Components', 'React', 'Angular', 'Vue', 'CSS Grid', 'Flexbox', 'JavaScript', 'Performance', 'Testing'];
  const actions = ['best practices', 'tutorial', 'comparison', 'explained', 'patterns', 'optimization', 'debugging'];

  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i;
    const topic = topics[index % topics.length];
    const verb = actions[Math.floor(index / topics.length) % actions.length];
    const daysAgo = Math.floor(index / 5) + 1;
    const messageCount = ((index * 7) % 20) + 1;

    return {
      id: `thread-${index + 1}`,
      title: `${topic} ${verb}`,
      createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      messageCount
    };
  });
};

const sampleThreads: Thread[] = [
  {
    id: 'thread-1',
    title: 'TypeScript best practices',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    messageCount: 8
  },
  {
    id: 'thread-2',
    title: 'Web component architecture',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    messageCount: 15
  },
  {
    id: 'thread-3',
    title: 'How to use localStorage?',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    messageCount: 3
  },
  {
    id: 'thread-4',
    title: 'Lit reactive controllers explained',
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    messageCount: 12
  },
  {
    id: 'thread-5',
    title: 'CSS Grid vs Flexbox comparison',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    messageCount: 6
  },
  {
    id: 'thread-6',
    title: 'JavaScript async/await patterns',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    messageCount: 9
  },
  {
    id: 'thread-7',
    title: 'React hooks vs Lit reactive properties',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    messageCount: 7
  },
  {
    id: 'thread-8',
    title: 'Testing web components',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    messageCount: 11
  }
];

const meta = {
  title: 'Components/Conversations/Conversations Panel',
  component,
  argTypes: {
    threads: {
      control: 'object',
      description: 'Array of recent conversation threads to display'
    },
    totalChats: {
      control: { type: 'number' },
      description: 'Total number of chats available for pagination. Set to 0 to disable infinite scroll.'
    },
    selectedThreadId: {
      control: 'text',
      description: 'ID of the currently selected thread'
    },
    showThreadRename: {
      control: 'boolean',
      description: 'Show rename option in conversations panel'
    },
    showThreadDelete: {
      control: 'boolean',
      description: 'Show delete option in conversations panel'
    },
    loading: {
      control: 'boolean',
      description: 'Show a loading indicator in the recent chats list while threads are loading'
    },
    errorMessage: {
      control: 'text',
      description:
        'Message describing a failed thread load. Replaces the empty state and loading indicator with a retry banner when nothing is loaded. When threads are already on screen the list stays visible and the message shows as a compact single line with a retry - at the bottom of the list if a page was in flight, otherwise above it'
    }
  },
  args: {
    threads: sampleThreads,
    totalChats: 0,
    selectedThreadId: null,
    showThreadRename: true,
    showThreadDelete: true,
    loading: false,
    errorMessage: undefined
  },
  render: args => html`
    ${storyStyles}
    <div class="conversations-panel-story-host">
      <forge-ai-conversations-panel
        .threads=${args.threads}
        total-chats=${args.totalChats}
        .selectedThreadId=${args.selectedThreadId}
        ?show-thread-rename=${args.showThreadRename}
        ?show-thread-delete=${args.showThreadDelete}
        ?loading=${args.loading}
        .errorMessage=${args.errorMessage}
        @forge-ai-conversations-panel-retry=${(e: CustomEvent) => {
          action('forge-ai-conversations-panel-retry')(e);
          const panel = e.target as AiConversationsPanelComponent;
          panel.errorMessage = undefined;
        }}
        @forge-ai-conversations-panel-select=${action('forge-ai-conversations-panel-select')}
        @forge-ai-conversations-panel-new-chat=${action('forge-ai-conversations-panel-new-chat')}
        @forge-ai-conversations-panel-close=${action('forge-ai-conversations-panel-close')}
        @forge-ai-conversations-panel-search=${action('forge-ai-conversations-panel-search')}
        @forge-ai-conversations-panel-load-more=${(e: CustomEvent) => {
          action('forge-ai-conversations-panel-load-more')(e);
          setTimeout(() => {
            e.detail.appendResults([]);
          }, 1000);
        }}
        @forge-ai-conversations-panel-rename=${action('forge-ai-conversations-panel-rename')}
        @forge-ai-conversations-panel-delete=${action('forge-ai-conversations-panel-delete')}>
      </forge-ai-conversations-panel>
    </div>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithSelectedThread: Story = {
  args: {
    selectedThreadId: 'thread-2'
  }
};

export const EmptyState: Story = {
  args: {
    threads: []
  }
};

export const Loading: Story = {
  args: {
    threads: [],
    loading: true
  }
};

/** A failed load with nothing to fall back on - the error replaces the empty state. */
export const ErrorState: Story = {
  args: {
    threads: [],
    errorMessage: 'Could not load your chats.'
  }
};

/**
 * An error supersedes the loading indicator, so a host that leaves `loading` set does not end up
 * with a spinner hiding the failure.
 */
export const ErrorStateWhileLoading: Story = {
  args: {
    threads: [],
    loading: true,
    errorMessage: 'Could not load your chats.'
  }
};

/**
 * A failure that is not tied to the end of the list - a rejected thread selection, for instance. Threads
 * stay on screen and the message reads as a compact single line above them.
 */
export const ErrorAboveList: Story = {
  args: {
    threads: sampleThreads,
    errorMessage: '403 Forbidden - access to this chat was revoked.'
  }
};

/**
 * A failed "load more" - scroll to the bottom of the list to trigger it. The page was in flight, so the
 * failure reads at the bottom where the load-more spinner would have been.
 */
export const LoadMoreErrorState: Story = {
  args: {
    threads: generateThreads(20),
    totalChats: 120
  },
  render: args => html`
    ${storyStyles}
    <div class="conversations-panel-story-host">
      <forge-ai-conversations-panel
        .threads=${args.threads}
        total-chats=${args.totalChats}
        @forge-ai-conversations-panel-retry=${(e: CustomEvent) => {
          action('forge-ai-conversations-panel-retry')(e);
          const panel = e.target as AiConversationsPanelComponent;
          panel.errorMessage = undefined;
        }}
        @forge-ai-conversations-panel-load-more=${(e: CustomEvent) => {
          action('forge-ai-conversations-panel-load-more')(e);
          const panel = e.target as AiConversationsPanelComponent;
          // The page never resolves, which is what keeps the failure at the bottom of the list.
          setTimeout(() => {
            panel.errorMessage = 'Could not load more chats.';
          }, 800);
        }}
        @forge-ai-conversations-panel-select=${action('forge-ai-conversations-panel-select')}
        @forge-ai-conversations-panel-new-chat=${action('forge-ai-conversations-panel-new-chat')}
        @forge-ai-conversations-panel-close=${action('forge-ai-conversations-panel-close')}>
      </forge-ai-conversations-panel>
    </div>
  `
};

export const WithLocalSearch: Story = {
  args: {
    threads: sampleThreads
  },
  render: args => html`
    ${storyStyles}
    <div class="conversations-panel-story-host">
      <forge-ai-conversations-panel
        .threads=${args.threads}
        .selectedThreadId=${args.selectedThreadId}
        ?show-thread-rename=${args.showThreadRename}
        ?show-thread-delete=${args.showThreadDelete}
        @forge-ai-conversations-panel-select=${action('forge-ai-conversations-panel-select')}
        @forge-ai-conversations-panel-new-chat=${action('forge-ai-conversations-panel-new-chat')}
        @forge-ai-conversations-panel-close=${action('forge-ai-conversations-panel-close')}
        @forge-ai-conversations-panel-search=${(e: CustomEvent<ForgeAiConversationsPanelSearchEventData>) => {
          action('forge-ai-conversations-panel-search')(e);
        }}
        @forge-ai-conversations-panel-rename=${action('forge-ai-conversations-panel-rename')}
        @forge-ai-conversations-panel-delete=${action('forge-ai-conversations-panel-delete')}>
      </forge-ai-conversations-panel>
    </div>
    <div class="conversations-panel-story-notes">
      <p><strong>Local Search (Default)</strong></p>
      <p>Click "Search chats" to enter search chats. Type in the search field - results are filtered locally from recent threads with 300ms debounce.</p>
    </div>
  `
};

export const WithAsyncSearch: Story = {
  args: {
    threads: sampleThreads
  },
  render: args => {
    const allThreads: Thread[] = [
      ...sampleThreads,
      {
        id: 'thread-9',
        title: 'Advanced TypeScript generics tutorial',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        messageCount: 18
      },
      {
        id: 'thread-10',
        title: 'Building custom Lit directives',
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        messageCount: 5
      },
      {
        id: 'thread-11',
        title: 'TypeScript utility types explained',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        messageCount: 14
      },
      {
        id: 'thread-12',
        title: 'Performance optimization techniques',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        messageCount: 22
      }
    ];

    const handleSearch = (e: CustomEvent<ForgeAiConversationsPanelSearchEventData>): void => {
      action('forge-ai-conversations-panel-search')(e);

      e.preventDefault();

      const { query, setResults } = e.detail;

      setTimeout(() => {
        const results = allThreads.filter(thread => thread.title.toLowerCase().includes(query.toLowerCase()));
        setResults(results);
      }, 1000);
    };

    return html`
      ${storyStyles}
      <div class="conversations-panel-story-host">
        <forge-ai-conversations-panel
          .threads=${args.threads}
          .selectedThreadId=${args.selectedThreadId}
          ?show-thread-rename=${args.showThreadRename}
          ?show-thread-delete=${args.showThreadDelete}
          @forge-ai-conversations-panel-select=${action('forge-ai-conversations-panel-select')}
          @forge-ai-conversations-panel-new-chat=${action('forge-ai-conversations-panel-new-chat')}
          @forge-ai-conversations-panel-close=${action('forge-ai-conversations-panel-close')}
          @forge-ai-conversations-panel-search=${handleSearch}
          @forge-ai-conversations-panel-rename=${action('forge-ai-conversations-panel-rename')}
          @forge-ai-conversations-panel-delete=${action('forge-ai-conversations-panel-delete')}>
        </forge-ai-conversations-panel>
      </div>
      <div class="conversations-panel-story-notes-narrow">
        <p><strong>Async Search (preventDefault)</strong></p>
        <p>
          Click "Search chats" and type in the search field. This story simulates an async search by calling
          <code>preventDefault()</code> on the search event and returning results via the <code>setResults</code>
          callback after 1 second.
        </p>
        <p>
          The component shows a loading spinner while waiting. Results include threads beyond the recent 8 shown in recent chats (12 total searchable threads).
        </p>
      </div>
    `;
  }
};

export const WithNoRecentThreads: Story = {
  args: {
    threads: []
  },
  render: args => {
    const searchableThreads: Thread[] = [
      {
        id: 'thread-1',
        title: 'Old conversation about TypeScript',
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        messageCount: 25
      },
      {
        id: 'thread-2',
        title: 'Archived discussion on web components',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        messageCount: 19
      }
    ];

    const handleSearch = (e: CustomEvent<ForgeAiConversationsPanelSearchEventData>): void => {
      action('forge-ai-conversations-panel-search')(e);

      e.preventDefault();

      const { query, setResults } = e.detail;

      setTimeout(() => {
        const results = searchableThreads.filter(thread => thread.title.toLowerCase().includes(query.toLowerCase()));
        setResults(results);
      }, 800);
    };

    return html`
      ${storyStyles}
      <div class="conversations-panel-story-host">
        <forge-ai-conversations-panel
          .threads=${args.threads}
          .selectedThreadId=${args.selectedThreadId}
          ?show-thread-rename=${args.showThreadRename}
          ?show-thread-delete=${args.showThreadDelete}
          @forge-ai-conversations-panel-select=${action('forge-ai-conversations-panel-select')}
          @forge-ai-conversations-panel-new-chat=${action('forge-ai-conversations-panel-new-chat')}
          @forge-ai-conversations-panel-close=${action('forge-ai-conversations-panel-close')}
          @forge-ai-conversations-panel-search=${handleSearch}
          @forge-ai-conversations-panel-rename=${action('forge-ai-conversations-panel-rename')}
          @forge-ai-conversations-panel-delete=${action('forge-ai-conversations-panel-delete')}>
        </forge-ai-conversations-panel>
      </div>
      <div class="conversations-panel-story-notes-narrow">
        <p><strong>No Recent Threads + Async Search</strong></p>
        <p>No recent threads are shown in recent chats. Click "Search chats" to search through older archived conversations.</p>
      </div>
    `;
  }
};

export const WithInfiniteScroll: Story = {
  args: {
    threads: generateThreads(20)
  },
  render: args => {
    const TOTAL_THREADS = 120;
    const PAGE_SIZE = 20;
    const allThreads = generateThreads(TOTAL_THREADS);
    let searchChatsCurrentPage = 0;
    let recentChatsCurrentPage = 1;

    const handleSearch = (e: CustomEvent<ForgeAiConversationsPanelSearchEventData>): void => {
      action('forge-ai-conversations-panel-search')(e.detail);
      e.preventDefault();

      const { query, setResults } = e.detail;

      setTimeout(() => {
        const filtered = allThreads.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
        setResults(filtered.slice(0, PAGE_SIZE));
        searchChatsCurrentPage = 0;
      }, 500);
    };

    const handleLoadMore = (e: CustomEvent<ForgeAiConversationsPanelLoadMoreEventData>): void => {
      action('forge-ai-conversations-panel-load-more')(e.detail);

      const { query, appendResults } = e.detail;

      setTimeout(() => {
        if (query === '') {
          recentChatsCurrentPage++;
          const start = recentChatsCurrentPage * PAGE_SIZE;
          const end = start + PAGE_SIZE;
          const nextPage = allThreads.slice(start, end);
          appendResults(nextPage);
        } else {
          searchChatsCurrentPage++;
          const filtered = allThreads.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
          const start = searchChatsCurrentPage * PAGE_SIZE;
          const end = start + PAGE_SIZE;
          const nextPage = filtered.slice(start, end);
          appendResults(nextPage);
        }
      }, 500);
    };

    return html`
      ${storyStyles}
      <div class="conversations-panel-story-host">
        <forge-ai-conversations-panel
          .threads=${args.threads}
          total-chats=${TOTAL_THREADS}
          .selectedThreadId=${args.selectedThreadId}
          ?show-thread-rename=${args.showThreadRename}
          ?show-thread-delete=${args.showThreadDelete}
          @forge-ai-conversations-panel-select=${action('forge-ai-conversations-panel-select')}
          @forge-ai-conversations-panel-new-chat=${action('forge-ai-conversations-panel-new-chat')}
          @forge-ai-conversations-panel-close=${action('forge-ai-conversations-panel-close')}
          @forge-ai-conversations-panel-search=${handleSearch}
          @forge-ai-conversations-panel-load-more=${handleLoadMore}
          @forge-ai-conversations-panel-rename=${action('forge-ai-conversations-panel-rename')}
          @forge-ai-conversations-panel-delete=${action('forge-ai-conversations-panel-delete')}>
        </forge-ai-conversations-panel>
      </div>
      <div class="conversations-panel-story-notes-narrow">
        <p><strong>Infinite Scroll Demo</strong></p>
        <p>
          Demonstrates infinite scroll for both recent chats and search chats. Scroll to the bottom of the list to load more results. Results load 20 at a time
          with a 500ms delay to simulate async loading.
        </p>
        <p><strong>Features:</strong></p>
        <ul>
          <li>Recent chats: Scroll recent chats list to load more</li>
          <li>Search chats: Click "Search chats", enter a term (try "TypeScript"), and scroll to load more results</li>
          <li>Single load-more event handles both contexts (distinguished by query field)</li>
          <li>Loading spinner shows during fetch</li>
          <li>Pagination stops when all results loaded</li>
          <li>Total dataset: ${TOTAL_THREADS} threads</li>
        </ul>
      </div>
    `;
  }
};
