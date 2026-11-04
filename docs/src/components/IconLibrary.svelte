<script lang="ts">
  import hljs from "highlight.js/lib/core";
  import xml from "highlight.js/lib/languages/xml";
  import typescript from "highlight.js/lib/languages/typescript";

  hljs.registerLanguage("xml", xml);
  hljs.registerLanguage("typescript", typescript);

  const MORE_ICONS_INCREMENT = 100;
  const METADATA_URI =
    "https://cdn.forge.tylertech.com/v1/metadata/icons/tyler-icons-metadata-all.json";

  type MatchType =
    | "none"
    | "exact_name"
    | "name_prefix"
    | "name_contains"
    | "name_fuzzy"
    | "exact_keyword"
    | "keyword_prefix"
    | "keyword_contains"
    | "keyword_fuzzy";

  const MATCH_TYPE_PRIORITY: Record<Exclude<MatchType, "none">, number> = {
    exact_name: 1,
    name_prefix: 2,
    name_contains: 3,
    name_fuzzy: 4,
    exact_keyword: 5,
    keyword_prefix: 6,
    keyword_contains: 7,
    keyword_fuzzy: 8,
  };

  interface IIcon {
    name: string;
    data: string;
    keywords?: string[];
  }

  function debounce<T extends (...args: any[]) => void>(fn: T, wait = 150) {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  }

  function computeStringSimilarity(a: string, b: string): number {
    if (!a.length && !b.length) return 1;
    if (!a.length || !b.length) return 0;
    const longer = a.length >= b.length ? a : b;
    const shorter = a.length >= b.length ? b : a;
    const longerLength = longer.length;
    const distance = levenshtein(longer, shorter);
    return (longerLength - distance) / longerLength;
  }

  function levenshtein(a: string, b: string): number {
    const costs: number[] = [];
    for (let i = 0; i <= a.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= b.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (a.charAt(i - 1) !== b.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[b.length] = lastValue;
    }
    return costs[b.length];
  }

  let isLoading = $state(true);
  let filterText = $state("");
  let icons = $state<IIcon[]>([]);
  let currentIcon = $state<IIcon | null>(null);
  let visibleCount = $state(MORE_ICONS_INCREMENT);
  let dialogEl: HTMLElement | undefined = $state();
  let sentinelEl: HTMLElement | undefined = $state();
  let copied = $state(false);
  let copiedSnippet = $state<string | null>(null);

  $effect(() => {
    if (typeof window === "undefined") return;
    fetchMetadata();
  });

  async function fetchMetadata() {
    try {
      const response = await window.fetch(
        `${METADATA_URI}?t=${new Date().getTime()}`,
      );
      const data = (await response.json()) as IIcon[];
      icons = data;
      isLoading = false;
    } catch (err) {
      console.error(err);
    }
  }

  const filteredIcons = $derived(filterIcons(icons, filterText));
  const visibleIcons = $derived(filteredIcons.slice(0, visibleCount));

  // Reset visible count whenever the filter changes.
  $effect(() => {
    filterText;
    visibleCount = MORE_ICONS_INCREMENT;
  });

  $effect(() => {
    if (!sentinelEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && visibleCount < filteredIcons.length) {
            visibleCount = Math.min(
              visibleCount + MORE_ICONS_INCREMENT,
              filteredIcons.length,
            );
          }
        }
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(sentinelEl);
    return () => observer.disconnect();
  });

  // Dialog open/close.
  $effect(() => {
    if (!dialogEl) return;
    (dialogEl as any).open = !!currentIcon;
  });

  $effect(() => {
    if (!dialogEl) return;
    const handler = () => closeDialog();
    dialogEl.addEventListener("forge-dialog-close", handler);
    return () => dialogEl?.removeEventListener("forge-dialog-close", handler);
  });

  function filterIcons(list: IIcon[], text: string): IIcon[] {
    if (!text?.trim()) return list;
    const query = text.trim().toLowerCase();
    const results: {
      icon: IIcon;
      score: number;
      matchType: MatchType;
    }[] = [];

    for (const icon of list) {
      const iconName = icon.name?.trim().toLowerCase() || "";
      const keywords =
        icon.keywords?.map((kw) => kw.trim().toLowerCase()) || [];

      let bestMatch: { icon: IIcon; score: number; matchType: MatchType } = {
        icon,
        score: 0,
        matchType: "none",
      };

      if (iconName === query) {
        bestMatch = { icon, score: 1, matchType: "exact_name" };
      } else if (iconName.startsWith(query)) {
        bestMatch = { icon, score: 0.9, matchType: "name_prefix" };
      } else if (iconName.includes(query)) {
        bestMatch = { icon, score: 0.8, matchType: "name_contains" };
      } else if (iconName.length > 0) {
        const nameSimilarity = computeStringSimilarity(iconName, query);
        if (nameSimilarity >= 0.6) {
          bestMatch = {
            icon,
            score: nameSimilarity * 0.7,
            matchType: "name_fuzzy",
          };
        }
      }

      for (const keyword of keywords) {
        let keywordScore = 0;
        let keywordMatchType: MatchType = "none";

        if (keyword === query) {
          keywordScore = 0.6;
          keywordMatchType = "exact_keyword";
        } else if (keyword.startsWith(query)) {
          keywordScore = 0.5;
          keywordMatchType = "keyword_prefix";
        } else if (keyword.includes(query)) {
          keywordScore = 0.4;
          keywordMatchType = "keyword_contains";
        } else {
          const keywordSimilarity = computeStringSimilarity(keyword, query);
          if (keywordSimilarity >= 0.7) {
            keywordScore = keywordSimilarity * 0.3;
            keywordMatchType = "keyword_fuzzy";
          }
        }

        if (keywordScore > bestMatch.score) {
          bestMatch = {
            icon,
            score: keywordScore,
            matchType: keywordMatchType,
          };
        }
      }

      if (bestMatch.score > 0) results.push(bestMatch);
    }

    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const aPrio =
        a.matchType === "none" ? 99 : MATCH_TYPE_PRIORITY[a.matchType];
      const bPrio =
        b.matchType === "none" ? 99 : MATCH_TYPE_PRIORITY[b.matchType];
      if (aPrio !== bPrio) return aPrio - bPrio;
      return (a.icon.name || "").localeCompare(b.icon.name || "");
    });

    return results.map((r) => r.icon);
  }

  const handleFilter = debounce((value: string) => {
    filterText = value;
  });

  function onFilterInput(e: Event) {
    const target = e.target as HTMLInputElement;
    handleFilter(target.value);
  }

  function openDialog(icon: IIcon) {
    currentIcon = icon;
    copied = false;
    copiedSnippet = null;
  }

  function closeDialog() {
    currentIcon = null;
  }

  async function copyName() {
    if (!currentIcon) return;
    try {
      await navigator.clipboard.writeText(currentIcon.name);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch (err) {
      console.error(err);
    }
  }

  async function copySnippet(snippet: string, key: string) {
    try {
      await navigator.clipboard.writeText(snippet);
      copiedSnippet = key;
      setTimeout(() => {
        if (copiedSnippet === key) copiedSnippet = null;
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  }

  function toTylIconIdentifier(name: string): string {
    return (
      "tylIcon" +
      name
        .split(/[_-]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")
    );
  }

  const tylIconIdentifier = $derived(
    currentIcon ? toTylIconIdentifier(currentIcon.name) : "",
  );

  const iconCodeSnippet = $derived(
    currentIcon ? `<forge-icon name="${currentIcon.name}"></forge-icon>` : "",
  );
  const iconButtonCodeSnippet = $derived(
    currentIcon
      ? `<forge-icon-button aria-label="Add your label here">\n  <forge-icon name="${currentIcon.name}"></forge-icon>\n</forge-icon-button>`
      : "",
  );
  const registryImportSnippet =
    "import { IconRegistry } from '@tylertech/forge';";
  const iconImportSnippet = $derived(
    tylIconIdentifier
      ? `import { ${tylIconIdentifier} } from '@tylertech/tyler-icons';`
      : "",
  );
  const iconDefineSnippet = $derived(
    tylIconIdentifier ? `IconRegistry.define([${tylIconIdentifier}]);` : "",
  );

  const highlightedSvg = $derived(
    currentIcon
      ? hljs.highlight(currentIcon.data, { language: "xml" }).value
      : "",
  );
  const highlightedIconSnippet = $derived(
    iconCodeSnippet
      ? hljs.highlight(iconCodeSnippet, { language: "xml" }).value
      : "",
  );
  const highlightedButtonSnippet = $derived(
    iconButtonCodeSnippet
      ? hljs.highlight(iconButtonCodeSnippet, { language: "xml" }).value
      : "",
  );
  const highlightedRegistryImport = $derived(
    hljs.highlight(registryImportSnippet, { language: "typescript" }).value,
  );
  const highlightedIconImport = $derived(
    iconImportSnippet
      ? hljs.highlight(iconImportSnippet, { language: "typescript" }).value
      : "",
  );
  const highlightedIconDefine = $derived(
    iconDefineSnippet
      ? hljs.highlight(iconDefineSnippet, { language: "typescript" }).value
      : "",
  );
</script>

<div class="flex flex-col gap-medium">
  <forge-text-field>
    <input
      type="text"
      placeholder="Filter..."
      oninput={onFilterInput}
      aria-label="Filter icons"
    />
  </forge-text-field>

  {#if isLoading}
    <div class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-small">
      {#each Array.from({ length: MORE_ICONS_INCREMENT / 2 }) as _, i (i)}
        <div class="skeleton rounded-md h-[88px]"></div>
      {/each}
    </div>
  {:else if visibleIcons.length}
    <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-small">
      {#each visibleIcons as icon (icon.name)}
        <button
          class="icon-container flex items-center justify-center min-w-0 bg-surface border border-outline rounded-md p-small cursor-pointer text-inherit hover:bg-primary-container-low hover:border-primary"
          onclick={() => openDialog(icon)}
          type="button"
        >
          <div
            class="flex flex-col items-center justify-center gap-xsmall w-full min-w-0"
          >
            <div
              class="icon flex items-center justify-center w-8 h-8 text-high"
            >
              {@html icon.data}
            </div>
            <div
              class="text-medium text-center break-words text-[12px] leading-[1.3]"
            >
              {icon.name}
            </div>
          </div>
        </button>
      {/each}
    </div>
    {#if visibleCount < filteredIcons.length}
      <div class="h-px w-full" bind:this={sentinelEl} aria-hidden="true"></div>
    {/if}
  {:else}
    <div
      class="flex flex-col items-center justify-center px-large py-xxlarge text-medium text-center gap-small"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-12 h-12 fill-current"
      >
        <path
          d="M19.27 18.9c.43-.69.68-1.52.68-2.4 0-2.5-2-4.5-4.49-4.5s-4.5 2-4.5 4.5 2 4.5 4.5 4.5c.87 0 1.69-.25 2.38-.68l3.12 3.07L22.35 22zm-3.81.1c-1.39 0-2.5-1.12-2.5-2.5s1.11-2.5 2.5-2.5 2.49 1.12 2.49 2.5-1.11 2.5-2.49 2.5M22 14h-.55c-.33-.81-.83-1.53-1.45-2.14V10h2zM20 4h-3V2h3a2 2 0 0 1 2 2v3h-2zm-6 0h-4V2h4zM4 2h3v2H4v3H2V4a2 2 0 0 1 2-2m8 20h-2v-2c.5.82 1.2 1.5 2 2m-8-2h3v2H4a2 2 0 0 1-2-2v-3h2zm0-6H2v-4h2z"
        />
      </svg>
      <p>No icons found. Please try searching again</p>
    </div>
  {/if}

  <forge-dialog
    bind:this={dialogEl}
    aria-labelledby="icon-dialog-title"
    style="--forge-dialog-width: 960px;"
  >
    {#if currentIcon}
      <forge-scaffold>
        <forge-toolbar slot="header">
          <div slot="start" class="flex items-center gap-xsmall">
            <h2 id="icon-dialog-title" class="text-heading5 m-0">
              {currentIcon.name}
            </h2>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <forge-icon-button
              id="icon-dialog-copy-name-btn"
              density="medium"
              aria-label={copied ? "Copied" : "Copy icon name"}
              onclick={copyName}
            >
              <forge-icon name={copied ? "check" : "content_copy"}></forge-icon>
            </forge-icon-button>
            <forge-tooltip
              anchor="icon-dialog-copy-name-btn"
              aria-hidden="true"
            >
              {copied ? "Copied" : "Copy icon name"}
            </forge-tooltip>
          </div>
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <forge-icon-button
            id="icon-dialog-close-btn"
            slot="end"
            aria-label="Close dialog"
            onclick={closeDialog}
          >
            <forge-icon name="close"></forge-icon>
          </forge-icon-button>
          <forge-tooltip anchor="icon-dialog-close-btn" aria-hidden="true">
            Close dialog
          </forge-tooltip>
        </forge-toolbar>
        <div slot="body" class="dialog-body grid gap-medium p-medium">
          <div
            class="dialog-icon flex items-center justify-center aspect-square rounded-md bg-surface text-high"
          >
            {@html currentIcon.data}
          </div>
          <div class="flex flex-col gap-large min-w-0">
            <section class="flex flex-col gap-xsmall">
              <h3
                class="text-subheading1 text-medium m-0 mb-xxsmall tracking-wider"
              >
                Registration
              </h3>
              <div class="code-block">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <forge-icon-button
                  id="icon-dialog-copy-registry-import-btn"
                  density="medium"
                  class="copy-btn"
                  aria-label={copiedSnippet === "registry-import"
                    ? "Copied"
                    : "Copy IconRegistry import"}
                  onclick={() =>
                    copySnippet(registryImportSnippet, "registry-import")}
                >
                  <forge-icon
                    name={copiedSnippet === "registry-import"
                      ? "check"
                      : "content_copy"}
                  ></forge-icon>
                </forge-icon-button>
                <forge-tooltip
                  anchor="icon-dialog-copy-registry-import-btn"
                  aria-hidden="true"
                >
                  {copiedSnippet === "registry-import"
                    ? "Copied"
                    : "Copy IconRegistry import"}
                </forge-tooltip>
                <pre><code class="hljs">{@html highlightedRegistryImport}</code
                  ></pre>
              </div>
              <div class="code-block">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <forge-icon-button
                  id="icon-dialog-copy-icon-import-btn"
                  density="medium"
                  class="copy-btn"
                  aria-label={copiedSnippet === "icon-import"
                    ? "Copied"
                    : "Copy icon import"}
                  onclick={() => copySnippet(iconImportSnippet, "icon-import")}
                >
                  <forge-icon
                    name={copiedSnippet === "icon-import"
                      ? "check"
                      : "content_copy"}
                  ></forge-icon>
                </forge-icon-button>
                <forge-tooltip
                  anchor="icon-dialog-copy-icon-import-btn"
                  aria-hidden="true"
                >
                  {copiedSnippet === "icon-import"
                    ? "Copied"
                    : "Copy icon import"}
                </forge-tooltip>
                <pre><code class="hljs">{@html highlightedIconImport}</code
                  ></pre>
              </div>
              <div class="code-block">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <forge-icon-button
                  id="icon-dialog-copy-icon-define-btn"
                  density="medium"
                  class="copy-btn"
                  aria-label={copiedSnippet === "icon-define"
                    ? "Copied"
                    : "Copy IconRegistry.define call"}
                  onclick={() => copySnippet(iconDefineSnippet, "icon-define")}
                >
                  <forge-icon
                    name={copiedSnippet === "icon-define"
                      ? "check"
                      : "content_copy"}
                  ></forge-icon>
                </forge-icon-button>
                <forge-tooltip
                  anchor="icon-dialog-copy-icon-define-btn"
                  aria-hidden="true"
                >
                  {copiedSnippet === "icon-define"
                    ? "Copied"
                    : "Copy IconRegistry.define call"}
                </forge-tooltip>
                <pre><code class="hljs">{@html highlightedIconDefine}</code
                  ></pre>
              </div>
            </section>

            <section class="flex flex-col gap-xsmall">
              <h3
                class="text-subheading1 text-medium m-0 mb-xxsmall tracking-wider"
              >
                Usage
              </h3>
              <forge-tab-bar
                aria-label="Icon usage examples"
                active-tab-name="icon"
              >
                <forge-tab id="usage-tab-icon" name="icon">Icon</forge-tab>
                <forge-tab id="usage-tab-icon-button" name="icon-button"
                  >Icon button</forge-tab
                >
                <forge-tab id="usage-tab-svg" name="svg">SVG</forge-tab>
              </forge-tab-bar>
              <forge-tab-panel for="usage-tab-icon">
                <div class="code-block">
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <forge-icon-button
                    id="icon-dialog-copy-icon-usage-btn"
                    density="medium"
                    class="copy-btn"
                    aria-label={copiedSnippet === "icon"
                      ? "Copied"
                      : "Copy icon usage"}
                    onclick={() => copySnippet(iconCodeSnippet, "icon")}
                  >
                    <forge-icon
                      name={copiedSnippet === "icon" ? "check" : "content_copy"}
                    ></forge-icon>
                  </forge-icon-button>
                  <forge-tooltip
                    anchor="icon-dialog-copy-icon-usage-btn"
                    aria-hidden="true"
                  >
                    {copiedSnippet === "icon" ? "Copied" : "Copy icon usage"}
                  </forge-tooltip>
                  <pre><code class="hljs">{@html highlightedIconSnippet}</code
                    ></pre>
                </div>
              </forge-tab-panel>
              <forge-tab-panel for="usage-tab-icon-button">
                <div class="code-block">
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <forge-icon-button
                    id="icon-dialog-copy-icon-button-usage-btn"
                    density="medium"
                    class="copy-btn"
                    aria-label={copiedSnippet === "button"
                      ? "Copied"
                      : "Copy icon button usage"}
                    onclick={() => copySnippet(iconButtonCodeSnippet, "button")}
                  >
                    <forge-icon
                      name={copiedSnippet === "button"
                        ? "check"
                        : "content_copy"}
                    ></forge-icon>
                  </forge-icon-button>
                  <forge-tooltip
                    anchor="icon-dialog-copy-icon-button-usage-btn"
                    aria-hidden="true"
                  >
                    {copiedSnippet === "button"
                      ? "Copied"
                      : "Copy icon button usage"}
                  </forge-tooltip>
                  <pre><code class="hljs">{@html highlightedButtonSnippet}</code
                    ></pre>
                </div>
              </forge-tab-panel>
              <forge-tab-panel for="usage-tab-svg">
                <div class="code-block code-block--scroll">
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <forge-icon-button
                    id="icon-dialog-copy-svg-btn"
                    density="medium"
                    class="copy-btn"
                    aria-label={copiedSnippet === "svg" ? "Copied" : "Copy SVG"}
                    onclick={() => copySnippet(currentIcon!.data, "svg")}
                  >
                    <forge-icon
                      name={copiedSnippet === "svg" ? "check" : "content_copy"}
                    ></forge-icon>
                  </forge-icon-button>
                  <forge-tooltip
                    anchor="icon-dialog-copy-svg-btn"
                    aria-hidden="true"
                  >
                    {copiedSnippet === "svg" ? "Copied" : "Copy SVG"}
                  </forge-tooltip>
                  <pre><code class="hljs">{@html highlightedSvg}</code></pre>
                </div>
              </forge-tab-panel>
            </section>
          </div>
        </div>
      </forge-scaffold>
    {/if}
  </forge-dialog>
</div>

<style lang="scss">
  /* Effects with no Forge-tailwind equivalent stay as scoped CSS but pull all
     values from Forge tokens. */

  .icon-container {
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;
  }

  .icon :global(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  /* Shimmer skeleton — linear-gradient + keyframes not available as utility. */
  .skeleton {
    background: linear-gradient(
      90deg,
      var(--forge-theme-surface-container) 0%,
      var(--forge-theme-surface-dim) 50%,
      var(--forge-theme-surface-container) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-pulse 1.4s ease-in-out infinite;
  }

  @keyframes skeleton-pulse {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Two-column dialog body collapses to one column on narrow viewports. */
  .dialog-body {
    grid-template-columns: 200px 1fr;
  }

  @media (max-width: 600px) {
    .dialog-body {
      grid-template-columns: 1fr;
    }
  }

  /* Checkerboard preview background for the dialog icon. */
  .dialog-icon {
    background-image:
      linear-gradient(
        45deg,
        var(--forge-theme-outline-variant, rgba(0, 0, 0, 0.1)) 25%,
        transparent 25%,
        transparent 75%,
        var(--forge-theme-outline-variant, rgba(0, 0, 0, 0.1)) 75%
      ),
      linear-gradient(
        45deg,
        var(--forge-theme-outline-variant, rgba(0, 0, 0, 0.1)) 25%,
        transparent 25%,
        transparent 75%,
        var(--forge-theme-outline-variant, rgba(0, 0, 0, 0.1)) 75%
      );
    background-size: 20px 20px;
    background-position:
      0 0,
      10px 10px;
  }

  .dialog-icon :global(svg) {
    width: 96px;
    height: 96px;
    fill: currentColor;
  }

  /* forge-tab-bar CSS custom properties — not representable as Tailwind. */
  forge-tab-bar {
    --forge-tab-bar-stretch: 0;
    --forge-tab-bar-justify: flex-start;
    margin-block-end: var(--forge-spacing-xxsmall);
  }

  .code-block {
    position: relative;
    background-color: var(--forge-theme-surface-dim);
    border-radius: var(--forge-shape-medium, 8px);
    overflow: hidden;
  }

  .code-block pre {
    margin: 0;
    padding: var(--forge-spacing-small) var(--forge-spacing-medium);
    padding-inline-end: calc(var(--forge-spacing-medium) + 32px);
    overflow-x: auto;
  }

  .code-block code {
    font-family: "Roboto Mono", monospace;
    color: var(--forge-theme-text-high);
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 13px;
    line-height: 1.5;
  }

  .code-block--scroll pre {
    max-height: 320px;
    overflow: auto;
    overscroll-behavior: contain;
  }

  .copy-btn {
    position: absolute;
    top: 4px;
    right: 4px;
  }

  :global(.hljs) {
    color: var(--forge-theme-text-high);
    background: transparent;
  }
  :global(.hljs-tag),
  :global(.hljs-name),
  :global(.hljs-title) {
    color: var(--forge-theme-primary);
  }
  :global(.hljs-attr) {
    color: var(--forge-theme-tertiary);
  }
  :global(.hljs-string) {
    color: var(--forge-theme-success);
  }
  :global(.hljs-comment) {
    color: var(--forge-theme-text-low);
    font-style: italic;
  }
</style>
