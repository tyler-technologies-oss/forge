import { describe, expect, it, vi } from 'vitest';
import { LitElement, html, type TemplateResult } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { Thread } from '../types/index.js';
import { DeleteThreadController } from './delete-thread-controller.js';

import '../ai-modal/ai-modal.js';

const thread: Thread = { id: 't1', title: 'My "chat"', createdAt: '2024-01-01T00:00:00Z' };

class DeleteControllerHost extends LitElement {
  public onConfirm = vi.fn<(thread: Thread) => void>();
  public controller = new DeleteThreadController(this, { onConfirm: t => this.onConfirm(t) });

  public override render(): TemplateResult {
    return html`<div id="content">content</div>
      ${this.controller.template}`;
  }
}
customElements.define('forge-ai-test-delete-controller-host', DeleteControllerHost);

async function createHost(): Promise<DeleteControllerHost> {
  return renderFixture<DeleteControllerHost>(
    html`<forge-ai-test-delete-controller-host></forge-ai-test-delete-controller-host>`,
    'forge-ai-test-delete-controller-host'
  );
}

function getModal(host: DeleteControllerHost): (HTMLElement & { open: boolean }) | null {
  return host.shadowRoot!.querySelector('forge-ai-modal');
}

function getButton(host: DeleteControllerHost, label: string): HTMLButtonElement {
  return host.shadowRoot!.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;
}

describe('DeleteThreadController', () => {
  it('should render nothing before show is called', async () => {
    const host = await createHost();

    expect(getModal(host)).toBeNull();
  });

  it('should render an open modal with the thread title when shown', async () => {
    const host = await createHost();

    await host.controller.show(thread);
    await settle(host);

    const modal = getModal(host)!;
    expect(modal).toBeTruthy();
    expect(modal.open).toBe(true);
    expect(host.shadowRoot!.querySelector('[role="alertdialog"]')!.getAttribute('aria-labelledby')).toBe('delete-confirm-title');
    expect(host.shadowRoot!.querySelector('#delete-confirm-title')!.textContent).toBe('Delete chat');
    expect(host.shadowRoot!.querySelector('.delete-confirmation__text')!.textContent).toContain('Are you sure you want to delete "My "chat""?');
  });

  it('should call onConfirm with the thread and close when Delete is clicked', async () => {
    const host = await createHost();
    await host.controller.show(thread);
    await settle(host);

    getButton(host, 'Confirm deletion').click();
    await settle(host);

    expect(host.onConfirm).toHaveBeenCalledTimes(1);
    expect(host.onConfirm).toHaveBeenCalledWith(thread);
    expect(getModal(host)).toBeNull();
  });

  it('should call onConfirm only once when Delete is double-clicked', async () => {
    const host = await createHost();
    await host.controller.show(thread);
    await settle(host);
    const btn = getButton(host, 'Confirm deletion');

    btn.click();
    btn.click();
    await settle(host);

    expect(host.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should close without calling onConfirm when Cancel is clicked', async () => {
    const host = await createHost();
    await host.controller.show(thread);
    await settle(host);

    getButton(host, 'Cancel deletion').click();
    await settle(host);

    expect(host.onConfirm).not.toHaveBeenCalled();
    expect(getModal(host)).toBeNull();
  });

  it('should remove the modal when close is called', async () => {
    const host = await createHost();
    await host.controller.show(thread);
    await settle(host);

    host.controller.close();
    await settle(host);

    expect(getModal(host)).toBeNull();
  });

  it('should tolerate close when nothing is shown', async () => {
    const host = await createHost();

    expect(() => host.controller.close()).not.toThrow();
    await host.updateComplete;
    expect(getModal(host)).toBeNull();
  });

  it('should clear the thread and stop modal close events from escaping when the modal closes itself', async () => {
    const host = await createHost();
    await host.controller.show(thread);
    await settle(host);
    const outer = vi.fn();
    host.addEventListener('forge-ai-modal-close', outer);

    getModal(host)!.dispatchEvent(new CustomEvent('forge-ai-modal-close', { bubbles: true, composed: true }));
    await settle(host);

    expect(outer).not.toHaveBeenCalled();
    expect(getModal(host)).toBeNull();
  });

  it('should close when Escape is pressed in the dialog', async () => {
    const host = await createHost();
    await host.controller.show(thread);
    await settle(host);
    const dialog = getModal(host)!.shadowRoot!.querySelector('dialog')!;

    dialog.dispatchEvent(new Event('close'));
    await settle(host);

    expect(host.onConfirm).not.toHaveBeenCalled();
    expect(getModal(host)).toBeNull();
  });

  it('should replace the shown thread when show is called again', async () => {
    const host = await createHost();
    await host.controller.show(thread);
    await settle(host);

    await host.controller.show({ ...thread, id: 't2', title: 'Other' });
    await settle(host);
    getButton(host, 'Confirm deletion').click();

    expect(host.onConfirm).toHaveBeenCalledWith(expect.objectContaining({ id: 't2' }));
  });

  it('should provide no-op connection lifecycle hooks', async () => {
    const host = await createHost();

    expect(() => host.controller.hostConnected()).not.toThrow();
    expect(() => host.controller.hostDisconnected()).not.toThrow();
  });
});
