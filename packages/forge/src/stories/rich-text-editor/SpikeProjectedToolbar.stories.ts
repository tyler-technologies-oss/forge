// Spike (EN-98256). Each editor owns its toolbar in the DOM; the toolbar is painted into one shared
// slot at the top of the page (or above its own block) through forge-overlay's top layer. The
// defaults are the working combination; the controls reproduce the failure modes found in the spike.
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { IOverlayComponent } from '@tylertech/forge/overlay';

import '@tylertech/forge/overlay';
import '@tylertech/forge-rich-text-editor';
import '@tylertech/forge-rich-text-editor/features';

type CloseMode = 'immediate' | 'next-frame';
type AnchorMode = 'page-slot' | 'floating';

interface SpikeArgs {
  closeMode: CloseMode;
  guardToolbarPointer: boolean;
  anchorMode: AnchorMode;
}

const meta = {
  title: 'Rich Text Editor/Spike - Projected Toolbar',
  args: { closeMode: 'next-frame', guardToolbarPointer: true, anchorMode: 'page-slot' },
  argTypes: {
    closeMode: { control: 'radio', options: ['immediate', 'next-frame'] },
    guardToolbarPointer: { control: 'boolean' },
    anchorMode: { control: 'radio', options: ['page-slot', 'floating'] }
  }
} satisfies Meta<SpikeArgs>;

export default meta;

type Story = StoryObj<SpikeArgs>;

const log = (message: string): void => {
  const el = document.querySelector('#spike-log');
  if (el) {
    el.textContent += `${performance.now().toFixed(1)}  ${message}\n`;
  }
};

/** Counts animation frames in which no projected toolbar is open, i.e. the placeholder shows through. */
const watchEmptyFrames = (overlays: IOverlayComponent[], frames = 10): void => {
  let empty = 0;
  let remaining = frames;
  const tick = (): void => {
    if (!overlays.some(o => o.open)) {
      empty++;
    }
    if (--remaining > 0) {
      requestAnimationFrame(tick);
    } else {
      log(`handoff check: ${empty} of ${frames} frames with no toolbar open`);
    }
  };
  requestAnimationFrame(tick);
};

const wire = (root: HTMLElement, { closeMode, guardToolbarPointer, anchorMode }: SpikeArgs): void => {
  const anchor = root.querySelector<HTMLElement>('#toolbar-anchor');
  const contexts = Array.from(root.querySelectorAll<HTMLElement>('forge-rich-text-context'));
  const overlays = contexts.map(ctx => ctx.querySelector('forge-overlay') as IOverlayComponent);

  contexts.forEach((ctx, index) => {
    const overlay = overlays[index];
    const name = ctx.dataset.name;
    if (anchorMode === 'floating') {
      // Both RTE hosts are display: contents and have no box, so anchor to the block wrapper.
      overlay.anchorElement = ctx.parentElement;
      overlay.placement = 'top-start';
      overlay.flip = 'auto';
      root.classList.add('floating');
    } else {
      overlay.anchorElement = anchor;
    }

    if (guardToolbarPointer) {
      // Clicking toolbar chrome that is not a button would otherwise move focus to body and close it.
      // Editable targets are exempt, or the link popover's inputs could not be clicked into.
      ctx.querySelector('.spike-toolbar')?.addEventListener('pointerdown', evt => {
        const isEditable = evt.composedPath().some(node => node instanceof HTMLElement && (node.matches('input, textarea, select') || node.isContentEditable));
        if (!isEditable) {
          evt.preventDefault();
        }
      });
    }

    ctx.addEventListener('focusin', () => {
      if (!overlay.open) {
        overlay.open = true;
        log(`${name}: open`);
      }
    });

    ctx.addEventListener('focusout', (evt: FocusEvent) => {
      const next = evt.relatedTarget as Node | null;
      const staysInside = !!next && ctx.contains(next);
      if (staysInside) {
        return;
      }
      const close = (): void => {
        if (!ctx.matches(':focus-within')) {
          overlay.open = false;
          log(`${name}: close (focus -> ${next ? (next as Element).tagName?.toLowerCase() : 'nothing'})`);
        }
      };
      if (closeMode === 'next-frame') {
        requestAnimationFrame(close);
      } else {
        close();
      }
      watchEmptyFrames(overlays);
    });
  });
};

const block = (name: string): ReturnType<typeof html> => html`
  <div class="block">
    <forge-rich-text-context data-name=${name} content="<p>${name} text. Select some and format it.</p>">
      <forge-overlay persistent placement="bottom-start" flip="never" shift="never">
        <div class="spike-toolbar" role="toolbar" aria-label="Formatting (${name})">
          <forge-rte-standard-tools></forge-rte-standard-tools>
          <forge-rte-divider></forge-rte-divider>
          <forge-rte-link></forge-rte-link>
        </div>
      </forge-overlay>
      <forge-rich-text-content></forge-rich-text-content>
    </forge-rich-text-context>
  </div>
`;

export const ProjectedToolbar: Story = {
  render: args => {
    requestAnimationFrame(() => wire(document.querySelector('#spike-root') as HTMLElement, args));
    return html`
      <style>
        #spike-root {
          display: grid;
          gap: 16px;
        }
        .toolbar-slot {
          position: sticky;
          top: 0;
          z-index: 1;
          height: 48px;
          background: var(--forge-theme-surface-container);
          border-block-end: 1px solid var(--forge-theme-outline);
        }
        #toolbar-anchor {
          height: 0;
        }
        .placeholder {
          padding: 12px;
          opacity: 0.5;
        }
        forge-overlay::part(root) {
          width: min(100vw, 960px);
        }
        .floating forge-overlay::part(root) {
          width: auto;
        }
        .spike-toolbar {
          display: flex;
          align-items: center;
          height: 48px;
          padding-inline: 8px;
          background: var(--forge-theme-surface-container-high);
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        /* Hostile ancestors: a transform and a clipping container would trap position: fixed. */
        .hostile {
          transform: translateZ(0);
          overflow: hidden;
          border: 1px dashed var(--forge-theme-outline);
          padding: 8px;
        }
        #spike-log {
          font-size: 12px;
          max-height: 240px;
          overflow: auto;
          background: var(--forge-theme-surface-container-low);
          padding: 8px;
        }
      </style>
      <div id="spike-root">
        <div class="toolbar-slot">
          <div id="toolbar-anchor"></div>
          <div class="placeholder">Formatting toolbar - focus a text block</div>
        </div>
        <button id="before">Focusable before</button>
        <div class="grid">${block('Block A')} ${block('Block B')}</div>
        <div class="hostile">${block('Block C (transformed, overflow hidden)')}</div>
        <button id="after">Focusable after</button>
        <pre id="spike-log"></pre>
      </div>
    `;
  }
};
