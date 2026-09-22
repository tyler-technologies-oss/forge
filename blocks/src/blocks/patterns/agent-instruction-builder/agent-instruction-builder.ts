import type { CheckboxComponent, ChipComponent, ExpansionPanelComponent, IconButtonComponent, OpenIconComponent, SwitchComponent } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconArrowDownward, tylIconArrowUpward, tylIconCaseSensitiveAlt, tylIconDragIndicator, tylIconKeyboardArrowDown } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconArrowDownward, tylIconArrowUpward, tylIconCaseSensitiveAlt, tylIconDragIndicator, tylIconKeyboardArrowDown]);

const stack = document.getElementById('instruction-stack') as HTMLElement;
const summary = document.getElementById('stack-summary') as HTMLElement;
const announcer = document.getElementById('stack-announcer') as HTMLElement;
const emptyState = document.getElementById('empty-state') as HTMLElement;
const addInstructionButton = document.getElementById('add-instruction') as HTMLElement;
const cardTemplate = document.getElementById('instruction-card-template') as HTMLTemplateElement;

let idCounter = 0;
let instructionCounter = 3;
let draggedCard: HTMLElement | null = null;

const cards = (): HTMLElement[] => Array.from(stack.querySelectorAll<HTMLElement>('.instruction-card'));

const titleOf = (card: HTMLElement): string => card.querySelector('[data-title-text]')?.textContent?.trim() ?? 'Instruction';

const announce = (message: string): void => {
  announcer.textContent = message;
};

const ensureId = (element: Element, prefix: string): string => {
  if (!element.id) {
    element.id = `${prefix}-${++idCounter}`;
  }
  return element.id;
};

function syncStack(): void {
  const list = cards();
  const count = list.length;

  list.forEach((card, index) => {
    const title = titleOf(card);
    const moveUp = card.querySelector('[data-move-up]') as IconButtonComponent;
    const moveDown = card.querySelector('[data-move-down]') as IconButtonComponent;
    const deleteButton = card.querySelector('[data-delete]') as IconButtonComponent;

    moveUp.disabled = index === 0;
    moveDown.disabled = index === count - 1;
    moveUp.setAttribute('aria-label', `Move ${title} up`);
    moveDown.setAttribute('aria-label', `Move ${title} down`);
    deleteButton.setAttribute('aria-label', `Delete ${title}`);
  });

  summary.textContent = `${count} ${count === 1 ? 'section' : 'sections'} \u00b7 drag to reorder`;
  stack.classList.toggle('hidden', count === 0);
  emptyState.classList.toggle('hidden', count > 0);
}

function moveCard(card: HTMLElement, offset: -1 | 1): void {
  const list = cards();
  const target = list[list.indexOf(card) + offset];
  if (!target) {
    return;
  }

  stack.insertBefore(card, offset === -1 ? target : target.nextElementSibling);
  syncStack();
  announce(`${titleOf(card)} moved to position ${cards().indexOf(card) + 1} of ${list.length}`);
}

function dropTargetAt(clientY: number): HTMLElement | null {
  return (
    cards().find(card => {
      if (card === draggedCard) {
        return false;
      }
      const { top, height } = card.getBoundingClientRect();
      return clientY < top + height / 2;
    }) ?? null
  );
}

