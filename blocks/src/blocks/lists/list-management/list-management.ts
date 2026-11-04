import type { IPopoverComponent, IPopoverToggleEventData } from '@tylertech/forge';

const form = document.getElementById('add-item-form') as HTMLFormElement;
const input = document.getElementById('new-item') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const listCard = document.getElementById('list-card') as HTMLElement;
const list = document.getElementById('items-list') as HTMLElement;
const emptyState = document.getElementById('empty-state') as HTMLElement;
const template = document.getElementById('list-item-template') as HTMLTemplateElement;

input.addEventListener('input', () => {
  addBtn.disabled = !input.value.trim();
});

function updateListVisibility(): void {
  const hasItems = list.children.length > 0;
  listCard.classList.toggle('hidden', !hasItems);
  emptyState.classList.toggle('hidden', hasItems);
}

let itemCounter = 0;

function addItem(text: string): void {
  if (!text.trim()) {
    return;
  }

  const itemId = `item-${itemCounter++}`;
  const clone = template.content.cloneNode(true) as DocumentFragment;

  const listItem = clone.querySelector('forge-list-item') as HTMLElement;
  const itemText = clone.querySelector('[data-item-text]') as HTMLElement;
  const editBtn = clone.querySelector('[data-edit-btn]') as HTMLElement;
  const popover = clone.querySelector('[data-popover]') as IPopoverComponent;
  const editLabel = clone.querySelector('[data-edit-label]') as HTMLLabelElement;
  const editInput = clone.querySelector('[data-edit-input]') as HTMLInputElement;
  const cancelBtn = clone.querySelector('[data-cancel-btn]') as HTMLElement;
  const saveBtn = clone.querySelector('[data-save-btn]') as HTMLElement;
  const deleteBtn = clone.querySelector('[data-delete-btn]') as HTMLElement;

  editBtn.id = `edit-btn-${itemId}`;
  popover.setAttribute('anchor', `edit-btn-${itemId}`);
  editInput.id = `edit-input-${itemId}`;
  editLabel.setAttribute('for', `edit-input-${itemId}`);

  itemText.textContent = text;

  cancelBtn.addEventListener('click', () => {
    popover.open = false;
  });

  saveBtn.addEventListener('click', () => {
    const newText = editInput.value.trim();
    if (newText) {
      itemText.textContent = newText;
    }
    popover.open = false;
  });

  editInput.addEventListener('keydown', (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      saveBtn.click();
    } else if (evt.key === 'Escape') {
      popover.open = false;
    }
  });

  popover.addEventListener('forge-popover-toggle', (evt: CustomEvent<IPopoverToggleEventData>) => {
    if (evt.detail.newState === 'open') {
      editInput.value = itemText.textContent ?? '';
      setTimeout(() => editInput.select(), 0);
    }
  });

  deleteBtn.addEventListener('click', () => {
    listItem.remove();
    updateListVisibility();
  });

  list.appendChild(clone);
  input.value = '';
  addBtn.disabled = true;
  input.focus();
  updateListVisibility();
}

form.addEventListener('submit', (evt: SubmitEvent) => {
  evt.preventDefault();
  addItem(input.value);
});

updateListVisibility();
