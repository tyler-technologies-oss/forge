import { toggleAttribute } from '@tylertech/forge-core';
import { ReactiveController } from 'lit';
import { IOpenIconComponent } from '../index.js';
import { OPEN_ICON_CONSTANTS } from '../open-icon/open-icon-constants.js';
import { ExpansionPanelComponent } from './expansion-panel.js';

export interface ExpansionPanelTriggerControllerOptions {
  clickHandler: EventListener;
  keydownHandler: EventListener;
  keyupHandler: EventListener;
}

export class ExpansionPanelTriggerController implements ReactiveController {
  #host: ExpansionPanelComponent;
  #triggerElement?: HTMLElement;
  #controlsId?: string;
  #hostOldTrigger?: string;
  #hostOldTriggerElement?: HTMLElement;
  #hostOldOpen?: boolean;
  #abortController?: AbortController;
  #clickHandler: EventListener;
  #keydownHandler: EventListener;
  #keyupHandler: EventListener;

  public get openIcon(): IOpenIconComponent | undefined {
    return this.#triggerElement?.querySelector(OPEN_ICON_CONSTANTS.elementName) ?? undefined;
  }

  constructor(host: ExpansionPanelComponent, options: ExpansionPanelTriggerControllerOptions) {
    this.#host = host;
    this.#host.addController(this);
    this.#clickHandler = options.clickHandler;
    this.#keydownHandler = options.keydownHandler;
    this.#keyupHandler = options.keyupHandler;
  }

  public hostUpdate(): void {
    this.#tryHostTriggerChanged();
    this.#tryHostOpenChanged();
  }

  public hostDisconnected(): void {
    this.#detach();
  }

  public setControls(value: string): void {
    this.#controlsId = value;
    this.#setAriaControls(value);
  }

  #tryHostTriggerChanged(): void {
    // Check for changes to the host's trigger and triggerElement properties
    const trigger = this.#host.trigger;
    const triggerElement = this.#host.triggerElement ?? undefined;
    const triggerChanged = trigger !== this.#hostOldTrigger;
    const triggerElementChanged = triggerElement !== this.#hostOldTriggerElement;

    // Do nothing if there's been no change since the last update
    if (!triggerChanged && !triggerElementChanged) {
      return;
    }

    // Store the new values for comparison on the next update
    if (triggerChanged) {
      this.#hostOldTrigger = trigger;
    }
    if (triggerElementChanged) {
      this.#hostOldTriggerElement = triggerElement;
    }

    // Attempt to find and attach to the new trigger element
    const newTriggerEl = this.#getTriggerElement({
      trigger: (triggerChanged && trigger) || undefined,
      triggerElement: (triggerElementChanged && triggerElement) || undefined
    });
    if (newTriggerEl) {
      this.#attach(newTriggerEl);
    } else {
      this.#detach();
    }
  }

  #tryHostOpenChanged(): void {
    const open = this.#host.open;
    if (open !== this.#hostOldOpen) {
      this.#hostOldOpen = open;
      this.#toggleExpanded(open);
    }
  }

  #getTriggerElement(changedProperties: { trigger?: string; triggerElement?: HTMLElement }): HTMLElement | undefined {
    if (changedProperties.triggerElement) {
      return changedProperties.triggerElement;
    }

    if (changedProperties.trigger && this.#host.isConnected) {
      const rootNode = this.#host.getRootNode() as Document | ShadowRoot;
      return rootNode.getElementById(changedProperties.trigger) ?? undefined;
    }
  }

  #attach(triggerElement: HTMLElement): void {
    if (this.#triggerElement) {
      this.#detach();
    }

    if (!triggerElement.isConnected) {
      return;
    }

    if (!this.#abortController) {
      this.#abortController = new AbortController();
    }
    this.#triggerElement = triggerElement;
    this.#triggerElement.addEventListener('click', this.#clickHandler, { signal: this.#abortController.signal });
    this.#triggerElement.addEventListener('keydown', this.#keydownHandler, { signal: this.#abortController.signal });
    this.#triggerElement.addEventListener('keyup', this.#keyupHandler, { signal: this.#abortController.signal });

    this.#toggleExpanded(this.#host.open);
    this.#setAriaControls(this.#controlsId);
  }

  #detach(): void {
    this.#abortController?.abort();
    this.#abortController = undefined;

    this.#triggerElement?.removeAttribute('aria-controls');
    this.#triggerElement?.removeAttribute('aria-expanded');
    this.#triggerElement = undefined;
  }

  #toggleExpanded(expanded: boolean): void {
    this.#triggerElement?.setAttribute('aria-expanded', expanded.toString());
  }

  #setAriaControls(value?: string): void {
    if (this.#triggerElement) {
      toggleAttribute(this.#triggerElement, !!value, 'aria-controls', value);
    }
  }
}
