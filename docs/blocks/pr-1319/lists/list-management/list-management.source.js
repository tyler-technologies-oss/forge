const form = document.getElementById("add-item-form");
const input = document.getElementById("new-item");
const addBtn = document.getElementById("add-btn");
const listCard = document.getElementById("list-card");
const list = document.getElementById("items-list");
const emptyState = document.getElementById("empty-state");
const template = document.getElementById("list-item-template");
input.addEventListener("input", () => {
  addBtn.disabled = !input.value.trim();
});
function updateListVisibility() {
  const hasItems = list.children.length > 0;
  listCard.classList.toggle("hidden", !hasItems);
  emptyState.classList.toggle("hidden", hasItems);
}
let itemCounter = 0;
function addItem(text) {
  if (!text.trim()) {
    return;
  }
  const itemId = `item-${itemCounter++}`;
  const clone = template.content.cloneNode(true);
  const listItem = clone.querySelector("forge-list-item");
  const itemText = clone.querySelector("[data-item-text]");
  const editBtn = clone.querySelector("[data-edit-btn]");
  const popover = clone.querySelector("[data-popover]");
  const editLabel = clone.querySelector("[data-edit-label]");
  const editInput = clone.querySelector("[data-edit-input]");
  const cancelBtn = clone.querySelector("[data-cancel-btn]");
  const saveBtn = clone.querySelector("[data-save-btn]");
  const deleteBtn = clone.querySelector("[data-delete-btn]");
  editBtn.id = `edit-btn-${itemId}`;
  popover.setAttribute("anchor", `edit-btn-${itemId}`);
  editInput.id = `edit-input-${itemId}`;
  editLabel.setAttribute("for", `edit-input-${itemId}`);
  itemText.textContent = text;
  cancelBtn.addEventListener("click", () => {
    popover.open = false;
  });
  saveBtn.addEventListener("click", () => {
    const newText = editInput.value.trim();
    if (newText) {
      itemText.textContent = newText;
    }
    popover.open = false;
  });
  editInput.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      saveBtn.click();
    } else if (evt.key === "Escape") {
      popover.open = false;
    }
  });
  popover.addEventListener("forge-popover-toggle", (evt) => {
    if (evt.detail.newState === "open") {
      editInput.value = itemText.textContent ?? "";
      setTimeout(() => editInput.select(), 0);
    }
  });
  deleteBtn.addEventListener("click", () => {
    listItem.remove();
    updateListVisibility();
  });
  list.appendChild(clone);
  input.value = "";
  addBtn.disabled = true;
  input.focus();
  updateListVisibility();
}
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addItem(input.value);
});
updateListVisibility();
