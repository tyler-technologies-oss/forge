<script lang="ts">
  interface Heading {
    id: string;
    text: string;
    level: number;
  }

  let {
    contentSelector = ".content-body, .mdx-content",
    levels = [2, 3],
    selector,
    title = "On this page",
  }: {
    contentSelector?: string;
    levels?: number[];
    selector?: string;
    title?: string;
  } = $props();

  let headings = $state<Heading[]>([]);
  let activeId = $state<string | null>(null);

  const minLevel = $derived(Math.min(...levels));

  $effect(() => {
    if (typeof window === "undefined") return;

    const container = document.querySelector(contentSelector);
    if (!container) return;

    // `selector` lets callers target section markers that aren't real
    // `h*` tags (e.g. the API tab's slotted section titles), in which case
    // there's no tag name to read a level from — fall back to `minLevel`.
    const headingSelector =
      selector ?? levels.map((level) => `h${level}`).join(", ");
    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(headingSelector),
    ).filter((el) => el.id);

    headings = elements.map((el) => ({
      id: el.id,
      text: el.textContent?.trim() ?? "",
      level: /^H[1-6]$/.test(el.tagName)
        ? Number(el.tagName.slice(1))
        : minLevel,
    }));

    if (!elements.length) return;

    // Bias the intersection root so a heading is considered "active" once it
    // crosses into the top ~20% of the viewport, rather than only once it's
    // fully in view.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          activeId = visible[0].target.id;
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);

    // Deep-linked heading: the scroll container lives inside
    // <forge-scaffold>/<forge-card>, which render unscrollable until those
    // custom elements upgrade. The browser's native scroll-to-fragment runs
    // before that upgrade finishes, so a pasted `#heading` link lands
    // nowhere — jump manually once the layout it depends on is in place.
    const hashId = decodeURIComponent(window.location.hash.slice(1));
    const target = hashId ? elements.find((el) => el.id === hashId) : undefined;

    if (target) {
      Promise.all([
        customElements.whenDefined("forge-scaffold"),
        customElements.whenDefined("forge-card"),
      ]).then(() => {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "auto", block: "start" });
          activeId = hashId;
        });
      });
    }

    return () => observer.disconnect();
  });

  function handleClick(event: MouseEvent, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    activeId = id;
    history.replaceState(null, "", `#${id}`);
  }
</script>

{#if headings.length > 1}
  <nav aria-label={title} class="flex flex-col gap-xsmall w-[240px]">
    <p class="text-overline text-medium px-small m-0">{title}</p>
    <forge-list dense navlist>
      {#each headings as heading (heading.id)}
        <forge-list-item
          selected={activeId === heading.id}
          style={heading.level > minLevel
            ? "--forge-list-item-padding: 0 24px;"
            : undefined}
        >
          <a
            href={`#${heading.id}`}
            aria-current={activeId === heading.id ? "true" : undefined}
            onclick={(event) => handleClick(event, heading.id)}
          >
            {heading.text}
          </a>
        </forge-list-item>
      {/each}
    </forge-list>
  </nav>
{/if}

<style lang="scss">
  @use "../../styles/mixins" as *;

  forge-list {
    @include nav-list-item();
  }
</style>
