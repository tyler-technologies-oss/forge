import type { IKeyCombination, IKeyboardShortcutSequence } from './keyboard-shortcut-constants.js';
import { SEQUENCE_TIMEOUT } from './keyboard-shortcut-constants.js';
import type { IKeyboardShortcutEntry } from './keyboard-shortcut-constants.js';
import { getComposedEventTarget, isModifierKeyEvent, isTextEntryElement, matchChord } from './keyboard-shortcut-utils.js';

interface IDeferredEntry {
  entry: IKeyboardShortcutEntry;
  event: KeyboardEvent;
}

export class KeyboardShortcutScope {
  readonly #element: Element;
  readonly #entries: IKeyboardShortcutEntry[] = [];
  readonly #handled: WeakSet<KeyboardEvent>;
  readonly #prevented: WeakSet<KeyboardEvent>;
  #controller: AbortController | null = null;

  #pendingChords: IKeyCombination[] = [];
  #pendingTimer: ReturnType<typeof setTimeout> | null = null;
  #deferredEntries: IDeferredEntry[] = [];

  constructor(element: Element, handled: WeakSet<KeyboardEvent>, prevented: WeakSet<KeyboardEvent>) {
    this.#element = element;
    this.#handled = handled;
    this.#prevented = prevented;
  }

  public get element(): Element {
    return this.#element;
  }

  public get size(): number {
    return this.#entries.length;
  }

