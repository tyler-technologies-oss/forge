import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import styles from './reasoning-content.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-reasoning-content': ReasoningContentComponent;
  }
}

export const ReasoningContentComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-reasoning-content';

/**
 * @tag forge-ai-reasoning-content
 */
@customElement(ReasoningContentComponentTagName)
export class ReasoningContentComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @state()
  private _displayedText = '';

  private _fullText = '';
  private _animationId: ReturnType<typeof setTimeout> | null = null;
  private _hasStarted = false;

  public override firstUpdated(): void {
    // Wait a bit for slot content to be available
    setTimeout(() => {
      this._extractTextAndAnimate();
    }, 100);
  }

  private _handleSlotChange(): void {
    if (!this._hasStarted) {
      this._extractTextAndAnimate();
    }
  }

  private _extractTextAndAnimate(): void {
    if (this._hasStarted) {
      return;
    }

    // Get the slot element and extract text
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const assignedNodes = slot.assignedNodes({ flatten: true });
      this._fullText = assignedNodes
        .map(node => node.textContent || '')
        .join('')
        .trim();

      if (this._fullText) {
        this._hasStarted = true;
        this._startTypingAnimation();
      }
    }
  }

  private _startTypingAnimation(): void {
    if (this._animationId) {
      clearTimeout(this._animationId);
    }

    this._displayedText = '';

    let currentIndex = 0;
    const typeSpeed = 10; // milliseconds per character

    const typeNextCharacter = (): void => {
      if (currentIndex < this._fullText.length) {
        this._displayedText = this._fullText.substring(0, currentIndex + 1);
        currentIndex++;

        this._animationId = setTimeout(typeNextCharacter, typeSpeed);
      } else {
        this._animationId = null;
      }
    };

    typeNextCharacter();
  }

  public override render(): TemplateResult {
    if (this._hasStarted) {
      return html`
        <div class="reasoning-content">
          <span class="animated-text">${this._displayedText}</span>
        </div>
      `;
    }

    return html`
      <div class="reasoning-content">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
