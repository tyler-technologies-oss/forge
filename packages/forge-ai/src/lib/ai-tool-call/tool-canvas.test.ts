import { describe, expect, it } from 'vitest';
import {
  createToolCanvas,
  requestCanvasClose,
  requestCanvasOpen,
  resolveToolCanvasActionLabel,
  resolveToolCanvasIcon,
  resolveToolCanvasTitle
} from './tool-canvas.js';
import type { ToolCall, ToolDefinition } from '../types/index.js';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ReportArgs = { kind: string };

const toolCall: ToolCall<ReportArgs> = {
  id: 'call-1',
  messageId: 'msg-1',
  name: 'report',
  args: { kind: 'report' },
  status: 'complete',
  type: 'client'
};

function definition(canvas: ToolDefinition<ReportArgs>['canvas']): ToolDefinition<ReportArgs> {
  return { name: 'report', displayName: 'Report', canvas };
}

describe('tool-canvas', () => {
  describe('resolveToolCanvasIcon', () => {
    it('should return undefined when no icon is configured', () => {
      expect(resolveToolCanvasIcon(toolCall, definition({}))).toBeUndefined();
    });

    it('should clone an element icon so each card gets its own node', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const icon = resolveToolCanvasIcon(toolCall, definition({ icon: svg }));

      expect(icon).toBeInstanceOf(SVGElement);
      expect(icon).not.toBe(svg);
    });

    it('should resolve an icon from a function of the tool call', () => {
      const icon = resolveToolCanvasIcon(
        toolCall,
        definition({ icon: tc => (tc.args.kind === 'report' ? '<svg><circle r="1"/></svg>' : '<svg><rect/></svg>') })
      );

      expect(icon?.querySelector('circle')).toBeTruthy();
    });

    it('should keep only allowlisted elements and attributes from markup', () => {
      const markup = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onload="alert(1)" class="x">
          <script>alert(1)</script>
          <style>path { fill: red }</style>
          <set attributeName="onmouseover" to="alert(1)"></set>
          <foreignObject><body onload="alert(1)"></body></foreignObject>
          <use href="javascript:alert(1)"></use>
          <a href="javascript:alert(1)"><path d="M0 0h24v24H0z" fill="currentColor" onclick="alert(1)"/></a>
          <g transform="rotate(45)"><circle cx="12" cy="12" r="4"/></g>
        </svg>`;

      const icon = resolveToolCanvasIcon(toolCall, definition({ icon: markup }));
      const names = [...(icon?.querySelectorAll('*') ?? [])].map(el => el.localName);

      expect(icon?.getAttribute('viewBox')).toBe('0 0 24 24');
      expect(icon?.hasAttribute('onload')).toBe(false);
      expect(icon?.hasAttribute('class')).toBe(false);
      expect(names).toEqual(['g', 'circle']);
      expect(icon?.querySelector('g')?.getAttribute('transform')).toBe('rotate(45)');
    });

    it('should return undefined for markup without a root svg', () => {
      expect(resolveToolCanvasIcon(toolCall, definition({ icon: '<div>nope</div>' }))).toBeUndefined();
    });
  });

  describe('labels', () => {
    it('should fall back to displayName for the title and default action labels', () => {
      const def = definition({});

      expect(resolveToolCanvasTitle(toolCall, def)).toBe('Report');
      expect(resolveToolCanvasActionLabel(toolCall, def, false)).toBe('Open in canvas');
      expect(resolveToolCanvasActionLabel(toolCall, def, true)).toBe('Collapse canvas');
    });

    it('should resolve action labels from a function of the tool call', () => {
      const def = definition({
        actionLabel: tc => ({ open: `Open ${tc.args.kind}`, collapse: `Collapse ${tc.args.kind}` })
      });

      expect(resolveToolCanvasActionLabel(toolCall, def, false)).toBe('Open report');
      expect(resolveToolCanvasActionLabel(toolCall, def, true)).toBe('Collapse report');
    });
  });

  describe('requests', () => {
    it('should report unhandled when no host answers', () => {
      const target = document.createElement('div');

      expect(requestCanvasOpen(target, { toolCallId: 'call-1', toolName: 'report' })).toBe(false);
      expect(requestCanvasClose(target, { toolCallId: 'call-1' })).toBe(false);
    });

    it('should report handled when a host marks the request', () => {
      const target = document.createElement('div');
      target.addEventListener('forge-ai-canvas-open-request', evt => {
        evt.detail.handled = true;
      });

      expect(requestCanvasOpen(target, { toolCallId: 'call-1', toolName: 'report' })).toBe(true);
    });
  });

  describe('createToolCanvas', () => {
    function controls(options: { available?: boolean; open?: boolean } = {}): {
      canvas: ReturnType<typeof createToolCanvas>;
      calls: string[];
      state: { open: boolean };
    } {
      const calls: string[] = [];
      const state = { open: options.open ?? false };
      const canvas = createToolCanvas({
        available: options.available ?? true,
        isOpen: () => state.open,
        open: () => {
          calls.push('open');
          state.open = true;
          return true;
        },
        close: () => {
          calls.push('close');
          state.open = false;
          return true;
        }
      });
      return { canvas, calls, state };
    }

    it('should expose a snapshot of the open state', () => {
      expect(controls({ open: true }).canvas.isOpen).toBe(true);
      expect(controls({ open: false }).canvas.isOpen).toBe(false);
    });

    it('should open when closed and close when open on toggle', () => {
      const { canvas, calls } = controls();

      expect(canvas.toggle()).toBe(true);
      expect(canvas.toggle()).toBe(true);
      expect(calls).toEqual(['open', 'close']);
    });

    it('should do nothing and return false when unavailable', () => {
      const { canvas, calls } = controls({ available: false });

      expect(canvas.open()).toBe(false);
      expect(canvas.close()).toBe(false);
      expect(canvas.toggle()).toBe(false);
      expect(calls).toHaveLength(0);
    });
  });
});
