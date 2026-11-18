export function escapeCSVCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value);
  if (!stringValue) {
    return '';
  }

  const dangerousFormulaPattern = /^(@)?(\+|-|=)?(DDE|HYPERLINK|IMPORTXML|IMPORTHTML|IMPORTDATA|IMPORTFEED|IMPORTRANGE)/i;
  const needsFormulaEscape = /^[=+\-@|\t\r\n]/.test(stringValue) || dangerousFormulaPattern.test(stringValue);

  const escapedValue = needsFormulaEscape ? `'${stringValue}` : stringValue;

  if (/[",\n\r]/.test(escapedValue)) {
    return `"${escapedValue.replace(/"/g, '""')}"`;
  }

  return escapedValue;
}

export function buildCSVContent(headers: string[], rows: (string | number)[][]): string {
  const csvRows = [headers.map(h => escapeCSVCell(h)).join(','), ...rows.map(row => row.map(cell => escapeCSVCell(cell)).join(','))];
  return csvRows.join('\r\n');
}

export function sanitizeFilename(filename: string, fallback = 'download'): string {
  const trimmed = filename.trim();
  if (!trimmed) {
    return `${fallback}.csv`;
  }

  let normalized = '';
  let lastWasDash = false;

  for (const char of trimmed) {
    const isAlphaNum = /[a-zA-Z0-9._-]/.test(char);
    const nextChar = isAlphaNum ? char : '-';

    if (nextChar === '-') {
      if (!normalized || lastWasDash) {
        continue;
      }
      normalized += nextChar;
      lastWasDash = true;
      continue;
    }

    normalized += nextChar;
    lastWasDash = false;
  }

  normalized = normalized.replace(/^[.-]+|[.-]+$/g, '');

  return `${normalized || fallback}.csv`;
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
