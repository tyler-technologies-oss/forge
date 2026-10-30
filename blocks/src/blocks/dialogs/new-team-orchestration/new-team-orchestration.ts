import type { IDialogComponent } from '@tylertech/forge/dialog';
import type { ListboxComponent } from '@tylertech/forge/listbox';

interface IAgentNodeOptions {
  lead?: boolean;
  dashed?: boolean;
  muted?: boolean;
}

interface IPattern {
  id: string;
  name: string;
  icon: string;
  tag?: string;
  useWhen: string;
  description: string;
  example: string;
  diagram: string;
}

const agentNode = (label: string, { lead = false, dashed = false, muted = false }: IAgentNodeOptions = {}): string => {
  const borderStyle = dashed ? 'border-dashed' : '';
  const background = lead ? 'bg-tertiary-container-low' : 'bg-surface';
  const dimmed = muted ? 'opacity-40' : '';
  return `
    <span
      class="inline-flex items-center gap-xxsmall rounded-md border ${borderStyle} border-outline ${background} px-xsmall py-xxsmall ${dimmed}">
      <forge-icon name="robot_outline" style="font-size: 20px;" class="text-tertiary"></forge-icon>
      <span class="text-label2">${label}</span>
    </span>`;
};

const glyph = (name: string): string => `<forge-icon name="${name}"></forge-icon>`;

const note = (text: string): string => `<span class="text-label2 text-medium">${text}</span>`;

const PATTERNS: IPattern[] = [
  {
    id: 'router',
    name: 'Router',
    icon: 'alt_route',
    useWhen: 'One best-fit agent handles each request.',
    description: 'Incoming requests are classified and handed off to the single agent best suited to answer.',
    example: 'A support inbox sends billing questions to the billing agent and technical questions to the technical agent.',
    diagram: `
      <div class="flex flex-col items-center gap-xsmall">
        ${note('Incoming request')}
        ${glyph('arrow_down')}
        ${agentNode('Router', { lead: true })}
        <div class="flex items-center gap-large">
          ${glyph('arrow_bottom_left')}${glyph('arrow_down')}${glyph('arrow_bottom_right')}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${agentNode('Billing', { muted: true })}${agentNode('Technical')}${agentNode('General', { muted: true })}
        </div>
        ${note('Only the best-fit agent runs')}
      </div>`
  },
  {
    id: 'hierarchical',
    name: 'Hierarchical',
    icon: 'sitemap',
    useWhen: 'A supervisor delegates pieces of work and composes the result.',
    description: 'A supervising agent breaks a request into subtasks, assigns them to member agents, and merges their outputs.',
    example: 'A research supervisor assigns fact-finding and drafting subtasks, then compiles the final report.',
    diagram: `
      <div class="flex flex-col items-center gap-xsmall">
        ${agentNode('Supervisor', { lead: true })}
        <div class="flex items-center gap-xsmall">
          ${glyph('arrow_bottom_left')}${note('delegates subtasks')}${glyph('arrow_bottom_right')}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${agentNode('Research')}${agentNode('Drafting')}
        </div>
        <div class="flex items-center gap-xxsmall">
          ${glyph('arrow_up')}${note('supervisor composes the final result')}
        </div>
      </div>`
  },
  {
    id: 'network',
    name: 'Network',
    icon: 'hub',
    tag: 'Experimental',
    useWhen: 'Members contribute to a shared discussion in turn, then a synthesis pass merges it.',
    description: 'Every member sees the running discussion and adds its perspective before a final synthesis pass merges the thread.',
    example: 'Three domain experts debate a proposal in turn, then a synthesis pass writes the final recommendation.',
    diagram: `
      <div class="flex flex-col items-center gap-xsmall">
        <div class="flex flex-col items-center gap-xsmall rounded-md border border-dashed border-outline p-small">
          ${note('Shared discussion, one turn each')}
          <div class="flex flex-wrap items-center justify-center gap-xsmall">
            ${agentNode('Member 1')}${glyph('sync_alt')}${agentNode('Member 2')}${glyph('sync_alt')}${agentNode('Member 3')}
          </div>
        </div>
        ${glyph('arrow_down')}
        ${agentNode('Synthesis pass', { lead: true })}
      </div>`
  },
  {
    id: 'sequential',
    name: 'Sequential',
    icon: 'list',
    useWhen: 'Members run in a fixed order, each building on the last.',
    description: 'Agents run one after another in a fixed pipeline, with each step building on the output of the previous one.',
    example: 'A drafting agent writes a first pass, an editing agent revises it, and a formatting agent prepares it for delivery.',
    diagram: `
      <div class="flex flex-col items-center gap-xsmall">
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${agentNode('1. Draft')}${glyph('forward')}${agentNode('2. Edit')}${glyph('forward')}${agentNode('3. Format')}
        </div>
        ${note('Each step builds on the previous output')}
      </div>`
  },
  {
    id: 'loop',
    name: 'Loop',
    icon: 'sync',
    useWhen: 'Repeats a refinement step up to a set number of iterations.',
    description: 'A single refinement step repeats against its own output, stopping once a condition is met or the iteration limit is reached.',
    example: 'A code-review agent repeatedly critiques and rewrites a function until it passes all checks or hits the iteration limit.',
    diagram: `
      <div class="flex flex-col items-center gap-xsmall">
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${agentNode('Refine', { lead: true })}${glyph('forward')}${agentNode('Check')}
        </div>
        <div class="flex items-center gap-xxsmall rounded-md border border-dashed border-outline px-xsmall py-xxsmall">
          ${glyph('sync')}${note('repeats until it passes, up to the iteration limit')}
        </div>
      </div>`
  },
  {
    id: 'aggregator',
    name: 'Aggregator',
    icon: 'call_merge',
    useWhen: 'One agent synthesizes outputs from other selected agents.',
    description: 'Several member agents work independently in parallel, and one aggregator agent combines their outputs into a single result.',
    example: 'Three analyst agents each produce an estimate, and an aggregator agent combines them into one final figure.',
    diagram: `
      <div class="flex flex-col items-center gap-xsmall">
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${agentNode('Analyst A')}${agentNode('Analyst B')}${agentNode('Analyst C')}
        </div>
        <div class="flex items-center gap-large">
          ${glyph('arrow_bottom_right')}${glyph('arrow_down')}${glyph('arrow_bottom_left')}
        </div>
        ${agentNode('Aggregator', { lead: true })}
        ${note('One agent merges every output')}
      </div>`
  },
  {
    id: 'orchestrator-subagent',
    name: 'Orchestrator-subagent',
    icon: 'device_hub',
    tag: 'Experimental',
    useWhen: 'An orchestrator spins up isolated, tool-scoped workers at request time and synthesizes their reports.',
    description: 'An orchestrator creates disposable, tool-scoped worker agents on demand for a request, then synthesizes their reports into one response.',
    example: 'An orchestrator spins up a search worker and a summarization worker for a single query, then merges their findings.',
    diagram: `
      <div class="flex flex-col items-center gap-xsmall">
        ${agentNode('Orchestrator', { lead: true })}
        <div class="flex items-center gap-xsmall">
          ${glyph('arrow_bottom_left')}${note('spawns tool-scoped workers per request')}${glyph('arrow_bottom_right')}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${agentNode('Search', { dashed: true })}${agentNode('Fetch', { dashed: true })}${agentNode('Summarize', { dashed: true })}
        </div>
        <div class="flex items-center gap-xxsmall">
          ${glyph('arrow_up')}${note('reports synthesized, workers discarded')}
        </div>
      </div>`
  }
];

