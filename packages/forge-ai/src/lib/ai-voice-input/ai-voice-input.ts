import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import styles from './ai-voice-input.scss?inline';

import '../core/tooltip/tooltip.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-voice-input': AiVoiceInputComponent;
  }

  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

export const AiVoiceInputComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-voice-input';

/**
 * Event detail interface for the speech recognition result event.
 */
export interface ForgeAiVoiceInputResultEvent {
  /** The recognized speech text */
  transcript: string;
  /** Confidence score of the recognition result (0-1) */
  confidence: number;
}

/**
 * @tag forge-ai-voice-input
 *
 * @event {CustomEvent<ForgeAiVoiceInputResultEvent>} forge-ai-voice-input-result - Fired when speech recognition produces a result.
 * The event detail contains the transcript and confidence score of the recognized speech.
 */
@customElement(AiVoiceInputComponentTagName)
export class AiVoiceInputComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @state()
  private _isRecording = false;

  private _recognition: SpeechRecognition | null = null;

  public override connectedCallback(): void {
    super.connectedCallback();
    this._initializeSpeechRecognition();
  }

  private _initializeSpeechRecognition(): void {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      console.warn('Speech Recognition is not supported in this browser');
      return;
    }

    this._recognition = new SpeechRecognitionClass();
    this._recognition.continuous = false;
    this._recognition.interimResults = false;
    this._recognition.lang = 'en-US';

    this._recognition.onstart = () => {
      this._isRecording = true;
    };

    this._recognition.onend = () => {
      this._isRecording = false;
    };

    this._recognition.onerror = () => {
      this._isRecording = false;
    };

    this._recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (event.results.length > 0) {
        const result = event.results[0];
        if (result.length > 0) {
          const alternative = result[0];
          const eventDetail: ForgeAiVoiceInputResultEvent = {
            transcript: alternative.transcript,
            confidence: alternative.confidence
          };

          this.dispatchEvent(
            new CustomEvent('forge-ai-voice-input-result', {
              detail: eventDetail,
              bubbles: true
            })
          );
        }
      }
    };
  }

  private _toggleRecording(): void {
    if (!this._recognition) {
      return;
    }

    if (this._isRecording) {
      this._recognition.stop();
    } else {
      this._recognition.start();
    }
  }

  public override render(): TemplateResult {
    const classes = classMap({
      'forge-icon-button--medium': true,
      'forge-icon-button': true,
      'forge-theme--error': this._isRecording,
      recording: this._isRecording
    });

    return html`
      <div class="ai-voice-input">
        <button
          id="voice-btn"
          class=${classes}
          @click=${this._toggleRecording}
          aria-label=${this._isRecording ? 'Stop dictating' : 'Dictate prompt'}
          ?disabled=${!this._recognition}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon custom-icon" aria-hidden="true">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3m5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72z" />
          </svg>
        </button>
        <forge-ai-tooltip for="voice-btn" placement="top">${this._isRecording ? 'Stop dictating' : 'Dictate prompt'}</forge-ai-tooltip>
      </div>
    `;
  }
}
