import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
import type { Thread } from '@tylertech/forge-ai/types';
import type { AiThreadsSearchComponent } from '@tylertech/forge-ai/ai-threads-search';

import '@tylertech/forge-ai/ai-threads-search';

const generateThreads = (count: number, startIndex = 0): Thread[] => {
  const topics = [
    'Getting Started with AI',
    'Data Analysis Question',
    'Code Review Discussion',
    'Project Planning',
    'Bug Investigation',
    'Feature Development'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `thread-${startIndex + i + 1}`,
    title: `${topics[i % topics.length]}`,
    createdAt: new Date(Date.now() - (i + startIndex) * 86400000).toISOString(),
    messageCount: (((i + startIndex) * 7) % 20) + 1
  }));
};

const component = 'forge-ai-threads-search';

const storyStyles = html`<style>
  .threads-search-story-host {
    block-size: 600px;
    border: 1px solid var(--forge-theme-outline);
  }
</style>`;

const meta = {
  title: 'Components/Conversations/Threads Search',
  component,
  argTypes: {
    threads: {
      control: 'object',
      description: 'Array of threads to display'
    },
    totalChats: {
      control: { type: 'number' },
      description: 'Total number of chats available for pagination. Set to 0 to disable infinite scroll.'
    },
    headerTitle: {
      control: 'text',
      description: 'Title text shown in the header'
    },
    showNewChatButton: {
      control: 'boolean',
      description: 'Show "New chat" button in header'
    },
    showBackButton: {
      control: 'boolean',
      description: 'Show a back button before the header title'
    },
    showSearch: {
      control: 'boolean',
      description: 'Show the search field'
    },
    showThreadRename: {
      control: 'boolean',
      description: 'Show rename action in thread menu'
    },
    showThreadDelete: {
      control: 'boolean',
      description: 'Show delete action in thread menu'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for search input'
    },
    errorMessage: {
      control: 'text',
      description:
        'Message describing a failed thread load. Replaces the empty state with a retry banner when nothing is loaded. When threads are already on screen the list stays visible and the message shows as a compact single line with a retry - at the bottom of the list if a page was in flight, otherwise above it'
    }
  },
  args: {
    threads: generateThreads(10),
    totalChats: 0,
    headerTitle: 'All chats',
    showNewChatButton: true,
    showBackButton: false,
    showSearch: true,
    placeholder: 'Find a chat by title',
    emptyMessage: 'No conversations found'
  },
  render: (args: any) => html`
    ${storyStyles}
    <div class="threads-search-story-host">
      <forge-ai-threads-search
        .threads=${args.threads}
        total-chats=${args.totalChats}
        header-title=${args.headerTitle}
        .showNewChatButton=${args.showNewChatButton}
        ?show-back-button=${args.showBackButton}
        .showSearch=${args.showSearch}
        ?show-thread-rename=${args.showThreadRename}
        ?show-thread-delete=${args.showThreadDelete}
        placeholder=${args.placeholder}
        .errorMessage=${args.errorMessage}
        @forge-ai-threads-search-retry=${(e: CustomEvent) => {
          action('forge-ai-threads-search-retry')(e);
          const threadsSearch = e.target as AiThreadsSearchComponent;
          threadsSearch.errorMessage = undefined;
        }}
        @forge-ai-threads-search-query=${action('forge-ai-threads-search-query')}
        @forge-ai-threads-search-load-more=${(e: CustomEvent) => {
          action('forge-ai-threads-search-load-more')(e);
          setTimeout(() => {
            e.detail.appendResults([]);
          }, 1000);
        }}
        @forge-ai-threads-search-select=${action('forge-ai-threads-search-select')}
        @forge-ai-threads-search-new-chat=${action('forge-ai-threads-search-new-chat')}
        @forge-ai-threads-search-rename=${action('forge-ai-threads-search-rename')}
        @forge-ai-threads-search-delete=${action('forge-ai-threads-search-delete')}
        @forge-ai-threads-search-back=${action('forge-ai-threads-search-back')}>
      </forge-ai-threads-search>
    </div>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithLocalSearch: Story = {
  args: {
    threads: generateThreads(30),
    showNewChatButton: true
  }
};

export const WithAsyncSearch: Story = {
  args: {
    threads: [],
    showNewChatButton: true
  },
  render: (args: any) => {
    const allThreads = generateThreads(50);

    const handleSearch = (e: CustomEvent): void => {
      e.preventDefault();
      const { query, setResults } = e.detail;

      action('forge-ai-threads-search-query')(e);

      setTimeout(() => {
        const results = allThreads.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
        setResults(results.slice(0, 20));
      }, 1000);
    };

    return html`
      ${storyStyles}
      <div class="threads-search-story-host">
        <forge-ai-threads-search
          .threads=${args.threads}
          .showNewChatButton=${args.showNewChatButton}
          @forge-ai-threads-search-query=${handleSearch}
          @forge-ai-threads-search-load-more=${action('forge-ai-threads-search-load-more')}
          @forge-ai-threads-search-select=${action('forge-ai-threads-search-select')}
          @forge-ai-threads-search-new-chat=${action('forge-ai-threads-search-new-chat')}>
        </forge-ai-threads-search>
      </div>
    `;
  }
};

export const WithInfiniteScroll: Story = {
  args: {
    threads: generateThreads(20),
    showNewChatButton: true
  },
  render: (args: any) => {
    const allThreads = generateThreads(120);
    let currentPage = 0;
    const pageSize = 20;

    const handleSearch = (e: CustomEvent): void => {
      e.preventDefault();
      const { query, setResults } = e.detail;
      currentPage = 0;

      action('forge-ai-threads-search-query')(e);

      setTimeout(() => {
        const filtered = allThreads.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
        setResults(filtered.slice(0, pageSize));
      }, 500);
    };

    const handleLoadMore = (e: CustomEvent): void => {
      const { query, appendResults } = e.detail;
      currentPage++;

      action('forge-ai-threads-search-load-more')(e);

      setTimeout(() => {
        const filtered = allThreads.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
        const start = currentPage * pageSize;
        const end = start + pageSize;
        appendResults(filtered.slice(start, end));
      }, 500);
    };

    return html`
      ${storyStyles}
      <div class="threads-search-story-host">
        <forge-ai-threads-search
          .threads=${args.threads}
          total-chats=${120}
          .showNewChatButton=${args.showNewChatButton}
          @forge-ai-threads-search-query=${handleSearch}
          @forge-ai-threads-search-load-more=${handleLoadMore}
          @forge-ai-threads-search-select=${action('forge-ai-threads-search-select')}
          @forge-ai-threads-search-new-chat=${action('forge-ai-threads-search-new-chat')}>
        </forge-ai-threads-search>
      </div>
    `;
  }
};

export const WithCustomHeader: Story = {
  args: {
    threads: generateThreads(3),
    headerTitle: 'Chat history',
    showNewChatButton: false,
    showBackButton: true,
    showSearch: false
  }
};

/** With no query entered the list reads "No chats yet"; a search with no matches reads "No chats found". */
export const EmptyState: Story = {
  args: {
    threads: [],
    showNewChatButton: true
  }
};

export const WithoutNewChatButton: Story = {
  args: {
    threads: generateThreads(10),
    showNewChatButton: false
  }
};

export const WithRenameAndDelete: Story = {
  args: {
    threads: generateThreads(10),
    showNewChatButton: true,
    showThreadRename: true,
    showThreadDelete: true
  }
};

export const WithRenameOnly: Story = {
  args: {
    threads: generateThreads(10),
    showNewChatButton: true,
    showThreadRename: true,
    showThreadDelete: false
  }
};

export const WithDeleteOnly: Story = {
  args: {
    threads: generateThreads(10),
    showNewChatButton: true,
    showThreadRename: false,
    showThreadDelete: true
  }
};

/** A failed load with nothing to fall back on - the error replaces the empty state. */
export const ErrorState: Story = {
  args: {
    threads: [],
    errorMessage: 'Could not load your chat history.'
  }
};

/**
 * A failure that is not tied to the end of the list - a rejected thread selection, for instance. Results
 * stay on screen and the message reads as a compact single line above them.
 */
export const ErrorAboveList: Story = {
  args: {
    threads: generateThreads(5),
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
  render: (args: any) => html`
    ${storyStyles}
    <div class="threads-search-story-host">
      <forge-ai-threads-search
        .threads=${args.threads}
        total-chats=${args.totalChats}
        header-title=${args.headerTitle}
        .showNewChatButton=${args.showNewChatButton}
        .showSearch=${args.showSearch}
        placeholder=${args.placeholder}
        @forge-ai-threads-search-retry=${(e: CustomEvent) => {
          action('forge-ai-threads-search-retry')(e);
          const threadsSearch = e.target as AiThreadsSearchComponent;
          threadsSearch.errorMessage = undefined;
        }}
        @forge-ai-threads-search-load-more=${(e: CustomEvent) => {
          action('forge-ai-threads-search-load-more')(e);
          const threadsSearch = e.target as AiThreadsSearchComponent;
          // The page never resolves, which is what keeps the failure at the bottom of the list.
          setTimeout(() => {
            threadsSearch.errorMessage = 'Could not load more chats.';
          }, 800);
        }}
        @forge-ai-threads-search-select=${action('forge-ai-threads-search-select')}
        @forge-ai-threads-search-new-chat=${action('forge-ai-threads-search-new-chat')}>
      </forge-ai-threads-search>
    </div>
  `
};
