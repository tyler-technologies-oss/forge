import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { AiVoiceInputComponent, AiVoiceInputComponentTagName, type ForgeAiVoiceInputResultEvent } from './index.js';

const TAG = 'forge-ai-voice-input';

class MockSpeechRecognition extends EventTarget {
  public static instances: MockSpeechRecognition[] = [];
  public continuous = true;
  public interimResults = true;
  public lang = '';
  public onstart: ((ev: Event) => void) | null = null;
  public onend: ((ev: Event) => void) | null = null;
  public onerror: ((ev: Event) => void) | null = null;
  public onresult: ((ev: unknown) => void) | null = null;
  public start = vi.fn(() => this.onstart?.(new Event('start')));
  public stop = vi.fn(() => this.onend?.(new Event('end')));

  public constructor() {
    super();
    MockSpeechRecognition.instances.push(this);
  }
}

interface SpeechWindow {
  SpeechRecognition?: unknown;
  webkitSpeechRecognition?: unknown;
}
const speechWindow = window as unknown as SpeechWindow;
let original: { standard: unknown; webkit: unknown };

function createElement(): Promise<AiVoiceInputComponent> {
  return renderFixture<AiVoiceInputComponent>(html`<forge-ai-voice-input></forge-ai-voice-input>`, TAG);
}

function getButton(el: AiVoiceInputComponent): HTMLButtonElement {
  return el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
}

function latest(): MockSpeechRecognition {
  return MockSpeechRecognition.instances[MockSpeechRecognition.instances.length - 1];
}

beforeEach(() => {
  original = { standard: speechWindow.SpeechRecognition, webkit: speechWindow.webkitSpeechRecognition };
  MockSpeechRecognition.instances = [];
  speechWindow.SpeechRecognition = MockSpeechRecognition;
  speechWindow.webkitSpeechRecognition = undefined;
});

afterEach(() => {
  speechWindow.SpeechRecognition = original.standard;
  speechWindow.webkitSpeechRecognition = original.webkit;
  vi.restoreAllMocks();
});

describe('AiVoiceInputComponent', () => {
  describe('registration', () => {
    it('should be registered under the forge-ai-voice-input tag', async () => {
      const el = await createElement();

      expect(AiVoiceInputComponentTagName).toBe(TAG);
      expect(customElements.get(TAG)).toBe(AiVoiceInputComponent);
      expect(el).toBeInstanceOf(AiVoiceInputComponent);
      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('unsupported browser', () => {
    beforeEach(() => {
      speechWindow.SpeechRecognition = undefined;
      speechWindow.webkitSpeechRecognition = undefined;
    });

    it('should warn and disable the button when speech recognition is unavailable', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const el = await createElement();

      expect(warn).toHaveBeenCalledWith('Speech Recognition is not supported in this browser');
      expect(getButton(el).disabled).toBe(true);
    });

    it('should not throw when the disabled button is clicked', async () => {
      vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const el = await createElement();

      expect(() => getButton(el).click()).not.toThrow();
      expect(getButton(el).getAttribute('aria-label')).toBe('Dictate prompt');
    });
  });

  describe('initialization', () => {
    it('should configure the recognition instance', async () => {
      await createElement();

      const recognition = latest();
      expect(recognition.continuous).toBe(false);
      expect(recognition.interimResults).toBe(false);
      expect(recognition.lang).toBe('en-US');
    });

    it('should fall back to webkitSpeechRecognition', async () => {
      speechWindow.SpeechRecognition = undefined;
      speechWindow.webkitSpeechRecognition = MockSpeechRecognition;

      const el = await createElement();

      expect(MockSpeechRecognition.instances).toHaveLength(1);
      expect(getButton(el).disabled).toBe(false);
    });

    it('should enable the button when speech recognition is available', async () => {
      const el = await createElement();

      expect(getButton(el).disabled).toBe(false);
    });
  });

  describe('recording', () => {
    it('should start recognition and show recording state when clicked', async () => {
      const el = await createElement();

      await userEvent.click(getButton(el));
      await el.updateComplete;

      expect(latest().start).toHaveBeenCalledTimes(1);
      const button = getButton(el);
      expect(button.classList.contains('forge-theme--error')).toBe(true);
      expect(button.getAttribute('aria-label')).toBe('Stop dictating');
    });

    it('should stop recognition when clicked while recording', async () => {
      const el = await createElement();

      getButton(el).click();
      await el.updateComplete;
      getButton(el).click();
      await el.updateComplete;

      expect(latest().stop).toHaveBeenCalledTimes(1);
      expect(getButton(el).getAttribute('aria-label')).toBe('Dictate prompt');
    });

    it('should leave the recording state when recognition ends', async () => {
      const el = await createElement();
      getButton(el).click();
      await el.updateComplete;

      latest().onend?.(new Event('end'));
      await el.updateComplete;

      expect(getButton(el).getAttribute('aria-label')).toBe('Dictate prompt');
    });

    it('should leave the recording state when recognition errors', async () => {
      const el = await createElement();
      getButton(el).click();
      await el.updateComplete;

      latest().onerror?.(new Event('error'));
      await el.updateComplete;

      expect(getButton(el).getAttribute('aria-label')).toBe('Dictate prompt');
    });

    it('should label the tooltip according to recording state', async () => {
      const el = await createElement();
      const tooltip = el.shadowRoot!.querySelector('forge-ai-tooltip')!;

      expect(tooltip.textContent!.trim()).toBe('Dictate prompt');
      expect(tooltip.getAttribute('for')).toBe('voice-btn');

      getButton(el).click();
      await el.updateComplete;

      expect(tooltip.textContent!.trim()).toBe('Stop dictating');
    });

    it('should hide the decorative icon from assistive technology', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('result event', () => {
    function emitResult(results: unknown): void {
      latest().onresult?.({ results });
    }

    it('should dispatch a bubbling result event with the first transcript and confidence', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-voice-input-result', listener);

      emitResult([[{ transcript: 'hello world', confidence: 0.9 }]]);

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0] as CustomEvent<ForgeAiVoiceInputResultEvent>;
      expect(event.detail).toEqual({ transcript: 'hello world', confidence: 0.9 });
      expect(event.bubbles).toBe(true);
    });

    it('should not dispatch when there are no results', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-voice-input-result', listener);

      emitResult([]);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should not dispatch when the first result has no alternatives', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-voice-input-result', listener);

      emitResult([[]]);

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