function initCard(card: HTMLElement): void {
  const dragHandle = card.querySelector('[data-drag-handle]') as HTMLElement;
  const titleTrigger = card.querySelector('[data-title-trigger]') as HTMLButtonElement;
  const openIcon = card.querySelector('[data-open-icon]') as OpenIconComponent;
  const panel = card.querySelector('[data-panel]') as ExpansionPanelComponent;
  const panelContent = card.querySelector('[data-panel-content]') as HTMLElement;
  const enabledSwitch = card.querySelector('[data-enabled-switch]') as SwitchComponent;
  const moveUp = card.querySelector('[data-move-up]') as IconButtonComponent;
  const moveDown = card.querySelector('[data-move-down]') as IconButtonComponent;
  const deleteButton = card.querySelector('[data-delete]') as IconButtonComponent;
  const instructionLabel = card.querySelector('[data-instruction-label]') as HTMLLabelElement;
  const instructionInput = card.querySelector('[data-instruction-input]') as HTMLTextAreaElement;
  const keywordGroup = card.querySelector('[data-keyword-group]') as HTMLElement;
  const keywordSet = card.querySelector('[data-keyword-set]') as HTMLElement;
  const keywordForm = card.querySelector('[data-keyword-form]') as HTMLFormElement;
  const keywordLabel = card.querySelector('[data-keyword-label]') as HTMLLabelElement;
  const keywordInput = card.querySelector('[data-keyword-input]') as HTMLInputElement;
  const caseSensitive = card.querySelector('[data-case-sensitive]') as CheckboxComponent;
  const keywordAdd = card.querySelector('[data-keyword-add]') as IconButtonComponent;

  instructionLabel.htmlFor = ensureId(instructionInput, 'instruction-text');
  keywordLabel.htmlFor = ensureId(keywordInput, 'instruction-keyword');
  titleTrigger.setAttribute('aria-controls', ensureId(panelContent, 'instruction-panel'));

  const chips = (): ChipComponent[] => Array.from(keywordSet.querySelectorAll<ChipComponent>('forge-chip'));

  const syncKeywordControls = (): void => {
    keywordAdd.disabled = !enabledSwitch.checked || !keywordInput.value.trim();
    keywordGroup.classList.toggle('hidden', chips().length === 0);
  };

  // The expansion panel's own `trigger` binding is deliberately not used: its trigger controller
  // detaches on disconnect and never re-attaches, so reordering a card would silently break the
  // toggle. Wiring the button by hand keeps collapsing working across DOM moves.
  const setOpen = (open: boolean): void => {
    panel.open = open;
    openIcon.open = open;
    titleTrigger.setAttribute('aria-expanded', String(open));
  };

  const setEnabled = (enabled: boolean): void => {
    card.toggleAttribute('data-disabled', !enabled);
    instructionInput.disabled = !enabled;
    keywordInput.disabled = !enabled;
    caseSensitive.disabled = !enabled;
    chips().forEach(chip => {
      chip.disabled = !enabled;
    });
    syncKeywordControls();
  };

  titleTrigger.addEventListener('click', () => setOpen(!panel.open));

  moveUp.addEventListener('click', () => {
    moveCard(card, -1);
    (moveUp.disabled ? moveDown : moveUp).focus();
  });

  moveDown.addEventListener('click', () => {
    moveCard(card, 1);
    (moveDown.disabled ? moveUp : moveDown).focus();
  });

  deleteButton.addEventListener('click', () => {
    const list = cards();
    const index = list.indexOf(card);
    const neighbor = list[index + 1] ?? list[index - 1];
    const title = titleOf(card);

    card.remove();
    syncStack();
    announce(`${title} deleted`);
    ((neighbor?.querySelector('[data-title-trigger]') as HTMLElement) ?? addInstructionButton).focus();
  });

  enabledSwitch.addEventListener('forge-switch-change', evt => setEnabled((evt as CustomEvent<boolean>).detail));

  keywordInput.addEventListener('input', syncKeywordControls);

  keywordForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const keyword = keywordInput.value.trim();
    if (!keyword || chips().some(chip => chip.getAttribute('value') === keyword)) {
      return;
    }

    const chip = document.createElement('forge-chip');
    chip.setAttribute('type', 'field');
    chip.setAttribute('value', keyword);

    if (caseSensitive.checked) {
      chip.setAttribute('remove-button-label', `Remove case sensitive keyword ${keyword}`);
      const icon = document.createElement('forge-icon');
      icon.setAttribute('slot', 'start');
      icon.setAttribute('name', 'case_sensitive_alt');
      icon.setAttribute('external', '');
      chip.appendChild(icon);
    } else {
      chip.setAttribute('remove-button-label', `Remove keyword ${keyword}`);
    }

    chip.appendChild(document.createTextNode(keyword));
    keywordSet.appendChild(chip);

    keywordInput.value = '';
    caseSensitive.checked = false;
    syncKeywordControls();
    keywordInput.focus();
    announce(`Keyword ${keyword} added to ${titleOf(card)}`);
  });

  keywordSet.addEventListener('forge-chip-delete', evt => {
    const chip = evt.target as ChipComponent;
    if (chip.disabled) {
      return;
    }
    chip.remove();
    syncKeywordControls();
    keywordInput.focus();
  });

  dragHandle.addEventListener('pointerdown', () => {
    card.draggable = true;
    document.addEventListener('pointerup', () => card.removeAttribute('draggable'), { once: true });
  });

  card.addEventListener('dragstart', evt => {
    draggedCard = card;
    card.classList.add('dragging');
    evt.dataTransfer?.setData('text/plain', titleOf(card));
    if (evt.dataTransfer) {
      evt.dataTransfer.effectAllowed = 'move';
    }
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    card.removeAttribute('draggable');
    draggedCard = null;
    syncStack();
    announce(`${titleOf(card)} moved to position ${cards().indexOf(card) + 1} of ${cards().length}`);
  });

  setOpen(panel.open);
  setEnabled(enabledSwitch.checked);
}

stack.addEventListener('dragover', evt => {
  if (!draggedCard) {
    return;
  }

  evt.preventDefault();
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
  }

  const target = dropTargetAt(evt.clientY);
  if (target) {
    if (draggedCard.nextElementSibling !== target) {
      stack.insertBefore(draggedCard, target);
    }
  } else if (stack.lastElementChild !== draggedCard) {
    stack.appendChild(draggedCard);
  }
});

stack.addEventListener('drop', evt => evt.preventDefault());

addInstructionButton.addEventListener('click', () => {
  const card = (cardTemplate.content.cloneNode(true) as DocumentFragment).querySelector('.instruction-card') as HTMLElement;
  const titleText = card.querySelector('[data-title-text]') as HTMLElement;
  titleText.textContent = `Instruction ${++instructionCounter}`;

  stack.appendChild(card);
  initCard(card);
  syncStack();
  announce(`${titleOf(card)} added at position ${cards().length}`);
  (card.querySelector('[data-instruction-input]') as HTMLTextAreaElement).focus();
});

cards().forEach(initCard);
syncStack();
