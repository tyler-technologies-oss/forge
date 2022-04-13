/**
 * Highlights text in the given label by converting it to HTML and using a `<span>` tag to show the highlighted text within the original label.
 * @param label The full text.
 * @param highlightText The text to highlight.
 */
export function highlightTextHTML(label: string, highlightText: string): HTMLElement | undefined {
  const text = label.toLowerCase();
  const startIndex = text.indexOf(highlightText.toLowerCase());

  if (startIndex !== -1) {
    const endIndex = startIndex + highlightText.length;
    const wrapperSpan = document.createElement('span');
    const highlightSpan = document.createElement('span');

    highlightSpan.style.fontWeight = 'bold';
    highlightSpan.textContent = label.substring(startIndex, endIndex);
    
    wrapperSpan.appendChild(document.createTextNode(label.substring(0, startIndex)));
    wrapperSpan.appendChild(highlightSpan);
    wrapperSpan.appendChild(document.createTextNode(label.substring(endIndex)));
    
    return wrapperSpan;
  }

  return undefined;
}
