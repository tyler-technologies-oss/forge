import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import { PromptButtonComponent, PromptButtonComponentTagName } from '../index.js';

describe('PromptButtonComponent', () => {
  it('should be registered under the forge-ai- prefixed tag', async () => {
    const el = await renderFixture<PromptButtonComponent>(html`<forge-ai-prompt-button>Label</forge-ai-prompt-button>`, 'forge-ai-prompt-button');

    expect(PromptButtonComponentTagName).toBe('forge-ai-prompt-button');
    expect(customElements.get('forge-ai-prompt-button')).toBe(PromptButtonComponent);
    expect(customElements.get('forge-prompt-button')).toBeUndefined();
    expect(el.shadowRoot).toBeTruthy();
  });
});
