<script lang="ts">
  import { getCurrentTheme, setTheme } from "../scripts/theme";
  import { getBlockSourceJsUrl } from "../data/blocks";
  import hljs from "highlight.js/lib/core";
  import xml from "highlight.js/lib/languages/xml";
  import javascript from "highlight.js/lib/languages/javascript";

  // Register HTML/XML and JS languages
  hljs.registerLanguage("xml", xml);
  hljs.registerLanguage("javascript", javascript);

  type Viewport = "desktop" | "tablet" | "phone" | "responsive";
  type ViewMode = "preview" | "source";
  type CodeTab = "html" | "js";

  const viewportWidths: Record<Viewport, string> = {
    desktop: "100%",
    tablet: "768px",
    phone: "375px",
    responsive: "100%",
  };

  let {
    title,
    iframeUrl,
  }: {
    title: string;
    iframeUrl: string;
  } = $props();

  let iframeElement: HTMLIFrameElement | undefined = $state();
  let viewport: Viewport = $state("desktop");
  let viewMode: ViewMode = $state("preview");
  let codeTab: CodeTab = $state("html");
  let sourceHtml: string = $state("");
  let highlightedHtml: string = $state("");
  let sourceJs: string = $state("");
  let highlightedJs: string = $state("");
  let hasJsTab: boolean = $state(false);
  let sourceLoading: boolean = $state(false);
  let copied: boolean = $state(false);
  let currentTheme: "light" | "dark" = $state("light");

  // Initialize theme on mount
  $effect(() => {
    currentTheme = getCurrentTheme();

    // Listen for theme changes via attribute mutation
    const observer = new MutationObserver(() => {
      currentTheme = getCurrentTheme();
      sendThemeToIframe(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-forge-theme"],
    });

    return () => observer.disconnect();
  });

  function sendThemeToIframe(theme: "light" | "dark") {
    iframeElement?.contentWindow?.postMessage(
      { type: "forge-theme-change", theme },
      "*",
    );
  }

  function handleIframeLoad() {
    sendThemeToIframe(currentTheme);
  }

  // Fetch source code when switching to source view
  $effect(() => {
    if (viewMode === "source" && !sourceHtml) {
      sourceLoading = true;
      fetch(iframeUrl)
        .then((response) => response.text())
        .then(async (html) => {
          const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
          const rawBody = bodyMatch ? bodyMatch[1] : html;
          let bodyContent = rawBody
            .replace(
              /\s*<script\b[^>]*\bid=["'](?:ready-transition|theme-listener)["'][^>]*><\/script>/gi,
              "",
            )
            .trim();

          // Any remaining `<script src="...">` is the block's own bundled
          // script, whose src points at a hashed chunk file. Pull its clean
          // `.source.js` sibling into a separate JS tab instead of inlining
          // it into the HTML.
          const scriptTagPattern =
            /\s*<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*><\/script>/gi;
          const jsChunks: string[] = [];
          for (const match of [...bodyContent.matchAll(scriptTagPattern)]) {
            const [fullTag, src] = match;
            const sourceUrl = getBlockSourceJsUrl(new URL(src, iframeUrl).href);
            try {
              const jsResponse = await fetch(sourceUrl);
              if (jsResponse.ok) {
                jsChunks.push((await jsResponse.text()).trim());
              }
            } catch {
              // Skip if the source file can't be fetched.
            }
            bodyContent = bodyContent.replace(fullTag, "");
          }

          sourceHtml = bodyContent.trim();
          highlightedHtml = hljs.highlight(sourceHtml, {
            language: "xml",
          }).value;

          sourceJs = jsChunks.join("\n\n");
          hasJsTab = sourceJs.length > 0;
          highlightedJs = hasJsTab
            ? hljs.highlight(sourceJs, { language: "javascript" }).value
            : "";

          sourceLoading = false;
        })
        .catch(() => {
          sourceHtml = "Error loading source code";
          highlightedHtml = sourceHtml;
          sourceLoading = false;
        });
    }
  });

  function toggleTheme() {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function reloadIframe() {
    if (iframeElement) {
      iframeElement.src = iframeUrl;
    }
  }

  async function copyCode() {
    const code = codeTab === "js" && hasJsTab ? sourceJs : sourceHtml;
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch (err) {
      console.error(err);
    }
  }
</script>

<forge-card class="block-viewer">
  <forge-toolbar auto-height>
    <forge-tab-bar
      slot="before-start"
      active-tab-name="preview"
      onforge-tab-bar-change={(e: CustomEvent) =>
        (viewMode = e.detail.name as ViewMode)}
    >
      <forge-tab id="block-viewer-tab-preview" name="preview">
        <forge-icon slot="start" name="preview"></forge-icon>
        Preview
      </forge-tab>
      <forge-tab id="block-viewer-tab-source" name="source">
        <forge-icon slot="start" name="code"></forge-icon>
        Code
      </forge-tab>
    </forge-tab-bar>

    {#if viewMode === "preview"}
      <div class="flex items-center gap-small" slot="end">
        <div class="flex items-center gap-xxsmall">
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->

          <forge-button-toggle-group
            aria-label="Viewport size"
            value={viewport}
            mandatory
            dense
            onforge-button-toggle-group-change={(e: CustomEvent) =>
              (viewport = e.detail as Viewport)}
          >
            <forge-button-toggle value="desktop" aria-label="Desktop">
              <forge-icon name="monitor"></forge-icon>
            </forge-button-toggle>
            <forge-button-toggle value="tablet" aria-label="Tablet (768px)">
              <forge-icon name="tablet"></forge-icon>
            </forge-button-toggle>
            <forge-button-toggle value="phone" aria-label="Phone (375px)">
              <forge-icon name="smartphone"></forge-icon>
            </forge-button-toggle>
            <forge-button-toggle value="responsive" aria-label="Full width">
              <forge-icon name="fullscreen"></forge-icon>
            </forge-button-toggle>
          </forge-button-toggle-group>
        </div>
        <forge-icon-button
          aria-label="Switch to {currentTheme === 'light'
            ? 'dark'
            : 'light'} theme"
          title="Toggle theme"
          onclick={toggleTheme}
        >
          {#if currentTheme === "light"}
            <forge-icon name="brightness_3"></forge-icon>
          {:else}
            <forge-icon name="brightness_7"></forge-icon>
          {/if}
        </forge-icon-button>
      </div>
    {/if}
  </forge-toolbar>

  <forge-tab-panel for="block-viewer-tab-preview">
    <div class="iframe-container flex justify-center bg-surface-dim p-medium">
      <div
        class="iframe-wrapper overflow-hidden h-full"
        style:width={viewportWidths[viewport]}
      >
        <iframe
          bind:this={iframeElement}
          src={iframeUrl}
          title="{title} preview"
          onload={handleIframeLoad}
          class="w-full h-full block border-0"
        ></iframe>
      </div>
    </div>
  </forge-tab-panel>
  <forge-tab-panel for="block-viewer-tab-source">
    <div class="bg-surface-dim overflow-auto max-h-[800px] relative">
      {#if sourceLoading}
        <div class="p-large text-medium text-center">Loading source...</div>
      {:else}
        {#if hasJsTab}
          <div class="flex items-center p-small">
            <forge-button-toggle-group
              aria-label="Code language"
              value={codeTab}
              mandatory
              dense
              onforge-button-toggle-group-change={(e: CustomEvent) =>
                (codeTab = e.detail as CodeTab)}
            >
              <forge-button-toggle value="html">HTML</forge-button-toggle>
              <forge-button-toggle value="js">JS</forge-button-toggle>
            </forge-button-toggle-group>
          </div>
        {/if}
        <forge-icon-button
          id="block-viewer-copy-code-btn"
          class="block-viewer-copy"
          density="medium"
          aria-label={copied ? "Copied" : "Copy code"}
          onclick={copyCode}
        >
          <forge-icon name={copied ? "check" : "content_copy"}></forge-icon>
        </forge-icon-button>
        <forge-tooltip anchor="block-viewer-copy-code-btn" aria-hidden="true">
          {copied ? "Copied" : "Copy code"}
        </forge-tooltip>
        <pre class="m-0 p-medium overflow-x-auto"><code class="hljs text-high"
            >{@html codeTab === "js" && hasJsTab
              ? highlightedJs
              : highlightedHtml}</code
          ></pre>
      {/if}
    </div>
  </forge-tab-panel>
</forge-card>

<style lang="scss">
  /* Forge component custom properties + iframe sizing / grid-dot pattern that
     have no direct Tailwind equivalent. */
  forge-card {
    --forge-card-overflow: hidden;
    --iframe-height: 700px;
    --forge-card-padding: 0;
  }

  forge-tab-bar {
    --forge-tab-bar-divider-thickness: 0;
  }

  .iframe-container {
    min-height: var(--iframe-height);
    background-image: radial-gradient(
      circle,
      var(--forge-theme-outline) 1px,
      transparent 1px
    );
    background-size: 16px 16px;
  }

  /* Subtle diagonal hatch — repeating-linear-gradient has no Tailwind equivalent. */

  .iframe-wrapper {
    transition: width 0.3s ease;
    min-height: var(--iframe-height);
  }

  .block-viewer-copy {
    position: absolute;
    inset-block-start: var(--forge-spacing-xsmall);
    inset-inline-end: var(--forge-spacing-xsmall);
    z-index: 1;
  }

  iframe {
    min-height: var(--iframe-height);
  }

  code {
    font-family: "Roboto Mono", monospace;
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* Highlight.js theme using Forge design tokens */
  :global(.hljs) {
    color: var(--forge-theme-text-high);
    background: transparent;
  }

  :global(.hljs-tag) {
    color: var(--forge-theme-primary);
  }

  :global(.hljs-name) {
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

  :global(.hljs-doctag),
  :global(.hljs-keyword),
  :global(.hljs-meta .hljs-keyword),
  :global(.hljs-template-tag),
  :global(.hljs-template-variable),
  :global(.hljs-type),
  :global(.hljs-variable.language_) {
    color: var(--forge-theme-secondary);
  }

  :global(.hljs-title),
  :global(.hljs-title.class_),
  :global(.hljs-title.class_.inherited__),
  :global(.hljs-title.function_) {
    color: var(--forge-theme-primary);
  }

  :global(.hljs-literal),
  :global(.hljs-number) {
    color: var(--forge-theme-error);
  }

  :global(.hljs-meta) {
    color: var(--forge-theme-text-medium);
  }

  :global(.hljs-selector-attr),
  :global(.hljs-selector-class),
  :global(.hljs-selector-id),
  :global(.hljs-selector-pseudo) {
    color: var(--forge-theme-tertiary);
  }
</style>