  public hasSequence(seq: IKeyboardShortcutSequence): boolean {
    return this.#entries.some(entry =>
      entry.sequences.some(
        s =>
          s.chords.length === seq.chords.length &&
          s.chords.every((c, i) => c.key === seq.chords[i].key && (c.modifier ?? '') === (seq.chords[i].modifier ?? ''))
      )
    );
  }

  public add(entry: IKeyboardShortcutEntry): void {
    this.#entries.push(entry);
    if (this.#entries.length === 1) {
      this.#attach();
    }
  }

  public remove(entry: IKeyboardShortcutEntry): void {
    const idx = this.#entries.indexOf(entry);
    if (idx >= 0) {
      this.#entries.splice(idx, 1);
    }

    if (this.#pendingChords.length > 0) {
      const stillValid = this.#entries.some(e => this.#sequencePrefixMatches(e));
      if (!stillValid) {
        this.#cancelPending();
      }
    }

    if (this.#entries.length === 0) {
      this.#detach();
    }
  }

  #attach(): void {
    this.#controller = new AbortController();
    const signal = this.#controller.signal;

    if (this.#element !== document.documentElement && !this.#element.hasAttribute('tabindex') && (this.#element as HTMLElement).tabIndex < 0) {
      this.#element.setAttribute('tabindex', '-1');
    }

    this.#element.addEventListener('keydown', evt => this.#handleKeyDown(evt as KeyboardEvent, 'capture'), { capture: true, signal });
    this.#element.addEventListener('keydown', evt => this.#handleKeyDown(evt as KeyboardEvent, 'bubble'), { capture: false, signal });
  }

  #detach(): void {
    this.#resetPending();
    this.#controller?.abort();
    this.#controller = null;
  }

  #handleKeyDown(evt: KeyboardEvent, phase: 'capture' | 'bubble'): void {
    if (evt.isComposing) {
      return;
    }
    if (evt.defaultPrevented && !this.#prevented.has(evt)) {
      return;
    }
    if (this.#handled.has(evt)) {
      return;
    }

    if (this.#pendingChords.length > 0) {
      this.#handlePendingResolution(evt, phase);
    } else {
      this.#handleFreshMatch(evt, phase);
    }
  }

  #handlePendingResolution(evt: KeyboardEvent, phase: 'capture' | 'bubble'): void {
    // Re-pressing a modifier between chords must not count as a non-matching key
    if (isModifierKeyEvent(evt)) {
      return;
    }

    if (evt.key === 'Escape') {
      this.#resetPending();
      this.#handled.add(evt);
      return;
    }

    const target = getComposedEventTarget(evt);
    const advancedEntries: { entry: IKeyboardShortcutEntry; seqIdx: number }[] = [];
    const completedEntries: { entry: IKeyboardShortcutEntry; seqIdx: number }[] = [];
    let anyEligible = false;

    for (const entry of this.#entries) {
      const entryPhase = entry.capture ? 'capture' : 'bubble';
      if (entryPhase !== phase) {
        continue;
      }
      if (evt.repeat && !entry.allowRepeat) {
        continue;
      }
      if (!entry.allowWhileTyping && isTextEntryElement(target)) {
        continue;
      }
      if (modalBoundaryBlocks(evt, entry)) {
        continue;
      }

      for (let si = 0; si < entry.sequences.length; si++) {
        const seq = entry.sequences[si];
        if (seq.chords.length <= this.#pendingChords.length) {
          continue;
        }
        if (!this.#chordsMatchPrefix(seq)) {
          continue;
        }
        anyEligible = true;
        const nextChord = seq.chords[this.#pendingChords.length];
        if (!matchChord(evt, nextChord, entry.useCode)) {
          continue;
        }

        if (this.#pendingChords.length + 1 === seq.chords.length) {
          completedEntries.push({ entry, seqIdx: si });
        } else {
          advancedEntries.push({ entry, seqIdx: si });
        }
      }
    }

    if (completedEntries.length > 0) {
      this.#clearTimer();
      this.#pendingChords = [];
      this.#deferredEntries = [];

      let allFallthrough = true;
      for (const { entry } of completedEntries) {
        if (entry.preventDefault) {
          evt.preventDefault();
          this.#prevented.add(evt);
        }
        entry.onActivate?.(evt);
        allFallthrough = allFallthrough && entry.fallthrough;
      }
      if (!allFallthrough) {
        this.#handled.add(evt);
      }
      return;
    }

    if (advancedEntries.length > 0) {
      const nextChord = advancedEntries[0].entry.sequences[advancedEntries[0].seqIdx].chords[this.#pendingChords.length];
      this.#pendingChords.push(nextChord);
      this.#restartTimer();
      evt.preventDefault();
      this.#prevented.add(evt);
      this.#handled.add(evt);
      return;
    }

    if (anyEligible) {
      this.#cancelPending();
    }
  }

  #handleFreshMatch(evt: KeyboardEvent, phase: 'capture' | 'bubble'): void {
    const target = getComposedEventTarget(evt);
    const immediates: IKeyboardShortcutEntry[] = [];
    const sequenceStarts: { entry: IKeyboardShortcutEntry; chord: IKeyCombination }[] = [];

    for (const entry of this.#entries) {
      const entryPhase = entry.capture ? 'capture' : 'bubble';
      if (entryPhase !== phase) {
        continue;
      }
      if (evt.repeat && !entry.allowRepeat) {
        continue;
      }
      if (!entry.allowWhileTyping && isTextEntryElement(target)) {
        continue;
      }
      if (modalBoundaryBlocks(evt, entry)) {
        continue;
      }

      for (const seq of entry.sequences) {
        if (seq.chords.length === 0) {
          continue;
        }
        if (!matchChord(evt, seq.chords[0], entry.useCode)) {
          continue;
        }

        if (seq.chords.length === 1) {
          immediates.push(entry);
        } else {
          sequenceStarts.push({ entry, chord: seq.chords[0] });
        }
      }
    }

    if (immediates.length > 0 && sequenceStarts.length === 0) {
      let activatedAny = false;
      let allFallthrough = true;
      for (const entry of immediates) {
        if (entry.preventDefault) {
          evt.preventDefault();
          this.#prevented.add(evt);
        }
        entry.onActivate?.(evt);
        activatedAny = true;
        allFallthrough = allFallthrough && entry.fallthrough;
      }
      if (activatedAny && !allFallthrough) {
        this.#handled.add(evt);
      }
      return;
    }

    if (sequenceStarts.length > 0) {
      this.#pendingChords = [sequenceStarts[0].chord];
      this.#deferredEntries = immediates.map(entry => ({ entry, event: evt }));
      this.#restartTimer();
      evt.preventDefault();
      this.#prevented.add(evt);
      this.#handled.add(evt);
    }
  }

  #chordsMatchPrefix(seq: IKeyboardShortcutSequence): boolean {
    for (let i = 0; i < this.#pendingChords.length; i++) {
      if (i >= seq.chords.length) {
        return false;
      }
      const pending = this.#pendingChords[i];
      const seqChord = seq.chords[i];
      if (pending.key !== seqChord.key || (pending.modifier ?? '') !== (seqChord.modifier ?? '')) {
        return false;
      }
    }
    return true;
  }

  #sequencePrefixMatches(entry: IKeyboardShortcutEntry): boolean {
    return entry.sequences.some(seq => seq.chords.length > this.#pendingChords.length && this.#chordsMatchPrefix(seq));
  }

  #cancelPending(): void {
    this.#clearTimer();
    const deferred = this.#deferredEntries;
    this.#pendingChords = [];
    this.#deferredEntries = [];

    for (const { entry, event } of deferred) {
      entry.onActivate?.(event);
    }
  }

  #resetPending(): void {
    this.#clearTimer();
    this.#pendingChords = [];
    this.#deferredEntries = [];
  }

  #restartTimer(): void {
    this.#clearTimer();
    this.#pendingTimer = setTimeout(() => this.#cancelPending(), SEQUENCE_TIMEOUT);
  }

  #clearTimer(): void {
    if (this.#pendingTimer != null) {
      clearTimeout(this.#pendingTimer);
      this.#pendingTimer = null;
    }
  }
}

function modalBoundaryBlocks(evt: KeyboardEvent, entry: IKeyboardShortcutEntry): boolean {
  const path = evt.composedPath();
  for (const node of path) {
    if (!(node instanceof Element)) {
      continue;
    }
    let isModal = false;
    try {
      isModal = node.matches(':modal');
    } catch {
      // :modal not supported
    }
    if (isModal) {
      if (entry.anchorElement && node.contains(entry.anchorElement)) {
        return false;
      }
      if (entry.options.scopeElement && node.contains(entry.options.scopeElement)) {
        return false;
      }
      return true;
    }
  }
  return false;
}
