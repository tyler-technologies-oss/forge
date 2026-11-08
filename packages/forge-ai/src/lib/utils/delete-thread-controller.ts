import { ReactiveController, ReactiveControllerHost, html, nothing, TemplateResult } from 'lit';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import type { AiModalComponent } from '../ai-modal/ai-modal';
import type { Thread } from '../types/index.js';

export interface DeleteThreadControllerCallbacks {
  onConfirm: (thread: Thread) => void;
}

export class DeleteThreadController implements ReactiveController {
  #host: ReactiveControllerHost;
  #callbacks: DeleteThreadControllerCallbacks;
  #confirmingThread: Thread | null = null;
  #modalRef: Ref<AiModalComponent> = createRef();

  constructor(host: ReactiveControllerHost, callbacks: DeleteThreadControllerCallbacks) {
    this.#host = host;
    this.#callbacks = callbacks;
    host.addController(this);
  }

  public hostConnected(): void {}

  public hostDisconnected(): void {}

  public async show(thread: Thread): Promise<void> {
    this.#confirmingThread = thread;
    this.#host.requestUpdate();
    await this.#host.updateComplete;
    this.#modalRef.value?.show();
  }

  public close(): void {
    this.#modalRef.value?.close();
    this.#confirmingThread = null;
    this.#host.requestUpdate();
  }

  #handleConfirm = (): void => {
    if (!this.#confirmingThread) {
      return;
    }

    this.#callbacks.onConfirm(this.#confirmingThread);
    this.close();
  };

  #handleDeny = (): void => {
    this.close();
  };

  #handleModalClose = (evt: Event): void => {
    evt.stopPropagation();
    this.#confirmingThread = null;
    this.#host.requestUpdate();
  };

  public get template(): TemplateResult | typeof nothing {
    if (!this.#confirmingThread) {
      return nothing;
    }

    return html`
      <forge-ai-modal ${ref(this.#modalRef)} .open=${true} size-strategy="fixed" @forge-ai-modal-close=${this.#handleModalClose}>
        <div class="delete-confirmation" role="alertdialog" aria-labelledby="delete-confirm-title">
          <h2 id="delete-confirm-title" class="delete-confirmation__title">Delete chat</h2>
          <div class="delete-confirmation__text">Are you sure you want to delete "${this.#confirmingThread.title}"? This action cannot be undone.</div>
          <div class="delete-confirmation__actions">
            <button class="forge-button forge-button--outlined" @click=${this.#handleDeny} autofocus aria-label="Cancel deletion">Cancel</button>
            <button class="forge-button forge-button--filled" @click=${this.#handleConfirm} aria-label="Confirm deletion">Delete</button>
          </div>
        </div>
      </forge-ai-modal>
    `;
  }
}