const listEl = document.getElementById('pattern-list') as ListboxComponent;
const detailEl = document.getElementById('pattern-detail') as HTMLElement;
const summaryEl = document.getElementById('pattern-detail-summary') as HTMLElement;
let selectedId: string | null = null;

const tagBadge = (pattern: IPattern): string => (pattern.tag ? `<forge-badge theme="tertiary">${pattern.tag}</forge-badge>` : '');

const renderList = () => {
  listEl.innerHTML = PATTERNS.map(
    pattern => `
      <forge-option value="${pattern.id}" two-line>
        <forge-icon slot="start" name="${pattern.icon}"></forge-icon>
        <span class="flex items-center gap-xsmall">${pattern.name}${tagBadge(pattern)}</span>
        <span slot="secondary">${pattern.useWhen}</span>
      </forge-option>`
  ).join('');
};

const renderDetail = () => {
  const pattern = PATTERNS.find(p => p.id === selectedId);

  if (!pattern) {
    detailEl.innerHTML = `
      <div class="flex flex-col items-center justify-center gap-small h-full p-medium text-medium text-center">
        <forge-icon name="sitemap" style="font-size: 40px;"></forge-icon>
        <p class="text-body1 mb-0">Select a pattern to see its details</p>
      </div>`;
    summaryEl.textContent = 'No orchestration pattern selected.';
    return;
  }

  detailEl.innerHTML = `
    <div class="flex items-center gap-small px-medium pt-medium pb-0">
      <forge-icon name="${pattern.icon}" style="font-size: 24px;" class="text-primary"></forge-icon>
      <h3 class="text-heading3 m-0">${pattern.name}</h3>
      ${tagBadge(pattern)}
    </div>

    <div class="flex flex-col gap-medium px-medium pb-medium pt-small">
      <p class="text-body1 m-0">${pattern.description}</p>

      <div class="flex items-center justify-center p-medium bg-surface-dim rounded-md">
        ${pattern.diagram}
      </div>

      <forge-label-value>
        <span slot="label">Use when</span>
        <span slot="value">${pattern.useWhen}</span>
      </forge-label-value>

      <forge-label-value>
        <span slot="label">Example</span>
        <span slot="value">${pattern.example}</span>
      </forge-label-value>
    </div>`;
  summaryEl.textContent = `${pattern.name}: ${pattern.description}`;
};

listEl.addEventListener('change', () => {
  selectedId = (listEl.value as string) || null;
  renderDetail();
});

renderList();
renderDetail();

const dialog = document.getElementById('new-team-dialog') as IDialogComponent;
const openBtn = document.getElementById('open-dialog-btn') as HTMLElement;
const closeBtn = document.getElementById('close-dialog-btn') as HTMLElement;
const cancelBtn = document.getElementById('cancel-btn') as HTMLElement;
const createBtn = document.getElementById('create-btn') as HTMLElement;

openBtn.addEventListener('click', () => {
  dialog.open = true;
});

closeBtn.addEventListener('click', () => {
  dialog.open = false;
});

cancelBtn.addEventListener('click', () => {
  dialog.open = false;
});

createBtn.addEventListener('click', () => {
  dialog.open = false;
});
