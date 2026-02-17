/** Copy the text value to the clipboard. */
export function copyToClipboard(text: string): boolean {
  let textarea: HTMLTextAreaElement | null = _createTextareaAndSelect(text);

  const copySuccessful = document.execCommand('copy');

  if (textarea) {
    document.body.removeChild(textarea);
    textarea = null;
  }

  return copySuccessful;
}

/**
 * Creates a hidden textarea element, sets its value from `text` property,
 * and makes a selection on it.
 */
function _createTextareaAndSelect(text: string): HTMLTextAreaElement {
  const textarea = document.createElement('textarea');
  textarea.style.fontSize = '12pt';
  textarea.style.border = '0';
  textarea.style.clip = 'rect(0 0 0 0)';
  textarea.style.height = '1px';
  textarea.style.margin = '-1px';
  textarea.style.overflow = 'hidden';
  textarea.style.padding = '0';
  textarea.style.position = 'absolute';
  textarea.style.width = '1px';
  textarea.style.outline = '0';
  textarea.style.setProperty('-webkit-appearance', 'none');
  textarea.style.setProperty('-moz-appearance', 'none');

  const yPosition = window.pageYOffset || document.documentElement?.scrollTop;
  textarea.style.top = yPosition + 'px';

  textarea.setAttribute('readonly', '');
  textarea.value = text;

  document.body.appendChild(textarea);

  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  return textarea;
}
